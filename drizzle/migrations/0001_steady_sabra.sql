ALTER TABLE "tournaments" ADD COLUMN "cbtm_id" varchar(9) NOT NULL;--> statement-breakpoint
ALTER TABLE "tournaments" ADD CONSTRAINT "tournaments_cbtm_id_unique" UNIQUE("cbtm_id");