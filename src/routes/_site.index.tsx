import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, ShieldCheck, Search, Package, Brush, Layers, HardHat, Building, HeartHandshake, Users, Phone, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section, SectionHeading, ContactButtons, ServiceCard, CtaBand, ProjectCard, ReviewCard, FaqList } from "@/components/site/blocks";
import { InspectionForm } from "@/components/site/InspectionForm";
import { services, quickServiceSlugs, leakageInspection } from "@/data/services";
import { images, inspectionChecks, processSteps, projects, reviews, faqs } from "@/data/content";
import { seo } from "@/lib/seo";
import { site, whatsappLink } from "@/lib/site";
import architecturalRoof from "@/assets/architectural-roof.jpg";
import { StatsStrip, Marquee, BeforeAfter, CostEstimator } from "@/components/site/extras";

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
  const quick = quickServiceSlugs.flatMap((slug) => {
    const service = services.find((item) => item.slug === slug);
    return service ? [service] : [];
  }).slice(0, 3);
  return (
    <>
      {/* Hero */}
      <section className="home-hero relative flex items-center overflow-hidden bg-ink text-ink-foreground">
        <img
          src={architecturalRoof}
          alt="Waterproofed building structure in Kurnool"
          width={1920}
          height={1088}
          className="hero-photo absolute inset-0 size-full object-cover"
          fetchPriority="high"
        />
        <div className="hero-shade absolute inset-0" />
        <div className="hero-orb size-[450px] -right-20 top-16 pointer-events-none opacity-40" />

        <div className="hero-content container-site relative z-10 py-12 md:py-16 lg:py-20">
          <div className="max-w-[800px]">
            {/* Small Location / Service Badge */}
            <div className="hero-eyebrow mb-6 inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-white/10 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-blue-200 backdrop-blur-md">
              <span className="hero-status size-2 rounded-full bg-blue-400" />
              Waterproofing Services in Kurnool
            </div>

            {/* Headline */}
            <h1 className="hero-title max-w-[760px] leading-tight">
              <span className="hero-serif block font-editorial italic font-normal text-white text-4xl sm:text-6xl lg:text-[72px] leading-[1.06]">
                Stop Water Leakage
              </span>
              <span className="hero-statement mt-1 sm:mt-2 block font-sans font-bold text-white text-3xl sm:text-5xl lg:text-[60px] leading-[1.08] tracking-tight">
                Before It Damages<br className="hidden sm:block" /> Your Building.
              </span>
            </h1>

            {/* Description */}
            <p className="hero-description mt-6 max-w-[600px] text-base sm:text-lg leading-relaxed text-white/90">
              Professional waterproofing solutions for homes, apartments and commercial buildings in Kurnool, Andhra Pradesh.
            </p>

            {/* CTAs */}
            <div className="hero-actions mt-8 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 sm:gap-4">
              <Button
                asChild
                size="lg"
                className="group rounded-lg bg-white text-primary hover:bg-white/90 font-bold text-sm h-12 px-6 shadow-md shadow-black/15 transition-all hover:-translate-y-0.5 active:translate-y-0 border-none"
              >
                <Link to="/contact" hash="inspection" className="flex items-center justify-center gap-2">
                  <span>Get Free Inspection</span>
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>

              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-lg bg-white/10 hover:bg-white/20 text-white hover:text-white border-white/20 backdrop-blur-md font-semibold text-sm h-12 px-5 transition-all hover:-translate-y-0.5"
              >
                <a href={whatsappLink()} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2">
                  <MessageCircle className="size-4 text-emerald-400" />
                  <span>WhatsApp Now</span>
                </a>
              </Button>

              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-lg bg-white/10 hover:bg-white/20 text-white hover:text-white border-white/20 backdrop-blur-md font-semibold text-sm h-12 px-5 transition-all hover:-translate-y-0.5"
              >
                <a href={site.phoneHref} className="flex items-center justify-center gap-2">
                  <Phone className="size-4 text-blue-300" />
                  <span>Call Now</span>
                </a>
              </Button>
            </div>

            {/* Small Premium Trust Badges */}
            <div className="hero-chips mt-10 flex flex-wrap gap-3">
              {[
                "Free site inspection",
                "Moisture diagnosis",
                "Written warranty",
              ].map((text) => (
                <div
                  key={text}
                  className="inline-flex items-center gap-2.5 rounded-lg border border-white/15 bg-white/5 px-3.5 py-2 text-xs font-medium text-white/90 backdrop-blur-md hover:bg-white/10 transition-colors"
                >
                  <span className="grid size-5 place-items-center rounded-full bg-primary/30 text-blue-300">
                    <CheckCircle2 className="size-3.5" />
                  </span>
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Brand strip */}
      <div className="brand-quote relative z-10 bg-card">
        <p className="container-site text-center text-foreground">“We don't just cover the surface. We identify the problem and select the <span className="text-primary underline decoration-primary/25 underline-offset-8">appropriate waterproofing solution</span> for the site condition.”</p>
      </div>

      <StatsStrip />

      <div className="mt-24"><Marquee items={["Terrace", "Bathroom", "Water Tank", "Swimming Pool", "Damp Walls", "Cracks", "Expansion Joints", "Heat Reflective"]} /></div>

      {/* Quick services */}
      <Section className="home-services">
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

      {/* Why us — bento */}
      <Section muted>
        <SectionHeading eyebrow="Why choose us" title="Professional waterproofing, engineered for Kurnool weather" />
        <div className="bento">
          <div className="bento-card is-wide is-tall is-dark flex flex-col justify-end p-0">
            <img src={images.roofFinished} alt="Finished waterproofed terrace" loading="lazy" className="absolute inset-0 size-full object-cover opacity-60" />
            <div className="relative p-8"><ShieldCheck className="size-9 text-hero-accent" />
              <h3 className="mt-4 text-3xl font-bold">Diagnosis before treatment</h3>
              <p className="mt-2 max-w-md text-ink-foreground/75">We trace the real leakage source with moisture checks — then choose the right system.</p></div>
          </div>
          {trust.slice(0, 2).map(([Icon, t]) => (
            <div key={t} className="bento-card"><Icon className="size-7 text-primary" /><h3 className="mt-6 text-lg font-semibold">{t}</h3></div>
          ))}
          <div className="bento-card is-wide is-blue flex flex-col justify-between">
            <p className="stat-value">10+ yrs</p><p className="mt-4 text-primary-foreground/85">Of hands-on waterproofing across homes, apartments and commercial buildings.</p>
          </div>
          {trust.slice(2, 6).map(([Icon, t]) => (
            <div key={t} className="bento-card"><Icon className="size-7 text-primary" /><h3 className="mt-6 text-lg font-semibold">{t}</h3></div>
          ))}
        </div>
      </Section>

      {/* Before / after + estimator */}
      <Section>
        <div className="grid items-start gap-10 lg:grid-cols-[1.25fr_1fr]">
          <div>
            <SectionHeading eyebrow="See the difference" title="Drag to compare before & after" />
            <BeforeAfter before={images.heroTerrace} after={images.roofFinished} />
          </div>
          <CostEstimator />
        </div>
      </Section>

      {/* Process preview */}
      <Section>
        <SectionHeading eyebrow="Our process" title="Eight steps, done properly" intro="Every project follows the same disciplined sequence — from inspection to final check." />
        <div className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((s) => (
            <div key={s.n} className="step-card bg-card p-6">
              <span className="step-n text-3xl font-bold text-accent-foreground/30 transition-colors">{s.n}</span>
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
        <div className="marquee reviews-marquee"><div className="marquee-track">{[...reviews, ...reviews, ...reviews, ...reviews].map((r, i) => <ReviewCard key={i} review={r} />)}</div></div>
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
