import { motion } from "framer-motion";
import {
  GiHerbsBundle, GiForkKnifeSpoon, GiWallet, GiRunningShoe,
  GiSoap, GiChefToque, GiSofa, GiCarWheel,
} from "react-icons/gi";

const ITEMS = [
  { icon: GiHerbsBundle, title: "Fresh Ingredients", desc: "Sourced daily from trusted local farms." },
  { icon: GiForkKnifeSpoon, title: "Family Dining", desc: "Warm space made for togetherness." },
  { icon: GiWallet, title: "Pocket Friendly", desc: "Premium taste at everyday prices." },
  { icon: GiRunningShoe, title: "Fast Service", desc: "Piping-hot orders in minutes." },
  { icon: GiSoap, title: "Clean & Hygienic", desc: "FSSAI standards, spotless kitchen." },
  { icon: GiChefToque, title: "Best Taste", desc: "Signature recipes, mastered over years." },
  { icon: GiSofa, title: "Comfortable Seating", desc: "Cozy booths and lounge tables." },
  { icon: GiCarWheel, title: "Parking Available", desc: "Ample space for cars & bikes." },
];

export function WhyChooseUs() {
  return (
    <section id="why" className="relative bg-secondary/40 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.28em] text-primary">
            Why Choose Us
          </span>
          <h2 className="mt-4 font-display text-4xl font-bold sm:text-5xl">
            Reasons families keep coming back
          </h2>
          <p className="mt-4 text-muted-foreground">
            Eight little things that make one big difference to every meal.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
          {ITEMS.map((it, i) => {
            const Icon = it.icon;
            return (
              <motion.div
                key={it.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.5 }}
                whileHover={{ y: -6 }}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-soft transition hover:shadow-elegant"
              >
                <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-primary/5 blur-2xl transition group-hover:bg-primary/20" />
                <div className="relative">
                  <div className="grid h-14 w-14 place-items-center rounded-2xl bg-primary/10 text-primary transition group-hover:scale-110 group-hover:rotate-6 group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon size={28} />
                  </div>
                  <h3 className="mt-5 font-display text-lg font-bold">{it.title}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">{it.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
