# TypeScript Migration Plan for Task Forge

## Phase 1: TypeScript Configuration Setup

### 1. Install TypeScript dependencies
- Add: `typescript`, `@types/react`, `@types/react-dom`, `@types/node`, `@types/uuid`
- Add type definition packages for existing libraries

### 2. Create TypeScript configuration files
- `tsconfig.json` - Root config referencing app and node configs
- `tsconfig.app.json` - App-specific config (based on MUI template, with strict settings)
- `tsconfig.node.json` - Node/build tooling config
- Configure strict mode, module resolution, and JSX transform

### 3. Update build configuration
- Rename `vite.config.js` → `vite.config.ts`
- Update package.json build script: `"build": "tsc -b && vite build"`
- Update ESLint config for TypeScript support

## Phase 2: Generate Supabase Types

### 4. Generate database types from Supabase
- Run: `npx supabase gen types typescript --local > src/types/supabase.ts`
- This creates type-safe interfaces for `projects` and `tasks` tables
- Review generated types to understand structure

### 5. Create TypeScript client wrapper
- Rename `src/lib/supabase.js` → `src/lib/supabase.ts`
- Import Database type: `import { Database } from '../types/supabase'`
- Type the client: `createClient<Database>(supabaseUrl, supabaseKey)`

## Phase 3: Migrate Core Files (Bottom-Up Approach)

### 6. Migrate API layer (`src/api/*.js` → `*.ts`)
- `src/api/tasks.ts` - Type function parameters and return values using Supabase types
- `src/api/projects.ts` - Use `Database['public']['Tables']['tasks']` types

### 7. Migrate contexts (`src/contexts/*.jsx` → `*.tsx`)
- `src/contexts/ThemeModeContext.tsx` - Type context value and provider props
- `src/contexts/AuthContext.tsx` - Type user, session, auth state, and context methods

### 8. Migrate React Query hooks (`src/hooks/queries/*.js` → `*.ts`)
- `src/hooks/queries/tasks.ts` - Type mutation variables, query returns, optimistic update payloads
- `src/hooks/queries/projects.ts` - Leverage Supabase types for task/project data structures

## Phase 4: Migrate React Components

### 9. Migrate shared components (`src/components/*.jsx` → `*.tsx`)
- Replace PropTypes with TypeScript interfaces
- Type component props, event handlers, refs
- Start with leaf components (components with no child component dependencies):
  - Copyright.jsx
  - TaskForgeLogo.jsx
  - AddTaskForm.jsx
  - AddProjectForm.jsx
  - ProjectOptionsMenu.jsx
  - PasswordResetForm.jsx
  - RegisterForm.jsx
  - SignInForm.jsx
- Then migrate container components:
  - TaskItem.jsx
  - ProjectListItem.jsx
  - TaskList.jsx
  - ProjectList.jsx
  - AnonUserDialog.jsx
  - PasswordResetDialog.jsx
  - ProtectedRoute.jsx
  - NavBar.jsx
  - ResponsiveDrawer.jsx

### 10. Migrate pages (`src/pages/*.jsx` → `*.tsx`)
- `src/pages/LoadingPage.tsx`
- `src/pages/Login.tsx`
- `src/pages/ResetPassword.tsx`
- `src/pages/TasksMain.tsx`

### 11. Migrate root files
- `src/App.tsx` - Type routing and provider props
- `src/main.tsx` - Entry point conversion

## Phase 5: Remove JavaScript Artifacts

### 12. Clean up
- Remove PropTypes package from package.json
- Delete all `.js`/`.jsx` files after conversion (verify first!)
- Update any remaining imports throughout codebase
- Verify no JavaScript files remain in `src/`

## Phase 6: Validation

### 13. Type check and build
- Run `npm run build` to ensure no TypeScript errors
- Fix any type errors discovered
- Run `npm run dev` and test application thoroughly
- Verify all features work as expected

## Migration Strategy
- **Strict TypeScript settings** - Using recommended strict mode from MUI template
- **Step-by-step migration** - Each step will be explained in detail
- **Bottom-up approach** - Start with dependencies (API, types) before components that use them
