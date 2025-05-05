DROP INDEX "categories_name_unique";--> statement-breakpoint
DROP INDEX "users_email_unique";--> statement-breakpoint
DROP INDEX "products_name_unique";--> statement-breakpoint
ALTER TABLE `carts` ALTER COLUMN "created_at" TO "created_at" text NOT NULL DEFAULT '1745462641849';--> statement-breakpoint
CREATE UNIQUE INDEX `categories_name_unique` ON `categories` (`name`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);--> statement-breakpoint
CREATE UNIQUE INDEX `products_name_unique` ON `products` (`name`);--> statement-breakpoint
ALTER TABLE `carts` ALTER COLUMN "updated_at" TO "updated_at" text NOT NULL DEFAULT '1745462641849';--> statement-breakpoint
ALTER TABLE `users` ALTER COLUMN "created_at" TO "created_at" text NOT NULL DEFAULT '1745462641848';--> statement-breakpoint
ALTER TABLE `orders` ALTER COLUMN "created_at" TO "created_at" text NOT NULL DEFAULT '1745462641897';--> statement-breakpoint
ALTER TABLE `orders` ALTER COLUMN "updated_at" TO "updated_at" text NOT NULL DEFAULT '1745462641897';--> statement-breakpoint
ALTER TABLE `payments` ALTER COLUMN "payer_id_type" TO "payer_id_type" text;--> statement-breakpoint
ALTER TABLE `payments` ALTER COLUMN "payer_id_number" TO "payer_id_number" text;--> statement-breakpoint
ALTER TABLE `payments` ALTER COLUMN "payer_email" TO "payer_email" text;--> statement-breakpoint
ALTER TABLE `payments` ALTER COLUMN "date_created" TO "date_created" text;