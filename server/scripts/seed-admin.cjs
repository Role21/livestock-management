const db = require('../lib/db.cjs'); // <- adjust path to where your db.cjs actually is
const bcrypt = require('bcrypt');

async function seedAdmin() {
  const existing = await db('admins').where({ email: 'admin@example.com' }).first();
  if (existing) {
    console.log('Admin already exists.');
    return;
  }

  const hashedPassword = await bcrypt.hash('admin123', 10);

  await db('admins').insert({
    name: 'Super Admin',
    email: 'admin@example.com',
    password: hashedPassword,
    created_at: new Date(),
    updated_at: new Date(),
  });

  console.log('Admin seeded successfully.');
  process.exit();
}

seedAdmin().catch((err) => {
  console.error('Error seeding admin:', err);
  process.exit(1);
});
