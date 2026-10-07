import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, MessageCircle, Phone, Clock, ShieldCheck, Sparkles, Navigation } from "lucide-react";
import { Section } from "@/components/site/blocks";
import { InspectionForm } from "@/components/site/InspectionForm";
import { Button } from "@/components/ui/button";
import { seo } from "@/lib/seo";
import { site, whatsappLink } from "@/lib/site";

export const Route = createFileRoute("/_site/contact")({
  head: () =>
    seo(
      "Contact NR Waterproofing Services | Kurnool, Andhra Pradesh",
      "Call, WhatsApp or book a free waterproofing inspection in Kurnool with NR Waterproofing Services."
    ),
  component: Page,
});

function Page() {
  const contactCards = [
    {
      icon: MapPin,
      label: "Headquarters Address",
      value: site.address,
      badge: "Kurnool Center",
      href: undefined,
    },
    {
      icon: Phone,
      label: "Direct Phone Line",
      value: site.phone,
      badge: "24/7 Priority",
      href: site.phoneHref,
    },
    {
      icon: MessageCircle,
      label: "WhatsApp Instant Chat",
      value: site.phone,
      badge: "Instant Response",
      href: whatsappLink(),
    },
    {
      icon: Mail,
      label: "Official Email Desk",
      value: site.email,
      badge: "Queries & Estimates",
      href: `mailto:${site.email}`,
    },
  ];

  return (
    <>
      {/* High-Tech Modern Contact Hero */}
      <section className="relative overflow-hidden bg-ink py-16 lg:py-24 text-ink-foreground bg-aurora-mesh">
        <div className="absolute inset-0 bg-cyber-dots opacity-25 pointer-events-none" />
        <div className="container-site relative z-10">
          <div className="max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-mono font-semibold uppercase tracking-wider text-hero-accent backdrop-blur-md">
              <span className="size-2 rounded-full bg-emerald-400 animate-ping" />
              Kurnool Service Desk & Inspection Hub
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-white">
              Let's Solve Your Leakage Problem.
            </h1>
            <p className="mt-4 text-base sm:text-lg text-ink-foreground/80 leading-relaxed max-w-2xl">
              Get in touch with Kurnool's certified waterproofing experts. Book a 100% free on-site inspection or connect directly on WhatsApp.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="rounded-xl bg-white text-primary font-bold hover:bg-white/90 shadow-md">
                <a href={site.phoneHref} className="flex items-center gap-2">
                  <Phone className="size-4" />
                  <span>Call {site.phone}</span>
                </a>
              </Button>

              <Button asChild size="lg" variant="outline" className="rounded-xl border-white/20 bg-white/10 hover:bg-white/20 text-white backdrop-blur-md">
                <a href={whatsappLink()} target="_blank" rel="noreferrer" className="flex items-center gap-2">
                  <MessageCircle className="size-4 text-emerald-400" />
                  <span>WhatsApp Desk</span>
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Hub & Form Section */}
      <Section id="inspection" className="relative bg-background bg-aurora-mesh bg-cyber-dots/30 py-12 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12 items-start">
          {/* Left Column: Direct Info Cards & Live Desk */}
          <div className="space-y-4 lg:col-span-5">
            {/* Live Dispatch Terminal Pill */}
            <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-4 backdrop-blur-md flex items-center justify-between gap-3 shadow-xs">
              <span className="flex items-center gap-2.5 text-xs font-semibold text-foreground">
                <span className="relative flex size-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full size-3 bg-emerald-500" />
                </span>
                <span>Technicians Active in Kurnool Today</span>
              </span>
              <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-[11px] font-mono font-bold text-emerald-600 dark:text-emerald-400 shrink-0">
                ⚡ WAIT: ~15M
              </span>
            </div>

            {/* Interactive Vibe-Coded Contact Cards */}
            <div className="grid gap-3">
              {contactCards.map((c) => {
                const Icon = c.icon;
                const isWa = c.label.includes("WhatsApp");
                const Content = (
                  <div className={`group relative flex items-start gap-4 rounded-2xl border p-5 transition-all duration-300 overflow-hidden ${
                    isWa
                      ? "border-emerald-500/30 bg-card/95 hover:border-emerald-500 hover:shadow-lg hover:shadow-emerald-500/10"
                      : "border-primary/20 bg-card/95 hover:border-primary/60 hover:shadow-lg hover:shadow-primary/10"
                  } backdrop-blur-xl`}>
                    <div className="absolute top-0 right-0 h-1 w-24 bg-gradient-to-l from-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    
                    <div className={`grid size-12 place-items-center rounded-2xl shrink-0 transition-transform duration-300 group-hover:scale-110 ${
                      isWa
                        ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20"
                        : "bg-primary/10 text-primary border border-primary/20"
                    }`}>
                      <Icon className="size-5" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-muted-foreground">{c.label}</span>
                        <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-mono font-semibold ${
                          isWa
                            ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20"
                            : "bg-primary/10 text-primary border border-primary/20"
                        }`}>
                          {c.badge}
                        </span>
                      </div>
                      <p className={`mt-1.5 font-extrabold text-sm sm:text-base truncate transition-colors ${
                        isWa ? "text-foreground group-hover:text-emerald-600" : "text-foreground group-hover:text-primary"
                      }`}>
                        {c.value}
                      </p>
                    </div>
                  </div>
                );

                return c.href ? (
                  <a key={c.label} href={c.href} target={isWa ? "_blank" : undefined} rel="noreferrer" className="block">
                    {Content}
                  </a>
                ) : (
                  <div key={c.label}>{Content}</div>
                );
              })}
            </div>

            {/* Kurnool Coverage Card */}
            <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-card via-primary/5 to-card p-6 shadow-md backdrop-blur-xl">
              <div className="flex items-start gap-3.5">
                <div className="grid size-11 place-items-center rounded-2xl bg-primary/10 text-primary border border-primary/20 shrink-0">
                  <Navigation className="size-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-foreground text-sm tracking-tight">Serving All Areas in Kurnool</h4>
                  <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                    Bellary Road, Nandyal Checkpost, Joharapuram, C-Camp & Nearby
                  </p>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-border/80 flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5 font-medium"><Clock className="size-3.5 text-primary" /> Mon – Sun: 8:00 AM – 8:00 PM</span>
                <span className="inline-flex items-center gap-1 font-semibold text-emerald-600 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                  <ShieldCheck className="size-3.5" /> Free Site Inspection
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: AI Fast-Track Inspection Form */}
          <div className="lg:col-span-7">
            <InspectionForm source="Contact" />
          </div>
        </div>
      </Section>
    </>
  );
}
