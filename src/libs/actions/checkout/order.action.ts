"use server";
import { auth } from "@/libs/auth";
import connectToDatabase from "@/libs/database/dbConnect";
import Order, { ProductOrder } from "@/libs/database/models/order.model";
import { CartItem } from "@/store/features/CartState/CartSlice";
import Stripe from "stripe";

export const checkoutOrder = async (cartItems: CartItem[]) => {
  const session = await auth();
  const email = session?.user?.email as string;

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  try {
    const totalAmount = cartItems.reduce(
      (acc, item) => acc + item.quantity * Number(item.offerPrice),
      0
    );

    const lineItems = cartItems.map((item) => ({
      price_data: {
        currency: "usd",
        unit_amount: Number(item.offerPrice) * 100,
        product_data: {
          name: item.name,
          description: item.description,
          images: [item.image[0]],
          metadata: {
            email,
            productId: item._id,
            name: item.name,
            price: item.offerPrice,
            size: item.selectedSize,
            color: item.color,
            image: item.image[0],
          },
        },
      },
      quantity: item.quantity,
    }));

    // shipping cost: Free if total > $250, else $10
    const shippingAmount = totalAmount > 250 ? 0 : 1000;

    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      mode: "payment",
      shipping_options: [
        {
          shipping_rate_data: {
            display_name: "Shipping",
            fixed_amount: {
              amount: shippingAmount,
              currency: "usd",
            },
            type: "fixed_amount",
          },
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/cancel`,
    });
    return session.url;
  } catch (error) {
    console.log("Error creating Stripe session:", error);
    throw new Error("Failed to create Stripe session");
  }
};

export const createOrder = async (order: ProductOrder) => {
  try {
    await connectToDatabase();

    const newOrder = await Order.create(order);

    return JSON.parse(JSON.stringify(newOrder));
  } catch (error) {
    console.log(error);
  }
};

export const getOrdersByUserId = async () => {
  try {
    await connectToDatabase();

    const session = await auth();
    const email = session?.user?.email as string;

    const orders = await Order.find({ email }).sort({ createdAt: -1 });

    return JSON.parse(JSON.stringify(orders));
  } catch (error) {
    console.log(error);
  }
};

export const getAllOrders = async () => {
  try {
    await connectToDatabase();

    const orders = await Order.find({}).sort({ createdAt: -1 });

    return JSON.parse(JSON.stringify(orders));
  } catch (error) {
    console.log(error);
  }
};
