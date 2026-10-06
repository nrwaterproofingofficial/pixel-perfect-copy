import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { ArrowRight, Phone, MessageCircle, Star, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { site, whatsappLink } from "@/lib/site";
import type { Service } from "@/data/services";
import type { Project, Review } from "@/data/content";

export function Section({ children, className = "", id, muted }: { children: ReactNode; className?: string; id?: string; muted?: boolean }) {
  return (
    <section id={id} className={`py-16 md:py-24 ${muted ? "bg-muted" : ""} ${className}`}>
      <div className="container-site">{children}</div>
    </section>
  );
}

export function SectionHeading({ eyebrow, title, intro, center }: { eyebrow?: string; title: ReactNode; intro?: ReactNode; center?: boolean }) {
  return (
    <div className={`section-heading mb-10 max-w-2xl md:mb-14 ${center ? "mx-auto text-center" : ""}`}>
      {eyebrow && <p className="eyebrow mb-3"><span className="h-px w-6 bg-secondary" />{eyebrow}</p>}
      <h2 className="text-3xl font-bold text-primary md:text-4xl">{title}</h2>
      {intro && <p className="mt-4 text-muted-foreground md:text-lg">{intro}</p>}
    </div>
  );
}

export function PageHero({ eyebrow, title, intro, children }: { eyebrow: string; title: ReactNode; intro?: ReactNode; children?: ReactNode }) {
  return (
    <section className="page-hero relative overflow-hidden border-b border-border bg-muted">
      <div className="container-site animate-rise py-16 md:py-24">
        <p className="eyebrow mb-4"><span className="h-px w-6 bg-secondary" />{eyebrow}</p>
        <h1 className="max-w-3xl text-4xl font-bold leading-tight text-primary md:text-5xl">{title}</h1>
        {intro && <p className="mt-5 max-w-2xl text-lg text-muted-foreground">{intro}</p>}
        {children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}
      </div>
    </section>
  );
}

export function ContactButtons({ inspection = true, light = false }: { inspection?: boolean; light?: boolean }) {
  return (
    <>
      {inspection && (
        <Button asChild size="lg" variant={light ? "light" : "default"}>
          <Link to="/contact" hash="inspection">Get Free Inspection <ArrowRight /></Link>
        </Button>
      )}
      <Button asChild size="lg" variant={light ? "ghostLight" : "whatsapp"}>
        <a href={whatsappLink()} target="_blank" rel="noreferrer"><MessageCircle /> WhatsApp Now</a>
      </Button>
      <Button asChild size="lg" variant={light ? "ghostLight" : "outline"}>
        <a href={site.phoneHref}><Phone /> Call Now</a>
      </Button>
    </>
  );
}

export function CtaBand({ title = "Leakage problem? Get it inspected first.", text = "Share photos on WhatsApp or book a free site inspection in Kurnool." }: { title?: string; text?: string }) {
  return (
    <section className="site-cta py-16 md:py-20">
      <div className="container-site">
        <div className="py-4 text-primary-foreground md:py-8">
          <h2 className="max-w-2xl text-3xl font-bold md:text-4xl">{title}</h2>
          <p className="mt-3 max-w-xl text-primary-foreground/80">{text}</p>
          <div className="mt-8 flex flex-wrap gap-3"><ContactButtons light /></div>
        </div>
      </div>
    </section>
  );
}

export function ServiceCard({ service }: { service: Pick<Service, "slug" | "title" | "short" | "icon"> }) {
  const Icon = service.icon;
  const to = service.slug === "leakage-inspection" ? "/leakage-inspection" : "/services/$slug";
  return (
    <Link to={to} params={{ slug: service.slug }}
      className="service-card group flex flex-col rounded-lg border border-border bg-card p-6 transition-all duration-300 hover:border-secondary/40">
      <span className="service-icon mb-5 grid size-12 place-items-center rounded-lg bg-accent text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
        <Icon className="size-6" />
      </span>
      <h3 className="text-lg font-semibold text-foreground">{service.title}</h3>
      <p className="mt-2 flex-1 text-sm text-muted-foreground">{service.short}</p>
      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-secondary">
        Learn More <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
      </span>
    </Link>
  );
}

export function FaqList({ items }: { items: { q: string; a: string }[] }) {
  return (
    <Accordion type="single" collapsible className="rounded-2xl border border-border bg-card px-6 shadow-soft">
      {items.map((f, i) => (
        <AccordionItem key={f.q} value={`f${i}`}>
          <AccordionTrigger className="py-5 text-left text-base font-semibold hover:no-underline">{f.q}</AccordionTrigger>
          <AccordionContent className="pb-5 text-muted-foreground">{f.a}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

export function ProjectCard({ project }: { project: Project }) {
  const stages = [
    ["Before", project.before[0]], ["In Progress", project.progress[0]], ["After", project.after[0]],
  ] as const;
  return (
    <article className="overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
      <div className="grid grid-cols-3 gap-0.5 bg-border">
        {stages.map(([label, src]) => (
          <figure key={label} className="relative aspect-[4/3] overflow-hidden">
            <img src={src} alt={`${project.name} — ${label}`} loading="lazy" className="size-full object-cover" />
            <figcaption className="absolute left-2 top-2 rounded-full bg-background/90 px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wide text-primary">{label}</figcaption>
          </figure>
        ))}
      </div>
      <div className="p-6">
        <p className="eyebrow">{project.service}</p>
        <h3 className="mt-2 text-xl font-semibold">{project.name}</h3>
        <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground"><MapPin className="size-3.5" />{project.location}</p>
        <dl className="mt-5 grid gap-3 text-sm sm:grid-cols-2">
          {([["Problem", project.problem], ["Inspection", project.inspection], ["Treatment", project.treatment], ["Result", project.result]] as const).map(([k, v]) => (
            <div key={k}><dt className="font-semibold text-primary">{k}</dt><dd className="text-muted-foreground">{v}</dd></div>
          ))}
        </dl>
      </div>
    </article>
  );
}

export function ReviewCard({ review }: { review: Review }) {
  return (
    <figure className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-soft">
      <div className="flex gap-0.5 text-warning">
        {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="size-4" fill={i < review.rating ? "currentColor" : "none"} />)}
      </div>
      <blockquote className="mt-4 flex-1 text-foreground/85">"{review.text}"</blockquote>
      <figcaption className="mt-5 flex items-center justify-between border-t border-border pt-4 text-sm">
        <span><span className="block font-semibold">{review.name}</span><span className="text-muted-foreground">{review.service}</span></span>
        <span className="rounded-full bg-accent px-2.5 py-1 text-xs font-medium text-accent-foreground">{review.source}</span>
      </figcaption>
    </figure>
  );
}
