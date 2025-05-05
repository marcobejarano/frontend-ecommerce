import { integer, real, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { users } from "./users";

export const carts = sqliteTable("carts", {
  id: text('id').primaryKey().notNull(),
  userId: text('user_id').references(() => users.id),
  totalQuantity: integer('total_quantity').notNull(),
  totalPrice: real('total_price').notNull(),
  createdAt: text('created_at').notNull().default(Date.now().toString()),
  updatedAt: text('updated_at').notNull().default(Date.now().toString()),
});
