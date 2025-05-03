import { createOrder } from "@/libs/actions/checkout/order.action";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: Request) {
  const body = await request.text();

  const sig = (await request.headers.get("stripe-signature")) as string;

  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

  let event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err) {
    return NextResponse.json({ message: "Webhook Error", error: err });
  }

  // get the id and type
  const eventType = event.type;

  // create
  if (eventType === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    console.log(session);

    try {
      // fetch line items associated with the session
      const lineItems = await stripe.checkout.sessions.listLineItems(
        session.id,
        { expand: ["data.price.product"] }
      );
      console.log("Line Item:", lineItems);
      // map line items to orders
      const orders = lineItems.data.map((item) => {
        // access meta data directly from the item
        const product = item.price?.product;
        const metadata =
          product && typeof product !== "string" && "metadata" in product
            ? product.metadata
            : {};
        console.log("Metadata during session creation:", metadata);

        return {
          stripeId: session.id,
          userId: metadata.userId || "",
          createdAt: new Date(),
          id: metadata.id || "",
          name: metadata.name || "",
          price: (item.amount_subtotal || 0) / 100,
          size: metadata.size || "",
          colors: metadata.color || "",
          image: metadata.image || "",
          quantity: item.quantity || 1,
        };
      });

      // save each order in the database
      const savedOrders = await Promise.all(
        orders.map((order) => createOrder(order))
      );

      console.log("Orders created successfully", savedOrders);
      return NextResponse.json({
        message: "Orders created",
        orders: savedOrders,
      });
    } catch (err) {
      console.error("Error processing checkout session:", err);
      return NextResponse.json(
        { message: "Error processing checkout session", error: err },
        { status: 500 }
      );
    }
  }

  return new Response("Ok", { status: 200 });
}
