import { useState, type FormEvent } from "react";
import {
  CheckCircle2,
  Upload,
  Loader2,
  Sparkles,
  Zap,
  ShieldCheck,
  MapPin,
  Phone,
  User,
  MessageSquare,
  Home,
  Building,
  Building2,
  Factory,
  Layers,
  Droplet,
  FileCheck,
  X,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useServices } from "@/lib/cms";
import { toast } from "sonner";
import { submitEnquiry, type EnquirySource } from "@/lib/enquiries";
import { whatsappLink, site } from "@/lib/site";

const propertyTypes = [
  { label: "Independent House", icon: Home },
  { label: "Apartment", icon: Building },
  { label: "Villa", icon: Building2 },
  { label: "Commercial", icon: Factory },
  { label: "Industrial", icon: Layers },
  { label: "Other", icon: ShieldCheck },
];

const leakageAreas = [
  { label: "Terrace", icon: Layers },
  { label: "Bathroom", icon: Droplet },
  { label: "Balcony", icon: Home },
  { label: "Wall Seepage", icon: Building2 },
  { label: "Water Tank", icon: Droplet },
  { label: "Other", icon: ShieldCheck },
];

export function InspectionForm({ source = "Free Inspection", defaultService = "" }: { source?: EnquirySource; defaultService?: string }) {
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");
  const [files, setFiles] = useState<File[]>([]);
  const [selectedProperty, setSelectedProperty] = useState<string>("Independent House");
  const [selectedArea, setSelectedArea] = useState<string>("Terrace");
  const [selectedService, setSelectedService] = useState<string>(defaultService);
  const [refId, setRefId] = useState<string>("");
  const services = useServices();

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    setState("sending");
    
    try {
    await submitEnquiry({
      name: String(f.get("name")),
      phone: String(f.get("phone")),
      location: String(f.get("location")),
      propertyType: selectedProperty,
      leakageArea: selectedArea,
      service: selectedService || "General Inspection",
      message: String(f.get("message")),
      files,
      source,
    });
    } catch {
      setState("idle");
      toast.error("Could not send your request. Please call or WhatsApp us.");
      return;
    }

    setRefId("NR-" + Math.floor(100000 + Math.random() * 900000));
    setState("done");
  }

  const removeFile = (idx: number) => {
    setFiles(files.filter((_, i) => i !== idx));
  };

  if (state === "done") {
    return (
      <div className="relative overflow-hidden rounded-3xl border border-emerald-500/30 bg-card p-8 sm:p-10 text-center shadow-2xl backdrop-blur-xl animate-in zoom-in-95 duration-300">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-400 via-teal-500 to-emerald-600" />
        <div className="mx-auto grid size-20 place-items-center rounded-2xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 shadow-inner">
          <CheckCircle2 className="size-10" />
        </div>

        <div className="mt-6 space-y-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-mono font-semibold text-emerald-600 dark:text-emerald-400">
            <Sparkles className="size-3.5" /> REQUEST CONFIRMED · REF: {refId}
          </span>
          <h3 className="text-2xl font-extrabold tracking-tight text-foreground">Inspection Scheduled</h3>
          <p className="mx-auto max-w-md text-sm text-muted-foreground leading-relaxed">
            Our Kurnool technical team has received your details. An inspection specialist will contact you within 15 minutes.
          </p>
        </div>

        <div className="mt-8 rounded-2xl border border-border/80 bg-muted/60 p-4 text-left text-xs space-y-2">
          <div className="flex justify-between text-muted-foreground">
            <span>Location:</span>
            <span className="font-semibold text-foreground">Kurnool Area Desk</span>
          </div>
          <div className="flex justify-between text-muted-foreground">
            <span>Property & Area:</span>
            <span className="font-semibold text-foreground">{selectedProperty} · {selectedArea}</span>
          </div>
          <div className="flex justify-between text-muted-foreground">
            <span>Status:</span>
            <span className="font-semibold text-emerald-600 flex items-center gap-1">
              <span className="size-2 rounded-full bg-emerald-500 animate-ping" /> Dispatching Technician
            </span>
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <Button asChild size="lg" className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl">
            <a href={whatsappLink(`Hi NR Waterproofing, I just submitted request #${refId}. Please confirm time.`)} target="_blank" rel="noreferrer">
              Chat on WhatsApp Now
            </a>
          </Button>
          <Button variant="outline" size="lg" className="rounded-xl border-border" onClick={() => setState("idle")}>
            New Request
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="relative overflow-hidden rounded-3xl border border-primary/20 bg-card p-6 sm:p-9 shadow-2xl shadow-primary/5 backdrop-blur-xl transition-all"
    >
      {/* Top AI Decorative Bar */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary via-blue-500 to-cyan-400" />

      {/* Header Banner */}
      <div className="mb-8 pb-6 border-b border-border/60">
        <div className="flex items-center justify-between gap-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
            <ShieldCheck className="size-3.5 text-primary" />
            Free On-Site Inspection
          </div>
          <span className="hidden sm:inline-flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
            <span className="size-2 rounded-full bg-emerald-500" />
            Active in Kurnool
          </span>
        </div>
        <h3 className="mt-3 text-2xl font-bold tracking-tight text-foreground">Book Free On-Site Inspection</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Fill in your details below for instant diagnosis and no-obligation quote.
        </p>
      </div>

      <div className="space-y-6">
        {/* Contact Info Group */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <User className="size-3.5 text-primary" /> Full Name *
            </Label>
            <Input
              name="name"
              required
              className="h-12 rounded-xl border-border/80 bg-background/60 px-4 text-sm font-medium focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:border-primary transition-all"
              placeholder="e.g. Rajesh Reddy"
            />
          </div>

          <div>
            <Label className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <Phone className="size-3.5 text-primary" /> Phone Number *
            </Label>
            <Input
              name="phone"
              type="tel"
              required
              pattern="[0-9+ ]{10,15}"
              className="h-12 rounded-xl border-border/80 bg-background/60 px-4 text-sm font-medium focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:border-primary transition-all"
              placeholder="10-digit mobile number"
            />
          </div>

          <div className="sm:col-span-2">
            <Label className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <MapPin className="size-3.5 text-primary" /> Location / Area in Kurnool *
            </Label>
            <Input
              name="location"
              required
              className="h-12 rounded-xl border-border/80 bg-background/60 px-4 text-sm font-medium focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:border-primary transition-all"
              placeholder="e.g. Nandyal Checkpost, Bellary Road, Kurnool"
            />
          </div>
        </div>

        {/* Visual Property Selector */}
        <div>
          <Label className="mb-2.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Select Property Type
          </Label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {propertyTypes.map(({ label, icon: Icon }) => (
              <button
                key={label}
                type="button"
                onClick={() => setSelectedProperty(label)}
                className={`flex items-center gap-2.5 rounded-xl border p-3 text-xs font-semibold text-left transition-all ${
                  selectedProperty === label
                    ? "border-primary bg-primary/10 text-primary shadow-xs"
                    : "border-border/70 bg-background/60 text-foreground/80 hover:bg-muted"
                }`}
              >
                <Icon className="size-4 shrink-0" />
                <span className="truncate">{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Visual Area Selector */}
        <div>
          <Label className="mb-2.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Select Leakage Area
          </Label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {leakageAreas.map(({ label, icon: Icon }) => (
              <button
                key={label}
                type="button"
                onClick={() => setSelectedArea(label)}
                className={`flex items-center gap-2.5 rounded-xl border p-3 text-xs font-semibold text-left transition-all ${
                  selectedArea === label
                    ? "border-primary bg-primary/10 text-primary shadow-xs"
                    : "border-border/70 bg-background/60 text-foreground/80 hover:bg-muted"
                }`}
              >
                <Icon className="size-4 shrink-0" />
                <span className="truncate">{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Service Selector Dropdown */}
        <div>
          <Label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Specific Service Needed (Optional)
          </Label>
          <select
            name="service"
            value={selectedService}
            onChange={(e) => setSelectedService(e.target.value)}
            className="flex h-12 w-full rounded-xl border border-border/80 bg-background/60 px-4 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:border-primary transition-all"
          >
            <option value="">Not sure — Need inspection diagnosis</option>
            {services.map((s) => (
              <option key={s.slug} value={s.title}>
                {s.title}
              </option>
            ))}
          </select>
        </div>

        {/* Upload Zone with Previews */}
        <div>
          <Label className="mb-2 flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            <span>Upload Photos / Videos (Optional)</span>
            <span className="text-[11px] font-normal text-muted-foreground">Helps team pre-diagnose</span>
          </Label>
          
          <label className="group flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border/80 bg-muted/30 px-6 py-6 text-center transition-all hover:border-primary/50 hover:bg-primary/5">
            <div className="grid size-12 place-items-center rounded-2xl bg-primary/10 text-primary transition-transform group-hover:scale-110">
              <Upload className="size-6" />
            </div>
            <p className="mt-3 text-xs font-semibold text-foreground">
              Click or drag leakage photos & videos here
            </p>
            <p className="mt-1 text-[11px] text-muted-foreground">
              PNG, JPG, MP4 up to 50MB
            </p>
            <input
              type="file"
              multiple
              accept="image/*,video/*"
              className="sr-only"
              onChange={(e) => setFiles(Array.from(e.target.files ?? []))}
            />
          </label>

          {/* Selected File Chips */}
          {files.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {files.map((file, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground shadow-xs"
                >
                  <FileCheck className="size-3.5 text-primary" />
                  <span className="max-w-[140px] truncate">{file.name}</span>
                  <button
                    type="button"
                    onClick={() => removeFile(i)}
                    className="ml-1 text-muted-foreground hover:text-destructive"
                  >
                    <X className="size-3.5" />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Problem Description */}
        <div>
          <Label className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            <MessageSquare className="size-3.5 text-primary" /> Describe Leakage / Problem Details
          </Label>
          <Textarea
            name="message"
            rows={3}
            className="rounded-xl border-border/80 bg-background/60 p-4 text-sm font-medium focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:border-primary transition-all"
            placeholder="Where is water coming from? How long has it been leaking?"
          />
        </div>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        size="lg"
        className="mt-8 h-13 w-full rounded-xl bg-gradient-to-r from-primary via-blue-600 to-indigo-600 hover:brightness-110 text-white font-bold text-base shadow-lg shadow-primary/25 transition-all flex items-center justify-center gap-2 border-none"
        disabled={state === "sending"}
      >
        {state === "sending" ? (
          <>
            <Loader2 className="size-5 animate-spin" />
            <span>Connecting to Kurnool Desk…</span>
          </>
        ) : (
          <>
            <ShieldCheck className="size-5" />
            <span>Request Free Site Inspection</span>
            <ArrowRight className="size-5" />
          </>
        )}
      </Button>

      {/* Security Guarantee Badge */}
      <div className="mt-4 flex items-center justify-center gap-4 text-center text-[11px] text-muted-foreground">
        <span className="flex items-center gap-1"><ShieldCheck className="size-3.5 text-emerald-500" /> 100% Free On-Site Visit</span>
        <span>•</span>
        <span>No Hidden Fees</span>
        <span>•</span>
        <span>Written Warranty Guarantee</span>
      </div>
    </form>
  );
}
