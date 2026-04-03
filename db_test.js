import sql from './src/lib/db.js';

async function test() {
  try {
    const orders = await sql`SELECT * FROM orders ORDER BY created_at DESC`;
    console.log(orders);
  } catch (err) {
    console.error("ERROR:");
    console.error(err);
  }
}

test();
