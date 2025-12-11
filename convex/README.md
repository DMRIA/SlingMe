# Convex backend scaffold

- `schema.ts` mirrors the conceptual model in `docs/convex.mdc`.
- Functions should live in domain folders (e.g., `rentals/createRental.ts`, `pricing/getQuote.ts`).
- Expose agent tools by wrapping Convex queries/mutations with clear input validation.

## Setup

1. Install Convex CLI: `npm install convex`.
2. Log in and init: `npx convex dev`.
3. Sync schema: ensure `convex/schema.ts` matches your Convex dashboard before pushing.

## Notes

- Keep timestamps numeric (ms) or ISO strings consistently; update schema once you decide.
- Indexes are minimal stubs; add query-specific indexes as functions are implemented.
