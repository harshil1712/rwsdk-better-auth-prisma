# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a RedwoodJS SDK (RWSDK) project built for Cloudflare Workers with Better Auth authentication and Prisma ORM using D1 database. The project demonstrates server-side rendering with React Server Components and authentication flows.

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Deploy to Cloudflare
npm run release

# Type checking
npm run types

# Generate Prisma client and Wrangler types
npm run generate

# Run type checking after generating
npm run check

# Clean build artifacts
npm run clean
```

## Database Operations

```bash
# Generate Prisma client and apply migrations locally
npm run migrate:dev

# Apply migrations to production D1 database
npm run migrate:prd

# Create new migration
npm run migrate:new

# Generate Better Auth schema
npx @better-auth/cli generate
```

## Architecture

### Database Setup
- Uses Prisma with D1 adapter for Cloudflare Workers
- Database client must be initialized via `setupDb(env)` function in worker context
- Generated Prisma client is output to `generated/prisma/` directory
- D1 database binding is configured as "DB" in wrangler.jsonc
- Prisma client configured for Cloudflare Workers runtime with workerd compatibility
- Includes workaround for D1 initialization: `SELECT 1` query executed after client setup

### Authentication
- Better Auth configured with GitHub OAuth provider
- Prisma adapter integration with SQLite provider
- Auth API routes handled at `/api/auth/*` pattern
- Session management integrated into app context as `AppContext` type
- Runtime auth creation via `createAuth(env)` function for Workers compatibility
- CLI-compatible auth export for Better Auth CLI schema generation

### Routing Structure
- Main worker entry point: `src/worker.tsx` with middleware pipeline
- App uses RWSDK router with nested route definitions and prefix routing
- User authentication routes are prefixed under `/user`
- Protected routes check `ctx.user` and redirect to `/user/login` when unauthenticated
- Auth API handler dynamically imports auth configuration to avoid initialization issues

### Key Files
- `src/worker.tsx`: Main application entry point, middleware setup, and route definitions
- `src/db.ts`: Database client setup, Prisma configuration, and D1 adapter initialization
- `src/lib/auth.ts`: Better Auth configuration with runtime and CLI compatibility
- `src/lib/auth-client.ts`: Client-side auth utilities
- `src/app/Document.tsx`: HTML document wrapper with styling
- `prisma/schema.prisma`: Database schema with Better Auth models
- `wrangler.jsonc`: Cloudflare Workers configuration with D1 database binding

### Environment Variables
- `DATABASE_URL`: Database connection string (SQLite for local, D1 for production)
- `BETTER_AUTH_URL`: Base URL for auth redirects (http://localhost:5173 for dev)
- `BETTER_AUTH_SECRET`: Secret key for Better Auth
- `OAUTH_GITHUB_CLIENT_ID` and `OAUTH_GITHUB_CLIENT_SECRET`: GitHub OAuth credentials

### Important Development Notes
- The database client uses a workaround for D1 initialization requiring a `SELECT 1` query
- Better Auth configuration is split between runtime (Workers) and CLI contexts
- Prisma client generation targets workerd runtime with ESM module format
- TypeScript errors with D1 adapter types are suppressed with @ts-ignore in `db.ts:20`