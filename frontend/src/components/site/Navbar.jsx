import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { COMPANY } from "@/lib/constants";

const LOGO_SRC = "/brand/river-road-logo.jpeg";

const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Equipment", href: "#equipment" },
  { label: "About", href: "#about" },
  { label: "Industries", href: "#industries" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#quote" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      data-testid="site-navbar"
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10 h-20 flex items-center justify-between">
        <a
          href="#top"
          data-testid="navbar-logo"
          className="flex items-center gap-3 group"
          aria-label="River Road Custom Metal Fabrication"
        >
          <img
            src={LOGO_SRC}
            alt="River Road Custom Metal Fabrication"
            className="h-12 sm:h-14 w-auto object-contain"
          />
        </a>

        <nav className="hidden lg:flex items-center gap-9">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              data-testid={`nav-link-${l.label.toLowerCase()}`}
              className="text-sm font-semibold uppercase tracking-wider text-zinc-300 hover:text-red-500 transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-4">
          <a
            href={`tel:${COMPANY.phoneTel}`}
            data-testid="navbar-phone"
            className="text-sm font-semibold tracking-wider text-zinc-300 hover:text-red-500"
          >
            {COMPANY.phone}
          </a>
          <Button
            asChild
            data-testid="navbar-quote-btn"
            className="rounded-none bg-red-600 hover:bg-red-500 text-white uppercase font-bold tracking-wider px-5"
          >
            <a href="#quote">Get Quote</a>
          </Button>
        </div>

        <button
          data-testid="navbar-mobile-toggle"
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden h-10 w-10 grid place-items-center border border-zinc-700 text-white"
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div
          data-testid="mobile-menu"
          className="lg:hidden bg-zinc-950 border-t border-zinc-800"
        >
          <div className="px-6 py-6 flex flex-col gap-4">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-base font-semibold uppercase tracking-wider text-zinc-200 hover:text-red-500"
              >
                {l.label}
              </a>
            ))}
            <Button
              asChild
              data-testid="mobile-quote-btn"
              className="rounded-none bg-red-600 hover:bg-red-500 text-white uppercase font-bold tracking-wider"
            >
              <a href="#quote" onClick={() => setOpen(false)}>
                Get Quote
              </a>
            </Button>
            <Link
              to="/admin/login"
              className="text-xs text-zinc-500 hover:text-red-500 tracking-wider uppercase mt-2"
            >
              Admin Login
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
