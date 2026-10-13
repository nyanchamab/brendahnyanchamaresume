# Verification note (first iteration)

Repo: `/Users/brenzons/Documents/portfolio`, branch `dev`. Package manager bun.
All commands run from the repo root.

## Engineering

### Default production build — PASS

```
bun run build
```

Exit 0. Next.js 16.4.0 (Turbopack). Routes emitted:

```
┌ ○ /
├ ○ /_not-found
├ ○ /projects
└ ● /projects/helpedge   (SSG, generateStaticParams)
```

`find out -name "*.html" | sort`:

```
out/404.html
out/404/index.html
out/_not-found/index.html
out/index.html
out/projects/helpedge/index.html
out/projects/index.html
```

Detail page markdown rendered: `out/projects/helpedge/index.html` contains
`<h2 id="problem">Problem</h2>` (rehype-slug ids) inside
`class="prose prose-sm mt-10 max-w-none sm:prose-base"`, and the body text
("IT service desk") is present.

No separate lint script exists in `package.json` (only dev/build/start); TypeScript
type-checking runs inside `next build` and passed ("Finished TypeScript").

### Negative test — PASS

Removed `title:` from `content/projects/helpedge.md` and rebuilt. Build FAILED with
the exact error:

```
Error: Invalid project frontmatter in "helpedge.md": field "title" is required and must be a non-empty string.
```

Restored the file (`title: HelpEdge` present) and rebuilt — green.

### basePath build — PASS

```
NEXT_PUBLIC_BASE_PATH=/brendahnyanchamaresume bun run build
```

- `/brendahnyanchamaresume/_next/` occurrences in `out/index.html`: **17**
- bare `/_next/` (not preceded by the base path) occurrences: **0**

Default root build (final committed state) references `/_next/` at root: **17**
occurrences. Final `out/` on disk is a DEFAULT root build (re-ran `bun run build`
with no env var last).

### Content checks on `out/index.html` — PASS

Present (each found): "Brendah Nyanchama" (14×), "Cloud Support Engineer",
"Open to cloud support roles", all 5 cert names incl. "AWS Certified AI Practitioner"
and "Cisco Certified Support Technician (CCST) Cybersecurity", experience orgs
"Amazon Web Services" / "Kenya Airways" / "Microsoft Global Community", "Kenyatta
University", and "HelpEdge".

- MGCI renders with NO date range (entry has empty start/end; the date paragraph is
  omitted — only the bullet renders).
- No "Second Class"/honours/honors text anywhere (grep count 0).
- Six monospace numbered eyebrows 01.–06. render in order (About, Projects, Skills,
  Experience, Certifications, Contact).
- About heading/bio and 21 `role="progressbar"` skill bars render as real SSR HTML.

## Design

Inspected emitted HTML/CSS from `out/`:

- Two-column shell: `lg:grid-cols-[minmax(0,1fr)_22rem]` present, sidebar `lg:sticky`
  present (content LEFT / sticky sidebar RIGHT at desktop), mobile header `lg:hidden`
  present for single-column below `lg`.
- Navy + teal tokens applied in emitted CSS (`out/_next/static/chunks/*.css`):
  `0b1221` and `5eead4` both present, plus `04231f` (accent-contrast),
  `pulse-ring` keyframe, and a `prefers-reduced-motion` block.
- Project and cert cards use the bordered dark surface with hover elevation + accent
  glow and mono tag pills — not a default-Tailwind stack.
- Cert provider badges are ORIGINAL inline SVG monograms (abstract AWS "cloud lift"
  arc and Cisco "signal bars"), 5 total `role="img"` + `aria-hidden="true"`, each
  with the issuer shown as visible text ("AWS · 2026", "Cisco · 2024", etc.).
- Flourishes present with reduced-motion fallbacks: Reveal (SSR renders final visible
  state), scroll-spy SectionNav (aria-current), SkillBar (role=progressbar,
  aria-valuenow/min/max + visible NN%), availability pulse (CSS, motion-safe only),
  card arrow nudge.

## Setup/config

- `postcss.config.mjs` created with `@tailwindcss/postcss`.
- `public/.nojekyll` created (empty).
- `@tailwindcss/turbopack` removed from `package.json`; no Turbopack CSS rule.
- `app/layout.tsx` uses the Next 16 Metadata API (metadataBase, title default/template,
  description, openGraph), a skip link to `#main-content`, and system fonts (no
  `next/font/google`).
