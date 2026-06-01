import { motion } from "framer-motion";
import {
  HardHat,
  Mountain,
  Layers,
  Factory,
  Tractor,
  PackageOpen,
} from "lucide-react";

const INDUSTRIES = [
  { icon: HardHat, label: "Construction" },
  { icon: Mountain, label: "Aggregate & Mining" },
  { icon: Layers, label: "Concrete Production" },
  { icon: Factory, label: "Industrial Operations" },
  { icon: Tractor, label: "Agricultural Facilities" },
  { icon: PackageOpen, label: "Material Handling" },
];

export default function Industries() {
  return (
    <section
      id="industries"
      data-testid="industries-section"
      className="relative py-20 lg:py-24 bg-red-600 overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-[0.08] mix-blend-overlay"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, #fff 0 1px, transparent 1px 18px)",
        }}
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="h-px w-10 bg-white" />
              <span className="text-xs uppercase tracking-[0.35em] text-white font-bold">
                Industries We Serve
              </span>
            </div>
            <h2
              data-testid="industries-heading"
              className="font-display uppercase font-bold tracking-tight text-2xl sm:text-4xl lg:text-5xl text-white leading-tight"
            >
              When quality, durability & reliability matter — River Road delivers.
            </h2>
          </div>
        </div>

        <div
          data-testid="industries-grid"
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-white/20 border border-white/30"
        >
          {INDUSTRIES.map((ind, idx) => (
            <motion.div
              key={ind.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              data-testid={`industry-${idx}`}
              className="bg-red-600 p-7 flex flex-col items-center text-center gap-3 hover:bg-white group transition-colors"
            >
              <ind.icon className="h-9 w-9 text-white group-hover:text-red-600 transition-colors" />
              <span className="text-sm font-bold uppercase tracking-wider text-white group-hover:text-red-600 transition-colors">
                {ind.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
