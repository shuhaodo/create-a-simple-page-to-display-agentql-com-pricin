"use client";

import { useState } from 'react';
import { Plus } from 'lucide-react';

export default function AddTodo({ onAdd }: { onAdd: (content: string) => void }) {
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    onAdd(content);
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Enter a new item to store..."
        className="flex-1 px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
      />
      <button
        type="submit"
        className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-medium transition-colors flex items-center gap-2 shadow-md shadow-indigo-100"
      >
        <Plus className="w-5 h-5" />
        Add
      </button>
    </form>
  );
}