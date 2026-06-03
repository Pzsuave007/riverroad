import { useState } from "react";
import { motion } from "framer-motion";
import { Camera, Play } from "lucide-react";

const VIDEO_ID = "UykcqOFe0zk";

const GALLERY = [
  {
    src: "/projects/mississippi.png",
    label: "Golf Cart Paths — Brookhaven, MS",
    span: "",
  },
  {
    src: "/projects/proper-slump.jpg",
    label: "Slipform Paver in Action",
    span: "",
  },
  {
    src: "/projects/trailrider-3.jpg",
    label: "TRAILrider® Paving",
    span: "",
  },
  {
    src: "/projects/hogan-dairy.jpg",
    label: "Dairy Cow Walk Path — Tillamook, OR",
    span: "",
  },
  {
    src: "https://images.pexels.com/photos/37517094/pexels-photo-37517094.jpeg",
    label: "Precision Welding",
    span: "",
  },
  {
    src: "https://images.pexels.com/photos/15071423/pexels-photo-15071423.jpeg",
    label: "Heavy Equipment Rebuilds",
    span: "",
  },
];

export default function Gallery() {
  const [videoLoaded, setVideoLoaded] = useState(false);

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
              className="font-display uppercase font-bold tracking-tight text-3xl sm:text-5xl lg:text-6xl text-white leading-[0.95]"
            >
              See Our Work <span className="text-red-500">in Action.</span>
            </h2>
          </div>
          <p className="text-zinc-400 max-w-md text-sm flex items-start gap-2">
            <Camera className="h-4 w-4 mt-0.5 text-red-500 flex-shrink-0" />
            Recent fabrication, welding repairs, and aggregate equipment
            installations.
          </p>
        </div>

        {/* Featured video — wide */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6 }}
          data-testid="gallery-video"
          className="relative aspect-video w-full overflow-hidden border border-zinc-800 mb-4 lg:mb-5 bg-zinc-900 group"
        >
          {videoLoaded ? (
            <iframe
              src={`https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&rel=0`}
              title="River Road TRAILrider in action"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 h-full w-full"
            />
          ) : (
            <button
              type="button"
              onClick={() => setVideoLoaded(true)}
              data-testid="gallery-video-play"
              className="relative h-full w-full overflow-hidden"
              aria-label="Play video"
            >
              <img
                src="/projects/hero-trailrider.jpg"
                alt="Watch on YouTube"
                className="absolute inset-0 h-full w-full object-cover img-desat transition-transform duration-500 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="h-20 w-20 sm:h-24 sm:w-24 grid place-items-center bg-red-600 group-hover:bg-red-500 transition-colors shadow-2xl shadow-red-600/40 rounded-full">
                  <Play className="h-9 w-9 sm:h-11 sm:w-11 text-white fill-white translate-x-0.5" />
                </span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-5 flex items-center justify-between">
                <span className="text-white text-sm sm:text-base font-bold uppercase tracking-wider">
                  Watch — TRAILrider® in Action
                </span>
                <span className="text-xs uppercase tracking-[0.25em] text-red-400 font-bold">
                  Play Video
                </span>
              </div>
            </button>
          )}
        </motion.div>

        <div
          data-testid="gallery-grid"
          className="grid grid-cols-2 md:grid-cols-3 gap-3 lg:gap-4 auto-rows-[180px] md:auto-rows-[240px]"
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
                <span className="text-white text-xs sm:text-sm font-bold uppercase tracking-wider pr-2">
                  {g.label}
                </span>
                <span className="h-2 w-2 bg-red-500 flex-shrink-0" />
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
