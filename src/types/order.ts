import { Product } from "@/db/schema";

export type OrderItem = {
  id: string;
  product: Product;
  quantity: number;
  price: number;
};

export type Order = {
  id: string;
  userId: string;
  items: OrderItem[];
  totalPrice: number;
  status: 'pending' | 'paid' | 'shipped' | 'delivered';
  createdAt: string;
  updatedAt: string;
};
