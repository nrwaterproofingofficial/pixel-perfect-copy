import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, ShieldCheck, Search, Package, Brush, Layers, HardHat, Building, HeartHandshake, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section, SectionHeading, ContactButtons, ServiceCard, CtaBand, ProjectCard, ReviewCard, FaqList } from "@/components/site/blocks";
import { InspectionForm } from "@/components/site/InspectionForm";
import { services, quickServiceSlugs, leakageInspection } from "@/data/services";
import { images, inspectionChecks, processSteps, projects, reviews, faqs } from "@/data/content";
import { seo } from "@/lib/seo";
import { site } from "@/lib/site";

export const Route = createFileRoute("/_site/")({
  head: () => seo("Waterproofing Services in Kurnool | NR Waterproofing Services",
    "Terrace, bathroom, water tank and commercial waterproofing in Kurnool. Proper leakage inspection first, then the right system for your site."),
  component: HomePage,
});

const trust = [
  [Users, "Experienced Waterproofing Team"], [Search, "Proper Site Inspection"], [Package, "Quality Materials"],
  [Brush, "Proper Surface Preparation"], [Layers, "Site-Specific Waterproofing Systems"], [HardHat, "Professional Workmanship"],
  [Building, "Residential & Commercial Projects"], [HeartHandshake, "Customer-Focused Service"],
] as const;

function HomePage() {
  const quick = [...quickServiceSlugs.map((s) => services.find((x) => x.slug === s)!), leakageInspection];
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-ink text-ink-foreground">
        <img src={images.heroTerrace} alt="Waterproofing coating being applied on a terrace in Kurnool" width={1600} height={1072}
          className="absolute inset-0 size-full object-cover opacity-45" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/20" />
        <div className="container-site relative grid min-h-[620px] items-center py-20 md:min-h-[700px]">
          <div className="animate-rise max-w-2xl">
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-ink-foreground/20 bg-ink-foreground/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.14em]">
              <ShieldCheck className="size-4" /> Waterproofing Services in Kurnool
            </p>
            <h1 className="text-4xl font-bold leading-[1.08] sm:text-5xl lg:text-6xl">Stop Water Leakage Before It Damages Your Building.</h1>
            <p className="mt-6 max-w-xl text-lg text-ink-foreground/80">
              Professional waterproofing solutions for homes, apartments and commercial buildings in Kurnool, Andhra Pradesh.
            </p>
            <div className="mt-9 flex flex-wrap gap-3"><ContactButtons light /></div>
          </div>
        </div>
      </section>

      {/* Brand strip */}
      <div className="border-b border-border bg-muted">
        <p className="container-site py-6 text-center text-sm font-medium text-primary md:text-base">"{site.brandMessage}"</p>
      </div>

      {/* Quick services */}
      <Section>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading eyebrow="What we do" title="Waterproofing for every part of your building" />
          <Button asChild variant="outline" className="mb-10 md:mb-14"><Link to="/services">All services <ArrowRight /></Link></Button>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{quick.map((s) => <ServiceCard key={s.slug} service={s} />)}</div>
      </Section>

      {/* Leakage inspection */}
      <section className="bg-primary py-16 text-primary-foreground md:py-24">
        <div className="container-site grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="eyebrow mb-3 text-accent">Leakage Inspection</p>
            <h2 className="text-3xl font-bold md:text-[2.6rem] md:leading-tight">Don't Waterproof Blindly. Find the Leakage Source First.</h2>
            <p className="mt-4 text-primary-foreground/80 md:text-lg">Proper diagnosis is the first step toward effective waterproofing.</p>
            <ol className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {["Inspection", "Diagnosis", "Recommended Treatment", "Estimate"].map((t, i) => (
                <li key={t} className="rounded-xl border border-primary-foreground/15 bg-primary-foreground/5 p-4">
                  <span className="text-2xl font-bold text-accent">0{i + 1}</span>
                  <span className="mt-1 block text-sm font-semibold">{t}</span>
                </li>
              ))}
            </ol>
            <ul className="mt-8 grid gap-2.5 sm:grid-cols-2">
              {inspectionChecks.map((c) => <li key={c} className="flex items-center gap-2 text-sm"><CheckCircle2 className="size-4 text-accent" />{c}</li>)}
            </ul>
            <Button asChild size="lg" variant="light" className="mt-9"><Link to="/leakage-inspection">Request Leakage Inspection <ArrowRight /></Link></Button>
          </div>
          <img src={images.inspection} alt="Moisture meter used to check damp wall during leakage inspection" loading="lazy" width={1200} height={912}
            className="aspect-[4/3] w-full rounded-3xl object-cover shadow-lift" />
        </div>
      </section>

      {/* Why us */}
      <Section muted>
        <SectionHeading center eyebrow="Why choose us" title="Professional Waterproofing Solutions in Kurnool" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {trust.map(([Icon, t]) => (
            <div key={t} className="rounded-2xl bg-card p-6 shadow-soft">
              <Icon className="size-7 text-secondary" />
              <h3 className="mt-4 font-semibold">{t}</h3>
            </div>
          ))}
        </div>
      </Section>

      {/* Process preview */}
      <Section>
        <SectionHeading eyebrow="Our process" title="Eight steps, done properly" intro="Every project follows the same disciplined sequence — from inspection to final check." />
        <div className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((s) => (
            <div key={s.n} className="bg-card p-6">
              <span className="text-3xl font-bold text-accent-foreground/30">{s.n}</span>
              <h3 className="mt-2 font-semibold">{s.t}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{s.d}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Projects */}
      <Section muted>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading eyebrow="Projects" title="Before → Work in progress → After" />
          <Button asChild variant="outline" className="mb-10 md:mb-14"><Link to="/projects">View projects <ArrowRight /></Link></Button>
        </div>
        <div className="grid gap-6 lg:grid-cols-2">{projects.slice(0, 2).map((p) => <ProjectCard key={p.id} project={p} />)}</div>
      </Section>

      {/* Reviews */}
      <Section>
        <SectionHeading center eyebrow="Reviews" title="Our Work Speaks Through Our Customers." />
        <div className="grid gap-5 md:grid-cols-3">{reviews.map((r) => <ReviewCard key={r.id} review={r} />)}</div>
      </Section>

      {/* Form + FAQ */}
      <Section muted id="inspection">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Free inspection" title="Book a free site inspection" intro="Tell us about the problem. Photos or videos help us understand it before we visit." />
            <FaqList items={faqs.slice(0, 5)} />
          </div>
          <InspectionForm />
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
