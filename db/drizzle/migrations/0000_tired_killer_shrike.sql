CREATE TABLE `users` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`avatar` text NOT NULL,
	`github_id` text NOT NULL,
	`lc_id` text NOT NULL,
	`lc_github` text,
	`totalContributions` integer DEFAULT 0 NOT NULL,
	`totalSubmissions` integer DEFAULT 0 NOT NULL,
	`Verified` integer DEFAULT 0 NOT NULL,
	`timestamp` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `github_id_index` ON `users` (`github_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `lc_id_index` ON `users` (`lc_id`);