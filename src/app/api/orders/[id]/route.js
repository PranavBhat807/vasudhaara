import { NextResponse } from 'next/server';
import sql from '@/lib/db';

export async function PATCH(request, context) {
  try {
    const { id } = await context.params;
    const body = await request.json();
    const { status } = body;

    const result = await sql`
      UPDATE orders SET status = ${status} WHERE id = ${id} RETURNING *`;

    if (result.length === 0) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Order status updated', order: result[0] });
  } catch (error) {
    console.error('Error updating order:', error);
    return NextResponse.json({ error: 'Failed to update order: ' + error.message }, { status: 500 });
  }
}

export async function DELETE(request, context) {
  try {
    const { id } = await context.params;

    const result = await sql`
      DELETE FROM orders WHERE id = ${id} RETURNING *`;

    if (result.length === 0) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Order deleted successfully' });
  } catch (error) {
    console.error('Error deleting order:', error);
    return NextResponse.json({ error: 'Failed to delete order: ' + error.message }, { status: 500 });
  }
}
