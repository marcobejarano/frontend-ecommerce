import { real, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { users } from "./users";
import { InferSelectModel } from "drizzle-orm";

export const orders = sqliteTable("orders", {
  id: text('id').primaryKey().notNull(),
  userId: text('user_id').references(() => users.id),
  totalPrice: real('total_price').notNull(),
  status: text("status").notNull().default("pending"),
  createdAt: text('created_at').notNull().default(Date.now().toString()),
  updatedAt: text('updated_at').notNull().default(Date.now().toString()),
});

export type OrderEntity = InferSelectModel<typeof orders>;
