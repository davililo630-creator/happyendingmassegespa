import { Link, createFileRoute } from "@tanstack/react-router";
import { Clock, MapPin, MessageCircle, Navigation, Phone } from "lucide-react";

import {
  ADDRESS_LINES,
  DIRECTIONS_URL,
  PHONE_DISPLAY,
  PHONE_TEL,
  SPA_NAME,
  WHATSAPP_URL,
} from "@/lib/spa";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & Directions | Happy Ending Massage Spa, Westlands Nairobi" },
      {
        name: "description",
        content:
          "Find Happy Ending Massage Spa behind Sarit Centre on School Lane, Westview Apartments, Westlands Nairobi. Chat on WhatsApp, call us or get driving directions.",
      },
      { property: "og:title", content: "Contact Happy Ending Massage Spa, Westlands" },
      {
        property: "og:description",
        content: "WhatsApp, call, directions and online booking for our Westlands spa.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <section className="mx-auto max-w-5xl px-4 pt-32 pb-20 sm:px-6">
      <div className="text-center">
        <p className="eyebrow">Contact</p>
        <h1 className="mt-3 font-display text-4xl sm:text-5xl">Get in touch with {SPA_NAME}</h1>
        <div className="luxe-divider mx-auto mt-5 w-48" />
      </div>

      <div className="mt-12 grid gap-4 sm:grid-cols-2">
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener"
          className="flex h-16 items-center justify-center gap-3 rounded-full bg-primary text-sm uppercase tracking-[0.2em] text-primary-foreground shadow-luxe"
        >
          <MessageCircle className="h-5 w-5" /> Chat on WhatsApp
        </a>
        <a
          href={PHONE_TEL}
          className="flex h-16 items-center justify-center gap-3 rounded-full border border-gold/50 text-sm uppercase tracking-[0.2em] text-gold"
        >
          <Phone className="h-5 w-5" /> Call Us
        </a>
        <a
          href={DIRECTIONS_URL}
          target="_blank"
          rel="noopener"
          className="flex h-16 items-center justify-center gap-3 rounded-full border border-border bg-card text-sm uppercase tracking-[0.2em]"
        >
          <Navigation className="h-5 w-5" /> Get Directions
        </a>
        <Link
          to="/booking"
          className="flex h-16 items-center justify-center rounded-full border border-border bg-card text-sm uppercase tracking-[0.2em]"
        >
          Book Now
        </Link>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-7 shadow-card">
          <MapPin className="h-6 w-6 text-gold" />
          <h2 className="mt-4 font-display text-2xl">Where to find us</h2>
          <address className="mt-3 text-sm not-italic leading-relaxed text-muted-foreground">
            {ADDRESS_LINES.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </address>
          <a
            href={DIRECTIONS_URL}
            target="_blank"
            rel="noopener"
            className="mt-5 inline-flex text-sm uppercase tracking-[0.2em] text-gold hover:underline"
          >
            Open in Google Maps
          </a>
        </div>
        <div className="rounded-xl border border-border bg-card p-7 shadow-card">
          <Clock className="h-6 w-6 text-gold" />
          <h2 className="mt-4 font-display text-2xl">Talk to us directly</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            WhatsApp and phone are for questions and directions. To reserve a treatment, use the
            booking page — your request is logged with the spa and confirmed back to you.
          </p>
          <p className="mt-4 text-sm text-muted-foreground">
            Phone / WhatsApp: <span className="text-gold">{PHONE_DISPLAY}</span>
          </p>
        </div>
      </div>
    </section>
  );
}
