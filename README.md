# SlingMe / Slingshot Rental

Early scaffold for the SlingMe web app (Next.js + Convex) and AI agent prompts. Use this repo as the base for the customer-facing site and Convex backend. A separate `slingshot-agents` service (Python/OpenAI Agents SDK) can consume the prompts and Convex tools defined here.

## What's in here

- `docs/` product and ops source-of-truth docs (agents, CI/CD, GCP plan, Convex spec).
- `convex/` backend schema stub and notes.
- `prompts/` initial agent prompt stubs matching the docs.
- `.github/workflows/` CI + Cloud Run deploy pipelines.

## Getting started (web)

1. Install deps: `npm install` (or `pnpm install`).
2. Run dev server: `npm run dev`.
3. Configure Convex: set `CONVEX_URL`/`CONVEX_DEPLOYMENT` and align `convex/schema.ts` with Convex dashboard.
4. Environment vars: set `NEXT_PUBLIC_CONVEX_URL`, `NEXT_PUBLIC_APP_ENV`, plus any secrets in `.env.local`.
5. CI/CD: see `docs/github-workflow.mdc` and `.github/workflows/*.yml` for branch rules and deploy targets.

## Agents service (optional separate repo)

The prompts in `prompts/` can be copied into a `slingshot-agents` service. See `docs/agents-architecture.mdc` for tools, handoffs, and guardrails.
