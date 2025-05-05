import { Product } from "@/db/schema";

export type CartItem = {
  id: string;
  product: Product;
  quantity: number;
  price: number;
};

export type Cart = {
  id: string;
  userId: string | null;
  items: CartItem[];
  totalPrice: number;
  totalItems: number;
  createdAt: string;
  updatedAt: string;
}
