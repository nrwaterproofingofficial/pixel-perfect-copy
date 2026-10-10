import { createFileRoute } from "@tanstack/react-router";
import { Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CrudList } from "@/components/admin/CrudList";
import { site } from "@/lib/site";

export const Route = createFileRoute("/admin/certificates")({ component: Page });

type Cert = {
  id: string; number: string; customer: string; location: string; area: string; work: string; system: string;
  start: string; end: string; warranty: string; signatory: string;
};

const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]!);
function printCert(c: Cert) {
  const w = window.open("", "_blank"); if (!w) return;
  const row = (k: string, v: string) => `<tr><th>${k}</th><td>${esc(v || "—")}</td></tr>`;
  w.document.write(`<html><head><title>${esc(c.number)}</title><style>body{font-family:Georgia,serif;padding:48px;color:#1b2533}h1{color:#0b3a6e;margin:0}table{width:100%;border-collapse:collapse;margin-top:28px}th{text-align:left;width:38%;color:#556}th,td{padding:10px;border-bottom:1px solid #dde}</style></head><body>
<h1>Waterproofing Certificate</h1><p>${esc(site.name)}</p><table>${row("Certificate No.", c.number)}${row("Customer / Project", c.customer)}${row("Location", c.location)}${row("Area Treated", c.area)}${row("Work", c.work)}${row("System", c.system)}${row("Start", c.start)}${row("Completed", c.end)}${row("Warranty", c.warranty)}</table>
<p style="margin-top:64px">______________________<br/>${esc(c.signatory)}</p><script>print()</script></body></html>`);
  w.document.close();
}

function Page() {
  return (
    <CrudList<Cert>
      title="Certificates" intro="Create, manage and print waterproofing certificates." noun="certificate" searchKey="customer" table="certificates"
      fromRow={(r) => ({ id: String(r.id), number: String(r.number), customer: String(r.customer), location: String(r.location), area: String(r.area), work: String(r.work),
        system: String(r.system), start: String(r.start_date), end: String(r.end_date), warranty: String(r.warranty), signatory: String(r.signatory) })}
      toRow={(c) => ({ number: c.number, customer: c.customer, location: c.location, area: c.area, work: c.work, system: c.system,
        start_date: c.start, end_date: c.end, warranty: c.warranty, signatory: c.signatory })}
      blank={{ number: "", customer: "", location: "Kurnool", area: "", work: "", system: "", start: "", end: "", warranty: "", signatory: "" }}
      fields={[
        { key: "number", label: "Certificate Number" }, { key: "customer", label: "Customer / Project Name" }, { key: "location", label: "Site Location" },
        { key: "area", label: "Area Treated" }, { key: "work", label: "Waterproofing Work" }, { key: "system", label: "System / Material Category" },
        { key: "start", label: "Start Date", type: "date" }, { key: "end", label: "Completion Date", type: "date" },
        { key: "warranty", label: "Warranty Terms", type: "textarea" }, { key: "signatory", label: "Authorized Signature" },
      ]}
      extraActions={(c) => <Button size="sm" variant="outline" onClick={() => printCert(c)}><Printer />Print / PDF</Button>}
      render={(c) => (
        <>
          <p className="font-mono text-xs text-secondary">{c.number || "—"}</p>
          <h3 className="mt-1 font-semibold">{c.customer || "Untitled"}</h3>
          <p className="text-sm text-muted-foreground">{c.work} · {c.location}</p>
          <p className="mt-2 text-xs text-muted-foreground">{c.start} → {c.end}</p>
        </>
      )}
    />
  );
}
