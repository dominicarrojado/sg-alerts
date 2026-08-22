---
name: add-topic-page
description: Use ONLY when creating or updating general alert topics, Telegram channels, or category landing pages.
---

# Add Topic Page Skill

This skill provides step-by-step guidance for adding or updating general alert topic pages, Telegram channels, or category landing pages in `sg-alerts`.

## Required Coordinated Edits

### 1. `lib/enums.ts`

Add new topics to `SubscriptionTopic`, new Telegram channels to `TelegramChannel`, and new page routes to `Routes`.

### 2. `lib/constants.ts`

- Include the topic/channel in `SUBSCRIPTION_TOPICS` or `TELEGRAM_CHANNELS`.
- **Inactive Topic Filtering**: If a topic or channel is hidden/paused, add it to:
  - `INACTIVE_SUBSCRIPTION_TOPICS_INACTIVE`
  - `INACTIVE_TELEGRAM_CHANNELS`
- **Important**: Check these inactive lists before assuming a missing topic or channel on the frontend is a bug.

### 3. `lib/content.tsx`

Add card metadata, category links, descriptions, and icon mappings for the topic.

### 4. App Router Page (`app/topics/<slug>/page.tsx` or `app/categories/<slug>/page.tsx`)

Create the page component ensuring compatibility with Next.js static export (`output: "export"`). Avoid server-side dynamic features or Node APIs.

### 5. Colocated Render Test (`page.test.tsx`)

Create a colocated render test alongside the route component.

## Verification Step

Run the targeted test:

```bash
yarn test app/topics/<slug>/page.test.tsx
```
