import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Section, FaqList, CtaBand } from "@/components/site/blocks";
import { faqs } from "@/data/content";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/_site/faq")({
  head: () => seo("Waterproofing FAQ | Cost, Time & Warranty in Kurnool",
    "Answers to common waterproofing questions: cost in Kurnool, duration, warranty, rainy season work and bathroom leaks without tile removal."),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHero eyebrow="FAQ" title="Frequently asked questions" />
      <Section><div className="mx-auto max-w-3xl"><FaqList items={faqs} /></div></Section>
      <CtaBand />
    </>
  );
}
