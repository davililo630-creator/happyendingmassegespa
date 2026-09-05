import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

import { createBooking } from "@/lib/bookings.functions";
import { listActiveProviders } from "@/lib/providers.functions";
import { SERVICES, findService, formatPrice } from "@/lib/spa";

const searchSchema = z.object({
  service: z.string().optional(),
});

export const Route = createFileRoute("/booking/")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Reserve Your Session | Happy Ending Massage Spa Westlands" },
      {
        name: "description",
        content:
          "Book a massage at Happy Ending Massage Spa in Westlands, Nairobi. Choose your treatment, date and time and we confirm your reservation directly.",
      },
      { property: "og:title", content: "Reserve Your Session | Happy Ending Massage Spa" },
      {
        property: "og:description",
        content: "Choose your preferred treatment, date and time and book online.",
      },
    ],
  }),
  component: BookingPage,
});

const TIMES = [
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
];

const inputClass =
  "h-14 w-full rounded-lg border border-input bg-onyx/60 px-4 text-base text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-gold";

function BookingPage() {
  const { service: serviceParam } = Route.useSearch();
  const navigate = useNavigate();
  const submit = useServerFn(createBooking);
  const fetchProviders = useServerFn(listActiveProviders);

  const [slug, setSlug] = useState(findService(serviceParam)?.slug ?? SERVICES[0]!.slug);
  const [saving, setSaving] = useState(false);
  const [providerId, setProviderId] = useState("");
  const selected = findService(slug)!;

  const { data: providers } = useQuery({
    queryKey: ["active-providers"],
    queryFn: () => fetchProviders(),
  });
  const chosenProvider = (providers ?? []).find((p) => p.id === providerId);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const payload = {
      customer_name: String(form.get("customer_name") ?? "").trim(),
      phone: String(form.get("phone") ?? "").trim(),
      email: String(form.get("email") ?? "").trim(),
      service: selected.name,
      price: selected.price,
      booking_date: String(form.get("booking_date") ?? ""),
      booking_time: String(form.get("booking_time") ?? ""),
      guests: Number(form.get("guests") ?? 1),
      notes: String(form.get("notes") ?? "").trim(),
      provider_id: providerId,
      provider_name: chosenProvider?.name ?? "",
    };

    if (payload.customer_name.length < 2) {
      toast.error("Please enter your full name.");
      return;
    }
    if (payload.phone.length < 7) {
      toast.error("Please enter a valid phone number.");
      return;
    }
    if (!payload.booking_date) {
      toast.error("Please choose a preferred date.");
      return;
    }
    if (!payload.booking_time) {
      toast.error("Please choose a preferred time.");
      return;
    }
    if (payload.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
      toast.error("Please enter a valid email address or leave it blank.");
      return;
    }


    setSaving(true);
    try {
      const booking = await submit({ data: payload });
      navigate({ to: "/booking/confirmed", search: { ref: booking.reference } });
    } catch (error) {
      console.error(error);
      toast.error("We could not save your booking. Please try again or call us.");
    } finally {
      setSaving(false);
    }
  }

  const today = new Date().toISOString().slice(0, 10);

  return (
    <section className="mx-auto max-w-3xl px-4 pt-32 pb-20 sm:px-6">
      <div className="text-center">
        <p className="eyebrow">Booking</p>
        <h1 className="mt-3 font-display text-4xl sm:text-5xl">Reserve Your Session</h1>
        <div className="luxe-divider mx-auto mt-5 w-48" />
        <p className="mt-6 text-sm text-muted-foreground sm:text-base">
          Choose your preferred treatment, date and time.
        </p>
      </div>

      <div className="mt-10 overflow-hidden rounded-xl border border-gold/30 bg-card shadow-luxe">
        <div className="flex items-center gap-4 border-b border-border bg-plum-gradient p-5">
          <img
            src={selected.image}
            alt={selected.alt}
            width={1024}
            height={768}
            loading="lazy"
            className="h-20 w-20 rounded-lg object-cover"
          />
          <div>
            <p className="eyebrow">Selected Service</p>
            <p className="mt-1 font-display text-2xl">{selected.name}</p>
            <p className="text-sm text-gold">Price: {formatPrice(selected.price)}</p>
          </div>
        </div>

        <form onSubmit={onSubmit} className="grid gap-5 p-5 sm:p-7">
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block">
              <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Full Name</span>
              <input name="customer_name" required autoComplete="name" className={`mt-2 ${inputClass}`} placeholder="Your name" />
            </label>
            <label className="block">
              <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Phone Number</span>
              <input
                name="phone"
                required
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                className={`mt-2 ${inputClass}`}
                placeholder="07xx xxx xxx"
              />
            </label>
          </div>

          <label className="block">
            <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Email Address (optional)
            </span>
            <input name="email" type="email" autoComplete="email" className={`mt-2 ${inputClass}`} placeholder="you@email.com" />
          </label>

          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block">
              <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Service</span>
              <select
                name="service"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className={`mt-2 ${inputClass}`}
              >
                {SERVICES.map((s) => (
                  <option key={s.slug} value={s.slug} className="bg-onyx">
                    {s.name} — {formatPrice(s.price)}
                  </option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Price</span>
              <input readOnly value={formatPrice(selected.price)} className={`mt-2 ${inputClass} text-gold`} />
            </label>
          </div>

          <div className="grid gap-5 sm:grid-cols-3">
            <label className="block">
              <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Preferred Date</span>
              <input name="booking_date" type="date" required min={today} className={`mt-2 ${inputClass}`} />
            </label>
            <label className="block">
              <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Preferred Time</span>
              <select name="booking_time" required defaultValue="" className={`mt-2 ${inputClass}`}>
                <option value="" disabled className="bg-onyx">
                  Select
                </option>
                {TIMES.map((t) => (
                  <option key={t} value={t} className="bg-onyx">
                    {t}
                  </option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Guests</span>
              <input
                name="guests"
                type="number"
                min={1}
                max={10}
                defaultValue={1}
                inputMode="numeric"
                className={`mt-2 ${inputClass}`}
              />
            </label>
          </div>

          <label className="block">
            <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Notes (optional)</span>
            <textarea
              name="notes"
              rows={4}
              maxLength={1000}
              className="mt-2 w-full rounded-lg border border-input bg-onyx/60 p-4 text-base outline-none focus:border-gold"
              placeholder="Anything we should know before your session?"
            />
          </label>

          <button
            type="submit"
            disabled={saving}
            className="h-16 w-full rounded-full bg-primary text-sm uppercase tracking-[0.24em] text-primary-foreground shadow-luxe transition-transform hover:scale-[1.01] disabled:opacity-60"
          >
            {saving ? "Sending your request…" : "Confirm Booking"}
          </button>
          <p className="text-center text-xs text-muted-foreground">
            Your request is saved with the spa and a member of our team confirms your appointment.
          </p>
        </form>
      </div>
    </section>
  );
}
