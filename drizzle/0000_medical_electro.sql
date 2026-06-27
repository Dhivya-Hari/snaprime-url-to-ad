CREATE TABLE "ads" (
	"id" text PRIMARY KEY NOT NULL,
	"project_id" text NOT NULL,
	"creative_idea" text NOT NULL,
	"primary_text" text NOT NULL,
	"headline" text NOT NULL,
	"description" text NOT NULL,
	"cta" text NOT NULL,
	"image_url" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "projects" (
	"id" text PRIMARY KEY NOT NULL,
	"source_url" text NOT NULL,
	"extraction_status" text NOT NULL,
	"extraction_message" text NOT NULL,
	"brand_profile" jsonb NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "ads" ADD CONSTRAINT "ads_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE no action ON UPDATE no action;