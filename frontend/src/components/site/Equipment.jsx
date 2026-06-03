import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Droplets,
  Cog,
  Construction,
  Boxes,
  Truck,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";

const EQUIPMENT_BG =
  "https://images.unsplash.com/photo-1517089596392-fb9a9033e05b?auto=format&fit=crop&w=2000&q=80";

const FEATURED = {
  icon: Construction,
  title: "Slipform Paver",
  subtitle: "TRAILrider® — In Stock & For Sale",
  description:
    "The TRAILrider® slipform paver — 8″ side clearance (narrowest on the market), adjustable widths from 4′ to 12′, depths 2–6 inches. Places 8 cu yd loads in 6 minutes. Pulled by any truck or loader.",
  image: "/projects/trailrider-3.jpg",
  badge: "FOR SALE",
  href: "/trailrider",
  applications: [
    "Nature Trails",
    "Golf Cart Paths",
    "Bike Lanes",
    "Sidewalks",
    "Single-Lane Driveways",
  ],
};

const GROUPS = [
  {
    icon: Droplets,
    title: "Aggregate Processing",
    label: "Sale & Rental",
    items: [
      "Portable Rock Wash Plants",
      "Sand Screws",
      "Conveyors & Stackers",
      "Hoppers & Chutes",
    ],
  },
  {
    icon: Cog,
    title: "Concrete Production",
    label: "Sale & Rental",
    items: [
      "Concrete Batch Plants",
      "Portable Batch Systems",
      "Stationary Batch Plants",
      "Silos, Mixers & Conveyors",
      "Control Systems",
    ],
  },
  {
    icon: Boxes,
    title: "Crushing Support",
    label: "Productivity & Flow",
    items: [
      "Feeders & Reclaim Feeders",
      "Screens & Scalping Units",
      "Conveyors & Stackers",
      "Wear Parts, Liners & Magnets",
      "Dust Control & Guarding",
    ],
  },
  {
    icon: Truck,
    title: "Hoppers & Chutes",
    label: "Custom Fabrication",
    items: [
      "Material Transfer Solutions",
      "Storage & Surge Bins",
      "Transfer Points",
      "Wear-Resistant Liners",
    ],
  },
  {
    icon: Sparkles,
    title: "Custom Solutions",
    label: "Built To Spec",
    items: [
      "Equipment Modifications",
      "Production Capacity Expansions",
      "Field Repairs & Rebuilds",
      "Site-Specific Engineering",
    ],
  },
];

