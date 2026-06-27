# Snaprime Take-Home Assignment

## Overview

This project is a standalone application that converts a website URL into editable advertisement drafts.

The application accepts a website URL, extracts structured brand information from the page (including JavaScript-rendered websites), generates a brand profile, creates advertisement drafts, and allows the generated advertisements to be edited directly in the UI.

The project is built using the required technology stack and deployed on Cloudflare Workers.

---

# Live Demo

Cloudflare Deployment

https://tanstack-start-app.dhivya-snaprime-2026.workers.dev

---

# Tech Stack

## Frontend

* TanStack Start
* React
* TypeScript
* Tailwind CSS

## Backend

* TanStack Server Functions
* Cloudflare Workers

## Database

* Neon PostgreSQL
* Drizzle ORM

## Website Extraction

* Browserless
* Cheerio

## AI Layer

The AI layer is abstracted into a dedicated service (`src/lib/ai.ts`) so that the implementation can easily be switched between providers.

---

# Application Flow

1. User enters a website URL.
2. Browserless renders the website (including JavaScript-rendered pages).
3. HTML is parsed using Cheerio.
4. A structured brand profile is created.
5. Advertisement drafts are generated.
6. Ads are displayed as editable preview cards.
7. Users can edit text fields.
8. Users can regenerate individual advertisements.
9. Users can switch between extracted candidate images.

---

# Features Implemented

## URL Input

* Accepts any public website URL.

## Website Extraction

* Supports JavaScript-rendered websites using Browserless.
* Gracefully handles extraction failures.
* Extracts:

  * Website title
  * Description
  * Candidate images
  * Basic brand information

## Brand Profile

Displays:

* What the client does
* Target audience
* Value proposition
* Brand tone
* Candidate images
* Brand colors (basic extraction)

## Advertisement Generation

Generates multiple advertisement drafts containing:

* Creative idea
* Primary text
* Headline
* Description
* CTA
* Image

## Editable Advertisement Preview

Each advertisement can be edited independently.

Editable fields:

* Primary text
* Headline
* Description
* CTA

## Regenerate Single Advertisement

Each advertisement includes a regenerate action that replaces only the selected advertisement while preserving the remaining generated ads.

## Deployment

Application deployed using Cloudflare Workers.

---

# Project Structure

```text
src/
│
├── components/
│   ├── AdCard.tsx
│   ├── BrandProfile.tsx
│   ├── EditableField.tsx
│   └── ImagePicker.tsx
│
├── lib/
│   ├── ai.ts
│   ├── browserless.ts
│   ├── extractor.ts
│   ├── gemini.ts
│   └── prompts.ts
│
├── server/
│   ├── db/
│   └── functions/
│
├── routes/
└── types/
```

---

# Engineering Decisions

Several decisions were made to keep the project modular and maintainable.

* Browserless was chosen to support JavaScript-rendered websites.
* Cheerio was used to simplify HTML parsing.
* AI functionality was isolated inside a dedicated service layer.
* UI components were split into reusable React components.
* Server-side logic was implemented using TanStack Server Functions.
* Neon and Drizzle ORM were selected for cloud-hosted persistence.

The goal was to keep responsibilities separated so that individual pieces can evolve independently.

---

# AI Development

During development I initially integrated Gemini and OpenAI APIs.

However, API quota limitations prevented reliable AI responses during testing.

Instead of tightly coupling the application to a specific provider, I isolated all AI logic inside `src/lib/ai.ts`.

The current implementation uses a mock AI service while preserving the same interface that a real LLM implementation would use.

Replacing the mock implementation with Gemini or OpenAI only requires changes inside the AI service.

---

# Known Limitations / Deferred Work

Given the assignment time constraint, I intentionally prioritized a complete end-to-end workflow over additional features.

The following items were consciously deferred:

* Persisting edited advertisements to the database.
* Reloading previously created projects.
* Production AI integration (mock implementation currently used because of API quota limitations).
* Uploading custom advertisement images.
* Advanced brand color extraction.
* Image deduplication.
* Caching.
* SSRF protection.
* Background job processing.

These improvements would be the next logical steps for production readiness.

---

# Running Locally

Install dependencies

```bash
npm install
```

Run locally

```bash
npm run dev
```

Required environment variables

```text
DATABASE_URL=
BROWSERLESS_TOKEN=
GEMINI_API_KEY=
```

---

# Deployment

Deployment target:

Cloudflare Workers

Deployment URL:

https://tanstack-start-app.dhivya-snaprime-2026.workers.dev
