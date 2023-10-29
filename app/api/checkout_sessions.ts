const stripe = require('stripe')(
  'pk_test_51NoptQIF5Ewa0z1weAgAPPKYRio4rkIbNTYPuRPlXd3OdWsMaceCjCMNETTJSXp9yVsXpx6whtH8W4r0LGAIZ86L00YKiIUNvJ'
);

export default async function handler(req: any, res: any) {
  if (req.method === 'POST') {
    try {
      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
            price: 'price_1NosGsIF5Ewa0z1wLLeozpAc',
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${req.headers.origin}/?success=true`,
        cancel_url: `${req.headers.origin}/?canceled=true`,
      });
      res.redirect(303, session.url);
    } catch (err: any) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
