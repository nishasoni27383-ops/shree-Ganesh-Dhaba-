import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineHeart, HiHeart } from "react-icons/hi";
import { FaLeaf } from "react-icons/fa";
import { MENU, type MenuItem } from "@/lib/menu-data";
import { toast } from "sonner";
import { useCart } from "@/hooks/use-cart";

const DRINK_CATEGORIES = ["All", "Tea & Coffee", "Shakes", "Mocktails", "Lassi", "Cold Drinks", "Fresh Juice"];

export function Drinks() {
  const [cat, setCat] = useState<string>("All");
  const [favs, setFavs] = useState<Record<string, boolean>>({});
  const { addToCart, setCartOpen } = useCart();

  const items = useMemo(() => {
    return MENU.filter((m) => {
      const isDrink = DRINK_CATEGORIES.includes(m.category);
      if (!isDrink) return false;
      if (cat === "All") return true;
      return m.category === cat;
    });
  }, [cat]);

  const handleAddToCart = (m: MenuItem) => {
    addToCart(m);
    toast.success(`${m.name} added to cart`, {
      description: `₹${m.price} • View list in cart`,
      action: {
        label: "View Cart",
        onClick: () => setCartOpen(true),
      },
    });
  };

  return (
    <section id="beverages" className="relative overflow-hidden py-24 sm:py-32">
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

        {/* Categories */}
        <div className="scrollbar-hide mt-10 flex gap-2 overflow-x-auto pb-2">
          <div className="mx-auto flex flex-nowrap gap-2">
            {DRINK_CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition ${
                  cat === c
                    ? "border-primary bg-primary text-primary-foreground shadow-elegant"
                    : "border-border bg-card text-foreground/70 hover:border-primary/40 hover:text-primary"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <motion.div layout className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {items.map((m) => (
              <motion.article
                key={m.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35 }}
                whileHover={{ y: -6 }}
                className="group overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition hover:shadow-elegant"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={m.image}
                    alt={m.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 transition group-hover:opacity-100" />
                  <button
                    onClick={() => setFavs((f) => ({ ...f, [m.id]: !f[m.id] }))}
                    aria-label="Favorite"
                    className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-background/90 text-primary shadow-soft backdrop-blur transition hover:scale-110"
                  >
                    {favs[m.id] ? <HiHeart size={18} /> : <HiOutlineHeart size={18} />}
                  </button>
                  {m.veg && (
                    <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-md border border-emerald-600/30 bg-white/95 px-2 py-1 text-[10px] font-semibold text-emerald-700 backdrop-blur">
                      <span className="grid h-3.5 w-3.5 place-items-center rounded-sm border border-emerald-600">
                        <FaLeaf size={7} />
                      </span>
                      VEG
                    </span>
                  )}
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-display text-lg font-semibold leading-tight">{m.name}</h3>
                    <span className="shrink-0 font-display text-lg font-bold text-primary">₹{m.price}</span>
                  </div>
                  <p className="mt-1.5 line-clamp-2 text-sm text-muted-foreground">{m.desc}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">★ {m.rating}</span>
                    <button
                      onClick={() => handleAddToCart(m)}
                      className="rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground transition hover:brightness-110"
                    >
                      Order Now
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
