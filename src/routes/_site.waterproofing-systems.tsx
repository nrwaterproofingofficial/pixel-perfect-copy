import { createFileRoute } from "@tanstack/react-router";
import { Info, Layers } from "lucide-react";
import { PageHero, Section, CtaBand } from "@/components/site/blocks";
import { systems } from "@/data/content";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/_site/waterproofing-systems")({
  head: () => seo("Waterproofing Systems & Materials | NR Waterproofing Kurnool",
    "Cementitious, polymer-modified, PU, epoxy and protective waterproofing systems — selected for each site's condition and leakage source."),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHero eyebrow="Systems / Materials" title="The Right Waterproofing System for the Right Site" />
      <Section>
        <div className="mb-10 flex gap-3 rounded-2xl border border-secondary/30 bg-accent/50 p-5 text-accent-foreground">
          <Info className="size-5 shrink-0" />
          <p className="font-medium">Material and system selection depends on the site condition, leakage source and application requirements.</p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {systems.map((s) => (
            <div key={s.name} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
              <Layers className="size-6 text-secondary" /><h2 className="mt-4 text-lg font-semibold">{s.name}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
      </Section>
      <CtaBand />
    </>
  );
}
