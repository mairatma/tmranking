import { kv } from "@vercel/kv";
import crypto from "crypto";
import { NextRequest } from "next/server";
import { HTMLElement, parse } from "node-html-parser";

const BASE_URL = "https://app.cbtm.org.br/iUI/Site/RankingResultado";

interface CbtmSessionData {
  viewState: string;
  viewStateGenerator: string;
  eventValidation: string;
  gridCallbackState: string;
  cookies: string | null;
}

const CATEGORY_TO_NAME: Record<string, string> = {
  52: "SUB-09 MAS",
};

/**
 * CBTM Ranking Crawler
 * Fetches table tennis rankings with stateful ViewState management
 */
class CBTMCrawler {
  private sessionData: CbtmSessionData | null;

  constructor() {
    this.sessionData = null;
  }

  /**
   * Initialize session and extract ViewState tokens
   */
  async initializeSession() {
    try {
      const response = await fetch(`${BASE_URL}?Tipo=O`, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
          Accept:
            "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
          "Accept-Language": "pt-BR,pt;q=0.9,en;q=0.8",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const html = await response.text();
      const root = parse(html);

      // Extract ViewState tokens
      const viewState = this.extractInputValue(root, "__VIEWSTATE");
      const viewStateGenerator = this.extractInputValue(
        root,
        "__VIEWSTATEGENERATOR"
      );
      const eventValidation = this.extractInputValue(root, "__EVENTVALIDATION");

      // Extract DevExpress grid callback state
      const gridCallbackState = this.extractGridCallbackState(root);

      // Store cookies
      const cookies = response.headers.get("set-cookie");

      if (!viewState || !viewStateGenerator || !eventValidation) {
        throw new Error("Could not extract session data values");
      }

      this.sessionData = {
        viewState,
        viewStateGenerator,
        eventValidation,
        gridCallbackState,
        cookies,
      };

      return true;
    } catch (error) {
      console.error("Failed to initialize session:", error);
      return false;
    }
  }

  /**
   * Extract value from hidden input field
   */
  extractInputValue(root: HTMLElement, name: string) {
    const input = root.querySelector(`input[name="${name}"]`);
    return input ? input.getAttribute("value") : null;
  }

  extractGridCallbackState(root: HTMLElement) {
    // Alternative: look for it in inline JavaScript
    const scripts = root.querySelectorAll("script");
    for (const script of scripts) {
      const scriptText = script.text;

      // Look for callbackState in various patterns
      const patterns = [
        /callbackState["\s:]+["']([^"']+)["']/i,
        /["']callbackState["']:\s*["']([^"']+)["']/i,
        /callbackState=["']([^"']+)["']/i,
      ];

      for (const pattern of patterns) {
        const match = scriptText.match(pattern);
        if (match && match[1]) {
          return match[1];
        }
      }
    }

    throw new Error("Could not find grid callback state");
  }

  /**
   * Update ViewState tokens from response
   */
  updateViewState(html: string) {
    if (!this.sessionData) return;

    const root = parse(html);

    const newViewState = this.extractInputValue(root, "__VIEWSTATE");
    const newEventValidation = this.extractInputValue(
      root,
      "__EVENTVALIDATION"
    );

    if (newViewState) {
      this.sessionData = { ...this.sessionData, viewState: newViewState };
    }
    if (newEventValidation)
      this.sessionData = {
        ...this.sessionData,
        eventValidation: newEventValidation,
      };

    const newGridCallbackState = this.extractGridCallbackState(root);
    {
      this.sessionData = {
        ...this.sessionData,
        gridCallbackState: newGridCallbackState,
      };
    }
  }

  /**
   * Build form data for POST request
   */
  buildFormData(
    category: string,
    year: string,
    region: string,
    athlete: string | null
  ) {
    const params = new URLSearchParams();

    // Event target and ViewState
    params.append("__EVENTTARGET", "ctl00$mainContent$cmbRANKING");
    params.append("__EVENTARGUMENT", "");
    params.append("__VIEWSTATE", this.sessionData?.viewState ?? "");
    params.append(
      "__VIEWSTATEGENERATOR",
      this.sessionData?.viewStateGenerator ?? ""
    );
    params.append("__VIEWSTATEENCRYPTED", "");
    params.append("__EVENTVALIDATION", this.sessionData?.eventValidation ?? "");

    // Ranking dropdown
    params.append(
      "ctl00$mainContent$cmbRANKING$State",
      `{ "rawValue": "${CATEGORY_TO_NAME[category]}" }`
    );
    params.append("ctl00$mainContent$cmbRANKING", CATEGORY_TO_NAME[category]);
    params.append("ctl00$mainContent$cmbRANKING$L", category);
    params.append("mainContent_cmbRANKING_VI", category);

    // Year dropdown
    params.append(
      "ctl00$mainContent$cmbAno$State",
      `{ "rawValue": "${year}" }`
    );
    params.append("ctl00$mainContent$cmbAno", String(year));
    params.append("ctl00$mainContent$cmbAno$L", String(year));
    params.append("mainContent_cmbAno_VI", String(year));

    // Region dropdown
    params.append(
      "ctl00$mainContent$cmbRegiao$State",
      `{ "rawValue": "${region}" }`
    );
    params.append("ctl00$mainContent$cmbRegiao", region);
    params.append("ctl00$mainContent$cmbRegiao$L", region);
    params.append("mainContent_cmbRegiao_VI", region);

    // Athlete dropdown
    params.append(
      "ctl00$mainContent$cmbAtleta$State",
      `{ "rawValue": "${athlete ?? ""}" }`
    );
    params.append("ctl00$mainContent$cmbAtleta", athlete ?? "");
    params.append("ctl00$mainContent$cmbAtleta$L", athlete ?? "");
    params.append("mainContent_cmbAtleta_VI", athlete ?? "");

    // Grid state
    params.append(
      "ctl00$mainContent$grid",
      JSON.stringify({
        keys: [],
        callbackState: this.sessionData?.gridCallbackState || "",
        groupLevelState: {},
        selection: "",
        toolbar: null,
      })
    );

    return params;
  }

  /**
   * Fetch ranking data
   */
  async getRanking(
    category: string,
    year: string,
    region: string,
    athlete: string | null
  ) {
    // Initialize if needed
    if (!this.sessionData) {
      const initialized = await this.initializeSession();
      if (!initialized) {
        throw new Error("Failed to initialize session");
      }
    }

    const formData = this.buildFormData(category, year, region, athlete);

    const response = await fetch(`${BASE_URL}?Tipo=O`, {
      method: "POST",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        "Content-Type": "application/x-www-form-urlencoded",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "pt-BR,pt;q=0.9,en;q=0.8",
        ...(this.sessionData?.cookies && { Cookie: this.sessionData.cookies }),
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const html = await response.text();

    // Update ViewState for potential next request
    this.updateViewState(html);

    // Parse and return data
    const rankings = this.parseRankingTable(html);

    return {
      success: true,
      data: rankings,
      metadata: {
        category,
        year,
        region,
        athlete,
        totalResults: rankings.length,
        crawledAt: new Date().toISOString(),
      },
    };
  }

  /**
   * Parse ranking table from HTML
   * The table structure uses Bootstrap grid layout within table cells
   */
  parseRankingTable(html: string) {
    const root = parse(html);

    // Find the main table by ID
    const table = root.querySelector("table#mainContent_grid_DXMainTable");

    if (!table) {
      console.warn("Table mainContent_grid_DXMainTable not found");
      return [];
    }

    const rankings = [];

    // Find all data rows (they have IDs like mainContent_grid_DXDataRow0, DXDataRow1, etc.)
    const rows = table.querySelectorAll('tr[id*="DXDataRow"]');

    for (const row of rows) {
      try {
        // Each row contains a complex Bootstrap grid structure
        // Structure: <tr><td><div><div class="row"><div class="col-md-*">...</div></div></div></td></tr>

        const columns = row.querySelectorAll(".col-md-1, .col-md-8, .col-md-2");

        if (columns.length < 3) {
          console.warn("Row has insufficient columns, skipping");
          continue;
        }

        // Column 0 (col-md-1): Rank - e.g., "Rk 1"
        const rankSpan = columns[0].querySelector("span");
        const rank = rankSpan ? rankSpan.text.trim().replace("Rk ", "") : "";

        // Column 1 (col-md-1): Points link - e.g., "2685 Pts"
        const pointsLink = columns[1].querySelector("a");
        const points = pointsLink
          ? pointsLink.text.trim().replace(" Pts", "")
          : "";

        // Column 2 (col-md-8): Name and Club
        const nameSpan = columns[2].querySelector("span.FonteTexto");
        const clubSpan = columns[2].querySelector("span.FonteTextoClaro");

        const name = nameSpan ? nameSpan.text.trim() : "";
        const club = clubSpan ? clubSpan.text.trim() : "";

        // Only add if we have meaningful data
        if (name && rank) {
          rankings.push({
            rank: parseInt(rank, 10) || rank,
            name: name,
            club: club,
            points: parseInt(points, 10) || points,
          });
        }
      } catch (error) {
        console.error("Error parsing row:", error);
        continue;
      }
    }

    return rankings;
  }
}

/**
 * Generate ETag from cache key
 */
function generateETag(key: string) {
  return crypto.createHash("md5").update(key).digest("hex");
}

/**
 * Get today's date in YYYY-MM-DD format
 */
function getTodayDate() {
  return new Date().toISOString().split("T")[0];
}

/**
 * Main API handler
 */
export async function GET(req: NextRequest) {
  if (req.method === "OPTIONS") {
    return new Response("", { status: 200 });
  }

  if (req.method !== "GET" && req.method !== "POST") {
    return new Response("", { status: 405 });
  }

  try {
    // Extract parameters
    const category = req.nextUrl.searchParams.get("category");
    const year = req.nextUrl.searchParams.get("year");
    const region = req.nextUrl.searchParams.get("region");
    const athlete = req.nextUrl.searchParams.get("athlete");

    // Validate required parameters
    if (!category || !year || !region) {
      return new Response(
        JSON.stringify({
          error: "Missing required parameters",
          required: ["category", "year", "region"],
        }),
        { status: 400 }
      );
    }

    // Generate cache key with today's date
    const today = getTodayDate();
    const cacheKey = `ranking:${category}:${year}:${region}:${
      athlete || "all"
    }:${today}`;
    const etag = generateETag(cacheKey);

    // Check If-None-Match header
    const clientETag = req.headers.get("if-none-match");
    if (clientETag === etag) {
      return new Response(undefined, { status: 304 });
    }

    // // Try to get from cache
    // let cachedData: string | null = null;
    // try {
    //   cachedData = await kv.get(cacheKey);
    // } catch (error) {
    //   console.warn("Cache read failed:", error);
    // }

    // if (cachedData) {
    //   // Return cached data with ETag
    //   return new Response(cachedData, {
    //     status: 200,
    //     headers: {
    //       "Access-Control-Allow-Origin": "*",
    //       "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    //       "Access-Control-Allow-Headers": "Content-Type, If-None-Match",
    //       ETag: etag,
    //       "Cache-Control": "public, max-age=3600", // 1 hour CDN cache
    //     },
    //   });
    // }

    // Cache miss - crawl the site
    console.log("Cache miss, crawling:", cacheKey);

    const crawler = new CBTMCrawler();
    const result = await crawler.getRanking(category, year, region, athlete);
    const resultString = JSON.stringify(result);

    // // Store in cache (24 hour expiration)
    // try {
    //   await kv.set(cacheKey, resultString, { ex: 86400 });
    // } catch (error) {
    //   console.warn("Cache write failed:", error);
    // }

    // Return fresh data with ETag
    return new Response(resultString, {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, If-None-Match",
        ETag: etag,
        "Cache-Control": "public, max-age=3600", // 1 hour CDN cache
      },
    });
  } catch (error) {
    console.error("API Error:", error);
    return new Response(undefined, { status: 500 });
  }
}
