import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './app/api/_lib/db/schema.ts',
  out: './drizzle/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
    ssl: 'require',
  },
});
