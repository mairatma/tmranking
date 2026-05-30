import { db } from '@/app/api/_lib/db';
import { tournaments } from '@/app/api/_lib/db/schema';

export const addTournament = async (cbtmId: string, name: string) => {
  return db
    .insert(tournaments)
    .values({ cbtmId, name })
    .onConflictDoNothing({ target: tournaments.cbtmId });
};
