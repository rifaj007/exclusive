import { Schema, model, models } from "mongoose";

export interface IProduct {
  _id: string;
  name: string;
  description: string;
  offerPrice: number;
  originalPrice: number;
  discount?: number;
  rating: number;
  reviews: number;
  image: string[];
  category: string;
  type?: string;
  size?: string[];
  colors?: string[];
  availability: "In Stock" | "Out of Stock";
  flashSale?: boolean;
  bestSelling?: boolean;
  explore?: boolean;
  isNew?: boolean;
}

const productSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    offerPrice: { type: Number, required: true, min: 0 },
    originalPrice: { type: Number, required: true, min: 0 },
    discount: { type: Number, min: 0 },
    rating: { type: Number, required: true, min: 1, max: 5 },
    reviews: { type: Number, required: true, min: 0 },
    image: {
      type: [String],
      required: true,
    },
    category: { type: String, required: true },
    type: { type: String },
    size: { type: [String] },
    colors: { type: [String] },
    availability: {
      type: String,
      enum: ["In Stock", "Out of Stock"],
      required: true,
    },
    flashSale: { type: Boolean, default: false },
    bestSelling: { type: Boolean, default: false },
    explore: { type: Boolean, default: false },
    isNew: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Product = models?.Product || model<IProduct>("Product", productSchema);

export default Product;
