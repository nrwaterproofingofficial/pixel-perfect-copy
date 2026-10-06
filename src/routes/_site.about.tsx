import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Section, CtaBand } from "@/components/site/blocks";
import { images } from "@/data/content";
import { seo } from "@/lib/seo";
import { site } from "@/lib/site";

export const Route = createFileRoute("/_site/about")({
  head: () => seo("About NR Waterproofing Services | Waterproofing Company in Kurnool",
    "A waterproofing company in Kurnool focused on proper diagnosis, surface preparation and site-specific waterproofing systems."),
  component: Page,
});

const blocks = [
  ["Who We Are", "A Kurnool-based waterproofing and leakage treatment team serving homes, apartments and commercial buildings."],
  ["What We Do", "Leakage inspection, terrace, bathroom, tank, pool and commercial waterproofing, damp wall and crack treatment."],
  ["Our Experience", "Hands-on experience with Kurnool's climate — intense summer heat and monsoon rains — and how buildings react to it."],
  ["Types of Projects", "Independent houses, apartments, villas, shops, offices and industrial roofs."],
  ["Work Methodology", "Inspect, diagnose, estimate, prepare, treat, apply, cure, and check — no skipped steps."],
  ["Quality Commitment", "Proper surface preparation and materials chosen for the site, not a one-product-fits-all approach."],
  ["Customer Approach", "Clear explanations, honest estimates and project-specific warranty terms in writing."],
];

function Page() {
  return (
    <>
      <PageHero eyebrow="About" title="Professional Waterproofing. Proper Diagnosis. Reliable Solutions." />
      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <blockquote className="text-2xl font-semibold leading-snug text-primary md:text-3xl">"{site.brandMessage}"</blockquote>
          <img src={images.bathroom} alt="Bathroom waterproofing membrane with fiberglass mesh" loading="lazy" width={1200} height={912} className="aspect-[4/3] w-full rounded-3xl object-cover shadow-lift" />
        </div>
      </Section>
      <Section muted>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {blocks.map(([t, d]) => <div key={t} className="rounded-2xl bg-card p-7 shadow-soft"><h2 className="text-lg font-semibold text-primary">{t}</h2><p className="mt-2 text-muted-foreground">{d}</p></div>)}
        </div>
      </Section>
      <CtaBand />
    </>
  );
}
