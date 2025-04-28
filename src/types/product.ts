import { IProduct } from "@/libs/database/models/product.model";

export type CreateProductParams = {
  product: {
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
  };
};

export type ProductParams = {
  product: IProduct;
};
