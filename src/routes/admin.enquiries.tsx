import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Phone, MessageCircle, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PageHeader, Panel, StatusBadge } from "@/components/admin/AdminKit";
import { enquiriesQuery, enquiryStatuses, type LiveEnquiry as Enquiry, type EnquiryStatus } from "@/lib/enquiries";

export const Route = createFileRoute("/admin/enquiries")({ component: Enquiries });

function Enquiries() {
  const qc = useQueryClient();
  const { data: rows = [], isLoading } = useQuery(enquiriesQuery);
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<"All" | EnquiryStatus>("All");
  const [openId, setOpenId] = useState<string | null>(null);
  const filtered = useMemo(() => rows.filter((r) =>
    (status === "All" || r.status === status) && `${r.name} ${r.phone} ${r.service}`.toLowerCase().includes(q.toLowerCase())), [rows, q, status]);
  const current = rows.find((r) => r.id === openId);
  const [notes, setNotes] = useState("");
  useEffect(() => { if (current) setNotes(current.notes); }, [current?.id]); // eslint-disable-line react-hooks/exhaustive-deps
  const [urls, setUrls] = useState<string[]>([]);
  useEffect(() => {
    setUrls([]);
    if (!current?.media.length) return;
    void supabase.storage.from("enquiry-uploads").createSignedUrls(current.media, 3600).then(({ data }) => setUrls((data ?? []).map((d) => d.signedUrl).filter(Boolean) as string[]));
  }, [current?.id]); // eslint-disable-line react-hooks/exhaustive-deps
  const update = async (id: string, patch: { status?: EnquiryStatus; notes?: string }) => {
    const { error } = await supabase.from("enquiries").update(patch).eq("id", id);
    if (error) return toast.error("Could not save");
    toast.success("Saved"); void qc.invalidateQueries({ queryKey: enquiriesQuery.queryKey });
  };

  return (
    <>
      <PageHeader title="Enquiries" intro="All website forms feed into this one list." />
      <Panel className="overflow-hidden">
        <div className="flex flex-wrap gap-3 border-b border-border p-4">
          <Input placeholder="Search name, phone, service…" value={q} onChange={(e) => setQ(e.target.value)} className="max-w-xs" />
          <select className="h-9 rounded-md border border-input bg-background px-3 text-sm" value={status} onChange={(e) => setStatus(e.target.value as typeof status)}>
            <option>All</option>{enquiryStatuses.map((s) => <option key={s}>{s}</option>)}
          </select>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader><TableRow><TableHead>Customer</TableHead><TableHead>Phone</TableHead><TableHead>Service</TableHead><TableHead>Source</TableHead><TableHead>Date</TableHead><TableHead>Status</TableHead><TableHead /></TableRow></TableHeader>
            <TableBody>
              {!isLoading && !filtered.length && <TableRow><TableCell colSpan={7} className="text-center text-muted-foreground">No enquiries yet.</TableCell></TableRow>}
              {filtered.map((r) => (
                <TableRow key={r.id} className="cursor-pointer" onClick={() => setOpenId(r.id)}>
                  <TableCell className="font-medium">{r.name}</TableCell><TableCell>{r.phone}</TableCell><TableCell>{r.service}</TableCell>
                  <TableCell className="text-muted-foreground">{r.source}</TableCell><TableCell>{r.date}</TableCell><TableCell><StatusBadge status={r.status} /></TableCell>
                  <TableCell><Button size="sm" variant="ghost">View</Button></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Panel>

      <Sheet open={!!current} onOpenChange={(o) => !o && setOpenId(null)}>
        <SheetContent className="w-full overflow-y-auto sm:max-w-md">
          {current && (
            <>
              <SheetHeader><SheetTitle>{current.name}</SheetTitle></SheetHeader>
              <div className="space-y-5 px-4 pb-6 text-sm">
                <div className="flex gap-2">
                  <Button asChild size="sm"><a href={`tel:${current.phone}`}><Phone />Call</a></Button>
                  <Button asChild size="sm" variant="whatsapp"><a href={`https://wa.me/${current.phone}`} target="_blank" rel="noreferrer"><MessageCircle />WhatsApp</a></Button>
                </div>
                <dl className="grid grid-cols-2 gap-3">
                  {([["Phone", current.phone], ["Location", current.location], ["Property", current.propertyType], ["Leakage area", current.leakageArea], ["Service", current.service], ["Source", current.source], ["Date", current.date]] as const).map(([k, v]) => (
                    <div key={k}><dt className="text-xs text-muted-foreground">{k}</dt><dd className="font-medium">{v}</dd></div>
                  ))}
                </dl>
                <div><p className="text-xs text-muted-foreground">Problem</p><p>{current.message || "—"}</p></div>
                <div><p className="mb-2 text-xs text-muted-foreground">Uploaded photos / videos</p>
                  <div className="grid grid-cols-4 gap-2">{current.media.map((m, i) => urls[i]
                      ? <a key={m} href={urls[i]} target="_blank" rel="noreferrer" className="block aspect-square overflow-hidden rounded-lg bg-muted">{/\.(mp4|mov|webm)$/i.test(m) ? <span className="grid size-full place-items-center text-xs">Video</span> : <img src={urls[i]} alt="" className="size-full object-cover" />}</a>
                      : <div key={m} className="grid aspect-square place-items-center rounded-lg bg-muted"><ImageIcon className="size-4 text-muted-foreground" /></div>)}
                    {!current.media.length && <p className="col-span-4 text-muted-foreground">None</p>}</div>
                </div>
                <div><p className="mb-1.5 text-xs text-muted-foreground">Status</p>
                  <select className="h-9 w-full rounded-md border border-input bg-background px-3" value={current.status} onChange={(e) => void update(current.id, { status: e.target.value as EnquiryStatus })}>
                    {enquiryStatuses.map((s) => <option key={s}>{s}</option>)}
                  </select>
                </div>
                <div><p className="mb-1.5 text-xs text-muted-foreground">Internal notes</p>
                  <Textarea rows={4} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Add a note for the team…" />
                  <Button size="sm" className="mt-2" disabled={notes === current.notes} onClick={() => void update(current.id, { notes })}>Save note</Button>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
}
