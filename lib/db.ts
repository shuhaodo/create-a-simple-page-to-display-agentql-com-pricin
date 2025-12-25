import { createClient } from '@libsql/client';

export const db = createClient({
  url: process.env.TURSO_DATABASE_URL || 'libsql://your-db-name.turso.io',
  authToken: process.env.TURSO_AUTH_TOKEN,
});

export async function initDb() {
  await db.execute(`
    CREATE TABLE IF NOT EXISTS pricing_plans (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      price TEXT NOT NULL,
      period TEXT NOT NULL,
      description TEXT,
      features TEXT NOT NULL,
      button_text TEXT DEFAULT 'Get Started',
      is_popular INTEGER DEFAULT 0
    );
  `);

  const { rows } = await db.execute('SELECT COUNT(*) as count FROM pricing_plans');
  if (Number(rows[0].count) === 0) {
    const plans = [
      {
        name: 'Starter',
        price: '$0',
        period: 'forever',
        description: 'Perfect for hobbyists and small projects.',
        features: JSON.stringify(['100 queries per month', 'Standard performance', 'Community support', 'Basic API access']),
        button_text: 'Start for Free',
        is_popular: 0
      },
      {
        name: 'Pro',
        price: '$49',
        period: 'per month',
        description: 'Advanced features for scaling applications.',
        features: JSON.stringify(['5,000 queries per month', 'High-priority execution', 'Priority email support', 'Advanced selectors', 'Custom headers support']),
        button_text: 'Go Pro',
        is_popular: 1
      },
      {
        name: 'Enterprise',
        price: 'Custom',
        period: 'contact us',
        description: 'Tailored solutions for large-scale operations.',
        features: JSON.stringify(['Unlimited queries', 'Dedicated infrastructure', '24/7 Premium support', 'Custom SLA', 'On-premise options']),
        button_text: 'Contact Sales',
        is_popular: 0
      }
    ];

    for (const plan of plans) {
      await db.execute({
        sql: 'INSERT INTO pricing_plans (name, price, period, description, features, button_text, is_popular) VALUES (?, ?, ?, ?, ?, ?, ?)',
        args: [plan.name, plan.price, plan.period, plan.description, plan.features, plan.button_text, plan.is_popular]
      });
    }
  }
}