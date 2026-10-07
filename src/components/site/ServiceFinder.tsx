import { useState } from "react";
import { Search, X, Home, Bath, Droplets, Container, Zap, ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { services } from "@/data/services";
import { ServiceCard } from "./blocks";

const areas = [
  { label: "Terrace", icon: Home, slug: "terrace-waterproofing" },
  { label: "Bathroom", icon: Bath, slug: "bathroom-waterproofing" },
  { label: "Damp walls", icon: Droplets, slug: "damp-wall-treatment" },
  { label: "Water tank", icon: Container, slug: "water-tank-waterproofing" },
  { label: "Cracks", icon: Zap, slug: "crack-treatment" },
];

export function ServiceFinder({ catalogue = false }: { catalogue?: boolean }) {
  const [query, setQuery] = useState("");
  const [area, setArea] = useState<string | null>(null);
  const selected = services.find((service) => service.slug === area);
  const matches = services.filter((service) => service.status === "active" &&
    `${service.title} ${service.short} ${service.problems.join(" ")}`.toLowerCase().includes(query.trim().toLowerCase()));
  const visible = catalogue || query.trim() ? matches : matches.filter((service) =>
    ["terrace-waterproofing", "bathroom-waterproofing", "water-tank-waterproofing"].includes(service.slug));
  return (
    <div className="service-finder">
      <div className="finder-toolbar flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="eyebrow mb-3">Find your solution</p>
          <h2 className="text-3xl font-semibold text-foreground">Where is the leakage?</h2>
        </div>
        <div className="relative w-full sm:w-80">
          <Search className="pointer-events-none absolute left-3 top-3.5 size-4 text-muted-foreground" />
          <Input aria-label="Search services" placeholder="Search services or problems" value={query}
            onChange={(event) => setQuery(event.target.value)} className="h-11 bg-card pl-10 pr-10" />
          {query && <Button variant="ghost" size="icon" className="absolute right-1 top-1 size-9" aria-label="Clear search" onClick={() => setQuery("")}><X className="size-4" /></Button>}
        </div>
      </div>
      <div className="my-7 grid grid-cols-2 gap-2 sm:grid-cols-5" role="group" aria-label="Leakage area">
        {areas.map(({ label, icon: Icon, slug }) => <Button key={slug} variant={area === slug ? "default" : "outline"}
          aria-pressed={area === slug} className="h-14 gap-3 whitespace-normal" onClick={() => setArea(area === slug ? null : slug)}><Icon className="size-5 shrink-0" />{label}</Button>)}
      </div>
      {selected && <div className="finder-result mb-8 border-l-2 border-primary bg-accent px-5 py-6" aria-live="polite">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="max-w-2xl"><h3 className="text-xl font-semibold">{selected.title}</h3><p className="mt-2 text-sm text-muted-foreground">{selected.short}</p>
            <ul className="mt-4 grid gap-2 text-sm sm:grid-cols-2">{selected.problems.map((problem) => <li key={problem} className="flex gap-2"><span className="text-primary">•</span>{problem}</li>)}</ul>
          </div>
          <Button asChild><Link to="/services/$slug" params={{ slug: selected.slug }}>View treatment <ArrowRight /></Link></Button>
        </div>
        <p className="mt-4 text-xs text-muted-foreground">The appropriate treatment is confirmed after a site inspection.</p>
      </div>}
      <div className="mb-4 flex items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground" aria-live="polite">{query.trim() ? `${matches.length} matching services` : catalogue ? `${visible.length} services` : "Popular services"}</p>
        {!catalogue && <Button asChild variant="ghost" size="sm"><Link to="/services">All services <ArrowRight /></Link></Button>}
      </div>
      {visible.length ? <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{visible.map((service) => <ServiceCard key={service.slug} service={service} />)}</div> :
        <div className="border-y border-border py-10 text-center"><h3 className="font-semibold">No matching services</h3><Button variant="outline" className="mt-4" onClick={() => setQuery("")}>Clear search</Button><Button asChild variant="link"><Link to="/leakage-inspection">Request an inspection <ArrowRight /></Link></Button></div>}
    </div>
  );
}