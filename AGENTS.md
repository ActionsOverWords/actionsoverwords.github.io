# Repository Guidelines

## Project Structure & Module Organization
This repository is an Astro + Starlight knowledge base. Put page content in `src/content/docs/` for wiki-style docs and `src/content/blog/` for dated posts. Keep shared helpers in `src/lib/`, route files in `src/pages/`, and UI overrides in `src/components/starlight/` or `src/components/mdx/`. Static assets belong in `public/`; imported assets belong in `src/assets/`. Treat `dist/`, `node_modules/`, `test-results/`, and `.astro/` as generated output and do not edit them manually.

## Build, Test, and Development Commands
Use the npm scripts already defined in `package.json`:

- `npm run dev`: start the local Astro dev server.
- `npm run build`: create the production build in `dist/`.
- `npm run preview`: serve the built site locally.
- `npm run typecheck`: run `astro check` against routes, content collections, and MDX.
- `npm test`: run Vitest unit tests in `src/**/*.test.ts`.
- `npm run test:e2e`: run Playwright tests in `tests/e2e/` against `http://localhost:4321`.

## Coding Style & Naming Conventions
Follow the existing TypeScript style: 4-space indentation, single quotes, and semicolons. Keep utility modules small and named by domain, for example `src/lib/blog.ts`. Name tests beside the code they cover as `*.test.ts`. For content, prefer lowercase, hyphenated slugs such as `src/content/blog/2026-03-25-initial-setup.mdx`. Match existing Astro component naming with `PascalCase.astro`.

## Testing Guidelines
Add unit tests for helper logic under `src/` using Vitest. Add browser-level regression coverage in `tests/e2e/` for navigation, rendered content, and key user flows. Keep tests deterministic and assertion-focused. Run `npm run typecheck && npm test && npm run test:e2e` before opening a PR when content schemas, routing, or shared components change.

## Commit & Pull Request Guidelines
This workspace snapshot does not include `.git`, so commit conventions could not be verified from history. Use short, imperative commit subjects such as `Add blog index helpers` or `Fix sidebar overflow`. PRs should describe the user-visible change, note any content or schema updates, link related issues, and include screenshots for UI changes to docs or blog pages.

## Content & Configuration Notes
Docs and blog entries are validated by `src/content.config.ts`. Preserve required frontmatter fields such as `title`, `description`, and `date` for blog posts. If you change navigation or theme behavior, update `astro.config.mjs` and verify the affected pages locally.
