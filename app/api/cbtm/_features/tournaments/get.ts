import { db } from '@/app/api/_lib/db';
import { tournaments } from '@/app/api/_lib/db/schema';
import { max } from 'drizzle-orm';

export const getHighestId = async () => {
  const response = await db
    .select({
      cbtmId: max(tournaments.cbtmId),
    })
    .from(tournaments)
    .limit(1);

  return response[0].cbtmId;
};
