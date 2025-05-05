CREATE TABLE `payments` (
	`id` text PRIMARY KEY NOT NULL,
	`order_id` text,
	`status` text NOT NULL,
	`transaction_amount` real NOT NULL,
	`payer_id_type` text NOT NULL,
	`payer_id_number` text NOT NULL,
	`payer_email` text NOT NULL,
	`payment_method_id` text NOT NULL,
	`payment_method_type` text NOT NULL,
	`installments` integer NOT NULL,
	`last_four_digits` text NOT NULL,
	`date_created` text NOT NULL,
	FOREIGN KEY (`order_id`) REFERENCES `orders`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
DROP INDEX "categories_name_unique";--> statement-breakpoint
DROP INDEX "users_email_unique";--> statement-breakpoint
DROP INDEX "products_name_unique";--> statement-breakpoint
ALTER TABLE `carts` ALTER COLUMN "created_at" TO "created_at" text NOT NULL DEFAULT '1745452290943';--> statement-breakpoint
CREATE UNIQUE INDEX `categories_name_unique` ON `categories` (`name`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);--> statement-breakpoint
CREATE UNIQUE INDEX `products_name_unique` ON `products` (`name`);--> statement-breakpoint
ALTER TABLE `carts` ALTER COLUMN "updated_at" TO "updated_at" text NOT NULL DEFAULT '1745452290943';--> statement-breakpoint
ALTER TABLE `users` ALTER COLUMN "created_at" TO "created_at" text NOT NULL DEFAULT '1745452290942';--> statement-breakpoint
ALTER TABLE `orders` ALTER COLUMN "created_at" TO "created_at" text NOT NULL DEFAULT '1745452290994';--> statement-breakpoint
ALTER TABLE `orders` ALTER COLUMN "updated_at" TO "updated_at" text NOT NULL DEFAULT '1745452290994';