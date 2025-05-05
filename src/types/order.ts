export interface Order {
  _id: string;
  createdAt: string;
  productId: string;
  name: string;
  price: number;
  size?: string;
  color?: string;
  image: string;
  quantity: number;
  email?: string;
}
