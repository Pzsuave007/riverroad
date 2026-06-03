import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { COMPANY } from "@/lib/constants";

const LOGO_SRC = "/brand/river-road-logo.png";

const NAV_LINKS = [
  { label: "Services", href: "/#services" },
  { label: "Equipment", href: "/#equipment" },
  { label: "About", href: "/#about" },
  { label: "Industries", href: "/#industries" },
  { label: "Gallery", href: "/#gallery" },
  { label: "Contact", href: "/#quote" },
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
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "bg-zinc-950/95 backdrop-blur-md border-b border-zinc-800"
          : "bg-zinc-950/70 backdrop-blur-sm border-b border-transparent"
      }`}
    >
      {/* Row 1 — DESKTOP ONLY: bigger logo + contact strip */}
      <div className="hidden lg:block border-b border-zinc-800/60">
        <div className="mx-auto max-w-7xl px-10 py-3 flex items-center justify-between">
          <a
            href="/#top"
            data-testid="navbar-logo-desktop"
            className="flex items-center group"
            aria-label="River Road Custom Metal Fabrication"
          >
            <img
              src={LOGO_SRC}
              alt="River Road Custom Metal Fabrication"
              className="h-16 xl:h-20 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.02]"
            />
          </a>

          <div className="flex items-center gap-8 text-sm">
            <a
              href={`tel:${COMPANY.phoneTel}`}
              data-testid="navbar-phone-desktop"
              className="flex items-center gap-2 text-zinc-300 hover:text-red-500 transition-colors font-bold tracking-wider"
            >
              <Phone className="h-4 w-4 text-red-500" />
              {COMPANY.phone}
            </a>
            <a
              href={`mailto:${COMPANY.email}`}
              data-testid="navbar-email-desktop"
              className="hidden xl:flex items-center gap-2 text-zinc-400 hover:text-red-500 transition-colors"
            >
              <Mail className="h-4 w-4 text-red-500" />
              {COMPANY.email}
            </a>
          </div>
        </div>
      </div>

      {/* Row 2 — nav links (desktop) / logo + hamburger (mobile) */}
      <div className="mx-auto max-w-7xl px-6 lg:px-10 h-16 flex items-center justify-between gap-4">
        {/* Mobile small logo */}
        <a
          href="/#top"
          data-testid="navbar-logo-mobile"
          className="lg:hidden flex items-center"
          aria-label="River Road Custom Metal Fabrication"
        >
          <img
            src={LOGO_SRC}
            alt="River Road"
            className="h-9 w-auto object-contain"
          />
        </a>

        <nav className="hidden lg:flex items-center gap-8 flex-1">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              data-testid={`nav-link-${l.label.toLowerCase()}`}
              className="text-sm font-bold uppercase tracking-wider text-zinc-300 hover:text-red-500 transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <Button
          asChild
          data-testid="navbar-quote-btn"
          className="hidden lg:inline-flex rounded-none bg-red-600 hover:bg-red-500 text-white uppercase font-bold tracking-wider px-5 h-10 shadow-lg shadow-red-600/20"
        >
          <a href="/#quote">Get Quote</a>
        </Button>

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
              <a href="/#quote" onClick={() => setOpen(false)}>
                Get Quote
              </a>
            </Button>
            <a
              href={`tel:${COMPANY.phoneTel}`}
              className="text-zinc-400 hover:text-red-500 text-sm font-semibold tracking-wider mt-2 flex items-center gap-2"
            >
              <Phone className="h-4 w-4" /> {COMPANY.phone}
            </a>
            <Link
              to="/admin/login"
              className="text-xs text-zinc-600 hover:text-red-500 tracking-wider uppercase"
            >
              Admin Login
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
