# Repository Guidelines

## Project Structure & Module Organization
- **Vite + React + TypeScript**: Modern frontend stack with Vite for build tooling and React for component-based UI.
- **Admin System**: Core administration logic resides in `src/admin`, including `AdminLogin.tsx` and the main `AdminPanel.tsx`.
- **Component Architecture**: 
  - `src/components/ui/`: Comprehensive library of shadcn-based UI primitives.
  - `src/components/cms/`: Specialized components for content management.
  - `src/components/animations/`: Dedicated folder for animation logic and wrappers.
- **Data Management**: Portfolio configuration and theme definitions are centralized in `src/data/`.
- **Path Aliases**: Uses `@/` to reference the `src/` directory (configured in `tsconfig.json`).

## Build, Test, and Development Commands
- `npm run dev`: Start development server with Vite.
- `npm run build`: Build production-ready assets (runs `tsc` and `vite build`).
- `npm run lint`: Run ESLint checks across the codebase.
- `npm run preview`: Locally serve the production build from the `dist/` directory.

## Coding Style & Naming Conventions
- **Strict TypeScript**: Enforces `strict` mode, `noUnusedLocals`, and `noUnusedParameters` via `tsconfig.app.json`.
- **Component Pattern**: UI primitives should be imported via the `@/components/ui` path alias.
- **Tailwind CSS**: Utility-first styling is standard, integrated with shadcn/ui themes.
- **ESLint**: Configured using the modern `defineConfig` format with recommended TS and React Hook rules.

## Testing Guidelines
- No formal testing framework (e.g., Vitest, Jest) is integrated into the build pipeline yet.

## Commit & Pull Request Guidelines
- As this repository currently lacks a `.git` structure in the root, no specific commit conventions are enforced.
