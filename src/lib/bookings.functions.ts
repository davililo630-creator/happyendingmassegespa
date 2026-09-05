import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const bookingSchema = z.object({
  customer_name: z.string().trim().min(2).max(100),
  phone: z.string().trim().min(7).max(25),
  email: z.string().trim().email().max(255).optional().or(z.literal("")),
  service: z.string().trim().min(2).max(120),
  price: z.number().int().min(0).max(1000000),
  booking_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  booking_time: z.string().trim().min(3).max(20),
  guests: z.number().int().min(1).max(10),
  notes: z.string().trim().max(1000).optional().or(z.literal("")),
  provider_id: z.string().uuid().optional().or(z.literal("")),
  provider_name: z.string().trim().max(80).optional().or(z.literal("")),
});

export const createBooking = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => bookingSchema.parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: row, error } = await supabaseAdmin
      .from("bookings")
      .insert({
        customer_name: data.customer_name,
        phone: data.phone,
        email: data.email ? data.email : null,
        service: data.service,
        price: data.price,
        booking_date: data.booking_date,
        booking_time: data.booking_time,
        guests: data.guests,
        notes: data.notes ? data.notes : null,
        provider_id: data.provider_id ? data.provider_id : null,
        provider_name: data.provider_name ? data.provider_name : null,
      })
      .select("reference, service, price, booking_date, booking_time, status")
      .single();

    if (error || !row) throw new Error(error?.message ?? "Could not save the booking");
    return row;
  });

export const listBookings = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase
      .from("bookings")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(500);
    if (error) throw new Error(error.message);
    return data ?? [];
  });

export const updateBookingStatus = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) =>
    z
      .object({
        id: z.string().uuid(),
        status: z.enum(["pending", "confirmed", "completed", "cancelled"]),
      })
      .parse(data),
  )
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase
      .from("bookings")
      .update({ status: data.status })
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const isAdmin = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data } = await context.supabase.rpc("has_role", {
      _user_id: context.userId,
      _role: "admin",
    });
    return { admin: data === true };
  });
