import { createFileRoute } from "@tanstack/react-router";
import { Star } from "lucide-react";
import { CrudList } from "@/components/admin/CrudList";
import { type Review } from "@/data/content";
import { services } from "@/data/services";

export const Route = createFileRoute("/admin/reviews")({ component: Page });

type Row = Review & { media: string[] };

function Page() {
  return (
    <CrudList<Row>
      title="Reviews" intro="Manage customer reviews shown on the website." noun="review" searchKey="name" table="reviews"
      fromRow={(r) => ({ id: String(r.id), name: String(r.name), rating: Number(r.rating), text: String(r.text), service: String(r.service),
        source: String(r.source) as Review["source"], media: Array.isArray(r.media) ? (r.media as string[]) : [] })}
      toRow={(r) => ({ name: r.name || "Customer", rating: Math.min(5, Math.max(1, Math.round(Number(r.rating) || 5))), text: r.text, service: r.service, source: r.source, media: r.media })}
      blank={{ name: "", rating: 5, text: "", service: services[0]!.title, source: "Google", media: [] }}
      fields={[
        { key: "name", label: "Customer Name" }, { key: "rating", label: "Rating (1–5)", type: "number" },
        { key: "text", label: "Review Text", type: "textarea" },
        { key: "service", label: "Project / Service", type: "select", options: services.map((s) => s.title) },
        { key: "source", label: "Source", type: "select", options: ["Google", "WhatsApp", "Video", "Direct"] },
        { key: "media", label: "Photo / Video", type: "file" },
      ]}
      render={(r) => (
        <>
          <div className="flex gap-0.5 text-warning">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="size-4" fill={i < r.rating ? "currentColor" : "none"} />)}</div>
          <p className="mt-3 text-sm">"{r.text}"</p>
          <p className="mt-3 text-sm font-semibold">{r.name}</p>
          <p className="text-xs text-muted-foreground">{r.service} · {r.source}</p>
        </>
      )}
    />
  );
}
