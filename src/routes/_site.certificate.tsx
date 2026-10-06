import { createFileRoute } from "@tanstack/react-router";
import { Award, Info } from "lucide-react";
import { PageHero, Section, CtaBand } from "@/components/site/blocks";
import { seo } from "@/lib/seo";
import { site } from "@/lib/site";

export const Route = createFileRoute("/_site/certificate")({
  head: () => seo("Waterproofing Certificate | NR Waterproofing Services",
    "Every completed project can receive a waterproofing certificate with area treated, work done, dates and project-specific warranty terms."),
  component: Page,
});

const fields = ["Customer / Project Name", "Site Location", "Area Treated", "Waterproofing Work", "System / Material Category",
  "Start Date", "Completion Date", "Warranty Terms", "Certificate Number", "Authorized Signature"];

function Page() {
  return (
    <>
      <PageHero eyebrow="Certificate" title="Waterproofing Certificate" intro="A clear written record of the work completed at your site." />
      <Section>
        <div className="mx-auto max-w-3xl rounded-3xl border-2 border-primary/20 bg-card p-8 shadow-lift md:p-12">
          <div className="flex items-center justify-between border-b border-border pb-6">
            <div><p className="eyebrow">Certificate of Work</p><h2 className="mt-1 text-2xl font-bold text-primary">{site.name}</h2></div>
            <Award className="size-12 text-secondary" />
          </div>
          <dl className="mt-6 grid gap-x-8 gap-y-4 sm:grid-cols-2">
            {fields.map((f) => <div key={f} className="border-b border-dashed border-border pb-2"><dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{f}</dt><dd className="mt-1 h-5" /></div>)}
          </dl>
          <div className="mt-8 flex gap-3 rounded-xl bg-accent/50 p-4 text-sm text-accent-foreground">
            <Info className="size-5 shrink-0" /><p><strong>Warranty terms are project-specific.</strong> They depend on the system used, site condition and scope, and are written on each certificate.</p>
          </div>
        </div>
      </Section>
      <CtaBand />
    </>
  );
}
