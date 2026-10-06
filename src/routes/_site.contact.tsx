import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { PageHero, Section, ContactButtons } from "@/components/site/blocks";
import { InspectionForm } from "@/components/site/InspectionForm";
import { seo } from "@/lib/seo";
import { site, whatsappLink } from "@/lib/site";

export const Route = createFileRoute("/_site/contact")({
  head: () => seo("Contact NR Waterproofing Services | Kurnool, Andhra Pradesh",
    "Call, WhatsApp or book a free waterproofing inspection in Kurnool with NR Waterproofing Services."),
  component: Page,
});

function Page() {
  const items = [
    [MapPin, "Address", site.address, undefined],
    [Phone, "Phone", site.phone, site.phoneHref],
    [MessageCircle, "WhatsApp", site.phone, whatsappLink()],
    [Mail, "Email", site.email, `mailto:${site.email}`],
  ] as const;
  return (
    <>
      <PageHero eyebrow="Contact" title={site.name} intro="Kurnool, Andhra Pradesh"><ContactButtons /></PageHero>
      <Section id="inspection">
        <div className="grid gap-12 lg:grid-cols-5">
          <div className="space-y-4 lg:col-span-2">
            {items.map(([Icon, label, value, href]) => (
              <a key={label} href={href} className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5 shadow-soft">
                <span className="grid size-11 place-items-center rounded-xl bg-accent text-primary"><Icon className="size-5" /></span>
                <span><span className="block text-xs font-semibold uppercase tracking-wide text-muted-foreground">{label}</span><span className="font-semibold">{value}</span></span>
              </a>
            ))}
            <div className="grid aspect-[4/3] place-items-center rounded-2xl border border-dashed border-border bg-muted text-sm text-muted-foreground water-lines">
              Google Map — Kurnool (embed coming soon)
            </div>
          </div>
          <div className="lg:col-span-3">
            <h2 className="mb-6 text-2xl font-bold text-primary">Get Free Inspection</h2>
            <InspectionForm source="Contact" />
          </div>
        </div>
      </Section>
    </>
  );
}