export default function Equipment() {
  return (
    <section
      id="equipment"
      data-testid="equipment-section"
      className="relative py-24 lg:py-32 bg-zinc-50 overflow-hidden"
    >
      <div
        className="absolute inset-0 bg-cover bg-center opacity-[0.04]"
        style={{ backgroundImage: `url(${EQUIPMENT_BG})` }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-50 via-zinc-50/95 to-zinc-50" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div className="max-w-3xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px w-10 bg-red-600" />
            <span className="text-xs uppercase tracking-[0.35em] text-red-600 font-bold">
              Equipment Sales & Rentals
            </span>
          </div>
          <h2
            data-testid="equipment-heading"
            className="font-display uppercase font-bold tracking-tight text-3xl sm:text-5xl lg:text-6xl text-zinc-900 leading-[0.95]"
          >
            Aggregate, Concrete &{" "}
            <span className="text-red-600">Crushing Equipment.</span>
          </h2>
          <p className="mt-5 text-zinc-600 max-w-2xl">
            We help contractors and producers find the right equipment — for
            sale or for rent — to maximize production and minimize downtime.
          </p>
        </div>

        {/* FEATURED — Slipform Paver / TRAILrider */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          data-testid="featured-trailrider"
          className="mt-14 relative grid grid-cols-1 lg:grid-cols-12 gap-0 border border-red-600 shadow-2xl shadow-red-600/10 overflow-hidden"
        >
          {/* Image side */}
          <div className="lg:col-span-7 relative aspect-[16/10] lg:aspect-auto lg:min-h-[460px] overflow-hidden bg-zinc-200">
            <img
              src={FEATURED.image}
              alt={FEATURED.title}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute top-5 left-5 flex items-center gap-2">
              <span className="inline-flex items-center gap-2 bg-red-600 text-white px-4 py-2 text-xs font-bold uppercase tracking-[0.25em] shadow-lg">
                <span className="h-2 w-2 bg-white animate-pulse rounded-full" />
                {FEATURED.badge}
              </span>
            </div>
          </div>

          {/* Text side */}
          <div className="lg:col-span-5 bg-white p-7 lg:p-10 flex flex-col">
            <div className="flex items-center gap-3 mb-3">
              <FEATURED.icon className="h-6 w-6 text-red-600" />
              <span className="text-xs uppercase tracking-[0.3em] text-red-600 font-bold">
                {FEATURED.subtitle}
              </span>
            </div>
            <h3 className="font-display uppercase tracking-tight font-bold text-3xl sm:text-4xl text-zinc-900 leading-tight">
              {FEATURED.title}
            </h3>
            <p className="mt-4 text-zinc-700 text-sm leading-relaxed">
              {FEATURED.description}
            </p>
            <div className="mt-5">
              <div className="text-[10px] uppercase tracking-[0.25em] text-zinc-500 font-bold mb-2">
                Ideal for
              </div>
              <div className="flex flex-wrap gap-2">
                {FEATURED.applications.map((a) => (
                  <span
                    key={a}
                    className="bg-zinc-100 border border-zinc-200 text-zinc-800 px-3 py-1 text-xs font-semibold"
                  >
                    {a}
                  </span>
                ))}
              </div>
            </div>
            <Link
              to={FEATURED.href}
              data-testid="featured-trailrider-cta"
              className="mt-auto pt-6 inline-flex items-center justify-between bg-red-600 hover:bg-red-500 text-white px-5 h-12 uppercase font-bold tracking-widest text-xs transition-colors group"
            >
              <span>View Details & Specs</span>
              <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>
          </div>
        </motion.div>

        {/* Parts callout teaser — links to /trailrider full page */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          data-testid="parts-callout-teaser"
          className="mt-4 lg:mt-5 grid grid-cols-1 lg:grid-cols-12 border border-zinc-200 bg-white overflow-hidden"
        >
          <div className="lg:col-span-7 bg-zinc-50 p-4 lg:p-6 flex items-center justify-center">
            <img
              src="/projects/trailrider-parts.png"
              alt="TRAILrider Model HR — parts callout"
              className="max-h-[420px] w-auto object-contain"
            />
          </div>
          <div className="lg:col-span-5 p-7 lg:p-10 flex flex-col justify-center bg-zinc-100">
            <div className="text-xs uppercase tracking-[0.3em] text-red-600 font-bold mb-3">
              Model HR — Bolted & Modular
            </div>
            <h3 className="font-display uppercase tracking-tight font-bold text-2xl sm:text-3xl text-zinc-900 leading-tight">
              Adjustable Width.
              <br />
              Built to Spec.
            </h3>
            <p className="mt-4 text-zinc-700 text-sm leading-relaxed">
              Bolt-on side panels with skid &amp; towing attachment. Variable
              tow points, depth adjustments &amp; anchor pins. Screed sections of
              8′, 4′, 1′ and 24″ — combine them to match your project width
              from 4′ to 12′.
            </p>
            <Link
              to="/trailrider"
              data-testid="parts-callout-cta"
              className="mt-6 inline-flex items-center justify-between bg-zinc-900 hover:bg-red-600 text-white px-5 h-12 uppercase font-bold tracking-widest text-xs transition-colors group w-fit"
            >
              <span>Explore Full Build</span>
              <ArrowUpRight className="h-5 w-5 ml-3 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>
          </div>
        </motion.div>

        <div
          data-testid="equipment-grid"
          className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5"
        >
          {GROUPS.map((g, idx) => (
            <motion.div
              key={g.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: idx * 0.06 }}
              data-testid={`equipment-card-${idx}`}
              className="relative bg-white border border-zinc-200 hover:border-red-600 hover:shadow-xl transition-all duration-300 p-7 group hover:-translate-y-1"
            >
              <div className="flex items-center justify-between mb-5">
                <div className="h-11 w-11 grid place-items-center bg-red-50 border border-red-200 text-red-600 group-hover:bg-red-600 group-hover:text-white group-hover:border-red-600 transition-colors">
                  <g.icon className="h-5 w-5" />
                </div>
                <span className="text-[10px] uppercase tracking-[0.25em] text-zinc-500 font-bold border border-zinc-300 px-2 py-1">
                  {g.label}
                </span>
              </div>
              <h3 className="font-display uppercase tracking-tight font-bold text-2xl text-zinc-900">
                {g.title}
              </h3>
              <ul className="mt-5 space-y-2">
                {g.items.map((it) => (
                  <li
                    key={it}
                    className="text-sm text-zinc-700 flex items-start gap-2.5"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 bg-red-600 flex-shrink-0" />
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <div className="mt-14 border border-zinc-800 bg-zinc-950 p-8 lg:p-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div>
            <div className="text-xs uppercase tracking-[0.3em] text-red-500 font-bold mb-2">
              Need Something Specific?
            </div>
            <div className="font-display uppercase tracking-tight text-3xl text-white">
              We Source. We Fabricate. We Deliver.
            </div>
          </div>
          <a
            href="#quote"
            data-testid="equipment-cta-btn"
            className="inline-flex items-center justify-center h-14 px-8 bg-red-600 hover:bg-red-500 text-white uppercase font-bold tracking-widest text-sm transition-colors"
          >
            Request Equipment Quote
          </a>
        </div>
      </div>
    </section>
  );
}
