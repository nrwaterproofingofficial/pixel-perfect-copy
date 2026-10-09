import { createFileRoute, Outlet } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/site/SiteChrome";
import { FloatingActions } from "@/components/site/extras";
import { useEffect, useRef } from "react";
import { useLiveSiteSettings } from "@/lib/cms";

export const Route = createFileRoute("/_site")({ component: SiteLayout });

function SiteLayout() {
  const shell = useRef<HTMLDivElement>(null);
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
  return (
    <div ref={shell} className="site-shell flex min-h-screen flex-col">
      <SiteHeader key={`h${settingsVersion}`} />
      <main className="flex-1"><Outlet /></main>
      <SiteFooter key={`f${settingsVersion}`} />
      <FloatingActions />
    </div>
  );
}
