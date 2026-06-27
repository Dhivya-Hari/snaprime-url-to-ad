import { pgTable, text, timestamp, jsonb } from 'drizzle-orm/pg-core'

export const projects = pgTable('projects', {
  id: text('id').primaryKey(),
  sourceUrl: text('source_url').notNull(),
  extractionStatus: text('extraction_status').notNull(),
  extractionMessage: text('extraction_message').notNull(),
  brandProfile: jsonb('brand_profile').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

export const ads = pgTable('ads', {
  id: text('id').primaryKey(),
  projectId: text('project_id')
    .notNull()
    .references(() => projects.id),
  creativeIdea: text('creative_idea').notNull(),
  primaryText: text('primary_text').notNull(),
  headline: text('headline').notNull(),
  description: text('description').notNull(),
  cta: text('cta').notNull(),
  imageUrl: text('image_url').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})