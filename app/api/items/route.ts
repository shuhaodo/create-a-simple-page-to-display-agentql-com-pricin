import { db, initDb } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await initDb();
    const result = await db.execute('SELECT * FROM items ORDER BY created_at DESC');
    return NextResponse.json(result.rows);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch items' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { title, description } = await request.json();
    if (!title) return NextResponse.json({ error: 'Title is required' }, { status: 400 });

    const result = await db.execute({
      sql: 'INSERT INTO items (title, description) VALUES (?, ?)',
      args: [title, description || '']
    });
    
    return NextResponse.json({ id: result.lastInsertRowid, title, description }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create item' }, { status: 500 });
  }
}