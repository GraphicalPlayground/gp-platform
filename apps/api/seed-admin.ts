import { db } from './src/db/connection.ts';
import { users } from './src/db/schema/index.ts';
import { eq } from 'drizzle-orm';

async function seed() {
  console.log('🌱 Seeding admin user...');

  const email = 'admin@graphical-playground.com';
  const pseudo = 'admin';
  const password = 'admin_password';

  const existing = await db.select().from(users).where(eq(users.email, email)).limit(1);

  if (existing.length > 0) {
    console.log('Updating admin password...');
    const passwordHash = await Bun.password.hash(password);
    await db.update(users).set({ passwordHash }).where(eq(users.email, email));
    console.log('✅ Admin password updated.');
    process.exit(0);
  }

  const passwordHash = await Bun.password.hash(password);

  await db.insert(users).values({
    email,
    pseudo,
    passwordHash,
    role: 'admin'
  });

  console.log('✅ Admin user created successfully.');
  process.exit(0);
}

seed().catch((err) => {
  console.error('❌ Seeding failed:', err);
  process.exit(1);
});
