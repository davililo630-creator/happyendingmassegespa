import { Link, createFileRoute } from "@tanstack/react-router";
import { MapPin, MessageCircle, Navigation, Phone, ShieldCheck, Sparkles } from "lucide-react";

import aboutImg from "@/assets/about-spa.jpg";
import heroImg from "@/assets/hero-room.jpg";
import logo from "@/assets/logo.png";
import { ServiceCard } from "@/components/site/ServiceCard";
import {
  ADDRESS_LINES,
  DIRECTIONS_URL,
  PHONE_DISPLAY,
  PHONE_TEL,
  SERVICES,
  SPA_NAME,
  TAGLINE,
  WHATSAPP_URL,
} from "@/lib/spa";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Luxury Massage Spa in Westlands, Nairobi | Happy Ending Massage Spa" },
      {
        name: "description",
        content:
          "Happy Ending Massage Spa in Westlands, Nairobi offers premium massage and wellness experiences in a private, luxurious environment. Explore our treatments and book your session online.",
      },
      { property: "og:title", content: "Luxury Massage Spa in Westlands, Nairobi | Happy Ending Massage Spa" },
      {
        property: "og:description",
        content:
          "Premium massage and wellness treatments in a private, luxurious Westlands setting. Book your session online.",
      },
    ],
  }),
  component: Home,
});

const WHY = [
  { title: "Professional Therapists", text: "Trained, discreet and attentive from the first minute." },
  { title: "Private Treatment Rooms", text: "Every session takes place in a fully private suite." },
  { title: "Premium Environment", text: "Considered lighting, fresh linens and calm throughout." },
  { title: "Convenient Westlands Location", text: "Minutes from Sarit Centre with easy parking." },
];

function Home() {
  return (
    <>
      <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden">
        <img
          src={heroImg}
          alt="Private luxury massage room with an elegant massage bed and warm purple lighting"
          width={1920}
          height={1088}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-onyx/85 via-onyx/60 to-onyx" />
        <div className="relative mx-auto max-w-3xl px-5 pt-24 pb-16 text-center animate-rise">
          <img
            src={logo}
            alt={`${SPA_NAME} logo`}
            width={160}
            height={160}
            className="mx-auto h-24 w-24 object-contain sm:h-28 sm:w-28"
          />
          <h1 className="mt-6 font-display text-4xl leading-tight sm:text-6xl">
            <span className="text-gold-gradient">HAPPY ENDING</span>
            <span className="mt-2 block text-lg tracking-[0.32em] text-foreground sm:text-2xl">
              MASSAGE SPA
            </span>
          </h1>
          <p className="mt-4 text-sm uppercase tracking-[0.28em] text-muted-foreground sm:text-base">
            Luxury Massage &amp; Wellness
          </p>
          <p className="mt-5 font-display text-2xl italic text-gold sm:text-3xl">“{TAGLINE}”</p>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            Professional massage experiences in a calm, private and luxurious environment.
          </p>

          <div className="mx-auto mt-9 grid max-w-md grid-cols-1 gap-3 sm:max-w-none sm:grid-cols-2">
            <Link
              to="/services"
              className="flex h-14 items-center justify-center rounded-full border border-gold/50 bg-onyx/60 text-sm uppercase tracking-[0.2em] text-gold backdrop-blur transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              Explore Services
            </Link>
            <Link
              to="/booking"
              className="flex h-14 items-center justify-center rounded-full bg-primary text-sm uppercase tracking-[0.2em] text-primary-foreground shadow-luxe transition-transform hover:scale-[1.03]"
            >
              Book a Session
            </Link>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener"
              className="flex h-14 items-center justify-center gap-2 rounded-full border border-border bg-card/70 text-sm uppercase tracking-[0.2em] backdrop-blur transition-colors hover:border-gold/50"
            >
              <MessageCircle className="h-4 w-4" /> Chat on WhatsApp
            </a>
            <a
              href={DIRECTIONS_URL}
              target="_blank"
              rel="noopener"
              className="flex h-14 items-center justify-center gap-2 rounded-full border border-border bg-card/70 text-sm uppercase tracking-[0.2em] backdrop-blur transition-colors hover:border-gold/50"
            >
              <Navigation className="h-4 w-4" /> Get Directions
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="text-center">
          <p className="eyebrow">Our Treatments</p>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl">Signature Massage Menu</h2>
          <div className="luxe-divider mx-auto mt-5 w-40" />
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.slice(0, 6).map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            to="/services"
            className="inline-flex h-14 items-center justify-center rounded-full border border-gold/50 px-10 text-sm uppercase tracking-[0.2em] text-gold transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            View All 13 Treatments
          </Link>
        </div>
      </section>

      <section className="bg-plum-gradient py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2">
          <img
            src={aboutImg}
            alt="Dark luxury spa lounge with velvet seating and soft purple lighting"
            width={1280}
            height={960}
            loading="lazy"
            className="h-full w-full rounded-xl object-cover shadow-luxe"
          />
          <div>
            <p className="eyebrow">About Us</p>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl">A private wellness retreat in Westlands</h2>
            <p className="mt-5 leading-relaxed text-muted-foreground">
              {SPA_NAME} is a private luxury massage and wellness destination in Westlands, Nairobi,
              offering professional massage experiences in a calm and elegant environment.
            </p>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Every visit is unhurried and completely discreet — from the moment you arrive to the
              last quiet minutes after your treatment.
            </p>
            <Link
              to="/about"
              className="mt-7 inline-flex h-13 items-center gap-2 rounded-full border border-gold/50 px-8 py-4 text-sm uppercase tracking-[0.2em] text-gold transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              <Sparkles className="h-4 w-4" /> More About Us
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="text-center">
          <p className="eyebrow">Why Choose Us</p>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl">The Happy Ending Standard</h2>
          <div className="luxe-divider mx-auto mt-5 w-40" />
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {WHY.map((item) => (
            <div
              key={item.title}
              className="rounded-xl border border-border bg-card p-7 shadow-card transition-colors hover:border-gold/40"
            >
              <ShieldCheck className="h-7 w-7 text-gold" />
              <h3 className="mt-4 font-display text-xl">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-onyx py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <p className="eyebrow">Contact</p>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl">Reserve or simply say hello</h2>
          <address className="mt-6 flex items-center justify-center gap-2 text-sm not-italic text-muted-foreground">
            <MapPin className="h-4 w-4 text-gold" />
            <span>{ADDRESS_LINES.join(" ")}</span>
          </address>
          <div className="mx-auto mt-9 grid max-w-md grid-cols-1 gap-3 sm:max-w-none sm:grid-cols-2">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener"
              className="flex h-14 items-center justify-center gap-2 rounded-full bg-primary text-sm uppercase tracking-[0.2em] text-primary-foreground"
            >
              <MessageCircle className="h-4 w-4" /> Chat on WhatsApp
            </a>
            <a
              href={PHONE_TEL}
              className="flex h-14 items-center justify-center gap-2 rounded-full border border-gold/50 text-sm uppercase tracking-[0.2em] text-gold"
            >
              <Phone className="h-4 w-4" /> Call {PHONE_DISPLAY}
            </a>
            <a
              href={DIRECTIONS_URL}
              target="_blank"
              rel="noopener"
              className="flex h-14 items-center justify-center gap-2 rounded-full border border-border bg-card text-sm uppercase tracking-[0.2em]"
            >
              <Navigation className="h-4 w-4" /> Get Directions
            </a>
            <Link
              to="/booking"
              className="flex h-14 items-center justify-center rounded-full border border-border bg-card text-sm uppercase tracking-[0.2em]"
            >
              Book Now
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
