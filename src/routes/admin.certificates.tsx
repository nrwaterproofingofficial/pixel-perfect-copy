import { createFileRoute } from "@tanstack/react-router";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CrudList } from "@/components/admin/CrudList";

export const Route = createFileRoute("/admin/certificates")({ component: Page });

type Cert = {
  id: string; number: string; customer: string; location: string; area: string; work: string; system: string;
  start: string; end: string; warranty: string; signatory: string;
};

const initial: Cert[] = [
  { id: "c1", number: "NRW-2026-001", customer: "Independent House Terrace", location: "Kurnool", area: "1,200 sq ft terrace", work: "Terrace Waterproofing",
    system: "Polymer-modified cementitious", start: "2026-03-08", end: "2026-03-14", warranty: "Project-specific — see terms", signatory: "Authorized Signatory" },
];

function Page() {
  return (
    <CrudList<Cert>
      title="Certificates" intro="Create and manage waterproofing certificates. PDF generation arrives in the next phase." noun="certificate" searchKey="customer"
      initial={initial}
      blank={{ number: "", customer: "", location: "Kurnool", area: "", work: "", system: "", start: "", end: "", warranty: "", signatory: "" }}
      fields={[
        { key: "number", label: "Certificate Number" }, { key: "customer", label: "Customer / Project Name" }, { key: "location", label: "Site Location" },
        { key: "area", label: "Area Treated" }, { key: "work", label: "Waterproofing Work" }, { key: "system", label: "System / Material Category" },
        { key: "start", label: "Start Date", type: "date" }, { key: "end", label: "Completion Date", type: "date" },
        { key: "warranty", label: "Warranty Terms", type: "textarea" }, { key: "signatory", label: "Authorized Signature" },
      ]}
      extraActions={() => <Button size="sm" variant="outline" disabled title="Available in next phase"><Download />Download</Button>}
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
