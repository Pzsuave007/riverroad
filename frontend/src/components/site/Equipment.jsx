import { motion } from "framer-motion";
import {
  Droplets,
  Cog,
  Construction,
  Boxes,
  Truck,
  Sparkles,
} from "lucide-react";

const EQUIPMENT_BG =
  "https://images.unsplash.com/photo-1517089596392-fb9a9033e05b?auto=format&fit=crop&w=2000&q=80";

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
    icon: Construction,
    title: "Slip Form Pavers",
    label: "Precision Paving",
    items: [
      "Road Construction",
      "Curbs & Gutters",
      "Sidewalks",
      "Industrial Slabs",
      "Infrastructure Projects",
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
      className="relative py-24 lg:py-32 bg-zinc-950 overflow-hidden"
    >
      <div
        className="absolute inset-0 bg-cover bg-center opacity-15"
        style={{ backgroundImage: `url(${EQUIPMENT_BG})` }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-zinc-950/95 to-zinc-950" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div className="max-w-3xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px w-10 bg-orange-500" />
            <span className="text-xs uppercase tracking-[0.35em] text-orange-500 font-bold">
              Equipment Sales & Rentals
            </span>
          </div>
          <h2
            data-testid="equipment-heading"
            className="font-display uppercase font-bold tracking-tighter text-4xl sm:text-5xl lg:text-6xl text-white leading-[0.95]"
          >
            Aggregate, Concrete &{" "}
            <span className="text-orange-500">Crushing Equipment.</span>
          </h2>
          <p className="mt-5 text-zinc-300 max-w-2xl">
            We help contractors and producers find the right equipment — for
            sale or for rent — to maximize production and minimize downtime.
          </p>
        </div>

        <div
          data-testid="equipment-grid"
          className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5"
        >
          {GROUPS.map((g, idx) => (
            <motion.div
              key={g.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: idx * 0.06 }}
              data-testid={`equipment-card-${idx}`}
              className="relative bg-zinc-900/80 backdrop-blur border border-zinc-800 hover:border-orange-500 transition-all duration-300 p-7 group hover:-translate-y-1"
            >
              <div className="flex items-center justify-between mb-5">
                <div className="h-11 w-11 grid place-items-center bg-orange-500/10 border border-orange-500/40 text-orange-500">
                  <g.icon className="h-5 w-5" />
                </div>
                <span className="text-[10px] uppercase tracking-[0.25em] text-zinc-500 font-bold border border-zinc-700 px-2 py-1">
                  {g.label}
                </span>
              </div>
              <h3 className="font-display uppercase tracking-tight font-bold text-2xl text-white">
                {g.title}
              </h3>
              <ul className="mt-5 space-y-2">
                {g.items.map((it) => (
                  <li
                    key={it}
                    className="text-sm text-zinc-300 flex items-start gap-2.5"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 bg-orange-500 flex-shrink-0" />
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <div className="mt-14 border border-zinc-800 bg-zinc-950/80 p-8 lg:p-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div>
            <div className="text-xs uppercase tracking-[0.3em] text-orange-500 font-bold mb-2">
              Need Something Specific?
            </div>
            <div className="font-display uppercase tracking-tight text-3xl text-white">
              We Source. We Fabricate. We Deliver.
            </div>
          </div>
          <a
            href="#quote"
            data-testid="equipment-cta-btn"
            className="inline-flex items-center justify-center h-14 px-8 bg-orange-600 hover:bg-orange-500 text-white uppercase font-bold tracking-widest text-sm transition-colors"
          >
            Request Equipment Quote
          </a>
        </div>
      </div>
    </section>
  );
}
