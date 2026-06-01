import { NextRequest } from 'next/server';

import { getHighestId } from '../../_features/tournaments/get';
import { fetchTournamentById } from '../../_crawler/tournaments/fetchById';

const DEFAULT_TOTAL = 10;
const MAX_BATCH_SIZE = 5;

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

    let cbtmIdStart = body.start ?? null;
    if (!cbtmIdStart) {
      cbtmIdStart = (await getHighestId()) + 1;
    }

    const total = body.total ?? DEFAULT_TOTAL;
    const end = cbtmIdStart + total;

    let batch: number[] = [];
    for (let id = cbtmIdStart; id < end; id++) {
      batch.push(id);

      if (batch.length === MAX_BATCH_SIZE || id === end - 1) {
        console.log({
          message: `Crawling and storing ${batch.length} tournaments`,
          ids: batch.concat(),
        });

        await Promise.all(
          batch.map((id) => fetchTournamentById(id.toString())),
        );

        console.log({
          message: `Successfully crawled and stored ${batch.length} tournaments`,
          ids: batch.concat(),
        });

        batch = [];
      }
    }

    return new Response(undefined, {
      status: 204,
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
