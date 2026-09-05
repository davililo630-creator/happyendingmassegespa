import { Link } from "@tanstack/react-router";
import { MapPin, MessageCircle, Navigation, Phone } from "lucide-react";

import logo from "@/assets/logo.png";
import {
  ADDRESS_LINES,
  DIRECTIONS_URL,
  PHONE_DISPLAY,
  PHONE_TEL,
  SPA_NAME,
  TAGLINE,
  WHATSAPP_URL,
} from "@/lib/spa";

export function Footer() {
  return (
    <footer className="border-t border-border bg-onyx">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3">
        <div>
          <img
            src={logo}
            alt={`${SPA_NAME} logo`}
            width={120}
            height={120}
            loading="lazy"
            className="h-20 w-20 object-contain"
          />
          <h3 className="mt-4 font-display text-2xl">{SPA_NAME}</h3>
          <p className="mt-2 text-sm italic text-muted-foreground">{TAGLINE}</p>
        </div>

        <div>
          <h4 className="eyebrow">Explore</h4>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            <li>
              <Link to="/services" className="hover:text-gold">
                Services
              </Link>
            </li>
            <li>
              <Link to="/booking" className="hover:text-gold">
                Book a Session
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-gold">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-gold">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="eyebrow">Visit &amp; Contact</h4>
          <address className="mt-4 flex gap-3 text-sm not-italic text-muted-foreground">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
            <span>
              {ADDRESS_LINES.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </span>
          </address>
          <div className="mt-5 flex flex-col gap-3 text-sm">
            <a href={WHATSAPP_URL} target="_blank" rel="noopener" className="flex items-center gap-3 hover:text-gold">
              <MessageCircle className="h-4 w-4 text-gold" /> Chat on WhatsApp
            </a>
            <a href={PHONE_TEL} className="flex items-center gap-3 hover:text-gold">
              <Phone className="h-4 w-4 text-gold" /> Call {PHONE_DISPLAY}
            </a>
            <a href={DIRECTIONS_URL} target="_blank" rel="noopener" className="flex items-center gap-3 hover:text-gold">
              <Navigation className="h-4 w-4 text-gold" /> Get Directions
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-border/60 px-4 py-6 text-center text-xs tracking-wide text-muted-foreground">
        © {new Date().getFullYear()} {SPA_NAME}, Westlands, Nairobi. All rights reserved.
      </div>
    </footer>
  );
}
