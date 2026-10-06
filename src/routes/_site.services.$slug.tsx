import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { AlertTriangle, CheckCircle2, Search } from "lucide-react";
import { PageHero, Section, SectionHeading, ContactButtons, FaqList, CtaBand, ProjectCard } from "@/components/site/blocks";
import { InspectionForm } from "@/components/site/InspectionForm";
import { getService } from "@/data/services";
import { faqs, processSteps, projects } from "@/data/content";
import type { EnquirySource } from "@/lib/enquiries";

export const Route = createFileRoute("/_site/services/$slug")({
  loader: ({ params }) => {
    const service = getService(params.slug);
    if (!service) throw notFound();
    return { slug: service.slug };
  },
  head: ({ loaderData }) => {
    const s = loaderData && getService(loaderData.slug);
    if (!s) return { meta: [{ title: "Service not found" }, { name: "robots", content: "noindex" }] };
    const title = `${s.title} in Kurnool | NR Waterproofing Services`;
    return { meta: [
      { title }, { name: "description", content: s.short },
      { property: "og:title", content: title }, { property: "og:description", content: s.short },
      { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
    ] };
  },
  notFoundComponent: () => <div className="container-site py-24 text-center"><h1 className="text-2xl font-bold">Service not found</h1><Link to="/services" className="mt-4 inline-block text-secondary">View all services</Link></div>,
  component: ServiceDetail,
});

const sourceFor = (slug: string): EnquirySource =>
  slug === "terrace-waterproofing" ? "Terrace Inspection" : slug === "bathroom-waterproofing" ? "Bathroom Inspection"
  : slug === "commercial-waterproofing" ? "Commercial Enquiry" : "Service Enquiry";

function ServiceDetail() {
  const { slug } = Route.useLoaderData();
  const s = getService(slug)!;
  const related = projects.filter((p) => p.service === s.title);
  const shown = related.length ? related : projects.slice(0, 1);
  return (
    <>
      <PageHero eyebrow="Service" title={<>{s.title} in Kurnool</>} intro={s.short}><ContactButtons /></PageHero>

      <Section>
        <div className="grid gap-10 lg:grid-cols-3">
          <Block icon={<AlertTriangle className="size-6 text-warning" />} title="Common Problems" items={s.problems} />
          <Block icon={<Search className="size-6 text-secondary" />} title="Inspection" items={s.inspection} />
          <div className="rounded-2xl bg-primary p-7 text-primary-foreground shadow-lift">
            <h2 className="text-xl font-semibold">Recommended Solution</h2>
            <p className="mt-3 text-primary-foreground/85">{s.solution}</p>
            <p className="mt-4 text-xs text-primary-foreground/60">Final recommendation depends on the site condition found during inspection.</p>
          </div>
        </div>
      </Section>

      <Section muted>
        <SectionHeading eyebrow="Process" title="How we carry out the work" />
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((p) => (
            <li key={p.n} className="rounded-xl bg-card p-5 shadow-soft"><span className="font-bold text-secondary">{p.n}</span><h3 className="mt-1 font-semibold">{p.t}</h3><p className="text-sm text-muted-foreground">{p.d}</p></li>
          ))}
        </ol>
      </Section>

      <Section>
        <SectionHeading eyebrow="Materials / Systems" title="Typical systems for this work" intro="Material selection depends on the site condition, leakage source and application requirements." />
        <ul className="flex flex-wrap gap-3">
          {s.materials.map((m) => <li key={m} className="rounded-full border border-border bg-card px-4 py-2 text-sm font-medium shadow-soft">{m}</li>)}
        </ul>
      </Section>

      <Section muted>
        <SectionHeading eyebrow="Project photos · Before & After" title="Recent work" />
        <div className="grid gap-6 lg:grid-cols-2">{shown.map((p) => <ProjectCard key={p.id} project={p} />)}</div>
      </Section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-2">
          <div><SectionHeading eyebrow="FAQ" title="Questions" /><FaqList items={faqs.slice(0, 6)} /></div>
          <div id="inspection"><SectionHeading eyebrow="Get Free Inspection" title={`Book ${s.title.toLowerCase()} inspection`} />
            <InspectionForm source={sourceFor(s.slug)} defaultService={s.title} /></div>
        </div>
      </Section>
      <CtaBand />
    </>
  );
}

function Block({ icon, title, items }: { icon: React.ReactNode; title: string; items: string[] }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-7 shadow-soft">
      {icon}<h2 className="mt-3 text-xl font-semibold">{title}</h2>
      <ul className="mt-4 space-y-2.5">{items.map((i) => <li key={i} className="flex gap-2 text-sm text-muted-foreground"><CheckCircle2 className="mt-0.5 size-4 shrink-0 text-secondary" />{i}</li>)}</ul>
    </div>
  );
}
