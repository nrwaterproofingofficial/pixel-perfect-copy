import { useState, type ReactNode } from "react";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { EnquiryStatus } from "@/lib/enquiries";
import { uploadMedia } from "@/lib/cms";
import { toast } from "sonner";


export function PageHeader({ title, intro, action }: { title: string; intro?: string; action?: ReactNode }) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div><h1 className="text-2xl font-bold text-foreground">{title}</h1>{intro && <p className="mt-1 text-sm text-muted-foreground">{intro}</p>}</div>
      {action}
    </div>
  );
}

export function Panel({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`rounded-xl border border-border bg-card shadow-soft ${className}`}>{children}</div>;
}

const statusTone: Record<EnquiryStatus, string> = {
  New: "bg-secondary text-secondary-foreground",
  Contacted: "bg-accent text-accent-foreground",
  "Inspection Scheduled": "bg-warning/20 text-foreground",
  "Estimate Sent": "bg-primary/10 text-primary",
  Converted: "bg-success/15 text-success",
  Closed: "bg-muted text-muted-foreground",
};
export function StatusBadge({ status }: { status: EnquiryStatus }) {
  return <span className={`inline-flex whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusTone[status]}`}>{status}</span>;
}

export type FieldDef = { key: string; label: string; type?: "text" | "textarea" | "number" | "date" | "select" | "file"; options?: string[] };

/** Generic add/edit dialog used by every admin content manager. */
export function EditDialog<T extends Record<string, unknown>>({ open, onOpenChange, title, fields, value, onSave }: {
  open: boolean; onOpenChange: (o: boolean) => void; title: string; fields: FieldDef[]; value: T; onSave: (v: T) => void;
}) {
  const [draft, setDraft] = useState<T>(value);
  const [key, setKey] = useState(value);
  if (key !== value) { setKey(value); setDraft(value); }
  const [uploading, setUploading] = useState(false);
  const set = (k: string, v: unknown) => setDraft((d) => ({ ...d, [k]: v }));
  const upload = async (k: string, files: File[]) => {
    setUploading(true);
    try {
      const urls = await Promise.all(files.map((f) => uploadMedia(f, k)));
      setDraft((d) => ({ ...d, [k]: [...((d[k] as string[]) ?? []), ...urls] }));
    } catch { toast.error("Upload failed"); } finally { setUploading(false); }
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-xl">
        <DialogHeader><DialogTitle>{title}</DialogTitle></DialogHeader>
        <div className="grid gap-4">
          {fields.map((f) => (
            <div key={f.key}>
              <Label className="mb-1.5 block">{f.label}</Label>
              {f.type === "textarea" ? (
                <Textarea rows={3} value={String(draft[f.key] ?? "")} onChange={(e) => set(f.key, e.target.value)} />
              ) : f.type === "select" ? (
                <select className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm" value={String(draft[f.key] ?? "")} onChange={(e) => set(f.key, e.target.value)}>
                  {f.options!.map((o) => <option key={o}>{o}</option>)}
                </select>
              ) : f.type === "file" ? (
                <div className="space-y-2">
                  {Array.isArray(draft[f.key]) && (draft[f.key] as string[]).length > 0 && (
                    <div className="flex flex-wrap gap-2">{(draft[f.key] as string[]).map((u, i) => (
                      <div key={u + i} className="relative size-16 overflow-hidden rounded-md bg-muted">
                        <img src={u} alt="" className="size-full object-cover" />
                        <button type="button" className="absolute right-0.5 top-0.5 rounded bg-card px-1 text-xs" onClick={() => set(f.key, (draft[f.key] as string[]).filter((_, j) => j !== i))}>×</button>
                      </div>))}</div>
                  )}
                  <label className="flex cursor-pointer items-center gap-2 rounded-md border border-dashed border-input px-3 py-3 text-sm text-muted-foreground hover:border-secondary">
                    <Upload className="size-4" />{uploading ? "Uploading…" : "Upload images"}
                    <input type="file" multiple accept="image/*" className="sr-only" disabled={uploading}
                      onChange={(e) => { const fs = Array.from(e.target.files ?? []); e.target.value = ""; if (fs.length) void upload(f.key, fs); }} />
                  </label>
                </div>
              ) : (
                <Input type={f.type ?? "text"} value={String(draft[f.key] ?? "")} onChange={(e) => set(f.key, f.type === "number" ? Number(e.target.value) : e.target.value)} />
              )}
            </div>
          ))}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button disabled={uploading} onClick={() => onSave(draft)}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export const DemoNote = () => null;
