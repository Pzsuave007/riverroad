import { motion } from "framer-motion";
import { Camera } from "lucide-react";

const GALLERY = [
  {
    src: "https://images.pexels.com/photos/37517094/pexels-photo-37517094.jpeg",
    label: "Precision Welding",
    span: "md:col-span-2 md:row-span-2",
  },
  {
    src: "https://images.pexels.com/photos/15071423/pexels-photo-15071423.jpeg",
    label: "Heavy Equipment Rebuilds",
    span: "",
  },
  {
    src: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=1000&q=80",
    label: "Custom Fabrication",
    span: "",
  },
  {
    src: "https://images.pexels.com/photos/14484423/pexels-photo-14484423.jpeg",
    label: "Aggregate Equipment",
    span: "md:col-span-2",
  },
  {
    src: "https://images.unsplash.com/photo-1523848309072-c199db53f137?auto=format&fit=crop&w=1000&q=80",
    label: "Mining Operations",
    span: "",
  },
  {
    src: "https://images.pexels.com/photos/30768949/pexels-photo-30768949.jpeg",
    label: "On-Site Welding",
    span: "",
  },
];

export default function Gallery() {
  return (
    <section
      id="gallery"
      data-testid="gallery-section"
      className="py-24 lg:py-32 bg-zinc-950"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="h-px w-10 bg-red-500" />
              <span className="text-xs uppercase tracking-[0.35em] text-red-500 font-bold">
                Project Gallery
              </span>
            </div>
            <h2
              data-testid="gallery-heading"
              className="font-display uppercase font-bold tracking-tighter text-4xl sm:text-5xl lg:text-6xl text-white leading-[0.95]"
            >
              See Our Work <span className="text-red-500">in Action.</span>
            </h2>
          </div>
          <p className="text-zinc-400 max-w-md text-sm flex items-start gap-2">
            <Camera className="h-4 w-4 mt-0.5 text-red-500 flex-shrink-0" />
            Recent fabrication, welding repairs, and aggregate equipment
            installations. More project photos coming soon.
          </p>
        </div>

        <div
          data-testid="gallery-grid"
          className="grid grid-cols-2 md:grid-cols-4 gap-3 lg:gap-4 auto-rows-[180px] md:auto-rows-[240px]"
        >
          {GALLERY.map((g, idx) => (
            <motion.figure
              key={g.src}
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              data-testid={`gallery-item-${idx}`}
              className={`relative overflow-hidden border border-zinc-800 group ${g.span}`}
            >
              <img
                src={g.src}
                alt={g.label}
                className="absolute inset-0 h-full w-full object-cover img-desat"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent opacity-90 group-hover:opacity-70 transition-opacity" />
              <figcaption className="absolute bottom-0 left-0 right-0 p-4 flex items-center justify-between">
                <span className="text-white text-xs sm:text-sm font-bold uppercase tracking-wider">
                  {g.label}
                </span>
                <span className="h-2 w-2 bg-red-500" />
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
