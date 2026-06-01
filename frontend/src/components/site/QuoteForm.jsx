import { useState } from "react";
import { toast } from "sonner";
import { Loader2, Send, Mail, Phone, MapPin, Clock } from "lucide-react";

import api, { formatApiErrorDetail } from "@/lib/api";
import { SERVICES, COMPANY } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const initial = {
  full_name: "",
  email: "",
  phone: "",
  company: "",
  service_type: "",
  project_details: "",
  preferred_contact: "Email",
};

export default function QuoteForm() {
  const [form, setForm] = useState(initial);
  const [submitting, setSubmitting] = useState(false);

  const update = (k) => (e) =>
    setForm((f) => ({ ...f, [k]: e?.target ? e.target.value : e }));

  const submit = async (e) => {
    e.preventDefault();
    if (!form.service_type) {
      toast.error("Please select a service");
      return;
    }
    setSubmitting(true);
    try {
      await api.post("/quotes", {
        ...form,
        company: form.company || null,
      });
      toast.success("Quote request received", {
        description: "Maria will reach out within 1 business day.",
      });
      setForm(initial);
    } catch (err) {
      toast.error(
        formatApiErrorDetail(err.response?.data?.detail) || "Submission failed"
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="quote"
      data-testid="quote-section"
      className="relative py-24 lg:py-32 bg-zinc-100 border-t border-zinc-200"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
        {/* Left — contact info */}
        <aside className="lg:col-span-5 space-y-10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="h-px w-10 bg-red-600" />
              <span className="text-xs uppercase tracking-[0.35em] text-red-600 font-bold">
                Request a Quote
              </span>
            </div>
            <h2
              data-testid="quote-heading"
              className="font-display uppercase font-bold tracking-tight text-3xl sm:text-5xl lg:text-6xl text-zinc-900 leading-[0.95]"
            >
              Let's Discuss <br />
              <span className="text-red-600">Your Project.</span>
            </h2>
            <p className="mt-5 text-zinc-600 max-w-md">
              Fabrication, welding, repairs, equipment rentals, or specialized
              aggregate solutions — tell us what you need and we'll get back to
              you fast.
            </p>
          </div>

          <ul className="space-y-5 border-l-2 border-red-600 pl-6">
            <li className="flex items-start gap-4">
              <MapPin className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
              <div>
                <div className="text-xs uppercase tracking-[0.25em] text-zinc-500 font-bold mb-1">
                  Shop Location
                </div>
                <div className="text-zinc-900 text-base font-semibold">{COMPANY.street}</div>
                <div className="text-zinc-600 text-base">{COMPANY.city}</div>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <Phone className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
              <div>
                <div className="text-xs uppercase tracking-[0.25em] text-zinc-500 font-bold mb-1">
                  Phone
                </div>
                <a
                  href={`tel:${COMPANY.phoneTel}`}
                  data-testid="quote-phone-link"
                  className="text-zinc-900 text-lg font-bold hover:text-red-600 transition-colors"
                >
                  {COMPANY.phone}
                </a>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <Mail className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
              <div>
                <div className="text-xs uppercase tracking-[0.25em] text-zinc-500 font-bold mb-1">
                  Email
                </div>
                <a
                  href={`mailto:${COMPANY.email}`}
                  data-testid="quote-email-link"
                  className="text-zinc-900 font-semibold hover:text-red-600 transition-colors break-all"
                >
                  {COMPANY.email}
                </a>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <Clock className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
              <div>
                <div className="text-xs uppercase tracking-[0.25em] text-zinc-500 font-bold mb-1">
                  Hours
                </div>
                <div className="text-zinc-900 font-semibold">{COMPANY.hours}</div>
              </div>
            </li>
          </ul>
        </aside>

        {/* Right — form */}
        <form
          onSubmit={submit}
          data-testid="quote-form"
          className="lg:col-span-7 bg-white border border-zinc-200 p-7 lg:p-10 space-y-6 shadow-xl"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Field label="Full Name *">
              <Input
                required
                data-testid="quote-input-name"
                value={form.full_name}
                onChange={update("full_name")}
                placeholder="Jane Smith"
                className="bg-zinc-50 border-zinc-300 focus-visible:ring-red-500 focus-visible:border-red-500 text-zinc-900 placeholder:text-zinc-400 rounded-none h-11"
              />
            </Field>
            <Field label="Email *">
              <Input
                type="email"
                required
                data-testid="quote-input-email"
                value={form.email}
                onChange={update("email")}
                placeholder="you@company.com"
                className="bg-zinc-50 border-zinc-300 focus-visible:ring-red-500 focus-visible:border-red-500 text-zinc-900 placeholder:text-zinc-400 rounded-none h-11"
              />
            </Field>
            <Field label="Phone *">
              <Input
                required
                data-testid="quote-input-phone"
                value={form.phone}
                onChange={update("phone")}
                placeholder="(503) 555-0100"
                className="bg-zinc-50 border-zinc-300 focus-visible:ring-red-500 focus-visible:border-red-500 text-zinc-900 placeholder:text-zinc-400 rounded-none h-11"
              />
            </Field>
            <Field label="Company (optional)">
              <Input
                data-testid="quote-input-company"
                value={form.company}
                onChange={update("company")}
                placeholder="Acme Construction"
                className="bg-zinc-50 border-zinc-300 focus-visible:ring-red-500 focus-visible:border-red-500 text-zinc-900 placeholder:text-zinc-400 rounded-none h-11"
              />
            </Field>
          </div>

          <Field label="Service Needed *">
            <Select
              value={form.service_type}
              onValueChange={(v) => setForm((f) => ({ ...f, service_type: v }))}
            >
              <SelectTrigger
                data-testid="quote-select-service"
                className="bg-zinc-50 border-zinc-300 text-zinc-900 rounded-none h-11 focus:ring-red-500"
              >
                <SelectValue placeholder="Select a service…" />
              </SelectTrigger>
              <SelectContent className="bg-white border-zinc-200 text-zinc-900">
                {SERVICES.map((s) => (
                  <SelectItem
                    key={s}
                    value={s}
                    className="focus:bg-red-50 focus:text-red-700"
                  >
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>

          <Field label="Project Details *">
            <Textarea
              required
              rows={5}
              data-testid="quote-input-details"
              value={form.project_details}
              onChange={update("project_details")}
              placeholder="Tell us about your project, equipment needs, or repair requirements…"
              className="bg-zinc-50 border-zinc-300 focus-visible:ring-red-500 focus-visible:border-red-500 text-zinc-900 placeholder:text-zinc-400 rounded-none"
            />
          </Field>

          <Field label="Preferred Contact Method">
            <RadioGroup
              value={form.preferred_contact}
              onValueChange={(v) =>
                setForm((f) => ({ ...f, preferred_contact: v }))
              }
              className="flex gap-6 mt-2"
            >
              {["Phone", "Email"].map((opt) => (
                <label
                  key={opt}
                  data-testid={`quote-contact-${opt.toLowerCase()}`}
                  className="flex items-center gap-2 text-zinc-800 cursor-pointer"
                >
                  <RadioGroupItem
                    value={opt}
                    className="border-zinc-400 text-red-600"
                  />
                  <span className="text-sm font-medium">{opt}</span>
                </label>
              ))}
            </RadioGroup>
          </Field>

          <Button
            type="submit"
            disabled={submitting}
            data-testid="quote-submit-btn"
            className="w-full sm:w-auto rounded-none h-14 px-10 bg-red-600 hover:bg-red-500 text-white uppercase font-bold tracking-widest text-base disabled:opacity-60 shadow-lg shadow-red-600/30"
          >
            {submitting ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin mr-2" /> Sending…
              </>
            ) : (
              <>
                <Send className="h-5 w-5 mr-2" />
                Get Your Free Quote
              </>
            )}
          </Button>
        </form>
      </div>
    </section>
  );
}

function Field({ label, children }) {
  return (
    <div className="space-y-2">
      <Label className="text-xs uppercase tracking-[0.25em] text-zinc-700 font-bold">
        {label}
      </Label>
      {children}
    </div>
  );
}
