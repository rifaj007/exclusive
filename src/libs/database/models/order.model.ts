import { Schema, models, model } from "mongoose";

export interface ProductOrder {
  stripeId: string;
  userId: string;
  createdAt: Date;
  productId: string;
  name: string;
  price: number;
  size?: string;
  color?: string;
  image: string;
  quantity: number;
}

const OrderSchema = new Schema({
  stripeId: { type: String, required: true },
  userId: { type: String, required: true },
  createdAt: { type: Date, required: true },
  productId: { type: String, },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  size: { type: String },
  color: { type: String },
  image: { type: String, required: true },
  quantity: { type: Number, required: true },
});

const Order = models?.Order || model("Order", OrderSchema);

export default Order;
