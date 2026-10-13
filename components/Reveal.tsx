"use client";

import { useEffect, useRef, useState } from "react";

interface RevealProps {
  children: React.ReactNode;
  /** Optional stagger delay in ms. */
  delay?: number;
  className?: string;
  as?: "div" | "section" | "li";
}

/**
 * Fade/slide a block in when it scrolls into view. SSR renders the FINAL
 * (visible) markup; the hidden->visible transition only engages after mount
 * in motion-friendly browsers. Under prefers-reduced-motion the global CSS
 * reset zeroes the transition, so the element simply appears.
 */
export function Reveal({
  children,
  delay = 0,
  className = "",
  as = "div",
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced || typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    // Enable the "hidden first" state only now that JS runs; this keeps the
    // SSR/no-JS output fully visible.
    setEnabled(true);

    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const Tag = as;
  const hidden = enabled && !visible;

  return (
    <Tag
      ref={ref as React.Ref<never>}
      style={{ transitionDelay: hidden ? `${delay}ms` : undefined }}
      className={`transition-all duration-700 ease-out motion-reduce:transition-none ${
        hidden ? "translate-y-4 opacity-0" : "translate-y-0 opacity-100"
      } ${className}`}
    >
      {children}
    </Tag>
  );
}
