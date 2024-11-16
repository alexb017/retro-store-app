import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getCartItems, deleteCartItems, createOrder } from '@/lib/helpers';
import { type CartItem, type OrderItems } from '@/lib/types';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

// Stripe requires the raw body to verify webhook signatures
export const config = {
  api: {
    bodyParser: false,
  },
};

// Helper to handle the raw body of the incoming webhook request from Stripe
async function buffer(readable: any) {
  const chunks = [];
  for await (const chunk of readable) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

async function fullFillCheckout(sessionId: string) {
  // Fetch the Checkout Session to display the JSON result on the server
  const session = await stripe.checkout.sessions.retrieve(sessionId);
  const userId = session.metadata?.userId;
  const orderId = session.metadata?.orderId;

  if (!userId) {
    throw new Error('User ID not found');
  }

  // Get the user's cart
  const cart = (await getCartItems(userId)) as CartItem[];

  // Create an order
  await createOrder(userId, {
    items: cart,
    amount_total: session.amount_total,
    name: session.customer_details?.name,
    status: session.payment_status,
    created_at: session.created,
    order_id: orderId,
  } as OrderItems);

  // Delete the user's cart items
  await deleteCartItems(userId);

  // Fulfill the purchase...
  return session;
}

export async function POST(req: NextRequest) {
  const buf = await buffer(req.body);
  const sig = req.headers.get('stripe-signature')!;
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(buf, sig, endpointSecret);
    // console.log('Event:', event);
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { error: `Webhook Error: ${err.message}` },
      { status: 400 }
    );
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object as Stripe.Checkout.Session;
      // console.log('Checkout session completed!', session);
      // Fulfill the purchase...
      await fullFillCheckout(session.id);
      break;
    case 'checkout.session.async_payment_succeeded':
      const asyncSession = event.data.object as Stripe.Checkout.Session;
      // console.log('Async payment succeeded!', asyncSession);
      // Fulfill the purchase...
      await fullFillCheckout(asyncSession.id);
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
