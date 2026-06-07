import { db } from '@/app/api/_lib/db';
import { tournaments } from '@/app/api/_lib/db/schema';
import { asc, count, ilike } from 'drizzle-orm';

const DEFAULT_OFFSET = 0;
const DEFAULT_LIMIT = 20;

interface Options {
  offset?: number;
  limit?: number;
  search?: string;
}

export const fetchTournamentList = async ({
  offset,
  limit,
  search,
}: Options = {}) => {
  const where = search ? ilike(tournaments.name, `%${search}%`) : undefined;

  const [data, [{ total }]] = await Promise.all([
    db
      .select({
        id: tournaments.id,
        cbtmId: tournaments.cbtmId,
        name: tournaments.name,
      })
      .from(tournaments)
      .where(where)
      .offset(offset ?? DEFAULT_OFFSET)
      .limit(limit ?? DEFAULT_LIMIT)
      .orderBy(asc(tournaments.name)),
    db.select({ total: count() }).from(tournaments).where(where),
  ]);

  return { data, total };
};
