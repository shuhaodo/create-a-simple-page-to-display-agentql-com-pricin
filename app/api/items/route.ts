import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const result = await db.execute('SELECT * FROM items ORDER BY created_at DESC');
    return NextResponse.json(result.rows);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch items' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { content } = await request.json();
    if (!content) return NextResponse.json({ error: 'Content is required' }, { status: 400 });

    const result = await db.execute({
      sql: 'INSERT INTO items (content) VALUES (?)',
      args: [content],
    });
    
    return NextResponse.json({ id: Number(result.lastInsertRowid), content, completed: 0 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create item' }, { status: 500 });
  }
}