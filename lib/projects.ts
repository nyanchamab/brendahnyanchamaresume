import { promises as fs } from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypeHighlight from "rehype-highlight";
import rehypeStringify from "rehype-stringify";

export interface Project {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  featured: boolean;
  repo?: string;
  demo?: string;
}

export interface ProjectWithContent extends Project {
  html: string;
}

const PROJECTS_DIR = path.join(process.cwd(), "content", "projects");

/** Build-time guard: a required frontmatter string must be present. */
function requireString(
  value: unknown,
  file: string,
  field: string
): string {
  if (value instanceof Date) {
    return value.toISOString().slice(0, 10);
  }
  if (typeof value !== "string" || value.trim() === "") {
    throw new Error(
      `Invalid project frontmatter in "${file}": field "${field}" is required and must be a non-empty string.`
    );
  }
  return value;
}

function parseFrontmatter(
  file: string,
  slug: string,
  data: Record<string, unknown>
): Project {
  const title = requireString(data.title, file, "title");
  const description = requireString(data.description, file, "description");
  const date = requireString(data.date, file, "date");

  let tags: string[] = [];
  if (data.tags !== undefined) {
    if (!Array.isArray(data.tags)) {
      throw new Error(
        `Invalid project frontmatter in "${file}": field "tags" must be an array when present.`
      );
    }
    tags = data.tags.map((t) => String(t));
  }

  let featured = false;
  if (data.featured !== undefined) {
    if (typeof data.featured !== "boolean") {
      throw new Error(
        `Invalid project frontmatter in "${file}": field "featured" must be a boolean when present.`
      );
    }
    featured = data.featured;
  }

  const project: Project = { slug, title, description, date, tags, featured };

  if (data.repo !== undefined) project.repo = requireString(data.repo, file, "repo");
  if (data.demo !== undefined) project.demo = requireString(data.demo, file, "demo");

  return project;
}

async function markdownToHtml(markdown: string): Promise<string> {
  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeHighlight)
    .use(rehypeStringify)
    .process(markdown);
  return String(result);
}

async function readProjectFiles(): Promise<string[]> {
  try {
    const entries = await fs.readdir(PROJECTS_DIR);
    return entries.filter((f) => f.endsWith(".md"));
  } catch {
    return [];
  }
}

/** Enumerate project slugs (filename without extension) for generateStaticParams. */
export async function getProjectSlugs(): Promise<string[]> {
  const files = await readProjectFiles();
  return files.map((f) => f.replace(/\.md$/, ""));
}

export async function getAllProjects(): Promise<Project[]> {
  const files = await readProjectFiles();
  const projects = await Promise.all(
    files.map(async (file) => {
      const slug = file.replace(/\.md$/, "");
      const raw = await fs.readFile(path.join(PROJECTS_DIR, file), "utf8");
      const { data } = matter(raw);
      return parseFrontmatter(file, slug, data as Record<string, unknown>);
    })
  );
  return projects.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export async function getFeaturedProjects(): Promise<Project[]> {
  const all = await getAllProjects();
  return all.filter((p) => p.featured);
}

export async function getProjectBySlug(
  slug: string
): Promise<ProjectWithContent | null> {
  const file = `${slug}.md`;
  let raw: string;
  try {
    raw = await fs.readFile(path.join(PROJECTS_DIR, file), "utf8");
  } catch {
    return null;
  }
  const { data, content } = matter(raw);
  const project = parseFrontmatter(file, slug, data as Record<string, unknown>);
  const html = await markdownToHtml(content);
  return { ...project, html };
}
