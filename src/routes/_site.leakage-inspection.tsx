import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";
import { PageHero, Section, SectionHeading, FaqList } from "@/components/site/blocks";
import { InspectionForm } from "@/components/site/InspectionForm";
import { images, inspectionChecks, faqs } from "@/data/content";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/_site/leakage-inspection")({
  head: () => seo("Leakage Inspection in Kurnool | Find the Source First — NR Waterproofing",
    "Professional leakage inspection in Kurnool: cracks, moisture, pipe penetrations, slope, ponding and joints checked before any waterproofing."),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHero eyebrow="Leakage Inspection" title="Don't Waterproof Blindly. Find the Leakage Source First."
        intro="Proper diagnosis is the first step toward effective waterproofing. Leakage repair services in Kurnool that begin with understanding." />
      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <img src={images.inspection} alt="Technician checking wall moisture" loading="lazy" width={1200} height={912} className="aspect-[4/3] w-full rounded-3xl object-cover shadow-lift" />
          <div>
            <SectionHeading eyebrow="What we check" title="A complete inspection" />
            <ul className="grid gap-3 sm:grid-cols-2">
              {inspectionChecks.map((c) => <li key={c} className="flex items-center gap-2 rounded-xl border border-border bg-card p-4 text-sm font-medium shadow-soft"><CheckCircle2 className="size-4 text-secondary" />{c}</li>)}
            </ul>
          </div>
        </div>
      </Section>
      <Section muted>
        <ol className="grid gap-4 md:grid-cols-4">
          {["Inspection", "Diagnosis", "Recommended Treatment", "Estimate"].map((t, i) => (
            <li key={t} className="relative rounded-2xl bg-card p-6 shadow-soft"><span className="text-4xl font-bold text-secondary/30">0{i + 1}</span><h3 className="mt-2 text-lg font-semibold">{t}</h3></li>
          ))}
        </ol>
      </Section>
      <Section id="inspection">
        <div className="grid gap-12 lg:grid-cols-2">
          <div><SectionHeading eyebrow="FAQ" title="About inspections" /><FaqList items={[faqs[0], faqs[9], faqs[1]]} /></div>
          <div><SectionHeading eyebrow="Book now" title="Request Leakage Inspection" /><InspectionForm source="Free Inspection" /></div>
        </div>
      </Section>
    </>
  );
}
