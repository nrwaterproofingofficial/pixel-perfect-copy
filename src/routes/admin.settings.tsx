import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PageHeader, Panel, DemoNote } from "@/components/admin/AdminKit";
import { site } from "@/lib/site";

export const Route = createFileRoute("/admin/settings")({ component: Page });

function Page() {
  const [pwErr, setPwErr] = useState("");
  const business = [
    ["Business Name", site.name], ["Phone", site.phone], ["WhatsApp", site.whatsapp], ["Email", site.email],
    ["Address", site.address], ["Service Area", "Kurnool, Andhra Pradesh"],
    ["Facebook", site.social.facebook], ["Instagram", site.social.instagram], ["YouTube", site.social.youtube],
  ];
  const savePw = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    if (f.get("next") !== f.get("confirm")) return setPwErr("New passwords don't match.");
    if (String(f.get("next")).length < 8) return setPwErr("Use at least 8 characters.");
    setPwErr(""); e.currentTarget.reset(); toast.success("Password change will apply once secure login is connected.");
  };
  return (
    <>
      <PageHeader title="Settings" />
      <DemoNote />
      <div className="grid gap-6 xl:grid-cols-3">
        <Panel className="p-6 xl:col-span-2">
          <h2 className="mb-5 font-semibold">Business Settings</h2>
          <form className="grid gap-4 sm:grid-cols-2" onSubmit={(e) => { e.preventDefault(); toast.success("Settings saved (preview)"); }}>
            {business.map(([l, v]) => <div key={l}><Label className="mb-1.5 block">{l}</Label><Input defaultValue={v} /></div>)}
            <div className="sm:col-span-2"><Button type="submit">Save settings</Button></div>
          </form>
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
