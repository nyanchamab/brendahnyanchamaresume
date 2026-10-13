import type { Project } from "@/lib/projects";

/**
 * A small, on-brand "app preview" shown at the top of a project card: a faux
 * browser window over a faint grid, with a few ticket-style rows. Pure
 * CSS/markup (no images), so it is static-export-safe and never depends on a
 * live screenshot. Decorative only — hidden from assistive tech.
 */
export function ProjectCover({ project }: { project: Project }) {
  const domain = project.demo
    ? project.demo.replace(/^https?:\/\//, "").replace(/\/+$/, "")
    : project.slug;

  return (
    <div
      aria-hidden="true"
      className="relative overflow-hidden rounded-t-xl border-b border-border bg-gradient-to-br from-surface-2 to-surface"
    >
      <div className="bg-grid absolute inset-0 opacity-40" />

      {/* faux browser chrome */}
      <div className="relative flex items-center gap-1.5 border-b border-border/60 px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-faint/70" />
        <span className="h-2 w-2 rounded-full bg-faint/50" />
        <span className="h-2 w-2 rounded-full bg-faint/40" />
        <span className="ml-2 truncate rounded-md bg-bg/60 px-2 py-0.5 font-mono text-[10px] text-faint">
          {domain}
        </span>
      </div>

      {/* mini ticket rows */}
      <div className="relative space-y-2 p-3">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="flex items-center gap-2 rounded-md border border-border/50 bg-bg/40 px-2.5 py-2"
          >
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
            <span
              className="h-1.5 rounded-full bg-border"
              style={{ width: `${64 - i * 14}%` }}
            />
            <span className="ml-auto h-3 w-9 rounded-full border border-accent/30 bg-accent/10" />
          </div>
        ))}
      </div>
    </div>
  );
}
