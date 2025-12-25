"use client";

import { Item } from './TodoContainer';
import { Trash2, CheckCircle2, Circle } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function TodoItem({
  item,
  onToggle,
  onDelete,
}: {
  item: Item;
  onToggle: (id: number, completed: boolean) => void;
  onDelete: (id: number) => void;
}) {
  const isCompleted = item.completed === 1;

  return (
    <div className="group flex items-center justify-between p-4 bg-white border border-slate-100 rounded-2xl hover:border-indigo-100 hover:shadow-sm transition-all">
      <div className="flex items-center gap-4">
        <button 
          onClick={() => onToggle(item.id, !isCompleted)}
          className={cn(
            "transition-colors",
            isCompleted ? "text-indigo-500" : "text-slate-300 hover:text-slate-400"
          )}
        >
          {isCompleted ? <CheckCircle2 className="w-6 h-6" /> : <Circle className="w-6 h-6" />}
        </button>
        <span className={cn(
          "text-slate-700 font-medium transition-all",
          isCompleted && "text-slate-400 line-through"
        )}>
          {item.content}
        </span>
      </div>
      
      <button
        onClick={() => onDelete(item.id)}
        className="opacity-0 group-hover:opacity-100 p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
      >
        <Trash2 className="w-5 h-5" />
      </button>
    </div>
  );
}