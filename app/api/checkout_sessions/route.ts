import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Missing STRIPE_SECRET_KEY environment variable');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  if (req.method !== 'POST') {
    return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
  }

  try {
    const body = await req.json();

    if (!body.items || !Array.isArray(body.items)) {
      return NextResponse.json(
        { error: 'Invalid request body' },
        { status: 400 }
      );
    }

    const { userId, items } = body;

    const lineItems = items.map((item: any) => {
      if (!item?.price || !item?.quantity) {
        throw new Error('Invalid item structure');
      }
      return { price: item?.price, quantity: item?.quantity };
    });

    // Unique id for the Order
    const orderId = Math.floor(
      1000000000 + Math.random() * 9000000000
    ).toString();

    // Create Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      shipping_options: [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: {
              amount: 0,
              currency: 'usd',
            },
            display_name: 'Free shipping',
            delivery_estimate: {
              minimum: {
                unit: 'business_day',
                value: 5,
              },
              maximum: {
                unit: 'business_day',
                value: 7,
              },
            },
          },
        },
      ],
      success_url: `${req.headers.get('origin')}/success?orderId=${orderId}`,
      cancel_url: `${req.headers.get('origin')}/cart`,
      metadata: { userId, orderId },
    });

    // https://retro-store-app-alexb017s-projects.vercel.app/success
    // https://retro-store-app-alexb017s-projects.vercel.app/cart

    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    // console.error('Error:', error);
    return NextResponse.json(
      { error: 'Error creating checkout session' },
      { status: 500 }
    );
  }
}
