import { Link, createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, MessageCircle, Phone } from "lucide-react";
import { z } from "zod";

import { PHONE_DISPLAY, PHONE_TEL, buildBookingWhatsAppUrl } from "@/lib/spa";

export const Route = createFileRoute("/booking/confirmed")({
  validateSearch: z.object({
    ref: z.string().optional(),
    customer_name: z.string().optional(),
    phone: z.string().optional(),
    email: z.string().optional(),
    service: z.string().optional(),
    price: z.coerce.number().optional(),
    booking_date: z.string().optional(),
    booking_time: z.string().optional(),
    guests: z.coerce.number().optional(),
    provider_name: z.string().optional(),
    notes: z.string().optional(),
  }),
  head: () => ({
    meta: [
      { title: "Booking Request Received | Happy Ending Massage Spa" },
      {
        name: "description",
        content:
          "Your massage booking request has been received by Happy Ending Massage Spa in Westlands, Nairobi. Keep your reference number for your visit.",
      },
      { property: "og:title", content: "Booking Request Received | Happy Ending Massage Spa" },
      { property: "og:description", content: "We have received your booking request." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Confirmed,
});

function Confirmed() {
  const booking = Route.useSearch();
  const whatsappUrl = buildBookingWhatsAppUrl(booking);

  return (
    <section className="mx-auto flex min-h-[80svh] max-w-2xl flex-col items-center justify-center px-4 pt-32 pb-20 text-center sm:px-6">
      <CheckCircle2 className="h-16 w-16 text-gold" />
      <h1 className="mt-6 font-display text-4xl sm:text-5xl">Booking request received</h1>
      <div className="luxe-divider mt-5 w-48" />
      {booking.ref && (
        <div className="mt-8 rounded-xl border border-gold/40 bg-card px-8 py-6 shadow-luxe">
          <p className="eyebrow">Your Reference</p>
          <p className="mt-2 font-display text-3xl tracking-wider text-gold">{booking.ref}</p>
          <p className="mt-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">Status: Pending</p>
        </div>
      )}
      <p className="mt-8 leading-relaxed text-muted-foreground">
        Thank you — your request has been received by the spa. It is not yet a confirmed appointment:
        a member of our team will review the date and time and confirm your session with you shortly.
        Please keep your reference number.
      </p>
      <div className="mt-10 grid w-full max-w-md gap-3 sm:grid-cols-2">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener"
          className="flex h-14 items-center justify-center gap-2 rounded-full bg-primary text-sm uppercase tracking-[0.2em] text-primary-foreground"
        >
          <MessageCircle className="h-4 w-4" /> WhatsApp Us
        </a>
        <a
          href={PHONE_TEL}
          className="flex h-14 items-center justify-center gap-2 rounded-full border border-gold/50 text-sm uppercase tracking-[0.2em] text-gold"
        >
          <Phone className="h-4 w-4" /> Call {PHONE_DISPLAY}
        </a>
      </div>
      <Link to="/" className="mt-8 text-sm uppercase tracking-[0.2em] text-muted-foreground hover:text-gold">
        Back to home
      </Link>
    </section>
  );
}
