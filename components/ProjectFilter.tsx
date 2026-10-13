"use client";

import { useMemo, useState } from "react";
import type { Project } from "@/lib/projects";
import { ProjectCard } from "./ProjectCard";

/**
 * Client-side tag filter for the All-projects grid. Runs entirely in the
 * browser (static-export-safe): it derives the tag list from the projects it
 * is given, and filters on the selected tag. "All" shows everything.
 */
export function ProjectFilter({ projects }: { projects: Project[] }) {
  // Unique tags across all projects, sorted, with "All" first.
  const tags = useMemo(() => {
    const set = new Set<string>();
    for (const p of projects) for (const t of p.tags) set.add(t);
    return ["All", ...Array.from(set).sort((a, b) => a.localeCompare(b))];
  }, [projects]);

  const [active, setActive] = useState("All");

  const visible = useMemo(
    () =>
      active === "All"
        ? projects
        : projects.filter((p) => p.tags.includes(active)),
    [projects, active]
  );

  return (
    <div>
      {/* Only show the filter bar once there are enough projects/tags to need it. */}
      {projects.length > 4 && tags.length > 2 && (
        <div
          className="mb-8 flex flex-wrap gap-2"
          role="group"
          aria-label="Filter projects by tag"
        >
          {tags.map((tag) => {
            const isActive = tag === active;
            return (
              <button
                key={tag}
                type="button"
                onClick={() => setActive(tag)}
                aria-pressed={isActive}
                className={`rounded-full border px-3 py-1 font-mono text-xs transition-colors ${
                  isActive
                    ? "border-accent bg-accent/10 text-accent"
                    : "border-border text-muted hover:border-accent/60 hover:text-accent"
                }`}
              >
                {tag}
              </button>
            );
          })}
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        {visible.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>

      {visible.length === 0 && (
        <p className="text-sm text-muted">No projects with this tag yet.</p>
      )}
    </div>
  );
}
