# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a RedwoodJS SDK (RWSDK) project built for Cloudflare Workers with Better Auth authentication and Prisma ORM using SQLite/D1 database. The project demonstrates server-side rendering with React Server Components and authentication flows.

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

### Authentication
- Better Auth configured with GitHub OAuth provider
- Prisma adapter integration with SQLite provider
- Auth API routes handled at `/api/auth/*`
- Session management integrated into app context as `AppContext` type

### Routing Structure
- Main worker entry point: `src/worker.tsx`
- App uses RWSDK router with nested route definitions
- User authentication routes are prefixed under `/user`
- Protected routes redirect to `/user/login` when unauthenticated

### Key Files
- `src/worker.tsx`: Main application entry point and middleware setup
- `src/db.ts`: Database client setup and Prisma configuration
- `src/lib/auth.ts`: Better Auth configuration
- `prisma/schema.prisma`: Database schema definition
- `wrangler.jsonc`: Cloudflare Workers configuration

### Environment Variables
- `DATABASE_URL`: Database connection string
- `BETTER_AUTH_URL`: Base URL for auth redirects
- `OAUTH_GITHUB_CLIENT_ID` and `OAUTH_GITHUB_CLIENT_SECRET`: GitHub OAuth credentials