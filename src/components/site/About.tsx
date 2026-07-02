import { motion } from "framer-motion";
import CountUp from "react-countup";
import { useInView } from "framer-motion";
import { useRef } from "react";
import aboutImg from "@/assets/about-interior.jpg";

const STATS = [
  { end: 20, suffix: "+", label: "Signature Dishes" },
  { end: 1000, suffix: "+", label: "Happy Customers" },
  { end: 10, suffix: "+", label: "Years of Taste" },
  { end: 100, suffix: "%", label: "Fresh Ingredients" },
];

export function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="relative py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-14 px-6 lg:grid-cols-2 lg:items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="relative overflow-hidden rounded-[2rem] shadow-elegant">
            <img
              src={aboutImg}
              alt="Cozy interior of Ganesh Dhaba"
              loading="lazy"
              width={1280}
              height={1280}
              className="h-[520px] w-full object-cover transition duration-700 hover:scale-105"
            />
          </div>
          <div className="absolute -bottom-6 -right-6 hidden rounded-3xl border border-border bg-background p-6 shadow-soft sm:block">
            <p className="font-display text-4xl font-bold text-primary">4.9★</p>
            <p className="text-xs uppercase tracking-widest text-muted-foreground">
              Rated by families
            </p>
          </div>
          <div className="absolute -left-4 -top-4 -z-10 h-24 w-24 rounded-full bg-[var(--color-gold)]/30 blur-2xl" />
        </motion.div>

        <div>
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.28em] text-primary"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-primary" /> Our Story
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-4 font-display text-4xl font-bold leading-tight sm:text-5xl"
          >
            A Dhaba where <span className="text-primary">family</span>,<br />
            flavour & <span className="text-gradient-gold">tradition</span> meet.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-base leading-relaxed text-muted-foreground"
          >
            For over a decade, <b className="text-foreground">Ganesh Dhaba</b> has served
            heart-warming North Indian thalis, sizzling Indo-Chinese, crisp South Indian
            classics and refreshing beverages — all made with love, spice-forward recipes
            and 100% fresh ingredients. Come for the food, stay for the ambience.
          </motion.p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-5">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-primary">Our Mission</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Serve authentic, hygienic and affordable meals that feel like home.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-5">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-primary">Our Vision</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Be the most-loved family dhaba across every neighbourhood.
              </p>
            </div>
          </div>

          <div ref={ref} className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4">
            {STATS.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <p className="font-display text-4xl font-bold text-foreground">
                  {inView ? <CountUp end={s.end} duration={2.2} /> : 0}
                  <span className="text-primary">{s.suffix}</span>
                </p>
                <p className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">
                  {s.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
