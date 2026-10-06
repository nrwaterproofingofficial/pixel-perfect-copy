import {
  Home, Bath, Fence, Building2, Hammer, Waves, Container, Layers, Droplets, Zap,
  SplitSquareHorizontal, Factory, Sun, Search, type LucideIcon,
} from "lucide-react";

/** Matches the future `services` table. */
export type Service = {
  slug: string;
  title: string;
  short: string;
  icon: LucideIcon;
  problems: string[];
  inspection: string[];
  solution: string;
  materials: string[];
  status: "active" | "draft";
};

const commonInspection = [
  "Visual survey of the affected area and surroundings",
  "Crack, joint and pipe-penetration check",
  "Moisture / dampness assessment",
  "Review of any previous waterproofing",
];

const s = (
  slug: string, title: string, short: string, icon: LucideIcon,
  problems: string[], solution: string, materials: string[],
): Service => ({ slug, title, short, icon, problems, inspection: commonInspection, solution, materials, status: "active" });

export const services: Service[] = [
  s("terrace-waterproofing", "Terrace Waterproofing", "Stop roof seepage and ceiling dampness with a system suited to your terrace slope and exposure.", Home,
    ["Ceiling leakage during rain", "Water ponding on the terrace", "Cracks in the roof slab or screed", "Peeling paint and dampness below"],
    "After checking slope, drainage outlets and cracks, we prepare the surface, treat cracks and parapet joints, and apply a terrace system selected for the exposure and usage.",
    ["Polymer-modified cementitious coating", "Crack fillers & PU sealant", "Fiberglass mesh at junctions", "Heat reflective top coat (optional)"]),
  s("bathroom-waterproofing", "Bathroom Waterproofing", "Treat leaks from bathrooms into walls and ceilings below — with or without tile removal where suitable.", Bath,
    ["Dampness on adjoining walls", "Leakage into the ceiling below", "Gaps in tile joints", "Leaks around floor traps and pipes"],
    "We locate the leak path (joints, pipes or floor trap), then recommend either tile-joint sealing or full membrane treatment depending on severity.",
    ["Cementitious membrane", "Epoxy tile grout", "Pipe-penetration sealing", "Corner fiberglass mesh"]),
  s("balcony-waterproofing", "Balcony Waterproofing", "Protect balconies and sit-outs from seepage into rooms and slabs below.", Fence,
    ["Water entering rooms from the balcony", "Damp ceiling below", "Poor slope towards drain"],
    "We correct drainage where feasible, seal the door-sill junction and apply a waterproofing layer suited to the finish.",
    ["Polymer-modified coating", "PU sealant at junctions", "Repair mortar"]),
  s("new-house-waterproofing", "New House Waterproofing", "Build it right from the start — waterproofing planned during construction.", Building2,
    ["Planning wet areas during construction", "Sunken slab protection", "Foundation and plinth moisture"],
    "We coordinate with your builder to treat sunken slabs, terraces, tanks and wet areas at the right construction stage.",
    ["Integral & coating systems", "Membranes for sunken areas", "Joint treatment materials"]),
  s("old-house-waterproofing", "Old House Waterproofing", "Repair long-standing leakage in older buildings after careful diagnosis.", Hammer,
    ["Multiple leakage points", "Failed earlier waterproofing", "Weak, cracked plaster"],
    "We assess what has failed and why, remove weak layers where needed, repair the substrate, and re-waterproof affected zones.",
    ["Repair mortars", "Crack fillers", "Polymer-modified coatings"]),
  s("swimming-pool-waterproofing", "Swimming Pool Waterproofing", "Water-tight pools with systems compatible with treated water and tiling.", Waves,
    ["Water level dropping", "Leakage at joints and fittings", "Tile debonding"],
    "We inspect the shell, fittings and joints, then apply a system suited to continuous immersion before tiling.",
    ["Cementitious pool membranes", "Epoxy grout", "Joint sealants"]),
  s("water-tank-waterproofing", "Concrete Water Tank Waterproofing", "Leak-proof sumps and overhead tanks with systems suitable for stored water.", Container,
    ["Seepage from tank walls", "Leaking pipe inlets", "Dampness around the sump"],
    "After draining and cleaning, we treat cracks and inlets and apply a system appropriate for water-retaining structures.",
    ["Cementitious tank coatings", "Pipe-inlet sealing", "Repair mortar"]),
  s("slab-leakage-treatment", "Slab Leakage Treatment", "Targeted treatment for leaks through RCC slabs and ceilings.", Layers,
    ["Drips from ceiling", "Wet patches after rain", "Rusting reinforcement stains"],
    "We trace the leakage source above the slab, treat cracks and junctions, and protect the slab surface.",
    ["Crack fillers", "PU sealants", "Protective coatings"]),
  s("damp-wall-treatment", "Damp Wall Treatment", "Fix damp walls, salt deposits and peeling paint at the cause.", Droplets,
    ["Peeling paint and efflorescence", "Musty smell", "Rising dampness at skirting level"],
    "We identify whether moisture is coming from outside, from plumbing or rising from below, then treat that specific cause.",
    ["Damp-proof coatings", "Repair plaster", "Exterior protective coatings"]),
  s("crack-treatment", "Crack Treatment", "Seal structural and non-structural cracks that let water in.", Zap,
    ["Hairline cracks on walls", "Cracks in terrace screed", "Water entering through cracks"],
    "Cracks are opened, cleaned and filled with a material chosen for their width and movement.",
    ["Crack fillers", "PU sealants", "Fiberglass mesh"]),
  s("expansion-joint-waterproofing", "Expansion Joint Waterproofing", "Flexible sealing for movement joints in buildings and slabs.", SplitSquareHorizontal,
    ["Leaks along building joints", "Failed joint fillers", "Gaps between structures"],
    "We clean out failed fillers and install a flexible sealing system rated for the expected movement.",
    ["Backer rods", "PU sealants", "Joint treatment materials"]),
  s("commercial-waterproofing", "Commercial Waterproofing", "Planned waterproofing for offices, shops, apartments and industrial roofs.", Factory,
    ["Large roof areas", "Basement seepage", "Minimal downtime required"],
    "We survey the site, phase the work to suit operations, and specify systems per area and use.",
    ["Cementitious & polymer systems", "Epoxy coatings", "Protective coatings"]),
  s("heat-reflective-coating", "Heat Reflective Coating", "Reduce roof heat while adding a protective layer to the terrace.", Sun,
    ["Hot top-floor rooms", "Surface cracking from heat", "Weathered roof finish"],
    "After surface preparation and crack treatment, a reflective coating is applied to suit the roof condition.",
    ["Heat reflective coatings", "Primer", "Crack fillers"]),
];

export const leakageInspection = {
  slug: "leakage-inspection",
  title: "Leakage Inspection",
  short: "Find the actual leakage source before spending on treatment.",
  icon: Search,
};

export const quickServiceSlugs = [
  "terrace-waterproofing", "bathroom-waterproofing", "water-tank-waterproofing",
  "swimming-pool-waterproofing", "commercial-waterproofing",
];

export const getService = (slug: string) => services.find((x) => x.slug === slug);
