"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { NavItem } from "@/data/site";

interface SectionNavProps {
  items: NavItem[];
}

/**
 * Scroll-spy in-page navigation. Hash links highlight the section currently in
 * view (aria-current="true"); the trailing route link ("All projects") is a
 * normal next/link. The IntersectionObserver is created inside useEffect so the
 * static export prerenders cleanly.
 */
export function SectionNav({ items }: SectionNavProps) {
  const hashItems = items.filter((i) => i.href.startsWith("#"));
  const routeItems = items.filter((i) => !i.href.startsWith("#"));
  const [active, setActive] = useState<string>(hashItems[0]?.href ?? "");

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;

    const ids = hashItems.map((i) => i.href.slice(1));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const visible = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visible.set(entry.target.id, entry.intersectionRatio);
          } else {
            visible.delete(entry.target.id);
          }
        }
        let best: string | null = null;
        let bestRatio = -1;
        for (const [id, ratio] of visible) {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            best = id;
          }
        }
        if (best) setActive(`#${best}`);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <nav aria-label="Section navigation">
      <ul className="space-y-1">
        {hashItems.map((item) => {
          const isActive = active === item.href;
          return (
            <li key={item.href}>
              <a
                href={item.href}
                aria-current={isActive ? "true" : undefined}
                className="group flex items-center gap-3 py-1 text-sm"
              >
                <span
                  className={`h-px transition-all duration-300 ${
                    isActive
                      ? "w-10 bg-accent"
                      : "w-5 bg-border group-hover:w-8 group-hover:bg-muted"
                  }`}
                  aria-hidden="true"
                />
                <span
                  className={`transition-colors ${
                    isActive
                      ? "text-foreground"
                      : "text-faint group-hover:text-muted"
                  }`}
                >
                  {item.label}
                </span>
              </a>
            </li>
          );
        })}
        {routeItems.map((item) => (
          <li key={item.href} className="pt-2">
            <Link
              href={item.href}
              className="group flex items-center gap-3 py-1 text-sm text-faint hover:text-accent"
            >
              <span
                className="h-px w-5 bg-border transition-all group-hover:w-8 group-hover:bg-accent"
                aria-hidden="true"
              />
              <span>{item.label} →</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
