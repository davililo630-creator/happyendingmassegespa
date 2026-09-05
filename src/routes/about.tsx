import { Link, createFileRoute } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";

import aboutImg from "@/assets/about-spa.jpg";
import heroImg from "@/assets/hero-room.jpg";
import { SPA_NAME } from "@/lib/spa";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Our Westlands Spa | Happy Ending Massage Spa Nairobi" },
      {
        name: "description",
        content:
          "Happy Ending Massage Spa is a private luxury massage and wellness destination in Westlands, Nairobi, with professional therapists and private treatment rooms.",
      },
      { property: "og:title", content: "About Happy Ending Massage Spa, Westlands Nairobi" },
      {
        property: "og:description",
        content: "A private luxury massage and wellness destination in Westlands, Nairobi.",
      },
    ],
  }),
  component: AboutPage,
});

const VALUES = [
  { title: "Professional Therapists", text: "Skilled, courteous and fully discreet." },
  { title: "Private Treatment Rooms", text: "One guest, one suite, no interruptions." },
  { title: "Premium Environment", text: "Fresh linens, warm light and quiet throughout." },
  { title: "Convenient Westlands Location", text: "Behind Sarit Centre on School Lane." },
];

function AboutPage() {
  return (
    <>
      <section className="mx-auto max-w-7xl px-4 pt-32 pb-16 sm:px-6">
        <div className="text-center">
          <p className="eyebrow">About Us</p>
          <h1 className="mt-3 font-display text-4xl sm:text-5xl">Luxury, privacy and real care</h1>
          <div className="luxe-divider mx-auto mt-5 w-48" />
        </div>
        <div className="mt-12 grid items-center gap-10 lg:grid-cols-2">
          <img
            src={aboutImg}
            alt="Luxury spa lounge with velvet seating, orchids and soft purple lighting"
            width={1280}
            height={960}
            loading="lazy"
            className="w-full rounded-xl object-cover shadow-luxe"
          />
          <div>
            <h2 className="font-display text-3xl">Our story</h2>
            <p className="mt-5 leading-relaxed text-muted-foreground">
              {SPA_NAME} is a private luxury massage and wellness destination in Westlands, Nairobi,
              offering professional massage experiences in a calm and elegant environment.
            </p>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              We built the spa around three things our guests ask for most: genuine skill, complete
              privacy and an atmosphere that lets you switch off the moment you step inside. Sessions
              are never rushed and never shared.
            </p>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Whether you arrive for focused deep tissue recovery or an unhurried signature package,
              your therapist adapts the treatment to how your body feels on the day.
            </p>
            <Link
              to="/booking"
              className="mt-8 inline-flex h-14 items-center rounded-full bg-primary px-10 text-sm uppercase tracking-[0.2em] text-primary-foreground"
            >
              Book a Session
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-plum-gradient py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="text-center font-display text-3xl sm:text-4xl">Why guests return</h2>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((item) => (
              <div key={item.title} className="rounded-xl border border-border bg-card p-7 shadow-card">
                <ShieldCheck className="h-7 w-7 text-gold" />
                <h3 className="mt-4 font-display text-xl">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-20 sm:px-6">
        <img
          src={heroImg}
          alt="Private massage suite with elegant massage bed and warm ambient lighting"
          width={1920}
          height={1088}
          loading="lazy"
          className="w-full rounded-xl object-cover shadow-luxe"
        />
      </section>
    </>
  );
}
