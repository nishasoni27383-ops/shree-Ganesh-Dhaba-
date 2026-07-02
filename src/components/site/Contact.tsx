import { useState } from "react";
import { motion } from "framer-motion";
import { HiPhone, HiOutlineMail, HiLocationMarker, HiClock } from "react-icons/hi";
import { FaWhatsapp, FaDirections } from "react-icons/fa";
import { z } from "zod";
import { toast } from "sonner";

const schema = z.object({
  name: z.string().trim().min(2, "Name is too short").max(80),
  email: z.string().trim().email("Invalid email").max(120),
  phone: z.string().trim().regex(/^[0-9+\-\s()]{7,15}$/, "Invalid phone"),
  message: z.string().trim().min(5, "Message is too short").max(600),
});

const WA_URL =
  "https://wa.me/919999999999?text=Hi%20Ganesh%20Dhaba%2C%20I'd%20like%20to%20place%20an%20order.";

export function Contact() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd) as Record<string, string>;
    const res = schema.safeParse(data);
    if (!res.success) {
      const errs: Record<string, string> = {};
      res.error.issues.forEach((i) => { errs[String(i.path[0])] = i.message; });
      setErrors(errs);
      toast.error("Please fix the highlighted fields");
      return;
    }
    setErrors({});
    setLoading(true);
    await new Promise((r) => setTimeout(r, 900));
    setLoading(false);
    toast.success("Message received!", { description: "We'll get back to you shortly." });
    e.currentTarget.reset();
  };

  const field = (label: string, name: string, type = "text", extra?: React.InputHTMLAttributes<HTMLInputElement>) => (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-muted-foreground">{label}</span>
      <input
        name={name}
        type={type}
        {...extra}
        className={`w-full rounded-xl border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10 ${
          errors[name] ? "border-destructive" : "border-border"
        }`}
      />
      {errors[name] && <span className="mt-1 block text-xs text-destructive">{errors[name]}</span>}
    </label>
  );

  return (
    <section id="contact" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.28em] text-primary">
            Contact
          </span>
          <h2 className="mt-4 font-display text-4xl font-bold sm:text-5xl">
            Come dine with us
          </h2>
          <p className="mt-4 text-muted-foreground">Reservations, feedback, catering — we'd love to hear from you.</p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-2">
          {/* Info + Map */}
          <motion.div
            initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Info icon={<HiLocationMarker size={20} />} title="Address" line="MG Road, Sector 22, Near City Mall, New Delhi 110001" />
              <Info icon={<HiClock size={20} />} title="Opening Hours" line="Mon – Sun • 10:00 AM – 11:30 PM" />
              <Info icon={<HiPhone size={20} />} title="Phone" line="+91 99999 99999" href="tel:+919999999999" />
              <Info icon={<HiOutlineMail size={20} />} title="Email" line="hello@ganeshdhaba.in" href="mailto:hello@ganeshdhaba.in" />
            </div>

            <div className="flex flex-wrap gap-3">
              <a href="tel:+919999999999" className="btn-glow inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground">
                <HiPhone /> Call Now
              </a>
              <a href={WA_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-semibold text-white">
                <FaWhatsapp /> WhatsApp
              </a>
              <a href="https://maps.google.com/?q=MG+Road+Sector+22+New+Delhi" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-3 text-sm font-semibold">
                <FaDirections /> Directions
              </a>
            </div>

            <div className="overflow-hidden rounded-3xl border border-border shadow-soft">
              <iframe
                title="Ganesh Dhaba Location"
                src="https://www.google.com/maps?q=New+Delhi+India&output=embed"
                loading="lazy"
                className="h-[320px] w-full"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </motion.div>

          {/* Form */}
          <motion.form
            onSubmit={onSubmit}
            noValidate
            initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-8"
          >
            <h3 className="font-display text-2xl font-bold">Send us a message</h3>
            <p className="mt-1 text-sm text-muted-foreground">We usually reply within a few hours.</p>
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {field("Your Name", "name")}
              {field("Phone", "phone", "tel")}
            </div>
            <div className="mt-4">{field("Email", "email", "email")}</div>
            <label className="mt-4 block">
              <span className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-muted-foreground">Message</span>
              <textarea
                name="message"
                rows={5}
                className={`w-full rounded-xl border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10 ${
                  errors.message ? "border-destructive" : "border-border"
                }`}
              />
              {errors.message && <span className="mt-1 block text-xs text-destructive">{errors.message}</span>}
            </label>
            <button
              type="submit"
              disabled={loading}
              className="btn-glow mt-6 inline-flex w-full items-center justify-center rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground disabled:opacity-70"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

function Info({ icon, title, line, href }: { icon: React.ReactNode; title: string; line: string; href?: string }) {
  const inner = (
    <div className="flex items-start gap-3 rounded-2xl border border-border bg-card p-4 shadow-soft transition hover:shadow-elegant">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">{icon}</span>
      <div className="min-w-0">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">{title}</p>
        <p className="mt-0.5 text-sm font-medium">{line}</p>
      </div>
    </div>
  );
  return href ? <a href={href}>{inner}</a> : inner;
}
