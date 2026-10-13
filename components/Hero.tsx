import { site } from "@/data/site";
import { ArrowIcon } from "./icons";

/**
 * Opening hero for the content column. Leads with a headline (not the name —
 * the name lives in the sticky sidebar at lg+ and the mobile header below lg),
 * so the two don't duplicate. Sits over a subtle accent-tinted texture.
 */
export function Hero() {
  return (
    <section className="relative isolate mb-4 pt-2 lg:pt-0">
      <div
        aria-hidden="true"
        className="hero-texture pointer-events-none absolute inset-x-0 -top-24 -z-10 h-[22rem]"
      />
      <p className="font-mono text-sm text-accent">{site.role} · Kenya</p>
      <h1 className="mt-4 max-w-2xl text-3xl font-bold leading-[1.12] tracking-tight text-foreground sm:text-4xl lg:text-[2.7rem]">
        Keeping critical systems running, and building the tools that support
        them.
      </h1>
      <p className="mt-5 max-w-xl text-base leading-relaxed text-muted">
        {site.intro}
      </p>
      <div className="mt-8 flex flex-wrap items-center gap-3">
        <a
          href="#projects"
          className="group inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-accent-contrast transition-colors hover:bg-accent-strong"
        >
          View projects
          <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 motion-reduce:transform-none" />
        </a>
        <a
          href="#contact"
          className="inline-flex items-center gap-2 rounded-lg border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-accent/60 hover:text-accent"
        >
          Get in touch
        </a>
      </div>
    </section>
  );
}
