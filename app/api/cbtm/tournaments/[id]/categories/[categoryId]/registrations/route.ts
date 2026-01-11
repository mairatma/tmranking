import { NextRequest } from 'next/server';

import {
  buildEtag,
  buildResponseHeaders,
} from '../../../../../_helpers/response';
import { fetchTournamentRegistrations } from '@/app/api/cbtm/_crawler/tournaments/registrations/fetchRegistrations';

/**
 * Main API handler
 */
export async function GET(
  req: NextRequest,
  ctx: RouteContext<'/api/cbtm/tournaments/[id]/categories/[categoryId]/registrations'>,
) {
  if (req.method === 'OPTIONS') {
    return new Response('', { status: 200 });
  }

  if (req.method !== 'GET') {
    return new Response('', { status: 405 });
  }

  try {
    // Extract parameters
    const { id, categoryId } = await ctx.params;

    // Check If-None-Match header
    const clientETag = req.headers.get('if-none-match');
    if (clientETag === buildEtag()) {
      return new Response(undefined, { status: 304 });
    }

    const result = await fetchTournamentRegistrations(id, categoryId);
    return new Response(JSON.stringify(result), {
      status: 200,
      headers: buildResponseHeaders(),
    });
  } catch (error) {
    console.error('API Error:', error);
    return new Response(undefined, { status: 500 });
  }
}
