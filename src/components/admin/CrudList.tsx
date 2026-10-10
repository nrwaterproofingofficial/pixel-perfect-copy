import { useState, type ReactNode } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Plus, Pencil, Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { EditDialog, PageHeader, Panel, type FieldDef } from "./AdminKit";

type Row = Record<string, unknown>;

/** Reusable admin list backed by a database table: search, add, edit, delete. Saves go live on the website. */
export function CrudList<T extends { id: string } & Record<string, unknown>>({ title, intro, noun, table, idColumn = "id", orderBy = "created_at", fromRow, toRow, fields, blank, render, searchKey, extraActions }: {
  title: string; intro: string; noun: string; table: "projects" | "reviews" | "services" | "certificates"; idColumn?: string; orderBy?: string;
  fromRow: (r: Row) => T; toRow: (v: T, isNew: boolean) => Row;
  fields: FieldDef[]; blank: Omit<T, "id">;
  render: (item: T) => ReactNode; searchKey: keyof T; extraActions?: (item: T) => ReactNode;
}) {
  const qc = useQueryClient();
  const key = ["admin", table];
  const { data: items = [], isLoading } = useQuery({
    queryKey: key,
    queryFn: async () => {
      const { data, error } = await supabase.from(table).select("*").order(orderBy, { ascending: orderBy === "sort_order" });
      if (error) throw error;
      return (data as Row[]).map(fromRow);
    },
  });
  const [editing, setEditing] = useState<T | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [q, setQ] = useState("");
  const refresh = () => { void qc.invalidateQueries({ queryKey: key }); void qc.invalidateQueries({ queryKey: ["cms"] }); };
  const list = items.filter((i) => String(i[searchKey] ?? "").toLowerCase().includes(q.toLowerCase()));

  const save = async (v: T) => {
    const row = toRow(v, isNew);
    const { error } = isNew
      ? await supabase.from(table).insert(row as never)
      : await supabase.from(table).update(row as never).eq(idColumn, v.id);
    if (error) return toast.error(`Could not save: ${error.message}`);
    toast.success(`${noun[0]!.toUpperCase() + noun.slice(1)} saved — live on the website`);
    setEditing(null); refresh();
  };
  const remove = async (item: T) => {
    if (!confirm(`Delete this ${noun}?`)) return;
    const { error } = await supabase.from(table).delete().eq(idColumn, item.id);
    if (error) return toast.error(`Could not delete: ${error.message}`);
    toast.success("Deleted"); refresh();
  };

  return (
    <>
      <PageHeader title={title} intro={intro}
        action={<Button onClick={() => { setIsNew(true); setEditing({ ...blank, id: crypto.randomUUID() } as T); }}><Plus />Add {noun}</Button>} />
      <Input placeholder={`Search ${title.toLowerCase()}…`} value={q} onChange={(e) => setQ(e.target.value)} className="mb-4 max-w-xs bg-card" />
      {isLoading && <p className="flex items-center gap-2 text-sm text-muted-foreground"><Loader2 className="size-4 animate-spin" />Loading…</p>}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {list.map((item) => (
          <Panel key={item.id} className="flex flex-col p-5">
            <div className="flex-1">{render(item)}</div>
            <div className="mt-4 flex flex-wrap gap-2 border-t border-border pt-4">
              <Button size="sm" variant="outline" onClick={() => { setIsNew(false); setEditing(item); }}><Pencil />Edit</Button>
              {extraActions?.(item)}
              <Button size="sm" variant="ghost" className="text-destructive" onClick={() => void remove(item)}><Trash2 />Delete</Button>
            </div>
          </Panel>
        ))}
        {!isLoading && !list.length && <p className="text-sm text-muted-foreground">Nothing found.</p>}
      </div>
      {editing && (
        <EditDialog open onOpenChange={(o) => !o && setEditing(null)} title={isNew ? `Add ${noun}` : `Edit ${noun}`}
          fields={fields} value={editing} onSave={(v) => void save(v)} />
      )}
    </>
  );
}
