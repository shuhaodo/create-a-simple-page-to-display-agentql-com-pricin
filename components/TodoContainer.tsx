"use client";

import { useState, useEffect } from 'react';
import AddTodo from './AddTodo';
import TodoItem from './TodoItem';
import { Loader2 } from 'lucide-react';

export type Item = {
  id: number;
  content: string;
  completed: number;
  created_at: string;
};

export default function TodoContainer() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchItems = async () => {
    try {
      const res = await fetch('/api/items');
      const data = await res.json();
      setItems(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const addItem = async (content: string) => {
    const res = await fetch('/api/items', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content }),
    });
    if (res.ok) fetchItems();
  };

  const toggleItem = async (id: number, completed: boolean) => {
    // Optimistic update
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, completed: completed ? 1 : 0 } : item
    ));

    await fetch(`/api/items/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed }),
    });
  };

  const deleteItem = async (id: number) => {
    setItems(prev => prev.filter(item => item.id !== id));
    await fetch(`/api/items/${id}`, {
      method: 'DELETE',
    });
  };

  return (
    <div className="p-6">
      <AddTodo onAdd={addItem} />
      
      <div className="mt-8 space-y-3">
        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-indigo-400" />
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-12 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
            <p className="text-slate-400">No items found in database.</p>
          </div>
        ) : (
          items.map((item) => (
            <TodoItem 
              key={item.id} 
              item={item} 
              onToggle={toggleItem} 
              onDelete={deleteItem} 
            />
          ))
        )}
      </div>
    </div>
  );
}