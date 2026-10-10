import { createFileRoute } from "@tanstack/react-router";
import { CrudList } from "@/components/admin/CrudList";
import { resolveImage } from "@/lib/cms";

export const Route = createFileRoute("/admin/services")({ component: Page });

type Row = { id: string; title: string; short: string; solution: string; status: string; image: string[]; sort_order: number };

const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || crypto.randomUUID().slice(0, 8);

function Page() {
  return (
    <CrudList<Row>
      title="Services" intro="Edit service names, descriptions, images and visibility." noun="service" searchKey="title"
      table="services" idColumn="slug" orderBy="sort_order"
      fromRow={(r) => ({ id: String(r.slug), title: String(r.title), short: String(r.short), solution: String(r.solution),
        status: r.status === "active" ? "Active" : "Draft", image: r.image_url ? [String(r.image_url)] : [], sort_order: Number(r.sort_order) })}
      toRow={(s, isNew) => ({ ...(isNew ? { slug: slugify(s.title) } : {}), title: s.title || "Untitled", short: s.short, solution: s.solution,
        status: s.status === "Active" ? "active" : "draft", image_url: s.image.at(-1) ?? null, sort_order: Number(s.sort_order) || 100 })}
      blank={{ title: "", short: "", solution: "", status: "Draft", image: [], sort_order: 100 }}
      fields={[
        { key: "title", label: "Service Name" }, { key: "short", label: "Short Description", type: "textarea" },
        { key: "solution", label: "Recommended Solution", type: "textarea" }, { key: "image", label: "Image (last one is used)", type: "file" },
        { key: "status", label: "Status", type: "select", options: ["Active", "Draft"] },
        { key: "sort_order", label: "Display order (lower shows first)", type: "number" },
      ]}
      render={(s) => (
        <>
          {s.image[0] && <img src={resolveImage(s.image.at(-1)!)} alt="" className="mb-3 aspect-video w-full rounded-lg object-cover" />}
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold">{s.title || "Untitled"}</h3>
            <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${s.status === "Active" ? "bg-success/15 text-success" : "bg-muted text-muted-foreground"}`}>{s.status}</span>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">{s.short}</p>
        </>
      )}
    />
  );
}
