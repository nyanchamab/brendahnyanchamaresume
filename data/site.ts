// Single source of truth for all personal information shown on the site.
// Replace every value marked `TODO:` with your real details before publishing.
//
// TS GOTCHA: initialize empty arrays as `[] as SomeType[]`, NOT
// `[] satisfies SomeType[]` — the latter infers `never[]` and then every
// property access on an element fails to type-check.

export interface SocialLinks {
  email: string;
  github: string;
  linkedin: string;
}

export interface Skill {
  /** Skill name, e.g. "TypeScript". */
  name: string;
  /** Honest proficiency 0–100, used to fill the animated skill bar. */
  level: number;
}

export interface SkillGroup {
  heading: string;
  items: Skill[];
}

export interface Stat {
  label: string;
  value: number;
  suffix?: string;
}

export interface Availability {
  available: boolean;
  label: string;
}

export interface Certification {
  name: string;
  issuer: "AWS" | "Cisco";
  year: number;
}

export interface ExperienceEntry {
  role: string;
  org: string;
  /** e.g. "Apr 2026"; use "" when unknown. */
  start: string;
  /** e.g. "Present" or "Apr 2026"; use "" when unknown. */
  end: string;
  bullets: string[];
}

export interface EducationEntry {
  degree: string;
  institution: string;
  start: string;
  end: string;
  note?: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface SiteConfig {
  name: string;
  role: string;
  tagline: string;
  /** One-line intro shown under the name in the sticky sidebar. */
  intro: string;
  bio: string;
  url: string;
  basePath: string;
  availability: Availability;
  social: SocialLinks;
}

export const site: SiteConfig = {
  name: "Brendah Nyanchama",
  role: "Cloud Support Engineer",
  tagline:
    "Cloud support and IT operations, based in Kenya. Support Engineering intern at AWS, AWS certified (Solutions Architect Associate, Cloud Practitioner and AI Practitioner), with a year in IT operations at Kenya Airways.",
  intro:
    "I troubleshoot cloud and IT infrastructure: AWS compute, networking, storage, databases and identity.",
  bio:
    "I'm an early-career cloud support engineer based in Kenya. Since April 2026 I've been a Support Engineering Intern at Amazon Web Services, troubleshooting customer issues across compute, networking, storage, databases and identity. Before that, from March 2025 to April 2026, I was an IT Operations Associate at Kenya Airways, where I set up monitoring for 12 business-critical applications, monitored the company's network devices over SNMP, and developed internal web apps. I hold the AWS Certified Solutions Architect Associate, Cloud Practitioner and AI Practitioner certifications, as well as Cisco CCNA and CCST Cybersecurity. In 2025 I built HelpEdge, a personal IT service management platform: a Next.js front-end with a Python/FastAPI back-end on Render, and file storage on AWS S3. I graduated from Kenyatta University in 2025 with a BSc in Information Technology.",
  // Real production URL (GitHub Pages). Host is LOWERCASE — GitHub Pages paths
  // are case-sensitive. Repo: brendahnyanchamaresume.
  url: "https://nyanchamab.github.io/brendahnyanchamaresume",
  // Resolved at build time. Set NEXT_PUBLIC_BASE_PATH=/brendahnyanchamaresume
  // for GitHub Pages; leave it unset for a root deployment (Vercel).
  basePath: process.env.NEXT_PUBLIC_BASE_PATH ?? "",
  availability: {
    available: true,
    label: "Open to cloud support roles",
  },
  social: {
    email: "nyanchamabrendah3@gmail.com",
    github: "https://github.com/nyanchamab",
    // TODO: confirm this LinkedIn URL is still current before go-live.
    linkedin: "https://www.linkedin.com/in/brendah-nyanchama-8823b4251",
  },
};

// NOTE: skill names are confirmed; the `level` numbers are honest first-pass
// estimates — TUNE them to numbers you can defend in an interview before go-live.
export const skills: SkillGroup[] = [
  {
    heading: "Cloud (AWS)",
    items: [
      { name: "IAM (users, roles, policies)", level: 75 },
      { name: "EC2", level: 75 },
      { name: "S3", level: 75 },
      { name: "VPC and networking", level: 70 },
      { name: "CloudWatch (logs, metrics, alarms)", level: 70 },
      { name: "Lambda", level: 65 },
      { name: "RDS", level: 65 },
      { name: "AWS architecture fundamentals", level: 70 },
    ],
  },
  {
    heading: "IT operations & networking",
    items: [
      { name: "Monitoring and alerting (Zabbix)", level: 80 },
      { name: "Dashboards (Grafana)", level: 75 },
      { name: "Network monitoring (SNMP)", level: 70 },
      { name: "Networking fundamentals (TCP/IP, subnetting, DNS, DHCP)", level: 75 },
      { name: "Routing and switching concepts", level: 70 },
      { name: "Network troubleshooting", level: 70 },
      { name: "Security fundamentals", level: 65 },
      { name: "Technical documentation (Confluence)", level: 75 },
    ],
  },
  {
    heading: "Development & foundations",
    items: [
      { name: "Internal web app development", level: 65 },
      { name: "Next.js and TanStack Query", level: 60 },
      { name: "Linux and shell scripting (Bash)", level: 65 },
      { name: "Git and GitHub", level: 70 },
      { name: "HTML and CSS", level: 70 },
    ],
  },
];

// Count-up stats intentionally EMPTY — hidden for this cloud-support portfolio.
export const stats: Stat[] = [] as Stat[];

// Certifications — AWS first. No personal Credly/verification links (privacy);
// the UI shows an in-theme provider badge by issuer instead.
export const certifications: Certification[] = [
  { name: "AWS Certified Solutions Architect, Associate", issuer: "AWS", year: 2026 },
  { name: "AWS Certified Cloud Practitioner", issuer: "AWS", year: 2026 },
  { name: "AWS Certified AI Practitioner", issuer: "AWS", year: 2026 },
  { name: "Cisco Certified Network Associate (CCNA)", issuer: "Cisco", year: 2024 },
  { name: "Cisco Certified Support Technician (CCST) Cybersecurity", issuer: "Cisco", year: 2025 },
];

// Experience — newest first. AWS bullet kept GENERAL (no customers/internal
// tools/metrics). MGCI dates unknown — left empty; do NOT invent dates.
export const experience: ExperienceEntry[] = [
  {
    role: "Support Engineering Intern",
    org: "Amazon Web Services",
    start: "Apr 2026",
    end: "Present",
    bullets: [
      "Troubleshoot customer issues across AWS compute, networking, storage, databases and identity (EC2, VPC, S3, RDS, Lambda, IAM, CloudWatch), finding the root cause and documenting it clearly before escalating.",
    ],
  },
  {
    role: "IT Operations Associate",
    org: "Kenya Airways",
    start: "Mar 2025",
    end: "Apr 2026",
    bullets: [
      "Set up automated monitoring in Zabbix for 12 business-critical applications and built Grafana dashboards, giving the operations team a live view of system health so problems were spotted and escalated sooner.",
      "Monitored LAN/WAN network devices over SNMP in Zabbix so the network team was alerted when a device or link had a problem.",
      "Developed internal web applications.",
      "Documented systems, configurations and change procedures in Confluence.",
    ],
  },
  {
    role: "Member",
    org: "Microsoft Global Community Initiative (MGCI), Kisii region",
    start: "2026",
    end: "Present",
    bullets: [
      "Help young people in the Kisii region get hands-on experience with Microsoft tools and services.",
    ],
  },
];

export const education: EducationEntry = {
  degree: "BSc Information Technology",
  institution: "Kenyatta University",
  start: "2021",
  end: "2025",
};

// In-page section anchors for the scroll-spy nav. "All projects" is a route.
export const nav: NavItem[] = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Certifications", href: "#certifications" },
  { label: "Contact", href: "#contact" },
  { label: "All projects", href: "/projects" },
];

/**
 * Prepend the configured base path to a raw `public/` asset reference.
 * `next/link` and `next/image` already apply basePath automatically, so this
 * is only needed for hand-written asset URLs (favicon, OG image, CV, etc.).
 */
export function assetUrl(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${site.basePath}${normalized}`;
}
