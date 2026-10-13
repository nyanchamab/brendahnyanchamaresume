import { site, nav } from "@/data/site";
import { SectionNav } from "./SectionNav";
import { SocialLinks } from "./SocialLinks";
import { AvailabilityChip } from "./AvailabilityChip";

/**
 * The sticky intro column (right side at lg+). Holds the name, role, one-line
 * intro, availability chip, scroll-spy section nav, and social links.
 */
export function Sidebar() {
  return (
    <div className="flex h-full flex-col lg:sticky lg:top-0 lg:max-h-screen lg:justify-between lg:py-24">
      <div className="space-y-6">
        <div className="space-y-3">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {site.name}
          </h1>
          <p className="text-base font-medium text-accent">{site.role}</p>
          <p className="max-w-xs text-sm leading-relaxed text-muted">
            {site.intro}
          </p>
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
