import { NextResponse } from 'next/server';
import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Missing STRIPE_SECRET_KEY environment variable');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
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

    const { items } = body;

    const lineItems = items.map((item: any) => {
      if (!item?.price || !item?.quantity) {
        throw new Error('Invalid item structure');
      }
      return { price: item?.price, quantity: item?.quantity };
    });

    // Create Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `https://retro-store-app-alexb017s-projects.vercel.app/success`,
      cancel_url: `https://retro-store-app-alexb017s-projects.vercel.app/cart`,
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
