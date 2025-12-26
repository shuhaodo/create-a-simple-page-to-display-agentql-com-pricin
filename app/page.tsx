import TaskList from '@/components/TaskList';
import { ClipboardList } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen p-4 md:p-24 max-w-4xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-indigo-600 rounded-xl shadow-lg shadow-indigo-200">
          <ClipboardList className="w-8 h-8 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Turso Tasks</h1>
          <p className="text-slate-500">Manage your daily objectives with SQLite at the edge.</p>
        </div>
      </div>

      <TaskList />
    </main>
  );
}