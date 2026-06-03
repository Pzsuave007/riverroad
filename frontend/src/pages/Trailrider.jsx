import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  Ruler,
  Gauge,
  Truck,
  Zap,
  ArrowLeft,
  Phone,
  ArrowRight,
  Play,
} from "lucide-react";

import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import { Button } from "@/components/ui/button";
import { COMPANY } from "@/lib/constants";

const VIDEO_ID = "UykcqOFe0zk";

const SPECS = [
  { icon: Ruler, label: "Adjustable Width", value: "4′ – 12′", sub: "Standard 8′" },
  { icon: Gauge, label: "Pour Depth", value: "2″ – 6″", sub: "Adjustable" },
  { icon: Truck, label: "Side Clearance", value: '8"', sub: "Narrowest in market" },
  { icon: Zap, label: "Pour Speed", value: "8 yd³ / 6 min", sub: "Place + finish" },
];

const FEATURES = [
  "Non-motorized — towed by truck, backhoe, or loader",
  "Compacts pervious concrete (rare in slipform pavers)",
  "Bolt-on side sections for adjustable widths",
  "Front grade screed levels uneven base automatically",
  "Tracks straight on sloped grades",
  "Loaded directly from the concrete delivery truck",
  "Lightweight & mobile — loads with a single loader",
  "Minimal hand-finishing required",
];

const APPLICATIONS = [
  { label: "Nature Trails", img: "/projects/mississippi.png" },
  { label: "Golf Cart Paths", img: "/projects/mississippi.png" },
  { label: "Bike Lanes", img: "/projects/trailrider-3.jpg" },
  { label: "Single-Lane Driveways", img: "/projects/proper-slump.jpg" },
  { label: "Sidewalks", img: "/projects/trailrider-3.jpg" },
  { label: "Dairy Cow Paths", img: "/projects/hogan-dairy.jpg" },
];

const PROJECTS = [
  {
    src: "/projects/mississippi.png",
    title: "The Club at Ole Brook",
    sub: "Brookhaven, MS — Golf Cart Paths",
  },
  {
    src: "/projects/hogan-dairy.jpg",
    title: "Hogan Dairy",
    sub: "Tillamook, OR — Dairy Cow Walk Path",
  },
  {
    src: "/projects/proper-slump.jpg",
    title: "Slope & Uneven Terrain",
    sub: "TRAILrider handles it with ease",
  },
  {
    src: "/projects/trailrider-3.jpg",
    title: "Curving Path Install",
    sub: "Pervious concrete pour, sunset finish",
  },
];

