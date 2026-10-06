import { createFileRoute } from "@tanstack/react-router";
import { MapPin } from "lucide-react";
import { PageHero, Section, CtaBand } from "@/components/site/blocks";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/_site/service-areas")({
  head: () => seo("Service Areas | Waterproofing Services in Kurnool, Andhra Pradesh",
    "NR Waterproofing Services serves Kurnool, Andhra Pradesh. Contact us to confirm availability for your location."),
  component: Page,
});

/** Future: one entry per confirmed location → /service-areas/$slug. Only confirmed areas are listed. */
const areas = [{ name: "Kurnool", region: "Andhra Pradesh", primary: true }];

function Page() {
  return (
    <>
      <PageHero eyebrow="Service Areas" title="Waterproofing Services in Kurnool" intro="Our main service location is Kurnool, Andhra Pradesh." />
      <Section>
        <div className="grid gap-5 md:grid-cols-2">
          {areas.map((a) => (
            <div key={a.name} className="rounded-2xl border border-border bg-card p-8 shadow-soft">
              <MapPin className="size-8 text-secondary" />
              <h2 className="mt-4 text-2xl font-bold text-primary">{a.name}, {a.region}</h2>
              <p className="mt-2 text-muted-foreground">Main service location — residential and commercial waterproofing.</p>
            </div>
          ))}
          <div className="rounded-2xl border border-dashed border-border p-8 text-muted-foreground">
            Outside Kurnool? Contact us to check whether we can serve your site.
          </div>
        </div>
      </Section>
      <CtaBand />
    </>
  );
}
