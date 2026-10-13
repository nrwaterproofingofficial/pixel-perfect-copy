import { createFileRoute, Outlet, useLocation } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/site/SiteChrome";
import { FloatingActions } from "@/components/site/extras";
import { useEffect, useRef } from "react";
import { useLiveSiteSettings } from "@/lib/cms";
import { useLiveSync } from "@/lib/live-sync";

export const Route = createFileRoute("/_site")({ component: SiteLayout });

function SiteLayout() {
  const shell = useRef<HTMLDivElement>(null);
  useLiveSync();
  const settingsVersion = useLiveSiteSettings();
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.06 });
    const watch = () => shell.current?.querySelectorAll("main section:not(.home-hero) > .container-site").forEach((element) => {
      if (element.getBoundingClientRect().top > window.innerHeight) {
        element.classList.add("scroll-reveal");
        observer.observe(element);
      }
    });
    watch();
    const mutation = new MutationObserver(watch);
    if (shell.current) mutation.observe(shell.current, { childList: true, subtree: true });
    return () => { observer.disconnect(); mutation.disconnect(); };
  }, []);
  // Pointer spotlight + subtle 3D tilt on cards (desktop pointers only).
  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const sel = ".service-card, .bento > *, .tilt";
    const move = (e: PointerEvent) => {
      const el = (e.target as HTMLElement).closest<HTMLElement>(sel);
      if (!el) return;
      const r = el.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
      el.style.setProperty("--mx", `${x * 100}%`); el.style.setProperty("--my", `${y * 100}%`);
      el.style.transform = `perspective(900px) rotateX(${(0.5 - y) * 5}deg) rotateY(${(x - 0.5) * 5}deg) translateY(-6px)`;
    };
    const out = (e: PointerEvent) => {
      const el = (e.target as HTMLElement).closest<HTMLElement>(sel);
      if (el && !el.contains(e.relatedTarget as Node)) el.style.transform = "";
    };
    const root = shell.current;
    root?.addEventListener("pointermove", move); root?.addEventListener("pointerout", out);
    return () => { root?.removeEventListener("pointermove", move); root?.removeEventListener("pointerout", out); };
  }, []);
  const { pathname } = useLocation();
  return (
    <div ref={shell} className="site-shell flex min-h-screen flex-col">
      <SiteHeader key={`h${settingsVersion}`} />
      <main key={`m${settingsVersion}-${pathname}`} className="page-enter flex-1"><Outlet /></main>
      <SiteFooter key={`f${settingsVersion}`} />
      <FloatingActions />
    </div>
  );
}
