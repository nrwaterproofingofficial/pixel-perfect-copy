import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Section, ProjectCard, CtaBand } from "@/components/site/blocks";
import { useProjects } from "@/lib/cms";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/_site/projects")({
  head: () => seo("Waterproofing Projects in Kurnool | Before & After — NR Waterproofing",
    "See our waterproofing projects in Kurnool: problem, inspection, treatment and result with before, in-progress and after photos."),
  component: Page,
});

function Page() {
  const projects = useProjects();
  return (
    <>
      <PageHero eyebrow="Projects" title="Real problems. Proper treatment." intro="Each project shows what we found, what we did and how it turned out." />
      <Section><div className="grid gap-6 lg:grid-cols-2">{projects.map((p) => <ProjectCard key={p.id} project={p} />)}</div></Section>
      <CtaBand />
    </>
  );
}
