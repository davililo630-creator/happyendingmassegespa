import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useMemo, useState } from "react";
import { toast } from "sonner";

import { ProviderManager } from "@/components/admin/ProviderManager";
import { listBookings, updateBookingStatus } from "@/lib/bookings.functions";
import { SERVICES, formatPrice } from "@/lib/spa";
import { supabase } from "@/integrations/supabase/client";

const STATUSES = ["pending", "confirmed", "completed", "cancelled"] as const;

export const Route = createFileRoute("/_authenticated/admin")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Bookings Admin | Happy Ending Massage Spa" },
      { name: "description", content: "Private booking management area." },
      { property: "og:title", content: "Bookings Admin" },
      { property: "og:description", content: "Private booking management area." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminPage,
});

type Booking = {
  id: string;
  reference: string;
  customer_name: string;
  phone: string;
  email: string | null;
  service: string;
  price: number;
  booking_date: string;
  booking_time: string;
  guests: number;
  notes: string | null;
  provider_name: string | null;
  status: string;
  created_at: string;
};

function AdminPage() {
  const navigate = useNavigate();
  const fetchBookings = useServerFn(listBookings);
  const setStatus = useServerFn(updateBookingStatus);
  const [status, setStatusFilter] = useState("all");
  const [service, setService] = useState("all");
  const [date, setDate] = useState("");

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["bookings"],
    queryFn: () => fetchBookings() as Promise<Booking[]>,
  });

  const rows = useMemo(() => {
    return (data ?? []).filter(
      (b) =>
        (status === "all" || b.status === status) &&
        (service === "all" || b.service === service) &&
        (!date || b.booking_date === date),
    );
  }, [data, status, service, date]);

  async function change(id: string, next: string) {
    try {
      await setStatus({ data: { id, status: next as (typeof STATUSES)[number] } });
      toast.success("Status updated");
      refetch();
    } catch {
      toast.error("Could not update the status");
    }
  }

  return (
    <div className="min-h-screen bg-background px-4 py-10 md:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl text-foreground">Bookings</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Incoming reservation requests, newest first.
            </p>
          </div>
          <button
            onClick={async () => {
              await supabase.auth.signOut();
              navigate({ to: "/auth" });
            }}
            className="rounded-md border border-border px-4 py-2 text-sm text-foreground hover:bg-accent"
          >
            Sign out
          </button>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <select
            value={status}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-11 rounded-md border border-border bg-card px-3 text-sm text-foreground"
          >
            <option value="all">All statuses</option>
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <select
            value={service}
            onChange={(e) => setService(e.target.value)}
            className="h-11 rounded-md border border-border bg-card px-3 text-sm text-foreground"
          >
            <option value="all">All services</option>
            {SERVICES.map((s) => (
              <option key={s.slug} value={s.name}>
                {s.name}
              </option>
            ))}
          </select>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="h-11 rounded-md border border-border bg-card px-3 text-sm text-foreground"
          />
        </div>

        {isLoading ? (
          <p className="mt-8 text-sm text-muted-foreground">Loading bookings…</p>
        ) : error ? (
          <p className="mt-8 text-sm text-destructive">
            You do not have access to bookings, or the list could not be loaded.
          </p>
        ) : rows.length === 0 ? (
          <p className="mt-8 text-sm text-muted-foreground">No bookings match these filters.</p>
        ) : (
          <div className="mt-8 space-y-4">
            {rows.map((b) => (
              <article
                key={b.id}
                className="rounded-xl border border-border bg-card p-5 shadow-sm"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h2 className="text-lg font-semibold text-foreground">{b.customer_name}</h2>
                    <p className="text-sm text-muted-foreground">
                      Ref {b.reference} · {b.phone}
                      {b.email ? ` · ${b.email}` : ""}
                    </p>
                  </div>
                  <select
                    value={b.status}
                    onChange={(e) => change(b.id, e.target.value)}
                    className="h-10 rounded-md border border-border bg-background px-3 text-sm text-foreground"
                  >
                    {STATUSES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
                <dl className="mt-4 grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
                  <div>
                    <dt className="inline text-foreground">Service: </dt>
                    <dd className="inline">{b.service}</dd>
                  </div>
                  <div>
                    <dt className="inline text-foreground">Price: </dt>
                    <dd className="inline">{formatPrice(b.price)}</dd>
                  </div>
                  <div>
                    <dt className="inline text-foreground">Date: </dt>
                    <dd className="inline">
                      {b.booking_date} at {b.booking_time}
                    </dd>
                  </div>
                  <div>
                    <dt className="inline text-foreground">Guests: </dt>
                    <dd className="inline">{b.guests}</dd>
                  </div>
                  <div>
                    <dt className="inline text-foreground">Provider: </dt>
                    <dd className="inline">{b.provider_name ?? "No preference"}</dd>
                  </div>
                </dl>
                {b.notes ? (
                  <p className="mt-3 text-sm text-muted-foreground">Notes: {b.notes}</p>
                ) : null}
              </article>
            ))}
          </div>
        )}

        <ProviderManager />
      </div>
    </div>
  );
}
