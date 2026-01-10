import { NextRequest } from 'next/server';
import { parse } from 'node-html-parser';

import { RANKING_INITIAL_SESSION_DATA } from '../crawler/session';
import {
  extractGridCallbackState,
  extractInputValue,
} from '../crawler/helpers';

const BASE_URL = 'https://app.cbtm.org.br/iUI/Site/RankingResultado';

interface CbtmSessionData {
  viewState: string;
  viewStateGenerator: string;
  eventValidation: string;
  gridCallbackState: string;
  cookies: string | null;
}

/**
 * CBTM Ranking Crawler
 * Fetches table tennis rankings with stateful ViewState management
 */
class CBTMCrawler {
  private sessionData: CbtmSessionData | null;

  constructor() {
    this.sessionData = RANKING_INITIAL_SESSION_DATA;
  }

  /**
   * Update ViewState tokens from response
   */
  updateViewState(html: string) {
    if (!this.sessionData) return;

    const root = parse(html);

    const newViewState = extractInputValue(root, '__VIEWSTATE');
    const newEventValidation = extractInputValue(root, '__EVENTVALIDATION');

    if (newViewState) {
      this.sessionData = { ...this.sessionData, viewState: newViewState };
    }
    if (newEventValidation)
      this.sessionData = {
        ...this.sessionData,
        eventValidation: newEventValidation,
      };

    const newGridCallbackState = extractGridCallbackState(root);
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
    athlete: string | null,
  ) {
    const params = new URLSearchParams();

    // Event target and ViewState
    params.append('__EVENTTARGET', 'ctl00$mainContent$cmbRANKING');
    params.append('__EVENTARGUMENT', '');
    params.append('__VIEWSTATE', this.sessionData?.viewState ?? '');
    params.append(
      '__VIEWSTATEGENERATOR',
      this.sessionData?.viewStateGenerator ?? '',
    );
    params.append('__VIEWSTATEENCRYPTED', '');
    params.append('__EVENTVALIDATION', this.sessionData?.eventValidation ?? '');

    // Ranking dropdown
    params.append(
      'ctl00$mainContent$cmbRANKING$State',
      `{ "rawValue": "${category}" }`,
    );
    params.append('ctl00$mainContent$cmbRANKING', category);
    params.append('ctl00$mainContent$cmbRANKING$L', category);
    params.append('mainContent_cmbRANKING_VI', category);

    // Year dropdown
    params.append(
      'ctl00$mainContent$cmbAno$State',
      `{ "rawValue": "${year}" }`,
    );
    params.append('ctl00$mainContent$cmbAno', String(year));
    params.append('ctl00$mainContent$cmbAno$L', String(year));
    params.append('mainContent_cmbAno_VI', String(year));

    // Region dropdown
    params.append(
      'ctl00$mainContent$cmbRegiao$State',
      `{ "rawValue": "${region}" }`,
    );
    params.append('ctl00$mainContent$cmbRegiao', region);
    params.append('ctl00$mainContent$cmbRegiao$L', region);
    params.append('mainContent_cmbRegiao_VI', region);

    // Athlete dropdown
    params.append(
      'ctl00$mainContent$cmbAtleta$State',
      `{ "rawValue": "${athlete ?? ''}" }`,
    );
    params.append('ctl00$mainContent$cmbAtleta', athlete ?? '');
    params.append('ctl00$mainContent$cmbAtleta$L', athlete ?? '');
    params.append('mainContent_cmbAtleta_VI', athlete ?? '');

    // Grid state
    params.append(
      'ctl00$mainContent$grid',
      JSON.stringify({
        keys: [],
        callbackState: this.sessionData?.gridCallbackState || '',
        groupLevelState: {},
        selection: '',
        toolbar: null,
      }),
    );

    return params;
  }

