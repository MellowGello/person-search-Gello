# Copilot Instructions for Person Search Application

## Architecture Overview

This is a **Next.js 15.1 + React 19** application demonstrating async Server Components with PostgreSQL/Prisma. The app migrated from SQLite to Neon PostgreSQL, showcasing modern Next.js patterns.

### Key Architectural Patterns

**Server-First Design**: Components like `UserSearch` are async Server Components that resolve `searchParams` promises and fetch data server-side before rendering.

```tsx
// Pattern: Async Server Component with searchParams
export default async function UserSearch({ searchParams }: { searchParams: Promise<{ userId?: string }> }) {
  const resolvedSearchParams = await searchParams;
  const user = selectedUserId ? await getUserById(selectedUserId) : null;
  // ...
}
```

**Server Actions with Prisma**: All CRUD operations use `'use server'` functions in `app/actions/actions.ts` with Prisma ORM. Actions use `revalidatePath('/')` for cache invalidation.

**Generic Dialog Pattern**: `MutableDialog` component accepts `formSchema`, `FormComponent`, and `action` props for reusable CRUD forms with toast notifications.

## Critical Developer Workflows

### Database Operations
```bash
# Generate Prisma client (required after schema changes)
npx prisma generate

# Create/apply migrations
npx prisma migrate dev --name descriptive_name

# Seed database
node prisma/seed.js  # Use .js not .ts due to ESM issues

# View data
npx prisma studio
```

### Build & Deploy
```bash
# Local build (includes prisma generate)
pnpm build

# Development with Turbopack
pnpm dev

# Install dependencies (always use pnpm)
pnpm install
```

**Package Manager**: Always use `pnpm` for all operations. The `package.json` includes `"postinstall": "prisma generate"` and build script runs `prisma generate && next build` to handle Prisma client generation during deployment.

## Project-Specific Conventions

### Component Architecture
- **Server Components**: Data fetching components (UserSearch, UserTable) are async and fetch directly
- **Client Components**: Interactive components (SearchInput, MutableDialog) marked with `'use client'`
- **Actions**: All mutations in `app/actions/actions.ts` use server actions pattern

### Database Layer
- **Prisma Client**: Initialized in `lib/prisma.ts` with singleton pattern for Next.js
- **Schema**: PostgreSQL with UUID primary keys, no relations currently
- **Seeding**: Uses upsert pattern to avoid duplicate data

### UI Patterns
- **Shadcn/ui**: All UI components from `components/ui/` (Button, Dialog, Table, etc.)
- **Forms**: React Hook Form + Zod validation via `MutableDialog`
- **Styling**: Tailwind CSS with custom component variants

## Integration Points

### Authentication
- NextAuth v5 beta with Google provider in `auth.ts`
- Route handlers in `app/api/auth/[...nextauth]/route.ts`

### API Routes
- `app/api/people/route.ts`: Search endpoint for AsyncSelect component
- Returns filtered users from `searchUsers` server action

### Database
- **Neon PostgreSQL**: Connection via `DATABASE_URL` environment variable
- **Migrations**: Located in `prisma/migrations/` - current: `20250712005636_init`

### External Dependencies
- Uses `react-day-picker@8.10.1` which only supports React 18 (peer dependency conflict with React 19)
- Build uses `--force` flag to bypass peer dependency issues

## Common Gotchas

1. **Prisma Generation**: Always run `npx prisma generate` after schema changes or deployment fails
2. **SearchParams**: Must be awaited in Next.js 15.1+ Server Components
3. **ESM Issues**: Use `seed.js` not `seed.ts` due to Node.js ESM configuration
4. **React 19 Conflicts**: Some packages not yet compatible, use `--legacy-peer-deps` with pnpm for installs

## Project Preferences
- **Package Manager**: Always use `pnpm` for all operations (install, build, dev, etc.)
- **Deployment**: No `vercel.json` files - use package.json scripts and Vercel's auto-detection

## Key Files for Context
- `app/actions/actions.ts` - All server actions and database operations
- `components/mutable-dialog.tsx` - Generic form dialog pattern
- `app/components/user-search.tsx` - Main async Server Component example
- `prisma/schema.prisma` - Database schema (PostgreSQL)
- `lib/prisma.ts` - Prisma client singleton
