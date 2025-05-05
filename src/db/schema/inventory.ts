import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { products } from "./products";

export const inventory = sqliteTable("inventory", {
  id: text('id').primaryKey().notNull(),
  productId: text('product_id').notNull().references(() => products.id),
  quantity_available: integer('quantity_available').notNull().default(0),
  quantity_reserved: integer('quantity_reserved').notNull().default(0),
  restock_date: text('restock_date').notNull(),
});
