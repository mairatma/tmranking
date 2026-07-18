import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

import * as schema from './schema';

const DB_URL = process.env.DATABASE_URL;

if (!DB_URL) {
  throw new Error(
    'Missing database URL, make sure to set the DATABASE_URL env var.',
  );
}

const MAX_CONNECTIONS = 1;

const client = postgres(DB_URL, {
  ssl: 'require',
  max: MAX_CONNECTIONS,
  idle_timeout: 20,
  connect_timeout: 10,
  // prepare: false,
});

export const db = drizzle(client, { schema });
