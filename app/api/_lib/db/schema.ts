import { pgTable, uuid, text } from 'drizzle-orm/pg-core';

export const tournaments = pgTable('tournaments', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
});

export type TournamentSelect = typeof tournaments.$inferSelect;
export type TournamentInsert = typeof tournaments.$inferInsert;
