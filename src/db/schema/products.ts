import { real, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { categories } from "./categories";
import { InferSelectModel } from "drizzle-orm";

export const products = sqliteTable("products", {
  id: text('id').primaryKey().notNull(),
  name: text('name').notNull().unique(),
  categoryId: text('category_id')
    .notNull()
    .references(() => categories.id),
  price: real('price').notNull(),
  imageUrl: text('image_url').notNull(),
  description: text('description').notNull(),
});

export type Product = InferSelectModel<typeof products>;
