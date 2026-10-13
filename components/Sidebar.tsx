import { site, nav } from "@/data/site";
import { SectionNav } from "./SectionNav";
import { SocialLinks } from "./SocialLinks";
import { AvailabilityChip } from "./AvailabilityChip";

/** Initials for the monogram, derived from the display name. */
function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

/**
 * The sticky intro column (right side at lg+). Holds a monogram, the name,
 * role, one-line intro, availability chip, scroll-spy section nav, and social
 * links.
 */
export function Sidebar() {
  return (
    <div className="flex h-full flex-col lg:sticky lg:top-0 lg:max-h-screen lg:justify-between lg:py-24">
      <div className="space-y-6">
        <div className="space-y-4">
          <span
            className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-accent/40 bg-surface font-mono text-lg font-bold text-accent"
            aria-hidden="true"
          >
            {initials(site.name)}
          </span>
          <div className="space-y-3">
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {site.name}
            </h1>
            <p className="text-base font-medium text-accent">{site.role}</p>
            <p className="max-w-xs text-sm leading-relaxed text-muted">
              {site.intro}
            </p>
          </div>
        </div>

        <AvailabilityChip />

        <div className="hidden lg:block">
          <SectionNav items={nav} />
        </div>
      </div>

      <div className="mt-10 hidden lg:block">
        <SocialLinks />
      </div>
    </div>
  );
}
