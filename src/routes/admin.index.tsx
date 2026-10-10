import { createFileRoute, Link } from "@tanstack/react-router";
import { Inbox, Sparkles, Clock, Search } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PageHeader, Panel, StatusBadge } from "@/components/admin/AdminKit";
import { useQuery } from "@tanstack/react-query";
import { enquiriesQuery } from "@/lib/enquiries";
import { useProjects, resolveImage } from "@/lib/cms";

export const Route = createFileRoute("/admin/")({ component: Dashboard });

function Dashboard() {
  const e = useQuery(enquiriesQuery).data ?? [];
  const projects = useProjects().slice(0, 5);
  const stats = [
    [Inbox, "Total Enquiries", e.length],
    [Sparkles, "New Enquiries", e.filter((x) => x.status === "New").length],
    [Clock, "Pending Enquiries", e.filter((x) => !["Converted", "Closed"].includes(x.status)).length],
    [Search, "Inspection Requests", e.filter((x) => x.source.includes("Inspection")).length],
  ] as const;
  return (
    <>
      <PageHeader title="Dashboard" intro="Overview of enquiries and recent work." />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map(([Icon, label, n]) => (
          <Panel key={label} className="p-5">
            <div className="flex items-center justify-between"><p className="text-sm text-muted-foreground">{label}</p><Icon className="size-5 text-secondary" /></div>
            <p className="mt-3 text-3xl font-bold">{n}</p>
          </Panel>
        ))}
      </div>
      <div className="mt-6 grid gap-6 xl:grid-cols-3">
        <Panel className="overflow-hidden xl:col-span-2">
          <div className="flex items-center justify-between border-b border-border p-5"><h2 className="font-semibold">Recent Enquiries</h2><Link to="/admin/enquiries" className="text-sm font-medium text-secondary">View all</Link></div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader><TableRow><TableHead>Customer</TableHead><TableHead>Phone</TableHead><TableHead>Service</TableHead><TableHead>Location</TableHead><TableHead>Date</TableHead><TableHead>Status</TableHead></TableRow></TableHeader>
              <TableBody>
                {e.slice(0, 5).map((x) => (
                  <TableRow key={x.id}><TableCell className="font-medium">{x.name}</TableCell><TableCell>{x.phone}</TableCell><TableCell>{x.service}</TableCell><TableCell>{x.location}</TableCell><TableCell>{x.date}</TableCell><TableCell><StatusBadge status={x.status} /></TableCell></TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Panel>
        <Panel>
          <div className="flex items-center justify-between border-b border-border p-5"><h2 className="font-semibold">Recent Projects</h2><Link to="/admin/projects" className="text-sm font-medium text-secondary">Manage</Link></div>
          <ul className="divide-y divide-border">
            {projects.map((p) => (
              <li key={p.id} className="flex items-center gap-3 p-4">
                <img src={p.after[0] ? resolveImage(p.after[0]) : undefined} alt="" className="size-12 rounded-lg object-cover" />
                <div className="min-w-0"><p className="truncate text-sm font-semibold">{p.name}</p><p className="text-xs text-muted-foreground">{p.service} · {p.completionDate}</p></div>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </>
  );
}
