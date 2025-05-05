import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const categories = sqliteTable("categories", {
  id: text('id').primaryKey().notNull(),
  name: text('name').notNull().unique(),
});
