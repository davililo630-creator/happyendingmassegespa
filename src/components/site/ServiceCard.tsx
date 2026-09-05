import { Link } from "@tanstack/react-router";

import { formatPrice, type Service } from "@/lib/spa";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <article className="group overflow-hidden rounded-xl border border-border bg-card shadow-card transition-all duration-500 hover:-translate-y-1 hover:border-gold/40 hover:shadow-luxe">
      <div className="relative aspect-4/3 overflow-hidden">
        <img
          src={service.image}
          alt={service.alt}
          width={1024}
          height={768}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-onyx via-onyx/20 to-transparent" />
        <span className="absolute bottom-3 right-3 rounded-full border border-gold/40 bg-onyx/80 px-3 py-1 text-xs tracking-widest text-gold">
          {formatPrice(service.price)}
        </span>
      </div>
      <div className="p-5">
        <h3 className="font-display text-xl">{service.name}</h3>
        <p className="mt-2 min-h-16 text-sm leading-relaxed text-muted-foreground">
          {service.description}
        </p>
        <Link
          to="/booking"
          search={{ service: service.slug }}
          className="mt-5 flex h-12 items-center justify-center rounded-full bg-primary text-sm uppercase tracking-[0.2em] text-primary-foreground transition-colors hover:bg-accent"
        >
          Book Now
        </Link>
      </div>
    </article>
  );
}