  async fetchRankingFirstPage(
    category: string,
    year: string,
    region: string,
    athlete: string | null,
  ) {
    const formData = this.buildFormData(category, year, region, athlete);

    const response = await fetch(`${BASE_URL}?Tipo=O`, {
      method: 'POST',
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept:
          'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'pt-BR,pt;q=0.9,en;q=0.8',
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

    return html;
  }

  /**
   * Fetch ranking data
   */
  async getRanking(
    category: string,
    year: string,
    region: string,
    athlete: string | null,
  ) {
    const html = await this.fetchRankingFirstPage(
      category,
      year,
      region,
      athlete,
    );

    // Parse and return data
    const data = this.parseRankingTable(html);

    return {
      ...data,
      crawledAt: new Date().toISOString(),
    };
  }

  extractHtmlField(responseText: string) {
    // Regex to match 'html':'...' or "html":"..."
    // Captures everything between the quotes, handling escaped characters
    const replaced = responseText.replace(/\\'/g, '___ESCAPED_SINGLE___');
    const regex = /'html':'([^']+)'/;

    const match = replaced.match(regex);

    if (!match) {
      throw new Error('HTML field not found');
    }

    // Get the captured HTML content
    return match[1].replace(/___ESCAPED_SINGLE___/g, "\\'");
  }

  async fetchRankingPage(
    category: string,
    year: string,
    region: string,
    athlete: string | null,
    page: number,
  ) {
    await this.fetchRankingFirstPage(category, year, region, athlete);

    const formData = this.buildFormData(category, year, region, athlete);
    formData.set('__EVENTTARGET', '');
    formData.append('__CALLBACKID', 'ctl00$mainContent$grid');
    formData.append(
      '__CALLBACKPARAM',
      `c0:KV|2;[];GB|20;12|PAGERONCLICK3|PN${page - 1};`,
    );

    const response = await fetch(`${BASE_URL}?Tipo=O`, {
      method: 'POST',
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept:
          'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'pt-BR,pt;q=0.9,en;q=0.8',
        ...(this.sessionData?.cookies && { Cookie: this.sessionData.cookies }),
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const responseText = await response.text();
    const extracted = this.extractHtmlField(responseText);

    const data = this.parseRankingTable(extracted);
    return JSON.stringify({
      ...data,
      crawledAt: new Date().toISOString(),
    });
  }

  /**
   * Parse ranking table from HTML
   * The table structure uses Bootstrap grid layout within table cells
   */
  parseRankingTable(html: string) {
    const root = parse(html);

    // Find the main table by ID
    const table = root.querySelector('table#mainContent_grid_DXMainTable')!;

    const rankings = [];

    // Find all data rows (they have IDs like mainContent_grid_DXDataRow0, DXDataRow1, etc.)
    const rows = table.querySelectorAll('tr[id*="DXDataRow"]');

    for (const row of rows) {
      try {
        // Each row contains a complex Bootstrap grid structure
        // Structure: <tr><td><div><div class="row"><div class="col-md-*">...</div></div></div></td></tr>

        const columns = row.querySelectorAll('.col-md-1, .col-md-8, .col-md-2');

        if (columns.length < 3) {
          console.warn('Row has insufficient columns, skipping');
          continue;
        }

        // Column 0 (col-md-1): Rank - e.g., "Rk 1"
        const rankSpan = columns[0].querySelector('span');
        const rank = rankSpan ? rankSpan.text.trim().replace('Rk ', '') : '';

        // Column 1 (col-md-1): Points link - e.g., "2685 Pts"
        const pointsLink = columns[1].querySelector('a');
        const points = pointsLink
          ? pointsLink.text.trim().replace(' Pts', '')
          : '';

        // Column 2 (col-md-8): Name and Club
        const nameSpan = columns[2].querySelector('span.FonteTexto');
        const clubAndStateSpan = columns[2].querySelector(
          'span.FonteTextoClaro',
        );

        const name = nameSpan ? nameSpan.text.trim() : '';
        const clubAndState = clubAndStateSpan
          ? clubAndStateSpan.text.trim()
          : '';
        const [club, state] = clubAndState.split('-');

        const link = row.querySelector('a');
        const href = link!.getAttribute('href')!;
        const id = /Associado=(\d+)/.exec(href)![1];

        // Only add if we have meaningful data
        if (name && rank) {
          rankings.push({
            id,
            rank: parseInt(rank, 10),
            name: name,
            club: club?.trim(),
            state: state?.trim(),
            points: parseInt(points, 10),
          });
        }
      } catch (error) {
        console.error('Error parsing row:', error);
        continue;
      }
    }

    const totalItems = /(?:'|\\')itemCount(?:'|\\'):\s*(\d+)/.exec(html)![1];

    return { rankings, totalItems };
  }
}

/**
 * Get today's date in YYYY-MM-DD format
 */
function getTodayDate() {
  return new Date().toISOString().split('T')[0];
}

/**
 * Main API handler
 */
export async function GET(req: NextRequest) {
  if (req.method === 'OPTIONS') {
    return new Response('', { status: 200 });
  }

  if (req.method !== 'GET') {
    return new Response('', { status: 405 });
  }

  try {
    // Extract parameters
    const category = req.nextUrl.searchParams.get('category');
    const year = req.nextUrl.searchParams.get('year');
    const region = req.nextUrl.searchParams.get('region');
    const athlete = req.nextUrl.searchParams.get('athlete');
    const page = req.nextUrl.searchParams.get('page');

    // Validate required parameters
    if (!category || !year || !region) {
      return new Response(
        JSON.stringify({
          error: 'Missing required parameters',
          required: ['category', 'year', 'region'],
        }),
        { status: 400 },
      );
    }

    const etag = getTodayDate();

    // Check If-None-Match header
    const clientETag = req.headers.get('if-none-match');
    if (clientETag === etag) {
      return new Response(undefined, { status: 304 });
    }

    const crawler = new CBTMCrawler();

    if (page && Number(page) > 1) {
      const result = await crawler.fetchRankingPage(
        category,
        year,
        region,
        athlete,
        Number(page),
      );
      return new Response(result, {
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, If-None-Match',
          ETag: etag,
          'Cache-Control': 'public, max-age=3600', // 1 hour CDN cache
        },
      });
    }
    const result = await crawler.getRanking(category, year, region, athlete);
    const resultString = JSON.stringify(result);

    // Return fresh data with ETag
    return new Response(resultString, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, If-None-Match',
        ETag: etag,
        'Cache-Control': 'public, max-age=3600', // 1 hour CDN cache
      },
    });
  } catch (error) {
    console.error('API Error:', error);
    return new Response(undefined, { status: 500 });
  }
}
