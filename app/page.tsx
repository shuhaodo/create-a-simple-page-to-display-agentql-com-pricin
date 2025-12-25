import { initDb, db } from '@/lib/db';
import { Check, Zap, Shield, Globe } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const dynamic = 'force-dynamic';

export default async function PricingPage() {
  await initDb();
  const { rows } = await db.execute('SELECT * FROM pricing_plans ORDER BY id ASC');
  
  const plans = rows.map(row => ({
    ...row,
    features: JSON.parse(row.features as string)
  }));

  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <nav className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <Zap className="text-white w-5 h-5 fill-current" />
          </div>
          <span className="text-xl font-bold tracking-tight">AgentQL</span>
        </div>
        <div className="hidden md:flex gap-8 text-sm font-medium text-slate-600">
          <a href="#" className="hover:text-indigo-600 transition-colors">Product</a>
          <a href="#" className="hover:text-indigo-600 transition-colors">Solutions</a>
          <a href="#" className="text-indigo-600">Pricing</a>
          <a href="#" className="hover:text-indigo-600 transition-colors">Docs</a>
        </div>
        <button className="px-5 py-2 bg-slate-900 text-white rounded-full text-sm font-semibold hover:bg-slate-800 transition-all">
          Sign In
        </button>
      </nav>

      {/* Hero Section */}
      <section className="max-w-4xl mx-auto px-6 pt-20 pb-16 text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 mb-6">
          Simple pricing for <span className="text-indigo-600">modern data</span>
        </h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
          Scale your web automation with AI-powered selectors that never break. 
          Choose the plan that fits your needs.
        </p>
      </section>

      {/* Pricing Grid */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan: any) => (
            <div 
              key={plan.id} 
              className={cn(
                "relative flex flex-col p-8 bg-white rounded-3xl border border-slate-200 transition-all hover:shadow-xl",
                plan.is_popular && "border-indigo-600 ring-4 ring-indigo-50 shadow-lg"
              )}
            >
              {plan.is_popular ? (
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-indigo-600 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                  Most Popular
                </span>
              ) : null}

              <div className="mb-8">
                <h3 className="text-xl font-bold text-slate-900 mb-2">{plan.name}</h3>
                <p className="text-slate-500 text-sm">{plan.description}</p>
              </div>

              <div className="mb-8">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-slate-900">{plan.price}</span>
                  <span className="text-slate-500 font-medium">/{plan.period}</span>
                </div>
              </div>

              <ul className="space-y-4 mb-10 flex-grow">
                {plan.features.map((feature: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-slate-600">
                    <div className="mt-0.5 w-5 h-5 rounded-full bg-indigo-50 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-indigo-600" strokeWidth={3} />
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>

              <button className={cn(
                "w-full py-3 px-6 rounded-xl font-bold transition-all",
                plan.is_popular 
                  ? "bg-indigo-600 text-white hover:bg-indigo-700 shadow-md shadow-indigo-200"
                  : "bg-slate-100 text-slate-900 hover:bg-slate-200"
              )}>
                {plan.button_text}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Trust Section */}
      <section className="bg-slate-900 text-white py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="flex flex-col items-center">
              <Shield className="w-10 h-10 text-indigo-400 mb-4" />
              <h4 className="text-lg font-bold mb-2">Secure by Design</h4>
              <p className="text-slate-400 text-sm">Enterprise-grade encryption and privacy controls for all your data extraction needs.</p>
            </div>
            <div className="flex flex-col items-center">
              <Globe className="w-10 h-10 text-indigo-400 mb-4" />
              <h4 className="text-lg font-bold mb-2">Global Infrastructure</h4>
              <p className="text-slate-400 text-sm">Execute queries from any region with our distributed proxy network.</p>
            </div>
            <div className="flex flex-col items-center">
              <Zap className="w-10 h-10 text-indigo-400 mb-4" />
              <h4 className="text-lg font-bold mb-2">AI-Powered</h4>
              <p className="text-slate-400 text-sm">Our LLM-based selectors adapt to website changes automatically.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-6 py-12 border-t border-slate-200">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 opacity-50">
            <Zap className="w-5 h-5" />
            <span className="font-bold">AgentQL</span>
          </div>
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} AgentQL Inc. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-slate-500">
            <a href="#" className="hover:text-indigo-600">Privacy</a>
            <a href="#" className="hover:text-indigo-600">Terms</a>
            <a href="#" className="hover:text-indigo-600">Twitter</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
