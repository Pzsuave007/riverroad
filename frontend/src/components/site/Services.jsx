import { motion } from "framer-motion";
import {
  Hammer,
  Flame,
  Building2,
  Wrench,
  ArrowUpRight,
} from "lucide-react";

const SERVICES = [
  {
    icon: Hammer,
    title: "Custom Metal Fabrication",
    summary:
      "Precision-built metal solutions designed to your exact specs.",
    image:
      "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=1200&q=80",
    items: [
      "Steel & aluminum fabrication",
      "Structural fabrication",
      "Custom brackets, frames & supports",
      "Equipment guards & walkways",
      "Prototype to production assemblies",
    ],
    span: "lg:col-span-7 lg:row-span-2",
  },
  {
    icon: Flame,
    title: "Professional Welding",
    summary:
      "Certified-quality MIG, TIG, Stick & on-site mobile welding.",
    image: "https://images.pexels.com/photos/37517094/pexels-photo-37517094.jpeg",
    items: [
      "MIG / TIG / Stick welding",
      "Mobile & on-site welding",
      "Trailer & equipment repair",
      "Structural & industrial welding",
    ],
    span: "lg:col-span-5",
  },
  {
    icon: Building2,
    title: "Structural & Industrial Metalwork",
    summary:
      "Beams, catwalks, railings & material handling structures.",
    image:
      "https://images.unsplash.com/photo-1517089596392-fb9a9033e05b?auto=format&fit=crop&w=1200&q=80",
    items: [
      "Structural beams & supports",
      "Catwalks & safety railings",
      "Equipment platforms",
      "Agricultural & industrial structures",
    ],
    span: "lg:col-span-5",
  },
  {
    icon: Wrench,
    title: "Heavy Equipment Repair & Rebuilds",
    summary:
      "Minimize downtime. Extend equipment life with field-tested repairs.",
    image: "https://images.pexels.com/photos/15071423/pexels-photo-15071423.jpeg",
    items: [
      "Heavy equipment welding",
      "Aggregate equipment rebuilds",
      "Trailer reinforcement",
      "Custom equipment modifications",
      "Wear component replacement",
    ],
    span: "lg:col-span-7",
  },
];

export default function Services() {
  return (
    <section
      id="services"
      data-testid="services-section"
      className="relative py-24 lg:py-32 bg-zinc-950 border-y border-zinc-900"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="h-px w-10 bg-orange-500" />
              <span className="text-xs uppercase tracking-[0.35em] text-orange-500 font-bold">
                What We Do
              </span>
            </div>
            <h2
              data-testid="services-heading"
              className="font-display uppercase font-bold tracking-tighter text-4xl sm:text-5xl lg:text-6xl text-white leading-[0.95]"
            >
              Services Engineered
              <br />
              <span className="text-orange-500">for Demanding Work.</span>
            </h2>
          </div>
          <p className="text-zinc-400 max-w-md text-base">
            Shop or jobsite — small repair or major fabrication, we deliver
            strong, dependable welds and steel built to outlast the work.
          </p>
        </div>

        <div
          data-testid="services-grid"
          className="grid grid-cols-1 lg:grid-cols-12 lg:grid-rows-2 gap-4 lg:gap-5 auto-rows-fr"
        >
          {SERVICES.map((s, idx) => (
            <motion.article
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              data-testid={`service-card-${idx}`}
              className={`group relative overflow-hidden border border-zinc-800 bg-zinc-900 hover:border-orange-500 transition-colors duration-300 min-h-[320px] flex flex-col ${s.span}`}
            >
              <div className="absolute inset-0">
                <img
                  src={s.image}
                  alt={s.title}
                  className="h-full w-full object-cover opacity-30 group-hover:opacity-50 transition-opacity duration-500 grayscale group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/85 to-zinc-950/40" />
              </div>

              <div className="relative z-10 flex flex-col h-full p-7 lg:p-8">
                <div className="flex items-start justify-between">
                  <div className="h-12 w-12 grid place-items-center border border-orange-500/40 bg-orange-500/10 text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-colors">
                    <s.icon className="h-6 w-6" />
                  </div>
                  <ArrowUpRight className="h-5 w-5 text-zinc-600 group-hover:text-orange-500 group-hover:rotate-45 transition-all duration-300" />
                </div>

                <h3 className="mt-6 font-display uppercase tracking-tight font-bold text-2xl sm:text-3xl text-white leading-tight">
                  {s.title}
                </h3>
                <p className="mt-2 text-zinc-300 text-base max-w-lg">
                  {s.summary}
                </p>

                <ul className="mt-auto pt-6 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5">
                  {s.items.map((item) => (
                    <li
                      key={item}
                      className="text-xs sm:text-sm text-zinc-400 flex items-start gap-2"
                    >
                      <span className="mt-1.5 h-1 w-1 bg-orange-500 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
