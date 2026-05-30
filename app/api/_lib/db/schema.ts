import { pgTable, uuid, text, varchar } from 'drizzle-orm/pg-core';

export const tournaments = pgTable('tournaments', {
  id: uuid('id').primaryKey().defaultRandom(),
  cbtmId: varchar('cbtm_id', { length: 9 }).unique().notNull(),
  name: text('name').notNull(),
});

export type TournamentSelect = typeof tournaments.$inferSelect;
export type TournamentInsert = typeof tournaments.$inferInsert;
