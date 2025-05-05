CREATE TABLE `inventory` (
	`id` text PRIMARY KEY NOT NULL,
	`product_id` text NOT NULL,
	`quantity_available` integer DEFAULT 0 NOT NULL,
	`quantity_reserved` integer DEFAULT 0 NOT NULL,
	`restock_date` text NOT NULL,
	FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
DROP INDEX "categories_name_unique";--> statement-breakpoint
DROP INDEX "users_email_unique";--> statement-breakpoint
DROP INDEX "products_name_unique";--> statement-breakpoint
ALTER TABLE `carts` ALTER COLUMN "created_at" TO "created_at" text NOT NULL DEFAULT '1746234924680';--> statement-breakpoint
CREATE UNIQUE INDEX `categories_name_unique` ON `categories` (`name`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);--> statement-breakpoint
CREATE UNIQUE INDEX `products_name_unique` ON `products` (`name`);--> statement-breakpoint
ALTER TABLE `carts` ALTER COLUMN "updated_at" TO "updated_at" text NOT NULL DEFAULT '1746234924680';--> statement-breakpoint
ALTER TABLE `users` ALTER COLUMN "created_at" TO "created_at" text NOT NULL DEFAULT '1746234924679';--> statement-breakpoint
ALTER TABLE `orders` ALTER COLUMN "created_at" TO "created_at" text NOT NULL DEFAULT '1746234924732';--> statement-breakpoint
ALTER TABLE `orders` ALTER COLUMN "updated_at" TO "updated_at" text NOT NULL DEFAULT '1746234924732';