import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { toast } from "sonner";

import { supabase } from "@/integrations/supabase/client";
import {
  adminListProviders,
  createProvider,
  deleteProvider,
  updateProvider,
} from "@/lib/providers.functions";

async function uploadPhoto(file: File): Promise<string> {
  const ext = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
  const path = `${crypto.randomUUID()}.${ext}`;
  const { error } = await supabase.storage.from("providers").upload(path, file, {
    contentType: file.type || "image/jpeg",
    upsert: false,
  });
  if (error) throw new Error(error.message);
  return path;
}

export function ProviderManager() {
  const list = useServerFn(adminListProviders);
  const add = useServerFn(createProvider);
  const edit = useServerFn(updateProvider);
  const remove = useServerFn(deleteProvider);

  const [name, setName] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);

  const { data, refetch, isLoading } = useQuery({
    queryKey: ["admin-providers"],
    queryFn: () => list(),
  });

  async function onAdd(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (name.trim().length < 1) {
      toast.error("Enter the provider's name.");
      return;
    }
    setBusy(true);
    try {
      const photo = file ? await uploadPhoto(file) : null;
      await add({ data: { name: name.trim(), photo_url: photo } });
      setName("");
      setFile(null);
      (event.currentTarget as HTMLFormElement).reset();
      toast.success("Provider added");
      refetch();
    } catch (error) {
      console.error(error);
      toast.error("Could not add the provider.");
    } finally {
      setBusy(false);
    }
  }

  async function onRename(id: string, current: string) {
    const next = window.prompt("Provider name", current);
    if (!next || next.trim() === current) return;
    try {
      await edit({ data: { id, name: next.trim() } });
      refetch();
    } catch {
      toast.error("Could not rename the provider.");
    }
  }

  async function onReplacePhoto(id: string, picked: File) {
    setBusy(true);
    try {
      const photo = await uploadPhoto(picked);
      await edit({ data: { id, photo_url: photo } });
      toast.success("Photo updated");
      refetch();
    } catch (error) {
      console.error(error);
      toast.error("Could not upload the photo.");
    } finally {
      setBusy(false);
    }
  }

  async function onToggle(id: string, isActive: boolean) {
    try {
      await edit({ data: { id, is_active: !isActive } });
      refetch();
    } catch {
      toast.error("Could not update the provider.");
    }
  }

  async function onDelete(id: string, providerName: string) {
    if (!window.confirm(`Remove ${providerName}?`)) return;
    try {
      await remove({ data: { id } });
      toast.success("Provider removed");
      refetch();
    } catch {
      toast.error("Could not remove the provider.");
    }
  }

  return (
    <section className="mt-12">
      <h2 className="font-display text-2xl text-foreground">Service providers</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Add a name and photo for each provider. Active providers appear on the booking page.
      </p>

      <form onSubmit={onAdd} className="mt-4 grid gap-3 sm:grid-cols-[1fr_auto_auto]">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Provider name"
          maxLength={80}
          className="h-11 rounded-md border border-border bg-card px-3 text-sm text-foreground"
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          className="h-11 rounded-md border border-border bg-card px-3 py-2 text-sm text-foreground"
        />
        <button
          type="submit"
          disabled={busy}
          className="h-11 rounded-md bg-primary px-5 text-sm uppercase tracking-widest text-primary-foreground disabled:opacity-60"
        >
          {busy ? "Saving…" : "Add provider"}
        </button>
      </form>

      {isLoading ? (
        <p className="mt-6 text-sm text-muted-foreground">Loading providers…</p>
      ) : (data ?? []).length === 0 ? (
        <p className="mt-6 text-sm text-muted-foreground">No providers added yet.</p>
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {(data ?? []).map((p) => (
            <article key={p.id} className="overflow-hidden rounded-xl border border-border bg-card">
              {p.photo_signed_url ? (
                <img
                  src={p.photo_signed_url}
                  alt={p.name}
                  loading="lazy"
                  className="aspect-3/4 w-full object-cover"
                />
              ) : (
                <div className="flex aspect-3/4 w-full items-center justify-center bg-background text-3xl text-muted-foreground">
                  {p.name.slice(0, 1)}
                </div>
              )}
              <div className="space-y-2 p-3">
                <p className="font-semibold text-foreground">{p.name}</p>
                <p className="text-xs text-muted-foreground">
                  {p.is_active ? "Visible on booking page" : "Hidden"}
                </p>
                <div className="flex flex-wrap gap-2 text-xs">
                  <button
                    onClick={() => onRename(p.id, p.name)}
                    className="rounded border border-border px-2 py-1 text-foreground"
                  >
                    Rename
                  </button>
                  <label className="cursor-pointer rounded border border-border px-2 py-1 text-foreground">
                    Photo
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const picked = e.target.files?.[0];
                        if (picked) onReplacePhoto(p.id, picked);
                      }}
                    />
                  </label>
                  <button
                    onClick={() => onToggle(p.id, p.is_active)}
                    className="rounded border border-border px-2 py-1 text-foreground"
                  >
                    {p.is_active ? "Hide" : "Show"}
                  </button>
                  <button
                    onClick={() => onDelete(p.id, p.name)}
                    className="rounded border border-destructive px-2 py-1 text-destructive"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
