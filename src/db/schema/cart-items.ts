import { integer, real, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { products } from "./products";
import { carts } from "./carts";

export const cartItems = sqliteTable("cartItems", {
  id: text('id').primaryKey().notNull(),
  cartId: text('cart_id')
    .notNull()
    .references(() => carts.id),
  productId: text('product_id')
    .notNull()
    .references(() => products.id),
  quantity: integer('quantity').notNull(),
  price: real('price').notNull(),
});
