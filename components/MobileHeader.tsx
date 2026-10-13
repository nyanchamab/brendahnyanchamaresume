import Link from "next/link";
import { site, nav } from "@/data/site";
import { SocialLinks } from "./SocialLinks";

/**
 * Simple top header for below-lg viewports: name/role and a horizontally
 * scrollable in-page nav. The sticky scroll-spy sidebar takes over at lg+.
 */
export function MobileHeader() {
  return (
    <header className="border-b border-border bg-bg/90 backdrop-blur lg:hidden">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-5">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-lg font-bold tracking-tight text-foreground">
              {site.name}
            </p>
            <p className="text-sm text-accent">{site.role}</p>
          </div>
          <SocialLinks />
        </div>
        <nav aria-label="Section navigation">
          <ul className="-mx-1 flex gap-1 overflow-x-auto pb-1 text-sm">
            {nav.map((item) => {
              const isRoute = !item.href.startsWith("#");
              const className =
                "whitespace-nowrap rounded-full px-3 py-1 text-faint transition-colors hover:bg-surface hover:text-accent";
              return (
                <li key={item.href}>
                  {isRoute ? (
                    <Link href={item.href} className={className}>
                      {item.label}
                    </Link>
                  ) : (
                    <a href={item.href} className={className}>
                      {item.label}
                    </a>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
