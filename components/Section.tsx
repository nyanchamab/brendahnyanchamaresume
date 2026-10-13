import { Reveal } from "./Reveal";

interface SectionProps {
  id: string;
  title: string;
  /** Two-digit eyebrow number, e.g. "01". */
  number: string;
  children: React.ReactNode;
}

/**
 * A content section with a monospace numbered eyebrow, wrapped in the
 * reveal-on-scroll animation. The <section> is labelled by its heading for
 * assistive tech and its id matches the nav hash.
 */
export function Section({ id, title, number, children }: SectionProps) {
  const headingId = `${id}-heading`;
  return (
    <Reveal as="section" className="scroll-mt-24 py-14 first:pt-0 lg:py-16">
      <section id={id} aria-labelledby={headingId}>
        <div className="mb-8 flex items-baseline gap-4">
          <span
            className="font-mono text-sm text-accent"
            aria-hidden="true"
          >
            {number}.
          </span>
          <h2
            id={headingId}
            className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl"
          >
            {title}
          </h2>
          <span
            className="ml-2 hidden h-px flex-1 translate-y-[-2px] bg-border sm:block"
            aria-hidden="true"
          />
        </div>
        {children}
      </section>
    </Reveal>
  );
}
