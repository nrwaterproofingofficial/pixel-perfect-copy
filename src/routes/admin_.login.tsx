import { createFileRoute, useNavigate } from "@tanstack/react-router";
import type { FormEvent } from "react";
import { Droplet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ADMIN_FLAG } from "@/components/admin/AdminKit";

export const Route = createFileRoute("/admin_/login")({
  head: () => ({ meta: [{ title: "Admin Login — NR Waterproofing" }, { name: "robots", content: "noindex" }] }),
  component: Login,
});

function Login() {
  const navigate = useNavigate();
  const submit = (e: FormEvent) => {
    e.preventDefault();
    // TODO(backend): replace with secure authentication (hashed passwords, server session).
    sessionStorage.setItem(ADMIN_FLAG, "1");
    navigate({ to: "/admin" });
  };
  return (
    <div className="water-lines grid min-h-screen place-items-center bg-ink p-4">
      <form onSubmit={submit} className="w-full max-w-sm rounded-2xl bg-card p-8 shadow-lift">
        <span className="grid size-11 place-items-center rounded-xl bg-primary text-primary-foreground"><Droplet className="size-5" fill="currentColor" /></span>
        <h1 className="mt-5 text-2xl font-bold text-primary">Admin login</h1>
        <p className="mt-1 text-sm text-muted-foreground">NR Waterproofing Services</p>
        <div className="mt-6 space-y-4">
          <div><Label className="mb-1.5 block">Email</Label><Input type="email" required placeholder="admin@example.com" /></div>
          <div><Label className="mb-1.5 block">Password</Label><Input type="password" required /></div>
        </div>
        <Button type="submit" className="mt-6 w-full" size="lg">Sign in</Button>
        <p className="mt-4 text-center text-xs text-muted-foreground">Preview mode — any email and password works until secure login is connected.</p>
      </form>
    </div>
  );
}
