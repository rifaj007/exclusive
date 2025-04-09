export interface ProductData {
  _id: string;
  name: string;
  description: string;
  price: number;
  original_price?: number;
  discount?: string;
  rating: number;
  reviews: number;
  imageUrl: string;
  type: string;
  category: string;
}

export interface ProductCardProps {
  data: ProductData;
}
