import { integer, real, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { InferSelectModel } from "drizzle-orm";
import { orders } from "./orders";

export const payments = sqliteTable("payments", {
  id: text('id').primaryKey().notNull(),
  order_id: text('order_id').references(() => orders.id),
  status: text("status").notNull(),
  transaction_amount: real('transaction_amount').notNull(),

  payer_id_type: text("payer_id_type"),
  payer_id_number: text("payer_id_number"),
  payer_email: text("payer_email"),

  payment_method_id: text('payment_method_type').notNull(),
  payment_type_id: text("payment_method_id").notNull(),
  installments: integer('installments').notNull(),
  last_four_digits: text('last_four_digits').notNull(),

  date_approved: text('date_created'),
});

export type PaymentEntity = InferSelectModel<typeof payments>;
