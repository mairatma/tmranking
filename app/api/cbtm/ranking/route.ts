import { NextRequest } from 'next/server';

import { fetchRankingList } from '../_crawler/ranking/fetchList';

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

    const pageNumber = page ? Number(page) : 1;
    const result = await fetchRankingList(
      { category, year, region, athlete },
      pageNumber,
    );
    return new Response(JSON.stringify(result), {
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
