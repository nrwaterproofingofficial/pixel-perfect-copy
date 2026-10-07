import { Link, useLocation } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, Phone, MessageCircle, X, Droplet, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { site, whatsappLink } from "@/lib/site";

const nav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/leakage-inspection", label: "Leakage Inspection" },
  { to: "/projects", label: "Projects" },
  { to: "/process", label: "Process" },
  { to: "/reviews", label: "Reviews" },
  { to: "/contact", label: "Contact" },
] as const;

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link to="/" className="site-logo flex items-center gap-3">
      <span className="grid size-9 place-items-center rounded-xl bg-primary text-primary-foreground">
        <Droplet className="size-5" fill="currentColor" />
      </span>
      <span className="leading-tight">
        <span className={`logo-name block text-[0.95rem] font-bold ${light ? "text-ink-foreground" : "text-foreground"}`}>NR WATERPROOFING</span>
        <span className={`block text-[0.65rem] font-medium uppercase tracking-[0.18em] ${light ? "text-ink-foreground/60" : "text-muted-foreground"}`}>Services · Kurnool</span>
      </span>
    </Link>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const immersive = false;
  return () => window.removeEventListener("scroll", update);
  }, []);
  return (
    <header className={`site-header sticky top-0 z-50 border-b border-border/70 bg-background/90 backdrop-blur-xl ${immersive ? "is-immersive" : ""} ${location.pathname === "/" ? "home-header" : ""}`}>
      <div className="container-site flex h-20 items-center justify-between gap-4 lg:h-24">
        <Logo light={immersive} />
        <nav className="hidden items-center gap-1 xl:flex">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} activeOptions={{ exact: n.to === "/" }}
              className="nav-link px-3 py-2 text-sm font-medium text-foreground/75 transition-colors hover:text-primary"
              activeProps={{ className: "text-primary font-semibold" }}>
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Button asChild size="icon" variant="outline" className="xl:hidden" aria-label="Call">
            <a href={site.phoneHref}><Phone /></a>
          </Button>
          <Button asChild size="icon" variant="whatsapp" className="xl:hidden" aria-label="WhatsApp">
            <a href={whatsappLink()} target="_blank" rel="noreferrer"><MessageCircle /></a>
          </Button>
          <Button asChild className="hidden sm:inline-flex">
            <Link to="/contact" hash="inspection">Get Free Inspection</Link>
          </Button>
          <Button size="icon" variant="ghost" className="xl:hidden" onClick={() => setOpen(!open)} aria-label="Menu" aria-expanded={open}>
            {open ? <X /> : <Menu />}
          </Button>
        </div>
      </div>
      {open && (
        <div className="border-t border-border bg-background xl:hidden">
          <nav className="container-site flex flex-col py-3">
            {nav.map((n) => (
              <Link key={n.to} to={n.to} onClick={() => setOpen(false)}
                className="border-b border-border/60 py-3 font-medium last:border-0">{n.label}</Link>
            ))}
            <Button asChild className="mt-3" size="lg">
              <Link to="/contact" hash="inspection" onClick={() => setOpen(false)}>Get Free Inspection</Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}

export function SiteFooter() {
  const quick = [
    ["/services", "Services"], ["/leakage-inspection", "Leakage Inspection"], ["/projects", "Projects"],
    ["/reviews", "Reviews"], ["/faq", "FAQ"], ["/contact", "Contact"], ["/service-areas", "Service Areas"],
  ] as const;
  const more = [
    ["/about", "About Us"], ["/process", "Our Process"], ["/waterproofing-systems", "Waterproofing Systems"],
    ["/certificate", "Waterproofing Certificate"],
  ] as const;
  return (
    <footer className="bg-ink text-ink-foreground">
      <div className="container-site grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4">
          <Logo light />
          <p className="text-sm text-ink-foreground/70">{site.tagline}.</p>
          <div className="flex gap-3 text-sm">
            <a href={site.social.facebook} className="text-ink-foreground/70 hover:text-ink-foreground">Facebook</a>
            <a href={site.social.instagram} className="text-ink-foreground/70 hover:text-ink-foreground">Instagram</a>
            <a href={site.social.youtube} className="text-ink-foreground/70 hover:text-ink-foreground">YouTube</a>
          </div>
        </div>
        <FooterCol title="Quick Links" links={quick} />
        <FooterCol title="Company" links={more} />
        <div>
          <h3 className="mb-4 text-sm font-semibold">Contact</h3>
          <ul className="space-y-3 text-sm text-ink-foreground/75">
            <li className="flex gap-2"><MapPin className="size-4 shrink-0" />{site.address}</li>
            <li><a href={site.phoneHref} className="flex gap-2 hover:text-ink-foreground"><Phone className="size-4" />{site.phone}</a></li>
            <li><a href={whatsappLink()} target="_blank" rel="noreferrer" className="flex gap-2 hover:text-ink-foreground"><MessageCircle className="size-4" />WhatsApp</a></li>
            <li><a href={`mailto:${site.email}`} className="flex gap-2 hover:text-ink-foreground"><Mail className="size-4" />{site.email}</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-ink-foreground/10">
        <div className="container-site flex flex-col justify-between gap-2 py-5 text-xs text-ink-foreground/55 sm:flex-row">
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <p>Waterproofing Contractors in Kurnool, Andhra Pradesh</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: readonly (readonly [string, string])[] }) {
  return (
    <div>
      <h3 className="mb-4 text-sm font-semibold">{title}</h3>
      <ul className="space-y-2.5 text-sm">
        {links.map(([to, label]) => (
          <li key={to}><Link to={to} className="text-ink-foreground/70 hover:text-ink-foreground">{label}</Link></li>
        ))}
      </ul>
    </div>
  );
}
