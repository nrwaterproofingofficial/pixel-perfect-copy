import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const tables = ["services", "projects", "reviews", "site_settings", "enquiries", "certificates"] as const;

/** Listens for database changes and refreshes website + admin content instantly in every open tab. */
export function useLiveSync() {
  const qc = useQueryClient();
  useEffect(() => {
    const ch = supabase.channel(`live-${crypto.randomUUID()}`);
    for (const t of tables) {
      ch.on("postgres_changes", { event: "*", schema: "public", table: t }, () => {
        void qc.invalidateQueries({ queryKey: ["cms"] });
        void qc.invalidateQueries({ queryKey: ["admin"] });
      });
    }
    ch.subscribe();
    // Also refresh when the tab regains focus, in case a change was missed while offline.
    const onFocus = () => { void qc.invalidateQueries({ queryKey: ["cms"] }); };
    window.addEventListener("focus", onFocus);
    return () => { window.removeEventListener("focus", onFocus); void supabase.removeChannel(ch); };
  }, [qc]);
}
