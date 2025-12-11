import { config } from '@todo-bench/config';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

// Disable prefetch as it is not supported for "Transaction" pool mode
export const client = postgres(config.db.url, { prepare: false });
export const db = drizzle(client, { schema });
export * from 'drizzle-orm';
export * from './schema';
