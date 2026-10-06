import heroTerrace from "@/assets/hero-terrace.jpg";
import inspection from "@/assets/inspection.jpg";
import bathroom from "@/assets/bathroom.jpg";
import roofFinished from "@/assets/roof-finished.jpg";

/** Placeholder content for V1. Shapes mirror the future DB tables. */

export type Project = {
  id: string; name: string; location: string; service: string;
  problem: string; inspection: string; treatment: string; result: string;
  before: string[]; progress: string[]; after: string[]; completionDate: string;
};

export const projects: Project[] = [
  { id: "p1", name: "Independent House Terrace", location: "Kurnool", service: "Terrace Waterproofing",
    problem: "Ceiling leakage in two bedrooms during monsoon.", inspection: "Ponding near parapet, cracked screed, blocked outlet.",
    treatment: "Crack filling, parapet joint treatment, polymer-modified coating with mesh.", result: "No leakage reported through the following monsoon.",
    before: [inspection], progress: [heroTerrace], after: [roofFinished], completionDate: "2026-03-14" },
  { id: "p2", name: "Apartment Bathroom Leak", location: "Kurnool", service: "Bathroom Waterproofing",
    problem: "Dampness in the flat below around the floor trap.", inspection: "Leak traced to trap joint and tile gaps.",
    treatment: "Floor-trap sealing, membrane with corner mesh, re-tiling.", result: "Ceiling below dried out; repainted.",
    before: [inspection], progress: [bathroom], after: [bathroom], completionDate: "2026-05-02" },
  { id: "p3", name: "Commercial Roof Coating", location: "Kurnool", service: "Heat Reflective Coating",
    problem: "Weathered roof, hairline cracks and high top-floor heat.", inspection: "Hairline cracking across roof; outlets OK.",
    treatment: "Surface cleaning, crack treatment, reflective protective coating.", result: "Uniform protective finish over the roof area.",
    before: [heroTerrace], progress: [heroTerrace], after: [roofFinished], completionDate: "2026-07-20" },
];

export type Review = {
  id: string; name: string; rating: number; text: string; service: string;
  source: "Google" | "WhatsApp" | "Video" | "Direct";
};

export const reviews: Review[] = [
  { id: "r1", name: "Customer, Kurnool", rating: 5, service: "Terrace Waterproofing", source: "Google",
    text: "They first checked the whole terrace and explained why it was leaking. Work was neat and finished on time." },
  { id: "r2", name: "Apartment owner", rating: 5, service: "Bathroom Waterproofing", source: "WhatsApp",
    text: "Leak into the flat below was solved. The team explained the options clearly before starting." },
  { id: "r3", name: "Shop owner", rating: 4, service: "Commercial Waterproofing", source: "Direct",
    text: "Professional team, planned the work so the shop could stay open." },
];

export const faqs: { q: string; a: string }[] = [
  { q: "How do you identify the leakage source?", a: "We inspect the affected area and the zones above and around it — cracks, joints, pipe penetrations, slope, ponding and any previous waterproofing — and check moisture levels before recommending a treatment." },
  { q: "How much does waterproofing cost in Kurnool?", a: "Cost depends on area, surface condition, leakage source and the selected system. We give a clear estimate after inspection." },
  { q: "How many days does waterproofing take?", a: "Small areas can take 1–3 days; larger terraces or commercial work take longer including curing time. We share a timeline with the estimate." },
  { q: "Is waterproofing permanent?", a: "No system lasts forever. Life depends on the system, exposure, usage and maintenance. We explain expected performance for your site." },
  { q: "Can waterproofing be done during rainy season?", a: "Some work is possible in dry spells, but most coatings need a dry surface and curing time. We plan around the weather." },
  { q: "Do you provide a certificate?", a: "Yes, a waterproofing certificate can be issued for completed projects, listing the area treated and the work done." },
  { q: "Do you provide warranty?", a: "Warranty terms are project-specific and depend on the system, site condition and scope. They are written on the certificate." },
  { q: "Can old waterproofing be repaired?", a: "Often yes. We check whether the old layer is sound; weak or failed layers may need removal before re-treatment." },
  { q: "Can bathroom leakage be treated without removing tiles?", a: "In some cases — for example tile-joint or pipe-joint leaks. If the membrane below has failed, tile removal may be needed." },
  { q: "Why is leakage happening even after previous waterproofing?", a: "Common reasons are wrong diagnosis, poor surface preparation, untreated cracks or joints, or a system unsuited to the site." },
  { q: "How should the surface be prepared?", a: "Surfaces are cleaned, loose material removed, cracks and joints treated and the surface brought to the required moisture condition." },
  { q: "When can the area be used after waterproofing?", a: "It depends on the system's curing time — typically light use after a few days. We give specific guidance for your site." },
];

export const systems = [
  { name: "Cementitious Waterproofing", desc: "Cement-based coatings for terraces, tanks and wet areas." },
  { name: "Polymer-Modified Systems", desc: "Added flexibility and adhesion for surfaces with minor movement." },
  { name: "Crack Fillers", desc: "Selected by crack width and whether the crack is moving." },
  { name: "PU Sealants", desc: "Flexible sealing for joints, pipes and junctions." },
  { name: "Epoxy Coatings", desc: "Chemical-resistant, hard-wearing finishes for specific areas." },
  { name: "Joint Treatment Materials", desc: "Systems for construction and expansion joints." },
  { name: "Repair Mortars", desc: "Rebuild damaged concrete and plaster before waterproofing." },
  { name: "Fiberglass Mesh", desc: "Reinforcement at corners, cracks and junctions." },
  { name: "Protective Coatings", desc: "Top coats that protect the system from UV and wear." },
];

export const processSteps = [
  { n: "01", t: "Inspection", d: "Understand the leakage/problem." },
  { n: "02", t: "Diagnosis", d: "Identify the likely source and contributing factors." },
  { n: "03", t: "Estimate", d: "Explain scope, materials, cost and expected timeline." },
  { n: "04", t: "Surface Preparation", d: "Cleaning and preparation." },
  { n: "05", t: "Crack & Joint Treatment", d: "Treat identified cracks and joints." },
  { n: "06", t: "Waterproofing Application", d: "Apply the selected waterproofing system." },
  { n: "07", t: "Testing / Curing", d: "Allow required curing/drying and perform applicable testing." },
  { n: "08", t: "Final Inspection", d: "Check the completed work." },
];

export const inspectionChecks = [
  "Visual inspection", "Crack identification", "Moisture / dampness assessment", "Pipe penetration inspection",
  "Terrace slope inspection", "Ponding inspection", "Joint inspection", "Previous waterproofing assessment",
];

export const images = { heroTerrace, inspection, bathroom, roofFinished };
