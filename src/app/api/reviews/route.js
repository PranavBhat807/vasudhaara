import { NextResponse } from 'next/server';
import sql from '@/lib/db';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get('productId');

    if (productId) {
      const pId = parseInt(productId, 10);
      if (isNaN(pId)) {
        return NextResponse.json({ error: 'Invalid product ID' }, { status: 400 });
      }

      // Fetch reviews
      const reviews = await sql`
        SELECT id, product_id, customer_name, rating, review_text, created_at 
        FROM product_reviews 
        WHERE product_id = ${pId} 
        ORDER BY created_at DESC
      `;

      // Fetch summary (average and count)
      const summary = await sql`
        SELECT ROUND(AVG(rating), 1) as average_rating, COUNT(id) as review_count
        FROM product_reviews
        WHERE product_id = ${pId}
      `;

      const averageRating = summary[0]?.average_rating ? parseFloat(summary[0].average_rating) : null;
      const reviewCount = summary[0]?.review_count ? parseInt(summary[0].review_count, 10) : 0;

      return NextResponse.json({
        reviews,
        averageRating,
        reviewCount
      });
    } else {
      // Fetch summaries for all products
      const summaries = await sql`
        SELECT product_id, ROUND(AVG(rating), 1) as average_rating, COUNT(id) as review_count
        FROM product_reviews
        GROUP BY product_id
      `;

      const averages = {};
      summaries.forEach((row) => {
        averages[row.product_id] = {
          average_rating: parseFloat(row.average_rating),
          review_count: parseInt(row.review_count, 10)
        };
      });

      return NextResponse.json({ averages });
    }
  } catch (error) {
    console.error('Error in GET /api/reviews:', error);
    return NextResponse.json({ error: 'Failed to fetch reviews: ' + error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { productId, customerName, rating, reviewText } = body;

    // Validate inputs
    const pId = parseInt(productId, 10);
    const rat = parseInt(rating, 10);

    if (isNaN(pId)) {
      return NextResponse.json({ error: 'Invalid or missing product ID' }, { status: 400 });
    }
    if (!customerName || typeof customerName !== 'string' || customerName.trim() === '') {
      return NextResponse.json({ error: 'Customer name is required' }, { status: 400 });
    }
    if (isNaN(rat) || rat < 1 || rat > 5) {
      return NextResponse.json({ error: 'Rating must be an integer between 1 and 5' }, { status: 400 });
    }
    if (!reviewText || typeof reviewText !== 'string' || reviewText.trim() === '') {
      return NextResponse.json({ error: 'Review text is required' }, { status: 400 });
    }

    const result = await sql`
      INSERT INTO product_reviews (product_id, customer_name, rating, review_text)
      VALUES (${pId}, ${customerName.trim()}, ${rat}, ${reviewText.trim()})
      RETURNING *
    `;

    return NextResponse.json({
      message: 'Review posted successfully',
      review: result[0]
    }, { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/reviews:', error);
    return NextResponse.json({ error: 'Failed to post review: ' + error.message }, { status: 500 });
  }
}
