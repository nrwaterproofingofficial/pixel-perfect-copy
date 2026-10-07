import { Link, useLocation } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, Phone, MessageCircle, X, Droplet, Mail, MapPin, ShieldCheck, Sparkles, ChevronRight, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { site, whatsappLink } from "@/lib/site";

const nav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/projects", label: "Projects" },
  { to: "/process", label: "Process" },
  { to: "/reviews", label: "Reviews" },
  { to: "/contact", label: "Contact" },
] as const;

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link to="/" className="site-logo group flex items-center gap-2.5 shrink-0 transition-opacity hover:opacity-95">
      <span className="grid size-9 place-items-center rounded-xl bg-primary text-primary-foreground shadow-xs transition-transform duration-200 group-hover:scale-105">
        <Droplet className="size-4.5" fill="currentColor" />
      </span>
      <span className="leading-tight">
        <span className={`logo-name block text-[0.88rem] font-bold tracking-tight font-sans ${light ? "text-ink-foreground" : "text-foreground"}`}>
          NR WATERPROOFING
        </span>
        <span className={`block text-[0.62rem] font-medium tracking-wide font-sans ${light ? "text-ink-foreground/70" : "text-muted-foreground"}`}>
          Kurnool, Andhra Pradesh
        </span>
      </span>
    </Link>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 15);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <header className="sticky top-0 z-50 py-2 sm:py-2.5 transition-all duration-300 pointer-events-none">
      <div
        className={`container-site max-w-[85rem] pointer-events-auto flex h-[62px] lg:h-[66px] items-center justify-between gap-4 rounded-2xl transition-all duration-300 ${
          scrolled
            ? "floating-nav-glass shadow-lg shadow-primary/10 border-primary/30"
            : "bg-background/90 backdrop-blur-md border border-border/80 shadow-xs hover:border-primary/30"
        }`}
      >
        {/* Left: Brand Logo */}
        <Logo />

        {/* Center: Desktop Navigation Links */}
        <nav className="hidden items-center gap-1 xl:gap-1.5 lg:flex">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeOptions={{ exact: n.to === "/" }}
              className="nav-link relative rounded-full px-3.5 py-1.5 text-xs font-semibold text-foreground/80 transition-all duration-200 hover:bg-primary/10 hover:text-primary font-sans whitespace-nowrap"
              activeProps={{
                className: "!bg-primary/10 !text-primary font-bold shadow-xs",
              }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          {/* Small WhatsApp Icon Button */}
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noreferrer"
            aria-label="WhatsApp Chat"
            className="grid size-9 place-items-center rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500 hover:text-white transition-all duration-200 shadow-xs"
          >
            <MessageCircle className="size-4" />
          </a>

          {/* Get Free Inspection Button */}
          <Button
            asChild
            className="group hidden sm:inline-flex bg-primary hover:bg-primary/95 text-white font-semibold text-xs sm:text-sm h-9.5 px-4.5 rounded-xl shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all border-none"
          >
            <Link to="/contact" hash="inspection" className="flex items-center gap-1.5">
              <span>Get Free Inspection</span>
              <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </Button>

          {/* Mobile Hamburger Toggle */}
          <Button
            size="icon"
            variant="ghost"
            className="lg:hidden size-9 rounded-xl hover:bg-muted text-foreground"
            onClick={() => setOpen(!open)}
            aria-label="Toggle Menu"
            aria-expanded={open}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Dropdown Panel */}
      {open && (
        <div className="container-site max-w-[85rem] pointer-events-auto mt-2 lg:hidden">
          <div className="rounded-2xl border border-border/80 bg-background/95 backdrop-blur-xl p-4 shadow-xl animate-in slide-in-from-top-2 fade-in-20 duration-200 space-y-3">
            <nav className="flex flex-col space-y-1">
              {nav.map((n) => (
                <Link
                  key={n.to}
                  to={n.to}
                  onClick={() => setOpen(false)}
                  activeOptions={{ exact: n.to === "/" }}
                  className="flex items-center justify-between rounded-xl px-3.5 py-2.5 text-sm font-medium text-foreground/80 hover:bg-primary/10 hover:text-primary transition-all font-sans"
                  activeProps={{
                    className: "!bg-primary/10 !text-primary font-semibold",
                  }}
                >
                  <span>{n.label}</span>
                  <ChevronRight className="size-4 text-muted-foreground/60" />
                </Link>
              ))}
            </nav>

            <div className="pt-2 border-t border-border/60 flex flex-col gap-2">
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noreferrer"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-2 py-2.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-600 font-semibold text-sm hover:bg-emerald-500 hover:text-white transition-all"
              >
                <MessageCircle className="size-4" />
                <span>WhatsApp Us</span>
              </a>

              <Button
                asChild
                className="w-full bg-primary hover:bg-primary/95 text-white font-semibold text-sm h-11 rounded-xl shadow-md transition-all"
              >
                <Link to="/contact" hash="inspection" onClick={() => setOpen(false)} className="flex items-center justify-center gap-1.5">
                  <span>Get Free Inspection</span>
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
          </div>
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
