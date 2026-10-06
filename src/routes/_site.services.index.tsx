import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Section, ServiceCard, CtaBand, ContactButtons } from "@/components/site/blocks";
import { services, leakageInspection } from "@/data/services";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/_site/services/")({
  head: () => seo("Waterproofing Services in Kurnool | Terrace, Bathroom, Tank & Commercial",
    "Complete waterproofing and leakage treatment services in Kurnool — terrace, bathroom, water tank, pool, damp walls, cracks and commercial buildings."),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <>
      <PageHero eyebrow="Services" title="Waterproofing Services in Kurnool"
        intro="From terrace waterproofing in Kurnool to commercial roofs and water tanks — every treatment starts with understanding the site.">
        <ContactButtons />
      </PageHero>
      <Section>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <ServiceCard service={leakageInspection} />
          {services.map((s) => <ServiceCard key={s.slug} service={s} />)}
        </div>
      </Section>
      <CtaBand title="Not sure which service you need?" text="Book a leakage inspection and we'll recommend the right treatment." />
    </>
  );
}
