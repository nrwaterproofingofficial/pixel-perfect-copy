import { useState, type FormEvent } from "react";
import { CheckCircle2, Upload, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { services } from "@/data/services";
import { submitEnquiry, type EnquirySource } from "@/lib/enquiries";
import { ContactButtons } from "./blocks";

const propertyTypes = ["Independent House", "Apartment", "Villa", "Commercial", "Industrial", "Other"];
const leakageAreas = ["Terrace", "Bathroom", "Balcony", "Wall", "Water Tank", "Swimming Pool", "Basement", "Other"];

const selectCls = "flex h-11 w-full rounded-lg border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

export function InspectionForm({ source = "Free Inspection", defaultService = "" }: { source?: EnquirySource; defaultService?: string }) {
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");
  const [files, setFiles] = useState<File[]>([]);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    setState("sending");
    await submitEnquiry({
      name: String(f.get("name")), phone: String(f.get("phone")), location: String(f.get("location")),
      propertyType: String(f.get("propertyType")), leakageArea: String(f.get("leakageArea")),
      service: String(f.get("service")), message: String(f.get("message")), files, source,
    });
    setState("done");
  }

  if (state === "done") {
    return (
      <div className="rounded-2xl border border-border bg-card p-8 text-center shadow-soft">
        <CheckCircle2 className="mx-auto size-12 text-success" />
        <h3 className="mt-4 text-xl font-semibold">Request received</h3>
        <p className="mt-2 text-muted-foreground">Our team will call you shortly to schedule the inspection.</p>
        <Button variant="outline" className="mt-6" onClick={() => setState("idle")}>Send another request</Button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="rounded-2xl border border-border bg-card p-6 shadow-soft md:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name"><Input name="name" required className="h-11" placeholder="Your name" /></Field>
        <Field label="Phone Number"><Input name="phone" type="tel" required pattern="[0-9+ ]{10,15}" className="h-11" placeholder="10-digit mobile" /></Field>
        <Field label="Location"><Input name="location" required className="h-11" placeholder="Area, Kurnool" /></Field>
        <Field label="Property Type">
          <select name="propertyType" required className={selectCls} defaultValue="">
            <option value="" disabled>Select</option>{propertyTypes.map((p) => <option key={p}>{p}</option>)}
          </select>
        </Field>
        <Field label="Leakage Area">
          <select name="leakageArea" required className={selectCls} defaultValue="">
            <option value="" disabled>Select</option>{leakageAreas.map((p) => <option key={p}>{p}</option>)}
          </select>
        </Field>
        <Field label="Service Required">
          <select name="service" className={selectCls} defaultValue={defaultService}>
            <option value="">Not sure — need inspection</option>{services.map((s) => <option key={s.slug}>{s.title}</option>)}
          </select>
        </Field>
        <div className="sm:col-span-2">
          <Label className="mb-2 block">Upload Photos / Videos</Label>
          <label className="flex cursor-pointer flex-col items-center gap-2 rounded-lg border-2 border-dashed border-input bg-muted/60 px-4 py-6 text-center text-sm text-muted-foreground transition-colors hover:border-secondary">
            <Upload className="size-5 text-secondary" />
            {files.length ? `${files.length} file(s) selected` : "Tap to add photos or videos of the leakage"}
            <input type="file" multiple accept="image/*,video/*" className="sr-only" onChange={(e) => setFiles(Array.from(e.target.files ?? []))} />
          </label>
        </div>
        <Field label="Describe the Problem" full>
          <Textarea name="message" rows={4} placeholder="Where is the leakage, since when, any previous waterproofing?" />
        </Field>
      </div>
      <Button type="submit" size="lg" className="mt-6 w-full" disabled={state === "sending"}>
        {state === "sending" ? <><Loader2 className="animate-spin" /> Sending…</> : "Request Inspection / Estimate"}
      </Button>
      <div className="mt-4 grid grid-cols-2 gap-3 [&>a]:w-full"><ContactButtons inspection={false} /></div>
    </form>
  );
}

function Field({ label, children, full }: { label: string; children: React.ReactNode; full?: boolean }) {
  return <div className={full ? "sm:col-span-2" : ""}><Label className="mb-2 block">{label}</Label>{children}</div>;
}
