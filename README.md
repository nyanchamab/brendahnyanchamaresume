# Brendah Nyanchama — Portfolio

A static-exported Next.js 16 personal site: a two-column, dark navy + teal
portfolio for a cloud support engineer. Built with React 19, Tailwind v4, and a
markdown-driven projects section. Package manager: **bun**.

## Customization

Everything you'd normally edit lives in three places:

- **`data/site.ts`** — the single source of truth for all personal content: name,
  role, tagline, bio, availability, social links, skills, certifications,
  experience, education, and the section nav. Edit values here; the UI renders them.
  (Note: empty arrays must be written `[] as T[]`. `stats` is intentionally empty.)
- **`content/projects/*.md`** — one markdown file per project. The filename is the
  URL slug. Frontmatter requires `title`, `description`, and `date` (optional:
  `tags`, `featured`, `repo`, `demo`). A missing required field fails the build on
  purpose. The markdown body renders to HTML on the project detail page.
- **`app/globals.css`** — the design tokens (`@theme`): colors and fonts. The ten
  color tokens define the dark navy + teal palette used across the site.

## Develop

```bash
bun install
bun run dev     # http://localhost:3000
```

## Build

```bash
bun run build          # outputs the static site to ./out
bunx serve out         # preview the exported site
```

## Deploy

### GitHub Pages (project site, served under a subpath)

Build with the base path set to the repo name so asset URLs resolve under the
subpath:

```bash
NEXT_PUBLIC_BASE_PATH=/brendahnyanchamaresume bun run build
```

- Repo: **brendahnyanchamaresume**
- Live URL: **https://nyanchamab.github.io/brendahnyanchamaresume/**
- `public/.nojekyll` must stay in place so GitHub Pages serves the `_next/`
  directory (Jekyll ignores folders starting with `_` otherwise).
- A GitHub Actions workflow (`.github/workflows/deploy.yml`) builds and publishes
  the `out/` directory to Pages.

### Vercel / root deployment

Deploy with **no** `NEXT_PUBLIC_BASE_PATH` set — the site is then served from the
root and asset URLs point at `/_next/`.

## Notes

- Static export: `output: "export"`, `trailingSlash: true`, images unoptimized.
- System fonts only (no `next/font/google`).
- All motion has `prefers-reduced-motion` fallbacks.
