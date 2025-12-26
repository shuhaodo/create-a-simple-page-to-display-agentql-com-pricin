"use client";

import { useState, useEffect } from 'react';
import { Plus, Trash2, CheckCircle2, Circle, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Item {
  id: number;
  title: string;
  description: string;
  completed: number;
}

export default function TaskList() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [newTitle, setNewTitle] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await fetch('/api/items');
      const data = await res.json();
      setItems(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const addItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    setSubmitting(true);
    try {
      const res = await fetch('/api/items', {
        method: 'POST',
        body: JSON.stringify({ title: newTitle }),
        headers: { 'Content-Type': 'application/json' },
      });
      if (res.ok) {
        setNewTitle('');
        fetchItems();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const toggleComplete = async (id: number, currentStatus: number) => {
    try {
      await fetch(`/api/items/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ completed: !currentStatus }),
        headers: { 'Content-Type': 'application/json' },
      });
      fetchItems();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteItem = async (id: number) => {
    try {
      await fetch(`/api/items/${id}`, {
        method: 'DELETE',
      });
      fetchItems();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={addItem} className="flex gap-2">
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="What needs to be done?"
          className="flex-1 px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all bg-white shadow-sm"
        />
        <button
          disabled={submitting}
          className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 disabled:opacity-50 transition-all flex items-center gap-2 shadow-lg shadow-indigo-100"
        >
          {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Plus className="w-5 h-5" />}
          Add
        </button>
      </form>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 flex justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
          </div>
        ) : items.length === 0 ? (
          <div className="p-12 text-center text-slate-500">
            No tasks yet. Start by adding one above!
          </div>
        ) : (
          <ul className="divide-y divide-slate-100">
            {items.map((item) => (
              <li key={item.id} className="p-4 hover:bg-slate-50 transition-colors flex items-center justify-between group">
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => toggleComplete(item.id, item.completed)}
                    className="text-slate-400 hover:text-indigo-600 transition-colors"
                  >
                    {item.completed ? (
                      <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                    ) : (
                      <Circle className="w-6 h-6" />
                    )}
                  </button>
                  <span className={cn(
                    "text-lg transition-all",
                    item.completed ? "text-slate-400 line-through" : "text-slate-700"
                  )}>
                    {item.title}
                  </span>
                </div>
                <button
                  onClick={() => deleteItem(item.id)}
                  className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}