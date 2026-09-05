import { createFileRoute } from "@tanstack/react-router";

import { ServiceCard } from "@/components/site/ServiceCard";
import { SERVICES } from "@/lib/spa";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Massage Services & Prices | Happy Ending Massage Spa Westlands" },
      {
        name: "description",
        content:
          "Swedish, deep tissue, reflexology, sports, Thai, four hands and full packages from KSh 4,000. Browse every treatment and book online in Westlands, Nairobi.",
      },
      { property: "og:title", content: "Massage Services & Prices | Happy Ending Massage Spa" },
      {
        property: "og:description",
        content: "Every treatment, price and description — book your preferred session online.",
      },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <section className="mx-auto max-w-7xl px-4 pt-32 pb-20 sm:px-6">
      <div className="text-center">
        <p className="eyebrow">Our Menu</p>
        <h1 className="mt-3 font-display text-4xl sm:text-5xl">Massage &amp; Wellness Services</h1>
        <div className="luxe-divider mx-auto mt-5 w-48" />
        <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          Professional adult wellness treatments, each delivered in a private suite by trained
          therapists. Choose a treatment and your booking details carry straight through.
        </p>
      </div>
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((service) => (
          <ServiceCard key={service.slug} service={service} />
        ))}
      </div>
    </section>
  );
}
