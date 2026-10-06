import { createFileRoute } from "@tanstack/react-router";
import { CrudList } from "@/components/admin/CrudList";
import { services } from "@/data/services";

export const Route = createFileRoute("/admin/services")({ component: Page });

type Row = { id: string; title: string; short: string; solution: string; status: string; image: string[] };

function Page() {
  return (
    <CrudList<Row>
      title="Services" intro="Edit service names, descriptions, images and visibility." noun="service" searchKey="title"
      initial={services.map((s) => ({ id: s.slug, title: s.title, short: s.short, solution: s.solution, status: s.status === "active" ? "Active" : "Draft", image: [] }))}
      blank={{ title: "", short: "", solution: "", status: "Draft", image: [] }}
      fields={[
        { key: "title", label: "Service Name" }, { key: "short", label: "Short Description", type: "textarea" },
        { key: "solution", label: "Recommended Solution", type: "textarea" }, { key: "image", label: "Image", type: "file" },
        { key: "status", label: "Status", type: "select", options: ["Active", "Draft"] },
      ]}
      render={(s) => (
        <>
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
