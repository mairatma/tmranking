import { NextRequest } from 'next/server';

import { getHighestId } from '../../_features/tournaments/get';

/**
 * Main API handler
 */
export async function POST(req: NextRequest) {
  if (req.method === 'OPTIONS') {
    return new Response('', { status: 200 });
  }

  if (req.method !== 'POST') {
    return new Response('', { status: 405 });
  }

  try {
    const body: { total?: number; start?: number } = await req.json();
    console.log('req.body', body);

    let cbtmIdStart = body.start;
    if (!cbtmIdStart) {
      cbtmIdStart = await getHighestId();
    }

    // const result = await fetchTournamentById();
    return new Response(JSON.stringify({}), {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, If-None-Match',
      },
    });
  } catch (error) {
    console.error('API Error:', error);
    return new Response(undefined, { status: 500 });
  }
}
