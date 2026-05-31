import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, MapPin, Award } from "lucide-react";
import { Button } from "@/components/ui/button";

const HERO_IMG =
  "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=2000&q=80";

export default function Hero() {
  return (
    <section
      id="top"
      data-testid="hero-section"
      className="relative min-h-screen w-full overflow-hidden bg-zinc-950"
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${HERO_IMG})` }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/85 to-zinc-950/40"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-zinc-950/30"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10 pt-40 pb-24 lg:pt-48 lg:pb-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="flex items-center gap-3 mb-6"
        >
          <span className="h-px w-12 bg-orange-500" />
          <span
            data-testid="hero-eyebrow"
            className="text-xs sm:text-sm uppercase tracking-[0.35em] text-orange-500 font-bold"
          >
            Oregon • Woman-Owned • Since Day One
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          data-testid="hero-headline"
          className="font-display uppercase font-bold leading-[0.95] tracking-tighter text-white text-5xl sm:text-6xl lg:text-7xl xl:text-8xl max-w-5xl"
        >
          Built Strong.
          <br />
          Built Local.
          <br />
          <span className="text-orange-500 spark-glow">Built Right.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-8 max-w-2xl text-lg text-zinc-300 leading-relaxed"
        >
          Custom metal fabrication, welding, heavy equipment repair, and
          aggregate processing solutions trusted across Marion County and
          surrounding Oregon. Steel that performs where the work gets hard.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="mt-10 flex flex-col sm:flex-row gap-4"
        >
          <Button
            asChild
            size="lg"
            data-testid="hero-quote-btn"
            className="rounded-none h-14 px-8 bg-orange-600 hover:bg-orange-500 text-white uppercase font-bold tracking-widest text-base shadow-[0_0_32px_rgba(234,88,12,0.4)]"
          >
            <a href="#quote">
              Request a Quote
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            data-testid="hero-services-btn"
            className="rounded-none h-14 px-8 border-zinc-600 hover:border-orange-500 bg-transparent text-white uppercase font-bold tracking-widest text-base hover:bg-zinc-900 hover:text-white"
          >
            <a href="#services">Explore Services</a>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-px bg-zinc-800 max-w-3xl border border-zinc-800"
        >
          {[
            { icon: Award, label: "Woman-Owned", sub: "Oregon Business" },
            { icon: ShieldCheck, label: "Safety-Focused", sub: "Honest Pricing" },
            { icon: MapPin, label: "Marion County", sub: "Local Service" },
          ].map(({ icon: Icon, label, sub }) => (
            <div
              key={label}
              data-testid={`hero-badge-${label.toLowerCase().replace(/\s+/g, "-")}`}
              className="bg-zinc-950/85 backdrop-blur-sm p-5 flex items-center gap-4"
            >
              <Icon className="h-7 w-7 text-orange-500 flex-shrink-0" />
              <div>
                <div className="text-white font-bold uppercase tracking-wider text-sm">
                  {label}
                </div>
                <div className="text-zinc-400 text-xs">{sub}</div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
