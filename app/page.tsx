import { initDb } from '@/lib/db';
import TodoContainer from '@/components/TodoContainer';
import { Database, HardDrive } from 'lucide-react';

export default async function Home() {
  // Initialize DB on first load (simple migration check)
  try {
    await initDb();
  } catch (e) {
    console.error('Failed to init DB', e);
  }

  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <div className="flex flex-col items-center mb-12 text-center">
        <div className="bg-indigo-600 p-3 rounded-2xl shadow-lg shadow-indigo-200 mb-4">
          <Database className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 mb-2">
          Turso Migration Tester
        </h1>
        <p className="text-slate-500 max-w-md">
          Manage your items and verify your Turso SQLite database connectivity and schema migrations.
        </p>
      </div>

      <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-50 bg-slate-50/50 flex items-center justify-between">
          <h2 className="font-semibold text-slate-700 flex items-center gap-2">
            <HardDrive className="w-4 h-4" />
            Live Database View
          </h2>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700 border border-green-200">
            Connected
          </span>
        </div>
        <TodoContainer />
      </div>

      <footer className="mt-12 text-center text-slate-400 text-sm">
        <p>Powered by Next.js 14 & Turso (libSQL)</p>
      </footer>
    </main>
  );
}