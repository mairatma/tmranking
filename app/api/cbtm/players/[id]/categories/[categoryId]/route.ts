import { NextRequest } from 'next/server';

import { buildEtag, buildResponseHeaders } from '../../../../_helpers/response';
import { fetchPlayerById } from '../../../../_crawler/players/fetchById';

export async function GET(
  req: NextRequest,
  ctx: RouteContext<'/api/cbtm/players/[id]/categories/[categoryId]'>,
) {
  if (req.method === 'OPTIONS') {
    return new Response('', { status: 200 });
  }

  if (req.method !== 'GET') {
    return new Response('', { status: 405 });
  }

  try {
    const { id, categoryId } = await ctx.params;

    // Check If-None-Match header
    const clientETag = req.headers.get('if-none-match');
    if (clientETag === buildEtag()) {
      return new Response(undefined, { status: 304 });
    }

    const year = req.nextUrl.searchParams.get('year');

    const result = await fetchPlayerById(id, categoryId, { year });
    return new Response(JSON.stringify(result), {
      status: 200,
      headers: buildResponseHeaders(),
    });
  } catch (error) {
    console.error('API Error:', error);
    return new Response(undefined, { status: 500 });
  }
}
