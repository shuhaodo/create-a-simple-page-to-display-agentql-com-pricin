import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { completed } = await request.json();
    await db.execute({
      sql: 'UPDATE items SET completed = ? WHERE id = ?',
      args: [completed ? 1 : 0, params.id],
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update item' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await db.execute({
      sql: 'DELETE FROM items WHERE id = ?',
      args: [params.id],
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete item' }, { status: 500 });
  }
}