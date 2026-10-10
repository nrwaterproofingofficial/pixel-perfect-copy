import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { Droplet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/admin_/login")({
  head: () => ({ meta: [{ title: "Admin Login — NR Waterproofing" }, { name: "robots", content: "noindex" }] }),
  component: Login,
});

function Login() {
  const navigate = useNavigate();
  const [hasAdmin, setHasAdmin] = useState<boolean | null>(null);
  const [err, setErr] = useState("");
  const [info, setInfo] = useState("");
  const [busy, setBusy] = useState(false);
  useEffect(() => { void supabase.rpc("admin_exists").then(({ data }) => setHasAdmin(!!data)); }, []);
  const setup = hasAdmin === false;

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const email = String(f.get("email")), password = String(f.get("password"));
    setErr(""); setInfo(""); setBusy(true);
    try {
      if (setup) {
        if (password.length < 8) return setErr("Use at least 8 characters.");
        const { data, error } = await supabase.auth.signUp({ email, password, options: { emailRedirectTo: `${window.location.origin}/admin/login` } });
        if (error) return setErr(error.message);
        if (!data.session) { setHasAdmin(true); return setInfo("Admin account created. Check your email to confirm, then sign in."); }
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) return setErr("Wrong email or password.");
      }
      navigate({ to: "/admin" });
    } finally { setBusy(false); }
  };
  return (
    <div className="water-lines grid min-h-screen place-items-center bg-ink p-4">
      <form onSubmit={submit} className="w-full max-w-sm rounded-2xl bg-card p-8 shadow-lift">
        <span className="grid size-11 place-items-center rounded-xl bg-primary text-primary-foreground"><Droplet className="size-5" fill="currentColor" /></span>
        <h1 className="mt-5 text-2xl font-bold text-primary">{setup ? "Create admin account" : "Admin login"}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{setup ? "First-time setup — this account becomes the only admin." : "NR Waterproofing Services"}</p>
        <div className="mt-6 space-y-4">
          <div><Label className="mb-1.5 block">Email</Label><Input name="email" type="email" required autoComplete="email" /></div>
          <div><Label className="mb-1.5 block">Password</Label><Input name="password" type="password" required autoComplete={setup ? "new-password" : "current-password"} /></div>
        </div>
        {err && <p className="mt-4 text-sm text-destructive">{err}</p>}
        {info && <p className="mt-4 text-sm text-success">{info}</p>}
        <Button type="submit" className="mt-6 w-full" size="lg" disabled={busy || hasAdmin === null}>{setup ? "Create account" : "Sign in"}</Button>
      </form>
    </div>
  );
}
