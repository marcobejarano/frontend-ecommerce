import { integer, real, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { products } from "./products";
import { orders } from "./orders";
import { InferSelectModel } from "drizzle-orm";

export const orderItems = sqliteTable("orderItems", {
  id: text('id').primaryKey().notNull(),
  orderId: text('order_id')
    .notNull()
    .references(() => orders.id),
  productId: text('product_id')
    .notNull()
    .references(() => products.id),
  quantity: integer('quantity').notNull(),
  price: real('price').notNull(),
});

export type OrderItemEntity = InferSelectModel<typeof orderItems>;
