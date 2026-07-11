import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const img = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=80`;

const CATEGORIES = [
  {
    name: "Starter",
    desc: "Tandoori, Chinese, Pasta & more",
    image: img("photo-1626777553635-e7c3a76debb2"),
    options: [
      "Tandoori Starter", "Chinese Starter", "Pasta", "Soup", 
      "Pizza and Bread", "Street Chaat", "Uttapam", "South Indian", 
      "Sandwich and Fries", "Burger"
    ]
  },
  {
    name: "Main Course",
    desc: "Aloo Special, Paneer, Dal & more",
    image: img("photo-1585937421612-70a008356fbe"),
    options: [
      "Aloo Special", "Paneer Special", "Dal", "Main Course", 
      "Roti and Naan", "Dhai and Raita", "Rice Pulao", "Salad and Papad"
    ]
  }
];

export function Menu() {
  const [activeCard, setActiveCard] = useState<string | null>(null);

  return (
    <section id="menu" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.28em] text-primary">
            Our Menu
          </span>
          <h2 className="mt-4 font-display text-4xl font-bold sm:text-5xl">
            Explore our categories
          </h2>
          <p className="mt-4 text-muted-foreground">
            From delicious starters to fulfilling main courses — pick your craving.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 max-w-5xl mx-auto">
          {CATEGORIES.map((c, i) => {
            const isActive = activeCard === c.name;
            
            return (
              <motion.article
                key={c.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                whileHover={{ y: -6 }}
                onClick={() => setActiveCard(isActive ? null : c.name)}
                className="group relative overflow-hidden rounded-3xl border border-border bg-card shadow-soft transition hover:shadow-elegant cursor-pointer"
              >
                <div className="relative aspect-[4/5] overflow-hidden sm:aspect-[3/4]">
                  <img
                    src={c.image}
                    alt={c.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20" />
                  
                  <AnimatePresence>
                    {!isActive && (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-x-0 bottom-0 p-6 text-white"
                      >
                        <h3 className="font-display text-3xl font-bold">{c.name}</h3>
                        <p className="mt-2 text-sm text-white/85">{c.desc}</p>
                        <span className="mt-4 inline-flex rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground transition-transform hover:scale-105">
                          Click to view options
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <AnimatePresence>
                    {isActive && (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 p-6 flex flex-col justify-center items-center text-center bg-black/85 backdrop-blur-sm overflow-y-auto"
                      >
                        <h3 className="font-display text-3xl font-bold text-white mb-6">{c.name} Options</h3>
                        <ul className="grid grid-cols-2 gap-x-3 gap-y-3 w-full max-w-sm mx-auto">
                          {c.options.map((opt) => (
                            <li key={opt} className="text-sm font-medium text-white/90 bg-white/10 rounded-lg py-2 px-3 hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer flex items-center justify-center text-center leading-tight min-h-[44px]">
                              {opt}
                            </li>
                          ))}
                        </ul>
                        <button 
                          className="mt-6 text-xs text-white/70 hover:text-white underline decoration-white/30"
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveCard(null);
                          }}
                        >
                          Close
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
