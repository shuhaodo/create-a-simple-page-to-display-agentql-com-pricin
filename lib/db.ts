import { createClient } from '@libsql/client';

export const db = createClient({
  url: process.env.TURSO_DATABASE_URL || '',
  authToken: process.env.TURSO_AUTH_TOKEN || '',
});

export async function initDb() {
  await db.execute(`
    CREATE TABLE IF NOT EXISTS items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      content TEXT NOT NULL,
      completed INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);
}