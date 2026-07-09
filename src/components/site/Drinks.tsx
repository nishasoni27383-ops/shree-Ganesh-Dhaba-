import { motion } from "framer-motion";
import { FaCoffee, FaMugHot, FaLemon, FaGlassMartini, FaGlassWhiskey, FaIceCream, FaTint } from "react-icons/fa";

const DRINKS = [
  { icon: FaGlassWhiskey, name: "Cold Drinks", desc: "Chilled colas, sodas & sparkling", price: "from ₹40" },
  { icon: FaLemon, name: "Fresh Juices", desc: "Hand-pressed daily fruit juices", price: "from ₹90" },
  { icon: FaMugHot, name: "Masala Tea", desc: "Slow-brewed cardamom chai", price: "₹40" },
  { icon: FaCoffee, name: "Cold Coffee", desc: "Espresso, milk & ice-cream", price: "₹130" },
  { icon: FaIceCream, name: "Milkshakes", desc: "Thick chocolate, vanilla & strawberry", price: "₹120" },
  { icon: FaTint, name: "Lassi", desc: "Sweet, salted or mango lassi", price: "from ₹80" },
  { icon: FaGlassMartini, name: "Mocktails", desc: "Refreshing non-alcoholic mixes", price: "from ₹100" },
];

export function Drinks() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      {/* floating ice bubbles */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        {Array.from({ length: 14 }).map((_, i) => (
          <span
            key={i}
            className="absolute block h-3 w-3 rounded-full bg-primary/10 animate-ice"
            style={{ left: `${(i * 7) % 100}%`, top: `${(i * 11) % 90}%`, animationDelay: `${i * 0.3}s` }}
          />
        ))}
      </div>

      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.28em] text-primary">
            Beverages
          </span>
          <h2 className="mt-4 font-display text-4xl font-bold sm:text-5xl">
            Sip. Smile. Refresh.
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {DRINKS.map((d, i) => {
            const Icon = d.icon;
            return (
              <motion.div
                key={d.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                whileHover={{ y: -6 }}
                className="group relative overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-soft transition hover:shadow-elegant"
              >
                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary/5 blur-2xl transition group-hover:bg-primary/20" />
                <div className="grid h-14 w-14 place-items-center rounded-2xl bg-primary/10 text-primary transition group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon size={30} />
                </div>
                <h3 className="mt-5 font-display text-lg font-bold">{d.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{d.desc}</p>
                <p className="mt-4 text-sm font-semibold text-primary">{d.price}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
