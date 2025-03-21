export interface ProductData {
  _id: string;
  name: string;
  price: number;
  original_price?: number;
  discount?: string;
  rating: number;
  reviews: number;
  imageUrl: string;
}

export interface ProductCardProps {
  data: ProductData;
}
