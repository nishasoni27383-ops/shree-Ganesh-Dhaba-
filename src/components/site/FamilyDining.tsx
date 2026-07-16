import { motion } from "framer-motion";
import { FaUtensils, FaUsers, FaCouch, FaFire } from "react-icons/fa";
import ambience1 from "@/assets/ambience 1.jpeg";
import ambience2 from "@/assets/ambience2.jpeg";
import ambience3 from "@/assets/ambience3.jpeg";
import ambience4 from "@/assets/ambience 4.jpeg";

const PILLS = [
  { icon: FaUsers, label: "125 Person Sitting Capacity" },
  { icon: FaCouch, label: "Comfortable Booth Seating" },
  { icon: FaFire, label: "Warm Ambient Lighting" },
  { icon: FaUtensils, label: "Friendly, Attentive Staff" },
];

export function FamilyDining() {
  return (
    <section id="ambience" className="relative py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-6 lg:grid-cols-2">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.28em] text-primary">
            Family Dining
          </span>
          <h2 className="mt-4 font-display text-4xl font-bold sm:text-5xl">
            An ambience that feels like <span className="text-primary">home</span>
          </h2>
          <p className="mt-5 text-muted-foreground">
            From cozy family corners to bright open tables, every seat is designed for
            long, laughter-filled meals. Clean interiors, warm lighting and thoughtful
            service — every visit is memorable.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {PILLS.map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.div
                  key={p.label}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3 shadow-soft"
                >
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">
                    <Icon size={22} />
                  </span>
                  <span className="text-sm font-medium">{p.label}</span>
                </motion.div>
              );
            })}
          </div>

          <a
            href="https://wa.me/918949993211?text=I%20want%20to%20reserve%20table"
            target="_blank"
            rel="noreferrer"
            className="btn-glow mt-8 inline-flex rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground"
          >
            Reserve a Table
          </a>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative grid grid-cols-2 gap-4"
        >
          <div className="flex flex-col gap-4 pt-12">
            <motion.div 
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              className="overflow-hidden rounded-[2rem] shadow-elegant"
            >
              <img
                src={ambience1}
                alt="Warm family dining space"
                loading="lazy"
                className="h-[300px] w-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </motion.div>
            <motion.div 
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 1 }}
              className="overflow-hidden rounded-[2rem] shadow-elegant"
            >
              <img
                src={ambience2}
                alt="Dining tables"
                loading="lazy"
                className="h-[250px] w-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </motion.div>
          </div>
          
          <div className="flex flex-col gap-4">
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 5.5, ease: "easeInOut", delay: 0.5 }}
              className="overflow-hidden rounded-[2rem] shadow-elegant"
            >
              <img
                src={ambience3}
                alt="Cozy interior details"
                loading="lazy"
                className="h-[250px] w-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </motion.div>
            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 5.2, ease: "easeInOut", delay: 0.2 }}
              className="overflow-hidden rounded-[2rem] shadow-elegant"
            >
              <img
                src={ambience4}
                alt="More dining space"
                loading="lazy"
                className="h-[300px] w-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
