import { Schema, models, model } from "mongoose";

export interface ProductOrder {
  stripeId: string;
  userId: string;
  createdAt: Date;
  id: string;
  name: string;
  price: number;
  size?: string;
  colors?: string;
  image: string;
  quantity: number;
}

const OrderSchema = new Schema({
  stripeId: { type: String, required: true },
  userId: { type: String, required: true },
  createdAt: { type: Date, required: true },
  id: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  size: { type: String },
  colors: { type: String },
  image: { type: String, required: true },
  quantity: { type: Number, required: true },
});

const Order = models?.Order || model("Order", OrderSchema);

export default Order;
