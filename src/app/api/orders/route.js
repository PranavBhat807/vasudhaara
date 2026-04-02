import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET() {
  try {
    const result = await pool.query('SELECT * FROM orders ORDER BY created_at DESC');
    return NextResponse.json({ orders: result.rows });
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { formData, cartItems, total } = body;
    const { name, email, phone, address, city, state, zip } = formData;

    const result = await pool.query(
      `INSERT INTO orders 
      (customer_name, customer_email, customer_phone, shipping_address, city, state, zip_code, cart_items, total_amount) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
      [name, email, phone, address, city, state, zip, JSON.stringify(cartItems), total]
    );

    return NextResponse.json({ message: 'Order created', order: result.rows[0] }, { status: 201 });
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
  }
}
