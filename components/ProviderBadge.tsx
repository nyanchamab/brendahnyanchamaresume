import type { Certification } from "@/data/site";

/**
 * ORIGINAL, in-theme monogram marks drawn from scratch using the design tokens
 * — NOT a copy of any AWS/Cisco trademarked logo. Decorative (aria-hidden);
 * the issuer is always shown as visible text alongside.
 */
export function ProviderBadge({
  issuer,
}: {
  issuer: Certification["issuer"];
}) {
  if (issuer === "AWS") {
    return (
      <svg
        viewBox="0 0 48 48"
        className="h-10 w-10"
        role="img"
        aria-hidden="true"
      >
        <rect
          x="1"
          y="1"
          width="46"
          height="46"
          rx="12"
          fill="var(--color-surface-2)"
          stroke="var(--color-border)"
          strokeWidth="1.5"
        />
        <text
          x="24"
          y="21"
          textAnchor="middle"
          fontFamily="var(--font-mono)"
          fontSize="12"
          fontWeight="700"
          fill="var(--color-accent)"
        >
          AWS
        </text>
        {/* abstract "cloud lift" arc */}
        <path
          d="M13 32c4 3 18 3 22 0"
          fill="none"
          stroke="var(--color-accent-strong)"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M31 30.5 35 32l-1.6 3.6"
          fill="none"
          stroke="var(--color-accent-strong)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  // Cisco — abstract "signal bars" monogram.
  return (
    <svg
      viewBox="0 0 48 48"
      className="h-10 w-10"
      role="img"
      aria-hidden="true"
    >
      <rect
        x="1"
        y="1"
        width="46"
        height="46"
        rx="12"
        fill="var(--color-surface-2)"
        stroke="var(--color-border)"
        strokeWidth="1.5"
      />
      <g
        stroke="var(--color-accent)"
        strokeWidth="2.4"
        strokeLinecap="round"
      >
        <path d="M15 30v-4" />
        <path d="M20 30v-9" opacity="0.85" />
        <path d="M24 30v-13" />
        <path d="M28 30v-9" opacity="0.85" />
        <path d="M33 30v-4" />
      </g>
      <text
        x="24"
        y="40"
        textAnchor="middle"
        fontFamily="var(--font-mono)"
        fontSize="7"
        fontWeight="700"
        fill="var(--color-faint)"
        letterSpacing="1"
      >
        CISCO
      </text>
    </svg>
  );
}
