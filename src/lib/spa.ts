import swedish from "@/assets/svc-swedish.jpg";
import deepTissue from "@/assets/svc-deep-tissue.jpg";
import reflexology from "@/assets/svc-reflexology.jpg";
import sports from "@/assets/svc-sports.jpg";
import normal from "@/assets/svc-normal.jpg";
import sensual from "@/assets/svc-sensual.jpg";
import bodyToBody from "@/assets/svc-body-to-body.jpg";
import fourHands from "@/assets/svc-four-hands.jpg";
import thai from "@/assets/svc-thai.jpg";
import erotic from "@/assets/svc-erotic.jpg";
import tantric from "@/assets/svc-tantric.jpg";
import pkg10 from "@/assets/pkg-10k.jpg";
import pkg12 from "@/assets/pkg-12k.jpg";

export const SPA_NAME = "Happy Ending Massage Spa";
export const TAGLINE = "Relax. Restore. Reconnect.";
export const PHONE_DISPLAY = "0182095210";
export const PHONE_TEL = "tel:0182095210";
export const WHATSAPP_BASE_URL = "https://wa.me/254182095210";
export function buildWhatsAppUrl(message: string) {
  return `${WHATSAPP_BASE_URL}?text=${encodeURIComponent(message)}`;
}
export const WHATSAPP_URL = buildWhatsAppUrl(
  "Hello Happy Ending Massage Spa, I would like to ask about your treatments.",
);
export function buildBookingWhatsAppUrl(booking: {
  reference?: string;
  customer_name?: string;
  phone?: string;
  email?: string;
  service?: string;
  price?: number;
  booking_date?: string;
  booking_time?: string;
  guests?: number;
  provider_name?: string | null;
  notes?: string;
}) {
  const lines = [
    "Hello Happy Ending Massage Spa, I would like to book a session.",
    "",
    booking.reference ? `Reference: ${booking.reference}` : undefined,
    booking.customer_name ? `Name: ${booking.customer_name}` : undefined,
    booking.phone ? `Phone: ${booking.phone}` : undefined,
    booking.email ? `Email: ${booking.email}` : undefined,
    booking.service ? `Service: ${booking.service}` : undefined,
    booking.price ? `Price: KSh ${Number(booking.price).toLocaleString("en-KE")}` : undefined,
    booking.booking_date && booking.booking_time
      ? `Date: ${booking.booking_date} at ${booking.booking_time}`
      : undefined,
    booking.guests ? `Guests: ${booking.guests}` : undefined,
    booking.provider_name ? `Preferred provider: ${booking.provider_name}` : undefined,
    booking.notes ? `Notes: ${booking.notes}` : undefined,
  ].filter(Boolean);

  return buildWhatsAppUrl(lines.join("\n"));
}
export const ADDRESS_LINES = [
  "Westlands, behind Sarit Centre,",
  "School Lane,",
  "Westview Apartments,",
  "Nairobi.",
];
export const DIRECTIONS_URL =
  "https://www.google.com/maps/dir/?api=1&destination=" +
  encodeURIComponent("Westview Apartments, School Lane, Westlands, Nairobi, Kenya") +
  "&travelmode=driving";

export type Service = {
  slug: string;
  name: string;
  price: number;
  description: string;
  image: string;
  alt: string;
};

export const SERVICES: Service[] = [
  {
    slug: "swedish-massage",
    name: "Swedish Massage",
    price: 4000,
    description:
      "Long, flowing strokes with warm oils to release surface tension and settle the nervous system.",
    image: swedish,
    alt: "Warm massage oil poured into a bowl beside folded towels in a dark luxury spa",
  },
  {
    slug: "deep-tissue-massage",
    name: "Deep Tissue Massage",
    price: 5000,
    description:
      "Focused, slow pressure through deeper muscle layers to relieve stubborn knots and chronic tightness.",
    image: deepTissue,
    alt: "Heated dark massage stones and a wooden therapy tool on slate",
  },
  {
    slug: "reflexology",
    name: "Reflexology",
    price: 4000,
    description:
      "Precise pressure-point work on the feet to ease fatigue and restore balance through the whole body.",
    image: reflexology,
    alt: "Copper foot soak bowl with rose petals, towels and candles",
  },
  {
    slug: "sports-massage",
    name: "Sports Massage",
    price: 5000,
    description:
      "Performance-focused treatment for active bodies — recovery, mobility and injury prevention.",
    image: sports,
    alt: "Therapist working on an athlete's leg in a dark burgundy-lit treatment room",
  },
  {
    slug: "normal-massage",
    name: "Normal Massage",
    price: 4000,
    description:
      "Our classic full-body relaxation massage at a gentle, unhurried pace. Ideal for first visits.",
    image: normal,
    alt: "Neatly dressed massage bed in a dark charcoal and burgundy treatment room",
  },
  {
    slug: "sensual-massage",
    name: "Sensual Massage",
    price: 7000,
    description:
      "A slow, full-body treatment for adults, delivered with warm oils in a completely private suite.",
    image: sensual,
    alt: "Massage bed dressed in burgundy silk with rose petals and candlelight",
  },
  {
    slug: "body-to-body",
    name: "Body to Body",
    price: 7000,
    description:
      "An intimate adult treatment using continuous full-contact strokes and heated oils.",
    image: bodyToBody,
    alt: "Silk-draped massage bed behind sheer curtains in purple light",
  },
  {
    slug: "four-hands",
    name: "Four Hands",
    price: 10000,
    description:
      "Two therapists working in perfect synchrony — the deepest state of surrender we offer.",
    image: fourHands,
    alt: "Treatment room with two therapist stations either side of a single massage bed",
  },
  {
    slug: "thai-massage",
    name: "Thai Massage",
    price: 5000,
    description:
      "Assisted stretching and rhythmic compression on a floor mat to open the joints and lengthen muscle.",
    image: thai,
    alt: "Thai massage floor mat with bamboo and brass bowls in a dark studio",
  },
  {
    slug: "erotic-massage",
    name: "Erotic Massage",
    price: 6000,
    description:
      "A sensory adult treatment built around slow touch, warm oil and complete discretion.",
    image: erotic,
    alt: "Candles and rose petals on dark velvet behind burgundy drapes",
  },
  {
    slug: "tantric-massage",
    name: "Tantric / Tantrum Massage",
    price: 7000,
    description:
      "A ritual-led adult treatment combining breath, presence and unhurried full-body touch.",
    image: tantric,
    alt: "Brass singing bowl with incense smoke and lotus flowers on dark stone",
  },
  {
    slug: "full-package-10000",
    name: "Full Package",
    price: 10000,
    description:
      "Includes Swedish Massage, Deep Tissue Massage, Reflexology, Sports Massage and Thai Massage in one extended session.",
    image: pkg10,
    alt: "Spa package arrangement of hot stones, oils, petal foot soak, towels and a bamboo mat",
  },
  {
    slug: "full-package-12000",
    name: "Full Package Signature",
    price: 12000,
    description:
      "Our most complete experience: Swedish, Deep Tissue, Reflexology, Sports and Thai Massage plus an extended sensual finish, hot-stone work and private suite refreshments.",
    image: pkg12,
    alt: "Opulent private spa suite with burgundy silk, hot stones, champagne and candlelight",
  },
];

export function findService(slug?: string | null) {
  return SERVICES.find((s) => s.slug === slug);
}

export function formatPrice(price: number) {
  return "KSh " + price.toLocaleString("en-KE");
}
