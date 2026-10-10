import { createFileRoute } from "@tanstack/react-router";
import { CrudList } from "@/components/admin/CrudList";
import { type Project } from "@/data/content";
import { services } from "@/data/services";
import { resolveImage } from "@/lib/cms";

export const Route = createFileRoute("/admin/projects")({ component: Page });

const arr = (v: unknown) => (Array.isArray(v) ? (v as string[]) : []);

function Page() {
  return (
    <CrudList<Project>
      title="Projects" intro="Add projects with before, in-progress and after photos." noun="project" searchKey="name" table="projects"
      fromRow={(r) => ({ id: String(r.id), name: String(r.name), location: String(r.location), service: String(r.service), problem: String(r.problem),
        inspection: String(r.inspection), treatment: String(r.treatment), result: String(r.result), before: arr(r.before_images), progress: arr(r.progress_images),
        after: arr(r.after_images), completionDate: String(r.completion_date) })}
      toRow={(p) => ({ name: p.name || "Untitled", location: p.location, service: p.service, problem: p.problem, inspection: p.inspection, treatment: p.treatment,
        result: p.result, before_images: p.before, progress_images: p.progress, after_images: p.after, completion_date: p.completionDate })}
      blank={{ name: "", location: "Kurnool", service: services[0]!.title, problem: "", inspection: "", treatment: "", result: "", before: [], progress: [], after: [], completionDate: "" }}
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
          {p.after[0] && <img src={resolveImage(p.after[0])} alt="" className="mb-4 aspect-video w-full rounded-lg object-cover" />}
          <p className="text-xs font-semibold uppercase tracking-wide text-secondary">{p.service}</p>
          <h3 className="mt-1 font-semibold">{p.name}</h3>
          <p className="text-sm text-muted-foreground">{p.location} · {p.completionDate || "—"}</p>
          <p className="mt-2 text-xs text-muted-foreground">{p.before.length} before · {p.progress.length} progress · {p.after.length} after</p>
        </>
      )}
    />
  );
}
