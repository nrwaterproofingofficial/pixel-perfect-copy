import { createFileRoute } from "@tanstack/react-router";
import { CrudList } from "@/components/admin/CrudList";
import { projects, type Project } from "@/data/content";
import { services } from "@/data/services";

export const Route = createFileRoute("/admin/projects")({ component: Page });

function Page() {
  return (
    <CrudList<Project>
      title="Projects" intro="Add projects with before, in-progress and after photos." noun="project" searchKey="name"
      initial={projects}
      blank={{ name: "", location: "Kurnool", service: services[0].title, problem: "", inspection: "", treatment: "", result: "", before: [], progress: [], after: [], completionDate: "" }}
      fields={[
        { key: "name", label: "Project Name" }, { key: "location", label: "Location" },
        { key: "service", label: "Service", type: "select", options: services.map((s) => s.title) },
        { key: "problem", label: "Problem", type: "textarea" }, { key: "inspection", label: "Inspection", type: "textarea" },
        { key: "treatment", label: "Treatment", type: "textarea" }, { key: "result", label: "Result", type: "textarea" },
        { key: "before", label: "Before Images", type: "file" }, { key: "progress", label: "Work-in-Progress Images", type: "file" },
        { key: "after", label: "After Images", type: "file" }, { key: "completionDate", label: "Completion Date", type: "date" },
      ]}
      render={(p) => (
        <>
          {p.after[0] && <img src={p.after[0]} alt="" className="mb-4 aspect-video w-full rounded-lg object-cover" />}
          <p className="text-xs font-semibold uppercase tracking-wide text-secondary">{p.service}</p>
          <h3 className="mt-1 font-semibold">{p.name}</h3>
          <p className="text-sm text-muted-foreground">{p.location} · {p.completionDate || "—"}</p>
          <p className="mt-2 text-xs text-muted-foreground">{p.before.length} before · {p.progress.length} progress · {p.after.length} after</p>
        </>
      )}
    />
  );
}
