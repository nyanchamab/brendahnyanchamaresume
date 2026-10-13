import { site } from "@/data/site";
import { GitHubIcon, LinkedInIcon, MailIcon } from "./icons";

/** GitHub / LinkedIn / email icon links. */
export function SocialLinks({ className = "" }: { className?: string }) {
  return (
    <ul className={`flex items-center gap-5 ${className}`}>
      <li>
        <a
          href={site.social.github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-faint transition-colors hover:text-accent"
        >
          <GitHubIcon />
          <span className="sr-only">GitHub</span>
        </a>
      </li>
      <li>
        <a
          href={site.social.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="text-faint transition-colors hover:text-accent"
        >
          <LinkedInIcon />
          <span className="sr-only">LinkedIn</span>
        </a>
      </li>
      <li>
        <a
          href={`mailto:${site.social.email}`}
          className="text-faint transition-colors hover:text-accent"
        >
          <MailIcon />
          <span className="sr-only">Email</span>
        </a>
      </li>
    </ul>
  );
}
