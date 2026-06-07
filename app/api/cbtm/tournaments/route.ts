import { NextRequest } from 'next/server';

import { buildEtag, buildResponseHeaders } from '../_helpers/response';
import { fetchTournamentList } from '../_features/tournaments/list';

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
    // Check If-None-Match header
    const clientETag = req.headers.get('if-none-match');
    if (clientETag === buildEtag()) {
      return new Response(undefined, { status: 304 });
    }

    const search = req.nextUrl.searchParams.get('search') ?? undefined;
    const result = await fetchTournamentList({ search });
    return new Response(JSON.stringify(result), {
      status: 200,
      headers: buildResponseHeaders(),
    });
  } catch (error) {
    console.error('API Error:', error);
    return new Response(undefined, { status: 500 });
  }
}
