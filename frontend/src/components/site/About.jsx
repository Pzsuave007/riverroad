import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const ABOUT_IMG = "https://images.pexels.com/photos/6036672/pexels-photo-6036672.jpeg";

const PILLARS = [
  "Woman-Owned Business",
  "Local Oregon Company",
  "Quality Materials & Craftsmanship",
  "Fast Turnaround Times",
  "Safety-Focused Operations",
  "Honest Pricing",
  "Reliable Customer Support",
  "Long-Term Business Relationships",
];

export default function About() {
  return (
    <section
      id="about"
      data-testid="about-section"
      className="relative py-24 lg:py-32 bg-stone-100"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-5 relative"
        >
          <div className="relative aspect-[4/5] overflow-hidden border border-zinc-300 shadow-xl">
            <img
              src={ABOUT_IMG}
              alt="Woman welder at work"
              className="absolute inset-0 h-full w-full object-cover img-desat"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 border-t-2 border-red-600 bg-zinc-950/85 backdrop-blur-sm">
              <div className="font-display uppercase tracking-tight text-3xl text-white">
                Built by a<br />
                <span className="text-red-500">Woman.</span> Engineered for Work.
              </div>
            </div>
          </div>
          <div className="absolute -top-4 -left-4 h-16 w-16 border-l-2 border-t-2 border-red-600 z-0" />
          <div className="absolute -bottom-4 -right-4 h-16 w-16 border-r-2 border-b-2 border-red-600 z-0" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="lg:col-span-7"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px w-10 bg-red-600" />
            <span className="text-xs uppercase tracking-[0.35em] text-red-600 font-bold">
              About River Road
            </span>
          </div>

          <h2
            data-testid="about-heading"
            className="font-display uppercase font-bold tracking-tight text-3xl sm:text-5xl lg:text-6xl text-zinc-900 leading-[1.05]"
          >
            A Woman-Owned Oregon
            <br />
            Business Built on{" "}
            <span className="text-red-600">Integrity.</span>
          </h2>

          <div className="mt-6 space-y-4 text-zinc-700 text-base leading-relaxed max-w-2xl">
            <p>
              River Road Custom Metal Fabrication LLC was founded with a
              commitment to providing dependable fabrication and equipment
              solutions backed by craftsmanship, honesty, and local service.
            </p>
            <p>
              Our team combines technical expertise with real-world field
              experience to create durable products and repair solutions that
              keep your operation moving — whether you're building new
              infrastructure, repairing critical equipment, or expanding
              production capacity.
            </p>
          </div>

          <div
            data-testid="about-pillars"
            className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3"
          >
            {PILLARS.map((p) => (
              <div
                key={p}
                className="flex items-start gap-3 border-l-2 border-red-600 pl-4 py-1.5 bg-white/60"
              >
                <CheckCircle2 className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                <span className="text-zinc-800 text-sm font-semibold">{p}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
