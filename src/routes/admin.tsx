import { createFileRoute, Link, Outlet, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { LayoutDashboard, Inbox, FolderKanban, Star, Wrench, Award, Settings, LogOut, Menu, Droplet, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin — NR Waterproofing" }, { name: "robots", content: "noindex" }] }),
  component: AdminLayout,
});

const items = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { to: "/admin/enquiries", label: "Enquiries", icon: Inbox },
  { to: "/admin/projects", label: "Projects", icon: FolderKanban },
  { to: "/admin/reviews", label: "Reviews", icon: Star },
  { to: "/admin/services", label: "Services", icon: Wrench },
  { to: "/admin/certificates", label: "Certificates", icon: Award },
  { to: "/admin/settings", label: "Settings", icon: Settings },
] as const;

function AdminLayout() {
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(false);
  const qc = useQueryClient();
  useEffect(() => {
    let alive = true;
    void (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return navigate({ to: "/admin/login", replace: true });
      const { data } = await supabase.from("user_roles").select("role").eq("user_id", user.id).eq("role", "admin").maybeSingle();
      if (!data) { await supabase.auth.signOut(); return navigate({ to: "/admin/login", replace: true }); }
      if (alive) setReady(true);
    })();
    return () => { alive = false; };
  }, [navigate]);
  if (!ready) return null;

  const logout = async () => {
    await qc.cancelQueries(); qc.removeQueries({ queryKey: ["admin"] });
    await supabase.auth.signOut(); navigate({ to: "/admin/login", replace: true });
  };

  return (
    <div className="flex min-h-screen bg-muted">
      <aside className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col bg-sidebar text-sidebar-foreground transition-transform lg:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex h-16 items-center gap-2.5 border-b border-sidebar-border px-5">
          <span className="grid size-8 place-items-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground"><Droplet className="size-4" fill="currentColor" /></span>
          <span className="font-semibold text-sidebar-accent-foreground">NR Admin</span>
        </div>
        <nav className="flex-1 space-y-1 p-3">
          {items.map(({ to, label, icon: Icon }) => (
            <Link key={to} to={to} onClick={() => setOpen(false)} activeOptions={{ exact: to === "/admin" }}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              activeProps={{ className: "bg-sidebar-accent text-sidebar-accent-foreground" }}>
              <Icon className="size-4" />{label}
            </Link>
          ))}
        </nav>
        <div className="space-y-1 border-t border-sidebar-border p-3">
          <a href="/" target="_blank" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm hover:bg-sidebar-accent"><ExternalLink className="size-4" />View website</a>
          <button onClick={() => void logout()} className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm hover:bg-sidebar-accent"><LogOut className="size-4" />Log out</button>
        </div>
      </aside>
      {open && <div className="fixed inset-0 z-30 bg-ink/40 lg:hidden" onClick={() => setOpen(false)} />}
      <div className="flex min-w-0 flex-1 flex-col lg:pl-64">
        <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-border bg-card px-4 lg:px-8">
          <Button size="icon" variant="ghost" className="lg:hidden" onClick={() => setOpen(true)} aria-label="Menu"><Menu /></Button>
          <p className="text-sm text-muted-foreground">NR Waterproofing Services · Admin Panel</p>
        </header>
        <main className="flex-1 p-4 lg:p-8"><Outlet /></main>
      </div>
    </div>
  );
}
