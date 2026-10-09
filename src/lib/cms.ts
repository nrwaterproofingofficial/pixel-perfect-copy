/**
 * Live website content from Lovable Cloud. Public pages read through these hooks so
 * anything the admin saves shows on the site. Static data in src/data/* is the
 * fallback shown until the database answers (and supplies icons / detail lists).
 */
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Droplets } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { services as staticServices, type Service } from "@/data/services";
import { projects as staticProjects, reviews as staticReviews, images, type Project, type Review } from "@/data/content";
import { site } from "@/lib/site";

const assets: Record<string, string> = {
  "asset:hero-terrace": images.heroTerrace, "asset:inspection": images.inspection,
  "asset:bathroom": images.bathroom, "asset:roof-finished": images.roofFinished,
};
export const resolveImage = (u: string) => assets[u] ?? u;

export type ServiceRow = { slug: string; title: string; short: string; solution: string; status: string; image_url: string | null; sort_order: number };

export function mergeService(r: ServiceRow): Service & { image?: string | undefined } {
  const base = staticServices.find((s) => s.slug === r.slug);
  return {
    slug: r.slug, title: r.title, short: r.short, solution: r.solution || base?.solution || "",
    status: r.status === "active" ? "active" : "draft",
    icon: base?.icon ?? Droplets, problems: base?.problems ?? [], inspection: base?.inspection ?? [], materials: base?.materials ?? [],
    image: r.image_url ? resolveImage(r.image_url) : undefined,
  };
}

export const servicesQuery = {
  queryKey: ["cms", "services"],
  queryFn: async () => {
    const { data, error } = await supabase.from("services").select("*").eq("status", "active").order("sort_order");
    if (error) throw error;
    return (data as ServiceRow[]).map(mergeService);
  },
};
export function useServices() {
  return useQuery({ ...servicesQuery, placeholderData: staticServices }).data ?? staticServices;
}

type ProjectRow = { id: string; name: string; location: string; service: string; problem: string; inspection: string; treatment: string; result: string;
  before_images: string[]; progress_images: string[]; after_images: string[]; completion_date: string };
export const toProject = (r: ProjectRow): Project => ({
  id: r.id, name: r.name, location: r.location, service: r.service, problem: r.problem, inspection: r.inspection, treatment: r.treatment, result: r.result,
  before: r.before_images.map(resolveImage), progress: r.progress_images.map(resolveImage), after: r.after_images.map(resolveImage), completionDate: r.completion_date,
});
export function useProjects() {
  return useQuery({
    queryKey: ["cms", "projects"], placeholderData: staticProjects,
    queryFn: async () => {
      const { data, error } = await supabase.from("projects").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return (data as ProjectRow[]).map(toProject);
    },
  }).data ?? staticProjects;
}

export function useReviews() {
  return useQuery({
    queryKey: ["cms", "reviews"], placeholderData: staticReviews,
    queryFn: async () => {
      const { data, error } = await supabase.from("reviews").select("id,name,rating,text,service,source").order("created_at", { ascending: false });
      if (error) throw error;
      return data as Review[];
    },
  }).data ?? staticReviews;
}

export type SiteSettings = Partial<{ name: string; phone: string; whatsapp: string; email: string; address: string; serviceArea: string; facebook: string; instagram: string; youtube: string }>;

/** Applies saved business settings onto the shared `site` object; returns a version number to re-render on change. */
export function useLiveSiteSettings() {
  const [version, setVersion] = useState(0);
  const { data } = useQuery({
    queryKey: ["cms", "settings"],
    queryFn: async () => {
      const { data, error } = await supabase.from("site_settings").select("data").eq("id", "main").maybeSingle();
      if (error) throw error;
      return (data?.data ?? {}) as SiteSettings;
    },
  });
  useEffect(() => {
    if (!data) return;
    applySettings(data);
    setVersion((v) => v + 1);
  }, [data]);
  return version;
}

export function applySettings(d: SiteSettings) {
  if (d.name) site.name = d.name;
  if (d.phone) { site.phone = d.phone; site.phoneHref = `tel:${d.phone.replace(/[^\d+]/g, "")}`; }
  if (d.whatsapp) site.whatsapp = d.whatsapp.replace(/\D/g, "");
  if (d.email) site.email = d.email;
  if (d.address) site.address = d.address;
  if (d.facebook) site.social.facebook = d.facebook;
  if (d.instagram) site.social.instagram = d.instagram;
  if (d.youtube) site.social.youtube = d.youtube;
}

/** Uploads a file to storage and returns a long-lived link the website can display. */
export async function uploadMedia(file: File, folder: string) {
  const path = `${folder}/${crypto.randomUUID()}-${file.name.replace(/[^\w.-]/g, "_")}`;
  const { error } = await supabase.storage.from("media").upload(path, file);
  if (error) throw error;
  const { data, error: e2 } = await supabase.storage.from("media").createSignedUrl(path, 60 * 60 * 24 * 365 * 20);
  if (e2) throw e2;
  return data.signedUrl;
}
