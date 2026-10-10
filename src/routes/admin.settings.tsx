import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PageHeader, Panel } from "@/components/admin/AdminKit";
import { supabase } from "@/integrations/supabase/client";
import { site } from "@/lib/site";
import type { SiteSettings } from "@/lib/cms";

export const Route = createFileRoute("/admin/settings")({ component: Page });

const fields: [keyof SiteSettings, string, string][] = [
  ["name", "Business Name", site.name], ["phone", "Phone", site.phone], ["whatsapp", "WhatsApp (with country code)", site.whatsapp],
  ["email", "Email", site.email], ["address", "Address", site.address], ["serviceArea", "Service Area", "Kurnool, Andhra Pradesh"],
  ["facebook", "Facebook link", site.social.facebook], ["instagram", "Instagram link", site.social.instagram], ["youtube", "YouTube link", site.social.youtube],
];

function Page() {
  const qc = useQueryClient();
  const [pwErr, setPwErr] = useState("");
  const { data, isLoading } = useQuery({
    queryKey: ["admin", "settings"],
    queryFn: async () => {
      const { data, error } = await supabase.from("site_settings").select("data").eq("id", "main").maybeSingle();
      if (error) throw error;
      return (data?.data ?? {}) as SiteSettings;
    },
  });
  const saveSettings = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const next: SiteSettings = {};
    for (const [k] of fields) next[k] = String(f.get(k) ?? "").trim();
    const { error } = await supabase.from("site_settings").upsert({ id: "main", data: next });
    if (error) return toast.error("Could not save settings");
    toast.success("Settings saved — live on the website");
    void qc.invalidateQueries({ queryKey: ["admin", "settings"] }); void qc.invalidateQueries({ queryKey: ["cms"] });
  };
  const savePw = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget, f = new FormData(form);
    if (f.get("next") !== f.get("confirm")) return setPwErr("New passwords don't match.");
    if (String(f.get("next")).length < 8) return setPwErr("Use at least 8 characters.");
    setPwErr("");
    const { error } = await supabase.auth.updateUser({ password: String(f.get("next")), current_password: String(f.get("current")) } as never);
    if (error) return setPwErr(error.message);
    form.reset(); toast.success("Password updated");
  };
  return (
    <>
      <PageHeader title="Settings" intro="Contact details here appear across the whole website." />
      <div className="grid gap-6 xl:grid-cols-3">
        <Panel className="p-6 xl:col-span-2">
          <h2 className="mb-5 font-semibold">Business Settings</h2>
          {isLoading ? <p className="text-sm text-muted-foreground">Loading…</p> : (
            <form className="grid gap-4 sm:grid-cols-2" onSubmit={saveSettings}>
              {fields.map(([k, l, fallback]) => <div key={k}><Label className="mb-1.5 block">{l}</Label><Input name={k} defaultValue={data?.[k] || fallback} /></div>)}
              <div className="sm:col-span-2"><Button type="submit">Save settings</Button></div>
            </form>
          )}
        </Panel>
        <Panel className="p-6">
          <h2 className="mb-5 font-semibold">Security — Change Password</h2>
          <form className="space-y-4" onSubmit={savePw}>
            <div><Label className="mb-1.5 block">Current Password</Label><Input name="current" type="password" required /></div>
            <div><Label className="mb-1.5 block">New Password</Label><Input name="next" type="password" required /></div>
            <div><Label className="mb-1.5 block">Confirm New Password</Label><Input name="confirm" type="password" required /></div>
            {pwErr && <p className="text-sm text-destructive">{pwErr}</p>}
            <Button type="submit" className="w-full">Update password</Button>
          </form>
        </Panel>
      </div>
    </>
  );
}
