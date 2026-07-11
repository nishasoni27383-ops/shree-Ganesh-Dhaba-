import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineSearch, HiOutlineHeart, HiHeart } from "react-icons/hi";
import { FaLeaf } from "react-icons/fa";
import { CATEGORIES, MENU, type MenuItem } from "@/lib/menu-data";
import { toast } from "sonner";
import { useCart } from "@/hooks/use-cart";

export function Menu() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string>("All");
  const [favs, setFavs] = useState<Record<string, boolean>>({});

  const items = useMemo(() => {
    const ql = q.trim().toLowerCase();
    const excludedCategories = ["Tea & Coffee", "Shakes", "Mocktails"];
    
    return MENU.filter((m) => {
      if (excludedCategories.includes(m.category)) return false;
      return cat === "All" ? true : m.category === cat;
    }).filter((m) => (ql ? m.name.toLowerCase().includes(ql) || m.desc.toLowerCase().includes(ql) : true));
  }, [q, cat]);

  const { addToCart, setCartOpen } = useCart();

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
    <section id="menu" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.28em] text-primary">
            Our Menu
          </span>
          <h2 className="mt-4 font-display text-4xl font-bold sm:text-5xl">
            Handcrafted with love, served with pride
          </h2>
        </div>

        {/* Search */}
        <div className="mx-auto mt-10 flex max-w-xl items-center gap-2 rounded-full border border-border bg-card px-4 py-2.5 shadow-soft">
          <HiOutlineSearch size={20} className="text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search dishes, e.g. paneer, dosa, lassi..."
            className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            aria-label="Search menu"
          />
          {q && (
            <button
              onClick={() => setQ("")}
              className="rounded-full px-2 text-xs text-muted-foreground hover:text-foreground"
            >
              Clear
            </button>
          )}
        </div>

        {/* Categories */}
        <div className="scrollbar-hide mt-6 flex gap-2 overflow-x-auto pb-2">
          <div className="mx-auto flex flex-nowrap gap-2">
            {CATEGORIES.map((c) => (
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
                    <span className="text-xs text-muted-foreground">★ {m.rating} • {m.category}</span>
                    <button
                      onClick={() => handleAddToCart(m)}
                      className="rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground transition hover:brightness-110"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {items.length === 0 && (
          <p className="mt-16 text-center text-muted-foreground">
            No dishes found. Try a different search.
          </p>
        )}
      </div>
    </section>
  );
}
