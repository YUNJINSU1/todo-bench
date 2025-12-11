import dotenv from 'dotenv';
import path from 'path';

// Load .env from root
dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

export const config = {
  db: {
    url: process.env.DATABASE_URL || 'postgres://user:password@localhost:5432/todo_bench',
  },
  port: {
    elysia: 3000,
    express: 3001,
    nest: 3002,
  },
};
