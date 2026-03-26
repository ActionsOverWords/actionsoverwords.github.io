# LeeHK's Wiki Architecture Plan

## Summary

- Framework: `Astro + Starlight + MDX`
- Content model: wiki-style technical docs plus blog-style posts
- Current target: local authoring first
- Future target: static deployment to GitHub Pages or Vercel
- Quality strategy: strict typing, automated tests, and E2E coverage from the beginning

## Why This Stack

`Astro + Starlight` is the best fit for this project because it gives a documentation-first site structure without requiring deep JavaScript knowledge. It supports MDX, navigation, search, code blocks, and documentation layouts out of the box. This keeps the initial implementation simple while still allowing gradual customization later.

`Next.js + MDX` was not selected because it would introduce more framework complexity than this project needs at the start. `Docusaurus` is also a valid option, but `Starlight` is a better fit for a lightweight personal knowledge base with lower setup and maintenance overhead.

## Product Goals

- Write and organize personal technical notes in MDX
- Browse notes through categories, sidebars, and internal links
- Add blog-style posts for dated learning logs or retrospectives
- Keep the system easy to maintain even with limited JavaScript experience
- Make future public deployment possible without redesigning the project

## Architecture

### Framework

- Use `Astro` as the site framework
- Use `Starlight` as the documentation layer
- Use `.mdx` as the default page format
- Keep custom React components optional and minimal

### Content Structure

- `src/content/docs/`
  - Main technical wiki content
  - Category-based hierarchy
- `src/content/blog/`
  - Date-based or slug-based blog posts
- `src/content/config.ts`
  - Content collection schema definitions
- `src/assets/`
  - Images and static assets used in documents

### URL Strategy

- Wiki pages should use category-oriented paths such as `/backend/node/cache`
- Blog posts should use a blog namespace such as `/blog/first-post`

### Metadata

Each content item should support:

- `title`
- `description`
- `tags`
- `draft`
- `lastUpdated`

## UI and Navigation

- Documentation-first layout
- Sidebar navigation by category
- Table of contents on document pages
- Search enabled through Starlight defaults
- Simple homepage with:
  - recent posts
  - key wiki categories
  - quick entry points

## Testing Strategy

The project should not rely on manual checks alone. New features should be protected by automated tests so that changes remain safe even if JavaScript knowledge is still developing.

### Quality Gates

Every meaningful feature addition should pass:

- `npm run typecheck`
- `npm run test`
- `npm run test:e2e`
- `npm run build`

### Test Layers

#### Type Safety

- Enable strict TypeScript configuration
- Use typed content collections
- Catch metadata and schema errors early

#### Unit Tests

- Use `Vitest`
- Cover utility logic such as:
  - slug generation
  - metadata parsing
  - content transformation helpers
- Target high coverage for pure logic

#### End-to-End Tests

- Use `Playwright`
- Cover key user flows:
  - homepage loads
  - wiki pages render
  - blog posts render
  - sidebar navigation works
  - internal links work
  - search works
  - 404 behavior is correct

### Browser Automation Note

If an MCP-based browser debugging workflow is added later, it should be treated as a support tool for investigation, not as the primary regression testing layer. The main automated browser verification should still use `Playwright` because it is deterministic and easy to run repeatedly.

## Development Principles

- Prefer built-in Starlight capabilities before adding custom code
- Keep customization minimal in the first version
- Use MDX and content collections as the primary extension points
- Only add React components when Markdown/MDX is not enough
- Keep the project friendly to future deployment, even while developing locally

## Planned Work Breakdown

## Current Implementation Status

- `2026-03-25`: Astro + Starlight bootstrap started
- `2026-03-25`: docs/blog content model and seed content in progress
- `2026-03-25`: test runner setup in progress

### Phase 1: Project Bootstrap

- Initialize `Astro + Starlight`
- Confirm dev server and static build work
- Enable strict TypeScript

### Phase 2: Content Model

- Create docs and blog content collections
- Add sample MDX documents and posts
- Define metadata shape

### Phase 3: Navigation and UX

- Configure sidebar and top-level navigation
- Create a simple homepage
- Validate search and internal linking

### Phase 4: Test Setup

- Add `Vitest`
- Add `Playwright`
- Add scripts for typecheck, unit, E2E, and build verification

### Phase 5: Verification and Publishing Readiness

- Run local quality gates
- Confirm static output is deployment-ready
- Prepare for future GitHub deployment once content volume is sufficient

## Initial Acceptance Criteria

- A technical note can be added as MDX and appears in docs navigation
- A dated post can be added and appears in the blog area
- Key pages render correctly in local development
- Tests can detect broken navigation or content regressions
- The project can later be deployed statically without changing the content model

## Deferred Until After MCP Setup

- Actual project scaffolding
- Dependency installation
- Browser automation integration details
- Test runner configuration
- CI or deployment workflow setup
