import type { Certification } from "@/data/site";
import { ProviderBadge } from "./ProviderBadge";

/**
 * A certification card reusing the project-card surface treatment. Shows an
 * original in-theme provider monogram (decorative), the cert name, the issuer
 * as visible text, and the year in mono/muted. No links.
 */
export function CertCard({ cert }: { cert: Certification }) {
  return (
    <article className="flex items-start gap-4 rounded-xl border border-border bg-surface p-5 transition-all duration-300 hover:-translate-y-1 hover:border-accent/60 hover:shadow-[0_12px_40px_-12px_var(--color-accent-strong)] motion-reduce:hover:translate-y-0">
      <ProviderBadge issuer={cert.issuer} />
      <div className="min-w-0">
        <h3 className="text-sm font-semibold leading-snug text-foreground">
          {cert.name}
        </h3>
        <p className="mt-1.5 font-mono text-xs text-muted">
          {cert.issuer} · {cert.year}
        </p>
      </div>
    </article>
  );
}
