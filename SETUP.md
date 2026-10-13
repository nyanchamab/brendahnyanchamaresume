# Setup & build (tested)

Package manager: **bun** (bun@1.3.14). Run everything from the repo root.

## 1. Install dependencies

```bash
bun install
```

## 2. Build the static site (default / root deployment)

```bash
bun run build
```

Outputs the static export to `./out`. Expected routes:

```
out/index.html
out/projects/index.html
out/projects/helpedge/index.html
out/404.html
```

In a default build, asset references point at the root `/_next/`.

## 3. Preview the exported site

```bash
bunx serve out
```

Open the printed URL and confirm the dark navy + teal two-column layout.

## 4. Base-path build (GitHub Pages subpath)

```bash
NEXT_PUBLIC_BASE_PATH=/brendahnyanchamaresume bun run build
```

Verify every asset reference is prefixed and none are bare:

```bash
grep -oE '/brendahnyanchamaresume/_next/' out/index.html | wc -l   # > 0
grep -oE '[^e]/_next/' out/index.html | wc -l                       # 0
```

> Commit the **default root build** of `out/` as the final state. Re-run
> `bun run build` (no env var) after any base-path build.

## Gotchas & fixes

- **Build fails: `Invalid project frontmatter in "<file>": field "<field>" ...`** —
  a `content/projects/*.md` file is missing a required `title`, `description`, or
  `date`. This is intentional. Add the field and rebuild.
- **GitHub Pages serves the HTML but no styles/JS (`_next/` 404s)** — `public/.nojekyll`
  is missing. Jekyll skips `_`-prefixed folders without it. Keep the file.
- **Assets 404 under the subpath** — you built without
  `NEXT_PUBLIC_BASE_PATH=/brendahnyanchamaresume`. Rebuild with it set for Pages.
- **Tailwind classes not applying** — ensure `postcss.config.mjs` has the
  `@tailwindcss/postcss` plugin and `app/globals.css` starts with
  `@import "tailwindcss";` + `@plugin "@tailwindcss/typography";`. Do **not** add a
  Turbopack CSS rule.
- **`window`/`matchMedia` errors during build** — a client component touched a
  browser API outside `useEffect`. Guard it inside `useEffect`.
- Do **not** run `npm audit fix --force`.
