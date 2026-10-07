import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, Search, Package, Brush, Layers, HardHat, Building, HeartHandshake, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section, SectionHeading, ContactButtons, CtaBand, ProjectCard, ReviewCard, FaqList } from "@/components/site/blocks";
import { InspectionForm } from "@/components/site/InspectionForm";
import { images, inspectionChecks, processSteps, projects, reviews, faqs } from "@/data/content";
import { seo } from "@/lib/seo";
import architecturalRoof from "@/assets/architectural-roof.jpg";
import { ServiceFinder } from "@/components/site/ServiceFinder";

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
  return (
    <>
      {/* Hero */}
      <section className="home-hero relative overflow-hidden bg-ink text-ink-foreground">
        <img src={architecturalRoof} alt="Architectural illustration of a finished waterproofed residential rooftop" width={1920} height={1088}
          className="hero-photo absolute inset-0 size-full object-cover" fetchPriority="high" />
        <div className="hero-shade absolute inset-0" />
        <div className="hero-content container-site relative flex items-center">
          <div className="max-w-4xl">
            <p className="hero-eyebrow mb-8 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-xs font-semibold uppercase text-hero-accent">
              <span className="hero-status size-2 rounded-full bg-primary" /> Waterproofing Services in Kurnool
            </p>
            <h1 className="hero-title">NR Waterproofing<span className="hero-statement mt-5 block text-hero-muted">Protect your space.<br />Start at the source.</span></h1>
            <p className="hero-description mt-8 max-w-xl text-lg leading-relaxed text-ink-foreground/80">
              Professional waterproofing solutions for homes, apartments and commercial buildings in Kurnool, Andhra Pradesh.
            </p>
            <div className="hero-actions mt-8 flex flex-wrap gap-4"><ContactButtons light /></div>
          </div>
        </div>
      </section>

      {/* Brand strip */}
      <div className="brand-quote relative z-10 bg-card">
        <p className="container-site text-center text-foreground">“We don't just cover the surface. We identify the problem and select the <span className="text-primary underline decoration-primary/25 underline-offset-8">appropriate waterproofing solution</span> for the site condition.”</p>
      </div>

      {/* Quick services */}
      <Section className="home-services"><ServiceFinder /></Section>

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
