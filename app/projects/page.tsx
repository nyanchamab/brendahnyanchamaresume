import type { Metadata } from "next";
import Link from "next/link";
import { getAllProjects } from "@/lib/projects";
import { ProjectCard } from "@/components/ProjectCard";
import { ArrowIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "All projects",
  description: "Projects by Brendah Nyanchama.",
};

export default async function ProjectsPage() {
  const projects = await getAllProjects();

  return (
    <div className="mx-auto max-w-4xl px-5 py-16 sm:px-8 lg:py-24">
      <Link
        href="/"
        className="group inline-flex items-center gap-2 text-sm text-faint transition-colors hover:text-accent"
      >
        <ArrowIcon className="h-4 w-4 rotate-[225deg] transition-transform duration-300 group-hover:-translate-x-1 motion-reduce:transform-none" />
        Back home
      </Link>

      <header className="mt-8">
        <p className="font-mono text-sm text-accent">Projects</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground">
          All projects
        </h1>
      </header>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </div>
  );
}
