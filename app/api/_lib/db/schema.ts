import { sql } from 'drizzle-orm';
import { index, pgTable, uuid, text, integer } from 'drizzle-orm/pg-core';

export const tournaments = pgTable(
  'tournaments',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    cbtmId: integer('cbtm_id').unique().notNull(),
    name: text('name').notNull(),
  },
  (table) => [
    index('tournaments_name_trgm_idx').using(
      'gin',
      sql`${table.name} gin_trgm_ops`,
    ),
  ],
);

export type TournamentSelect = typeof tournaments.$inferSelect;
export type TournamentInsert = typeof tournaments.$inferInsert;
