import { pgTable, uuid, text, integer } from 'drizzle-orm/pg-core';

export const tournaments = pgTable('tournaments', {
  id: uuid('id').primaryKey().defaultRandom(),
  cbtmId: integer('cbtm_id').unique().notNull(),
  name: text('name').notNull(),
});

export type TournamentSelect = typeof tournaments.$inferSelect;
export type TournamentInsert = typeof tournaments.$inferInsert;
