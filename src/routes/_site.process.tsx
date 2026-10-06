import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Section, CtaBand } from "@/components/site/blocks";
import { processSteps } from "@/data/content";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/_site/process")({
  head: () => seo("Our Waterproofing Process | NR Waterproofing Services Kurnool",
    "Our 8-step waterproofing process: inspection, diagnosis, estimate, surface preparation, crack treatment, application, curing and final inspection."),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHero eyebrow="Our Process" title="A disciplined process, from inspection to final check" intro="Waterproofing fails when steps are skipped. We follow all eight." />
      <Section>
        <ol className="relative mx-auto max-w-3xl border-l-2 border-accent pl-8 md:pl-12">
          {processSteps.map((s) => (
            <li key={s.n} className="relative pb-10 last:pb-0">
              <span className="absolute -left-[3.05rem] grid size-10 place-items-center rounded-full bg-primary text-sm font-bold text-primary-foreground ring-4 ring-background md:-left-[4.05rem]">{s.n}</span>
              <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
                <h2 className="text-xl font-semibold text-primary">{s.t}</h2>
                <p className="mt-1 text-muted-foreground">{s.d}</p>
              </div>
            </li>
          ))}
        </ol>
      </Section>
      <CtaBand />
    </>
  );
}
