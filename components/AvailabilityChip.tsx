import { site } from "@/data/site";

/**
 * CSS-only "available for work" chip with a pulsing dot. Renders only when
 * site.availability.available is true. Under prefers-reduced-motion the ping
 * ring is suppressed (global reset zeroes its animation) leaving a static dot.
 */
export function AvailabilityChip() {
  if (!site.availability.available) return null;

  return (
    <span className="inline-flex items-center gap-2.5 rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-medium text-muted">
      <span className="relative flex h-2 w-2">
        <span
          className="absolute inline-flex h-full w-full rounded-full bg-accent-strong opacity-70 motion-safe:[animation:pulse-ring_1.8s_cubic-bezier(0,0,0.2,1)_infinite]"
          aria-hidden="true"
        />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
      </span>
      {site.availability.label}
    </span>
  );
}
