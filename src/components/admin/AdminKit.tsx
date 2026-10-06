import { useState, type ReactNode } from "react";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { EnquiryStatus } from "@/lib/enquiries";

/** V1 demo auth flag only (no credentials stored). Replace with real secure auth. */
export const ADMIN_FLAG = "nr-admin-demo";

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
  const set = (k: string, v: unknown) => setDraft((d) => ({ ...d, [k]: v }));
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
                <label className="flex cursor-pointer items-center gap-2 rounded-md border border-dashed border-input px-3 py-3 text-sm text-muted-foreground hover:border-secondary">
                  <Upload className="size-4" />{Array.isArray(draft[f.key]) && (draft[f.key] as unknown[]).length ? `${(draft[f.key] as unknown[]).length} file(s)` : "Upload images / video"}
                  <input type="file" multiple accept="image/*,video/*" className="sr-only"
                    onChange={(e) => set(f.key, Array.from(e.target.files ?? []).map((file) => URL.createObjectURL(file)))} />
                </label>
              ) : (
                <Input type={f.type ?? "text"} value={String(draft[f.key] ?? "")} onChange={(e) => set(f.key, f.type === "number" ? Number(e.target.value) : e.target.value)} />
              )}
            </div>
          ))}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={() => { onSave(draft); onOpenChange(false); }}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export const DemoNote = () => (
  <p className="mb-4 rounded-lg border border-warning/40 bg-warning/10 px-4 py-2 text-xs text-foreground/80">
    V1 preview: changes here are kept only until you refresh. Saving permanently will be enabled when the database is connected.
  </p>
);
