import Link from "next/link";
import type { Project } from "@/lib/projects";
import { ArrowIcon } from "./icons";

/**
 * A project card: dark surface, bordered, with an accent-glow hover elevation
 * and a signature arrow-nudge on the title link. All motion sits behind
 * prefers-reduced-motion via the global reset.
 */
export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group relative rounded-xl border border-border bg-surface p-5 transition-all duration-300 hover:-translate-y-1 hover:border-accent/60 hover:shadow-[0_12px_40px_-12px_var(--color-accent-strong)] motion-reduce:hover:translate-y-0">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-base font-semibold text-foreground">
          <Link
            href={`/projects/${project.slug}`}
            className="before:absolute before:inset-0 before:content-[''] group-hover:text-accent"
          >
            {project.title}
          </Link>
        </h3>
        <ArrowIcon className="h-4 w-4 shrink-0 text-faint transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent motion-reduce:transform-none" />
      </div>
      <p className="mt-2 text-sm leading-relaxed text-muted">
        {project.description}
      </p>
      {project.tags.length > 0 && (
        <ul className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-border px-2.5 py-0.5 font-mono text-xs text-muted"
            >
              {tag}
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}
