import { useState, type ReactNode } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EditDialog, PageHeader, Panel, DemoNote, type FieldDef } from "./AdminKit";

/** Reusable admin list with search, add, edit and delete. */
export function CrudList<T extends { id: string } & Record<string, unknown>>({ title, intro, noun, initial, fields, blank, render, searchKey, extraActions }: {
  title: string; intro: string; noun: string; initial: T[]; fields: FieldDef[]; blank: Omit<T, "id">;
  render: (item: T) => ReactNode; searchKey: keyof T; extraActions?: (item: T) => ReactNode;
}) {
  const [items, setItems] = useState<T[]>(initial);
  const [editing, setEditing] = useState<T | null>(null);
  const [q, setQ] = useState("");
  const list = items.filter((i) => String(i[searchKey]).toLowerCase().includes(q.toLowerCase()));
  const save = (v: T) => setItems((xs) => (xs.some((x) => x.id === v.id) ? xs.map((x) => (x.id === v.id ? v : x)) : [v, ...xs]));
  return (
    <>
      <PageHeader title={title} intro={intro}
        action={<Button onClick={() => setEditing({ ...blank, id: crypto.randomUUID() } as T)}><Plus />Add {noun}</Button>} />
      <DemoNote />
      <Input placeholder={`Search ${title.toLowerCase()}…`} value={q} onChange={(e) => setQ(e.target.value)} className="mb-4 max-w-xs bg-card" />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {list.map((item) => (
          <Panel key={item.id} className="flex flex-col p-5">
            <div className="flex-1">{render(item)}</div>
            <div className="mt-4 flex flex-wrap gap-2 border-t border-border pt-4">
              <Button size="sm" variant="outline" onClick={() => setEditing(item)}><Pencil />Edit</Button>
              {extraActions?.(item)}
              <Button size="sm" variant="ghost" className="text-destructive" onClick={() => confirm(`Delete this ${noun}?`) && setItems((xs) => xs.filter((x) => x.id !== item.id))}><Trash2 />Delete</Button>
            </div>
          </Panel>
        ))}
        {!list.length && <p className="text-sm text-muted-foreground">Nothing found.</p>}
      </div>
      {editing && (
        <EditDialog open onOpenChange={(o) => !o && setEditing(null)} title={items.some((x) => x.id === editing.id) ? `Edit ${noun}` : `Add ${noun}`}
          fields={fields} value={editing} onSave={save} />
      )}
    </>
  );
}
