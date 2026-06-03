import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { COMPANY } from "@/lib/constants";

const LOGO_SRC = "/brand/river-road-logo.png";

export default function Footer() {
  return (
    <footer
      data-testid="site-footer"
      className="relative bg-zinc-950 border-t border-zinc-800 bg-rivets"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-16 grid grid-cols-1 md:grid-cols-12 gap-10">
        <div className="md:col-span-5 space-y-5">
          <img
            src={LOGO_SRC}
            alt="River Road Custom Metal Fabrication"
            className="h-20 w-auto object-contain"
          />
          <p className="text-sm text-zinc-400 max-w-sm">
            A trusted Oregon business providing custom metal fabrication,
            welding, heavy equipment repair, and aggregate equipment solutions
            built to perform.
          </p>
          <div className="inline-block border border-red-500/40 px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-red-500 font-bold">
            Built Strong • Built Local • Built Right
          </div>
        </div>

        <div className="md:col-span-4">
          <div className="text-xs uppercase tracking-[0.3em] text-zinc-500 font-bold mb-4">
            Contact
          </div>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-3 text-zinc-300">
              <MapPin className="h-4 w-4 text-red-500 mt-0.5" />
              <span>
                {COMPANY.street}
                <br />
                {COMPANY.city}
              </span>
            </li>
            <li>
              <a
                href={`tel:${COMPANY.phoneTel}`}
                data-testid="footer-phone"
                className="flex items-center gap-3 text-zinc-300 hover:text-red-500"
              >
                <Phone className="h-4 w-4 text-red-500" />
                {COMPANY.phone}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${COMPANY.email}`}
                data-testid="footer-email"
                className="flex items-center gap-3 text-zinc-300 hover:text-red-500 break-all"
              >
                <Mail className="h-4 w-4 text-red-500" />
                {COMPANY.email}
              </a>
            </li>
            <li className="flex items-center gap-3 text-zinc-300">
              <Clock className="h-4 w-4 text-red-500" />
              {COMPANY.hours}
            </li>
          </ul>
        </div>

        <div className="md:col-span-3">
          <div className="text-xs uppercase tracking-[0.3em] text-zinc-500 font-bold mb-4">
            Navigate
          </div>
          <ul className="space-y-2 text-sm">
            {[
              ["Services", "#services"],
              ["Equipment", "#equipment"],
              ["About", "#about"],
              ["Gallery", "#gallery"],
              ["Request Quote", "#quote"],
            ].map(([label, href]) => (
              <li key={label}>
                <a
                  href={href}
                  className="text-zinc-400 hover:text-red-500 transition-colors uppercase tracking-wider text-xs font-semibold"
                >
                  {label}
                </a>
              </li>
            ))}
            <li className="pt-2">
              <Link
                to="/admin/login"
                data-testid="footer-admin-link"
                className="text-zinc-600 hover:text-red-500 uppercase tracking-wider text-xs font-semibold"
              >
                Admin Login
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-zinc-900">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-5 flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
          <div className="text-xs text-zinc-500">
            © {new Date().getFullYear()} {COMPANY.name}. All rights reserved.
          </div>
          <div className="text-xs text-zinc-600 tracking-wider uppercase">
            Salem, Oregon • Marion County
          </div>
        </div>
      </div>
      <div className="h-2 border-stripe" aria-hidden="true" />
    </footer>
  );
}
