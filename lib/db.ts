import { createClient } from '@libsql/client';

const url = process.env.TURSO_DATABASE_URL?.trim();
const authToken = process.env.TURSO_AUTH_TOKEN?.trim();

if (!url) {
  throw new Error('TURSO_DATABASE_URL is not defined');
}

export const db = createClient({
  url: url,
  authToken: authToken,
});

// Helper to initialize table if it doesn't exist
export async function initDb() {
  try {
    await db.execute(`
      CREATE TABLE IF NOT EXISTS items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT,
        completed INTEGER DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);
  } catch (e) {
    console.error('Failed to initialize database:', e);
  }
}