import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export type ProviderRow = {
  id: string;
  name: string;
  photo_url: string | null;
  sort_order: number;
  is_active: boolean;
  photo_signed_url: string | null;
};

async function withSignedPhotos<
  T extends { photo_url: string | null },
>(rows: T[]): Promise<(T & { photo_signed_url: string | null })[]> {
  const paths = rows.map((r) => r.photo_url).filter((p): p is string => !!p);
  const map = new Map<string, string>();
  if (paths.length > 0) {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data } = await supabaseAdmin.storage
      .from("providers")
      .createSignedUrls(paths, 60 * 60 * 24);
    for (const item of data ?? []) {
      if (item.path && item.signedUrl) map.set(item.path, item.signedUrl);
    }
  }
  return rows.map((r) => ({
    ...r,
    photo_signed_url: r.photo_url ? (map.get(r.photo_url) ?? null) : null,
  }));
}

const SELECT = "id, name, photo_url, sort_order, is_active";

export const listActiveProviders = createServerFn({ method: "GET" }).handler(
  async (): Promise<ProviderRow[]> => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data, error } = await supabaseAdmin
      .from("providers")
      .select(SELECT)
      .eq("is_active", true)
      .order("sort_order", { ascending: true })
      .order("name", { ascending: true });
    if (error) throw new Error(error.message);
    return withSignedPhotos(data ?? []);
  },
);

export const adminListProviders = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<ProviderRow[]> => {
    const { data, error } = await context.supabase
      .from("providers")
      .select(SELECT)
      .order("sort_order", { ascending: true })
      .order("name", { ascending: true });
    if (error) throw new Error(error.message);
    return withSignedPhotos(data ?? []);
  });

const providerInput = z.object({
  name: z.string().trim().min(1).max(80),
  photo_url: z.string().trim().max(400).nullable().optional(),
  sort_order: z.number().int().min(0).max(999).optional(),
  is_active: z.boolean().optional(),
});

export const createProvider = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => providerInput.parse(data))
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase.from("providers").insert({
      name: data.name,
      photo_url: data.photo_url ?? null,
      sort_order: data.sort_order ?? 0,
      is_active: data.is_active ?? true,
    });
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const updateProvider = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) =>
    providerInput.partial().extend({ id: z.string().uuid() }).parse(data),
  )
  .handler(async ({ data, context }) => {
    const patch = {
      ...(data.name !== undefined ? { name: data.name } : {}),
      ...(data.photo_url !== undefined ? { photo_url: data.photo_url } : {}),
      ...(data.sort_order !== undefined ? { sort_order: data.sort_order } : {}),
      ...(data.is_active !== undefined ? { is_active: data.is_active } : {}),
    };
    const { error } = await context.supabase.from("providers").update(patch).eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const deleteProvider = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => z.object({ id: z.string().uuid() }).parse(data))
  .handler(async ({ data, context }) => {
    const { data: row } = await context.supabase
      .from("providers")
      .select("photo_url")
      .eq("id", data.id)
      .maybeSingle();
    const { error } = await context.supabase.from("providers").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    if (row?.photo_url) {
      await context.supabase.storage.from("providers").remove([row.photo_url]);
    }
    return { ok: true };
  });
