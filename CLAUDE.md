# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Task Forge is a full-stack todo list application built with React + Vite on the frontend and Supabase for backend services (database, authentication, real-time sync).

This project is not enterprise-grade code, it is intended to be a toy app for the purposes of demonstrating my abilities as a web-developer. It is okay for the solutions to be simple, but please point out if they are clearly incorrect or utilizing bad practices or anti-patterns. 

## Development Commands

### Starting the Application
```bash
npm run dev              # Start full stack (frontend + backend)
npm run frontend         # Start Vite dev server only (port 5173)
npm run backend          # Start Supabase services only (port 54321)
npm start                # Alias for npm run dev
```

### Building and Preview
```bash
npm run build            # Build for production (outputs to dist/)
npm run serve            # Preview production build locally
```

### Supabase Management
```bash
npm run stop             # Stop local Supabase services
npx supabase status      # Check running services
npx supabase db reset    # Reset database to migrations
```

### Code Quality
```bash
npx eslint .             # Run linter
npx prettier --write .   # Format all files
```

## Architecture

### Frontend Structure

**Core Application Flow:**
- `src/main.jsx` → `src/App.jsx` - Application entry point
- `App.jsx` sets up routing, providers hierarchy: Router → AuthProvider → ThemeModeProvider → QueryClientProvider

**State Management:**
- React Query handles all server state (queries/mutations)
- React Context for auth (`AuthContext`) and theme mode (`ThemeModeContext`)
- No global state management library - local state via hooks

**Data Flow Pattern:**
1. API functions in `src/api/*.js` - Direct Supabase calls
2. Custom hooks in `src/hooks/queries/*.js` - React Query wrappers with optimistic updates
3. Components use these hooks for data fetching/mutations

**Key Directories:**
- `src/api/` - Supabase data access layer (tasks.js, projects.js)
- `src/hooks/queries/` - React Query hooks with optimistic updates
- `src/contexts/` - React Context providers (Auth, ThemeMode)
- `src/components/` - Reusable UI components
- `src/pages/` - Top-level route components
- `src/lib/` - Supabase client configuration

### Backend (Supabase)

**Database Schema (defined in `supabase/migrations/`):**
- `projects` table: id, name, description, user_id, timestamps
- `tasks` table: id, title, description, completed, starred, project_id, timestamps
- Row Level Security (RLS) enabled on both tables
- Foreign keys: tasks.project_id → projects.id, projects.user_id → auth.users.id
- CASCADE deletion for data integrity

**Authentication:**
- Email/password authentication via Supabase Auth
- Anonymous user support for demo/testing
- Password reset flow with email verification
- Session management through AuthContext

**Environment Variables:**
- `VITE_SUPABASE_URL` - Supabase project URL
- `VITE_SUPABASE_ANON_KEY` - Supabase anonymous key
- Configured in `.env.development` (local) and `.env.production` (deployment)

### React Query Patterns

All mutations use optimistic updates:
1. `onMutate`: Cancel in-flight queries, save previous state, update cache optimistically
2. `onError`: Rollback to previous state
3. `onSettled`: Invalidate queries to refetch fresh data

Query keys follow pattern: `["resource", id]` (e.g., `["tasks", projectId]`)

### Material-UI Theming

- Theme configuration managed through `ThemeModeContext`
- Supports light/dark mode switching
- Custom fonts: IBM Plex Mono, Permanent Marker

## Working with the Database

**Viewing local database:**
```bash
npx supabase db dump     # Export current schema
npx supabase db diff     # Show changes since last migration
```

**Creating migrations:**
```bash
npx supabase migration new <migration_name>
# Edit the generated SQL file in supabase/migrations/
npx supabase db reset    # Apply migrations
```

**Note:** First container startup downloads Supabase Docker images (~15 min). Subsequent starts are faster.

## Deployment

**Frontend:** Build outputs to `dist/` folder. Deploy to any static hosting (S3, Netlify, Vercel, etc.)

**Backend:** Link local project to Supabase cloud project:
```bash
npx supabase link --project-ref <project-ref>
npx supabase db push     # Push migrations to production
```

**Automated AWS deployment:** See `deployment/deploy.sh` script for S3 + CloudFront deployment

## Important Notes

- Port 5173: Vite dev server
- Port 54321: Supabase local API gateway
- All components use Material-UI components - maintain consistency
- PropTypes validation enabled for all components
- React Query DevTools available in development mode
- Lazy loading used for `TasksMain` page to reduce initial bundle size
