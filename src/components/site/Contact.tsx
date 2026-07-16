import { motion } from "framer-motion";
import { HiPhone, HiOutlineMail, HiLocationMarker, HiClock } from "react-icons/hi";
import { FaWhatsapp, FaDirections } from "react-icons/fa";

const WA_URL =
  "https://wa.me/918949993211?text=Hi%20Ganesh%20Dhaba%2C%20I'd%20like%20to%20place%20an%20order.";

export function Contact() {
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

        <div className="mt-14 max-w-4xl mx-auto">
          {/* Info + Map */}
          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Info icon={<HiLocationMarker size={20} />} title="Address" line="Infront of Veshnodam Mandir, A-16, Inderprasth, Kundan Vihar, Ridmalsar Purohitan, Bikaner, Rajasthan 334022" />
              <Info icon={<HiClock size={20} />} title="Opening Hours" line="Mon – Sun • Open till 11:00 PM" />
              <Info icon={<HiPhone size={20} />} title="Phone" line="+91 89499 93211, +91 94606 15681" href="tel:+918949993211" />
              <Info icon={<HiOutlineMail size={20} />} title="Email" line="hello@ganeshdhaba.in" href="mailto:hello@ganeshdhaba.in" />
            </div>

            <div className="flex flex-wrap gap-3">
              <a href="tel:+918949993211" className="btn-glow inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground">
                <HiPhone /> Call Now
              </a>
              <a href="tel:+919460615681" className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-3 text-sm font-semibold">
                <HiPhone /> Alt. Phone
              </a>
              <a href={WA_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-semibold text-white">
                <FaWhatsapp /> WhatsApp
              </a>
              <a href="https://www.google.com/maps/search/?api=1&query=Shree+Ganesh+Dhaba+Ridmalsar+Purohitan+Bikaner" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-3 text-sm font-semibold">
                <FaDirections /> Directions
              </a>
            </div>

            <div className="overflow-hidden rounded-3xl border border-border shadow-soft">
              <iframe
                title="Shree Ganesh Dhaba Location"
                src="https://www.google.com/maps?q=Shree+Ganesh+Dhaba+Ridmalsar+Purohitan+Bikaner&output=embed"
                loading="lazy"
                className="h-[400px] w-full"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </motion.div>
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