export default function Trailrider() {
  const [videoLoaded, setVideoLoaded] = useState(false);

  return (
    <div data-testid="trailrider-page" className="bg-zinc-950 text-white">
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative pt-44 lg:pt-56 pb-20 lg:pb-28 overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{ backgroundImage: "url(/projects/trailrider-3.jpg)" }}
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/80 to-zinc-950/40" />

          <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
            <Link
              to="/"
              data-testid="trailrider-back"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-zinc-400 hover:text-red-500 font-bold mb-8"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Equipment
            </Link>

            <div className="flex items-center gap-3 mb-4">
              <span className="h-px w-12 bg-red-500" />
              <span className="text-xs uppercase tracking-[0.35em] text-red-500 font-bold">
                Slipform Paver • For Sale
              </span>
            </div>

            <h1
              data-testid="trailrider-title"
              className="font-display uppercase font-bold tracking-tight text-white text-[2.5rem] sm:text-6xl lg:text-7xl leading-[0.95] max-w-4xl"
            >
              TRAILrider<sup className="text-red-500 text-2xl lg:text-4xl">®</sup>
              <br />
              Slipform Paver.
            </h1>

            <p className="mt-6 text-lg text-zinc-300 max-w-2xl leading-relaxed">
              Efficient, eco-friendly, and easy to operate. The{" "}
              <span className="text-white font-bold">TRAILrider®</span> forms,
              places, and finishes concrete — including pervious — in a single
              pass. 8″ side clearance, 4′–12′ widths, 2–6″ depths.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Button
                asChild
                size="lg"
                data-testid="trailrider-quote-btn"
                className="rounded-none h-14 px-8 bg-red-600 hover:bg-red-500 text-white uppercase font-bold tracking-widest text-base shadow-[0_0_32px_rgba(220,38,38,0.4)]"
              >
                <Link to="/#quote">
                  Request a Quote
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-none h-14 px-8 border-zinc-600 hover:border-red-500 bg-transparent text-white uppercase font-bold tracking-widest text-base hover:bg-zinc-900 hover:text-white"
              >
                <a href={`tel:${COMPANY.phoneTel}`}>
                  <Phone className="mr-2 h-5 w-5" />
                  Call {COMPANY.phone}
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* Spec strip */}
        <section className="bg-zinc-900 border-y border-zinc-800">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-zinc-700/40">
              {SPECS.map((s, idx) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.4, delay: idx * 0.06 }}
                  data-testid={`spec-${idx}`}
                  className="bg-zinc-950 p-6 lg:p-8 flex flex-col"
                >
                  <s.icon className="h-6 w-6 text-red-500 mb-3" />
                  <div className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 font-bold mb-1">
                    {s.label}
                  </div>
                  <div className="font-display uppercase text-3xl lg:text-4xl font-bold text-white tracking-tight">
                    {s.value}
                  </div>
                  <div className="text-xs text-zinc-400 mt-1">{s.sub}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Video + features */}
        <section className="py-24 lg:py-32 bg-stone-100">
          <div className="mx-auto max-w-7xl px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3 mb-4">
                <span className="h-px w-10 bg-red-600" />
                <span className="text-xs uppercase tracking-[0.35em] text-red-600 font-bold">
                  Watch It Work
                </span>
              </div>
              <h2 className="font-display uppercase font-bold tracking-tight text-3xl sm:text-5xl text-zinc-900 leading-tight mb-8">
                Place, Form & Finish —
                <br />
                <span className="text-red-600">In One Pass.</span>
              </h2>

              <div className="relative aspect-video overflow-hidden border-2 border-zinc-300 bg-zinc-900 shadow-2xl group">
                {videoLoaded ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&rel=0`}
                    title="TRAILrider"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 h-full w-full"
                  />
                ) : (
                  <button
                    type="button"
                    onClick={() => setVideoLoaded(true)}
                    data-testid="trailrider-video-play"
                    className="relative h-full w-full"
                    aria-label="Play video"
                  >
                    <img
                      src={`https://img.youtube.com/vi/${VIDEO_ID}/maxresdefault.jpg`}
                      alt="Watch TRAILrider"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                    <div className="absolute inset-0 bg-zinc-950/30" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="h-20 w-20 sm:h-24 sm:w-24 grid place-items-center bg-red-600 group-hover:bg-red-500 transition-colors shadow-2xl rounded-full">
                        <Play className="h-9 w-9 sm:h-11 sm:w-11 text-white fill-white translate-x-0.5" />
                      </span>
                    </div>
                  </button>
                )}
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="text-xs uppercase tracking-[0.3em] text-red-600 font-bold mb-3">
                Why TRAILrider
              </div>
              <h3 className="font-display uppercase tracking-tight font-bold text-2xl sm:text-3xl text-zinc-900 mb-6">
                Features That Save You Time, Labor & Material.
              </h3>
              <ul className="space-y-3">
                {FEATURES.map((f) => (
                  <li key={f} className="flex items-start gap-3 bg-white border-l-2 border-red-600 px-4 py-3">
                    <CheckCircle2 className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-zinc-800 text-sm font-semibold">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Applications */}
        <section className="py-24 lg:py-32 bg-zinc-950">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-4">
                <span className="h-px w-10 bg-red-500" />
                <span className="text-xs uppercase tracking-[0.35em] text-red-500 font-bold">
                  Applications
                </span>
              </div>
              <h2 className="font-display uppercase font-bold tracking-tight text-3xl sm:text-5xl lg:text-6xl text-white leading-[0.95]">
                Where the <span className="text-red-500">TRAILrider</span>{" "}
                Shines.
              </h2>
            </div>

            <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-3 lg:gap-4">
              {APPLICATIONS.map((a, idx) => (
                <motion.div
                  key={a.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.4, delay: idx * 0.06 }}
                  className="relative aspect-[4/3] overflow-hidden border border-zinc-800 group"
                >
                  <img
                    src={a.img}
                    alt={a.label}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 flex items-end justify-between">
                    <span className="text-white text-base sm:text-lg font-display uppercase tracking-tight font-bold">
                      {a.label}
                    </span>
                    <span className="h-2 w-2 bg-red-500" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Parts & Build */}
        <section className="py-24 lg:py-32 bg-zinc-100">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="flex items-center gap-3 mb-4">
              <span className="h-px w-10 bg-red-600" />
              <span className="text-xs uppercase tracking-[0.35em] text-red-600 font-bold">
                Model HR
              </span>
            </div>
            <h2 className="font-display uppercase font-bold tracking-tight text-3xl sm:text-5xl text-zinc-900 leading-tight mb-3">
              Bolted, Modular,{" "}
              <span className="text-red-600">Built to Adjust.</span>
            </h2>
            <p className="text-zinc-700 max-w-2xl">
              Bolt-on side panels with skid & towing attachment. Variable tow
              points, depth adjustments & anchor pins. Screed sections of 8′,
              4′, 1′, and 24″ — bolted together to match your project width.
            </p>

            <div className="mt-10 relative overflow-hidden border border-zinc-200 bg-white shadow-xl">
              <img
                src="/projects/trailrider-parts.png"
                alt="TRAILrider parts callout — Model HR"
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        </section>

        {/* Project Gallery */}
        <section className="py-24 lg:py-32 bg-zinc-950">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="flex items-center gap-3 mb-4">
              <span className="h-px w-10 bg-red-500" />
              <span className="text-xs uppercase tracking-[0.35em] text-red-500 font-bold">
                In the Field
              </span>
            </div>
            <h2 className="font-display uppercase font-bold tracking-tight text-3xl sm:text-5xl text-white leading-tight mb-10">
              Recent <span className="text-red-500">Projects.</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-5">
              {PROJECTS.map((p, idx) => (
                <motion.figure
                  key={p.src}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: idx * 0.06 }}
                  className="relative aspect-[16/10] overflow-hidden border border-zinc-800 group"
                >
                  <img
                    src={p.src}
                    alt={p.title}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/30 to-transparent" />
                  <figcaption className="absolute bottom-0 left-0 right-0 p-5">
                    <div className="text-white text-lg sm:text-xl font-display uppercase tracking-tight font-bold">
                      {p.title}
                    </div>
                    <div className="text-zinc-300 text-sm mt-1">{p.sub}</div>
                  </figcaption>
                </motion.figure>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-red-600 py-20 lg:py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div>
              <div className="text-xs uppercase tracking-[0.3em] text-white/80 font-bold mb-2">
                Ready to Pave?
              </div>
              <h2 className="font-display uppercase font-bold tracking-tight text-3xl sm:text-5xl lg:text-6xl text-white leading-tight">
                Get Your TRAILrider<sup className="text-2xl">®</sup> Quote.
              </h2>
              <p className="mt-4 text-white/90 max-w-xl">
                Tell us about your project and we'll come back with pricing,
                lead times, and recommended configuration in one business day.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                asChild
                className="rounded-none h-14 px-8 bg-zinc-950 hover:bg-zinc-900 text-white uppercase font-bold tracking-widest text-sm"
              >
                <Link to="/#quote">Request a Quote</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="rounded-none h-14 px-8 border-white bg-transparent text-white uppercase font-bold tracking-widest text-sm hover:bg-white hover:text-red-600"
              >
                <a href={`tel:${COMPANY.phoneTel}`}>
                  <Phone className="mr-2 h-4 w-4" />
                  {COMPANY.phone}
                </a>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
