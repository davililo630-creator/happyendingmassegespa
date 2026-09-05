import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

import logo from "@/assets/logo.png";
import { SPA_NAME } from "@/lib/spa";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-border bg-onyx/95 backdrop-blur-xl"
          : "border-b border-transparent bg-gradient-to-b from-onyx/85 to-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <Link to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <img
            src={logo}
            alt={`${SPA_NAME} logo`}
            width={56}
            height={56}
            className="h-11 w-11 object-contain sm:h-12 sm:w-12"
          />
          <span className="font-display text-base leading-tight tracking-wide sm:text-lg">
            Happy Ending
            <span className="block text-[0.6rem] tracking-[0.3em] text-gold sm:text-[0.65rem]">
              MASSAGE SPA
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="text-sm uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-gold"
              activeProps={{ className: "text-gold" }}
              activeOptions={{ exact: item.to === "/" }}
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/booking"
            className="rounded-full bg-primary px-6 py-2.5 text-sm uppercase tracking-[0.18em] text-primary-foreground shadow-luxe transition-transform hover:scale-105"
          >
            Book Now
          </Link>
        </nav>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border text-foreground md:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-onyx/98 px-4 pb-6 pt-2 backdrop-blur-xl md:hidden">
          <nav className="flex flex-col">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="border-b border-border/50 py-4 text-sm uppercase tracking-[0.2em] text-muted-foreground"
                activeProps={{ className: "text-gold" }}
                activeOptions={{ exact: item.to === "/" }}
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/booking"
              onClick={() => setOpen(false)}
              className="mt-5 rounded-full bg-primary py-4 text-center text-sm uppercase tracking-[0.2em] text-primary-foreground"
            >
              Book Now
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
