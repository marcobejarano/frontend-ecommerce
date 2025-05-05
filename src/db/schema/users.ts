import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: text('id').primaryKey().notNull(),
  email: text('email').notNull().unique(),
  hashedPassword: text('hashed_password').notNull(),
  role: text('role').notNull().default('customer'),
  createdAt: text('created_at').notNull().default(Date.now().toString()),
});
