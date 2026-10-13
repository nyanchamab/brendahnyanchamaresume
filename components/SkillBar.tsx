"use client";

import { useEffect, useRef, useState } from "react";

interface SkillBarProps {
  name: string;
  level: number;
}

/**
 * A labelled proficiency bar that fills 0 -> level% when it scrolls into view.
 * Exposes role="progressbar" with aria-valuenow/min/max and a visible NN%.
 * Under prefers-reduced-motion the bar renders at its final width with no
 * transition.
 */
export function SkillBar({ name, level }: SkillBarProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [width, setWidth] = useState(level);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced || typeof IntersectionObserver === "undefined") {
      setWidth(level);
      return;
    }

    setAnimate(true);
    setWidth(0);

    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            // next frame so the transition from 0 is applied
            requestAnimationFrame(() => setWidth(level));
            observer.disconnect();
          }
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [level]);

  return (
    <div ref={ref}>
      <div className="mb-1.5 flex items-baseline justify-between gap-3">
        <span className="text-sm text-foreground">{name}</span>
        <span className="font-mono text-xs text-faint">{level}%</span>
      </div>
      <div
        role="progressbar"
        aria-label={name}
        aria-valuenow={level}
        aria-valuemin={0}
        aria-valuemax={100}
        className="h-1.5 w-full overflow-hidden rounded-full bg-surface-2"
      >
        <div
          className={`h-full rounded-full bg-accent ${
            animate ? "transition-[width] duration-1000 ease-out" : ""
          } motion-reduce:transition-none`}
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
}
