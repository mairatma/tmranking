import { db } from '@/app/api/_lib/db';
import { tournaments } from '@/app/api/_lib/db/schema';
import { asc } from 'drizzle-orm';

const DEFAULT_OFFSET = 0;
const DEFAULT_LIMIT = 20;

interface Options {
  offset?: number;
  limit?: number;
}

export const fetchTournamentList = ({ offset, limit }: Options = {}) => {
  return db
    .select({ cbtmId: tournaments.cbtmId, name: tournaments.name })
    .from(tournaments)
    .offset(offset ?? DEFAULT_OFFSET)
    .limit(limit ?? DEFAULT_LIMIT)
    .orderBy(asc(tournaments.name));
};
