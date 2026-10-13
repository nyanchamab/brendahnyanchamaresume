import Link from "next/link";
import {
  site,
  skills,
  certifications,
  experience,
  education,
} from "@/data/site";
import { getFeaturedProjects, getAllProjects } from "@/lib/projects";
import { Sidebar } from "@/components/Sidebar";
import { MobileHeader } from "@/components/MobileHeader";
import { Section } from "@/components/Section";
import { ProjectCard } from "@/components/ProjectCard";
import { CertCard } from "@/components/CertCard";
import { SkillBar } from "@/components/SkillBar";
import { ArrowIcon, GitHubIcon, LinkedInIcon } from "@/components/icons";

export default async function Home() {
  const featured = await getFeaturedProjects();
  const projects = featured.length > 0 ? featured : await getAllProjects();

  return (
    <div className="min-h-screen">
      <MobileHeader />
      <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-10">
        <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-16">
          {/* Content column (left, scrolls) */}
          <div className="order-2 py-16 lg:order-1 lg:py-24">
            {/* 01 About */}
            <Section id="about" number="01" title="About">
              <p className="max-w-2xl text-base leading-relaxed text-muted">
                {site.bio}
              </p>
            </Section>

            {/* 02 Projects */}
            <Section id="projects" number="02" title="Projects">
              <div className="grid gap-4 sm:grid-cols-2">
                {projects.map((project) => (
                  <ProjectCard key={project.slug} project={project} />
                ))}
              </div>
              <Link
                href="/projects"
                className="group mt-6 inline-flex items-center gap-2 text-sm font-medium text-accent"
              >
                View all
                <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transform-none" />
              </Link>
            </Section>

            {/* 03 Skills */}
            <Section id="skills" number="03" title="Skills">
              <div className="space-y-10">
                {skills.map((group) => (
                  <div key={group.heading}>
                    <h3 className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-faint">
                      {group.heading}
                    </h3>
                    <div className="grid gap-x-10 gap-y-5 sm:grid-cols-2">
                      {group.items.map((skill) => (
                        <SkillBar
                          key={skill.name}
                          name={skill.name}
                          level={skill.level}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Section>

            {/* 04 Experience */}
            <Section id="experience" number="04" title="Experience">
              <ol className="space-y-8 border-l border-border pl-6">
                {experience.map((entry, i) => {
                  const hasDates = entry.start !== "" || entry.end !== "";
                  return (
                    <li key={`${entry.org}-${i}`} className="relative">
                      <span
                        className="absolute -left-[31px] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-accent bg-bg"
                        aria-hidden="true"
                      />
                      <div className="flex flex-wrap items-baseline gap-x-2">
                        <h3 className="text-base font-semibold text-foreground">
                          {entry.role}
                        </h3>
                        <span className="text-accent">· {entry.org}</span>
                      </div>
                      {hasDates && (
                        <p className="mt-1 font-mono text-xs text-muted">
                          {entry.start}
                          {entry.start && entry.end ? " — " : ""}
                          {entry.end}
                        </p>
                      )}
                      <ul className="mt-3 space-y-2">
                        {entry.bullets.map((bullet, b) => (
                          <li
                            key={b}
                            className="flex gap-2 text-sm leading-relaxed text-muted"
                          >
                            <span
                              className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent"
                              aria-hidden="true"
                            />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </li>
                  );
                })}
              </ol>

              <div className="mt-10 rounded-xl border border-border bg-surface p-5">
                <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-faint">
                  Education
                </h3>
                <p className="mt-3 text-sm text-foreground">
                  {education.degree}
                  <span className="text-muted">
                    {" · "}
                    {education.institution}
                    {" · "}
                  </span>
                  <span className="font-mono text-xs text-muted">
                    {education.start}–{education.end}
                  </span>
                </p>
                {education.note && (
                  <p className="mt-1 text-sm text-muted">{education.note}</p>
                )}
              </div>
            </Section>

            {/* 05 Certifications */}
            <Section id="certifications" number="05" title="Certifications">
              <div className="grid gap-4 sm:grid-cols-2">
                {certifications.map((cert) => (
                  <CertCard key={cert.name} cert={cert} />
                ))}
              </div>
            </Section>

            {/* 06 Contact */}
            <Section id="contact" number="06" title="Contact">
              <p className="max-w-xl text-base leading-relaxed text-muted">
                {site.availability.label}. The fastest way to reach me is email —
                I&apos;m happy to talk about cloud support and IT operations work.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-4">
                <a
                  href={`mailto:${site.social.email}`}
                  className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-accent-contrast transition-colors hover:bg-accent-strong"
                >
                  Say hello
                </a>
                <a
                  href={site.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-accent"
                >
                  <GitHubIcon className="h-4 w-4" />
                  GitHub
                </a>
                <a
                  href={site.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-accent"
                >
                  <LinkedInIcon className="h-4 w-4" />
                  LinkedIn
                </a>
              </div>
            </Section>

            <footer className="mt-16 border-t border-border pt-6">
              <p className="text-xs text-faint">
                Designed &amp; built by {site.name}
              </p>
            </footer>
          </div>

          {/* Intro sidebar (right, sticky at lg+) */}
          <aside className="order-1 hidden lg:order-2 lg:block">
            <Sidebar />
          </aside>
        </div>
      </div>
    </div>
  );
}
