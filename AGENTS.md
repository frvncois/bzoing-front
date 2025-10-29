# Repository Guidelines

## Project Structure & Module Organization
- `src/` holds all runtime code. Use `components/` for shared UI, `views/` for route targets, and `router/` to register pages. Global state and API access live in `store.js` and `api.js`, so wire new data flows there.
- Assets go in `src/assets/`; static files needed as-is belong in `public/`. Built artifacts land in `dist/` and should stay untracked.
- The Vite alias `@/` resolves to `./src`, enabling imports like `import Foo from '@/components/Foo.vue'`.

## Build, Test, and Development Commands
- `npm install` installs dependencies; run it after cloning or when package versions change.
- `npm run dev` starts the Vite dev server with hot-module reload at the port shown in the terminal.
- `npm run build` generates a production bundle in `dist/`; use it to validate deploy readiness.
- `npm run preview` serves the production build locally to spot routing or asset issues before release.

## Coding Style & Naming Conventions
- Follow Vue 3 Composition API patterns with `<script setup>` when possible. Keep components focused and colocate sidecar files (styles, composables) nearby.
- Use two-space indentation, single quotes in JavaScript, and include semicolons in `.js` modules for consistency. Name Vue files in PascalCase (e.g., `GlobalHeader.vue`) and route views as `SomethingView.vue`.
- Prefer descriptive, reactive state keys in `store.js`, and centralize API endpoints in `api.js` to avoid drift.

## Testing Guidelines
- Automated tests are not yet configured. When adding coverage, place specs alongside the unit under test (`ComponentName.spec.js`) and run them via a dedicated npm script.
- Until then, rely on `npm run dev` for manual QA: verify navigation, API calls (watch the console for interceptor errors), and scroll behavior tied to Lenis.

## Commit & Pull Request Guidelines
- Follow the existing concise style: imperative, present-tense subjects (e.g., `fix routing redirect`). Use conventional prefixes (`fix:`, `feat:`) when the change spans multiple files or affects behavior.
- Group related changes per commit and ensure `npm run build` succeeds before pushing.
- PRs should describe the user-facing impact, list test evidence, and link the relevant ticket or issue. Include screenshots or screen recordings for visual updates.

## Environment & Configuration Notes
- API calls default to the production Strapi endpoint. Set `VITE_API_URL` in a `.env.local` file to target another backend during development.
- Lenis scroll helpers depend on `window.lenis` initialized in `src/main.js`; keep that bootstrap intact when adjusting entry-point code.
