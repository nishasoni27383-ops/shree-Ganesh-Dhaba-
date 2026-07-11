import { useMemo, useState, useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { HiArrowLeft, HiOutlineHeart, HiHeart } from "react-icons/hi";
import { FaLeaf } from "react-icons/fa";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { MENU, type MenuItem } from "@/lib/menu-data";
import { toast } from "sonner";
import { useCart } from "@/hooks/use-cart";

const STARTERS = [
  "All Starters",
  "Tandoori Starter",
  "Chinese Starter",
  "Pasta",
  "Soup",
  "Pizza and Bread",
  "Street Chaat",
  "Uttapam",
  "South Indian",
  "Sandwich and Fries",
  "Burger"
];

const MAIN_COURSES = [
  "All Main Course",
  "Aloo Special",
  "Paneer Special",
  "Dal",
  "Main Course",
  "Roti and Naan",
  "Dhai and Raita",
  "Rice Pulao",
  "Salad and Papad"
];

type MenuSearch = {
  type?: string;
};

export const Route = createFileRoute("/menu")({
  validateSearch: (search: Record<string, unknown>): MenuSearch => {
    return {
      type: search.type as string | undefined,
    };
  },
  head: () => ({
    meta: [
      { title: "Menu Details — Ganesh Dhaba" },
    ],
  }),
  component: MenuPage,
});

function MenuPage() {
  const { type } = Route.useSearch();
  const isStarter = type === "starter";
  
  const title = isStarter ? "Starters" : "Main Course";
  const subtitle = isStarter 
    ? "Crispy bites, tikkas, and street food favorites." 
    : "Hearty curries, dals, and authentic Indian mains.";
  const categories = isStarter ? STARTERS : MAIN_COURSES;
  const defaultCat = isStarter ? "All Starters" : "All Main Course";
  
  const [activeCat, setActiveCat] = useState<string>(defaultCat);
  const [favs, setFavs] = useState<Record<string, boolean>>({});
  
  const { addToCart, setCartOpen } = useCart();

  useEffect(() => {
    setActiveCat(isStarter ? "All Starters" : "All Main Course");
  }, [type, isStarter]);

  const items = useMemo(() => {
    return MENU.filter((m) => {
      // Because the new categories in STARTERS and MAIN_COURSES don't perfectly
      // match the old data in MENU right now, we do a loose text match for demonstration.
      // If "All Starters" or "All Main Course" is selected, we'll try to show relevant items.
      
      if (activeCat === "All Starters" || activeCat === "All Main Course") {
         // Show everything for now so the page isn't empty, 
         // but exclude drinks.
         return !["Tea & Coffee", "Shakes", "Mocktails", "Coffee", "Tea"].includes(m.category);
      }
      
      // Try to match the sub-category
      // For instance, "Paneer Special" should match "Paneer Specials"
      const matchCat = m.category.toLowerCase().includes(activeCat.toLowerCase().replace('special', 'special'));
      return matchCat || m.category === activeCat;
    });
  }, [activeCat]);

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
    <>
      <Navbar />
      <main className="pt-28 min-h-screen flex flex-col">
        <section className="mx-auto max-w-7xl px-6 py-16 flex-grow w-full">
          <div className="mx-auto max-w-2xl text-center">
            <Link
              to="/"
              className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <HiArrowLeft /> Back to Menu Selection
            </Link>
            <br />
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.28em] text-primary">
              {title}
            </span>
            <h1 className="mt-4 font-display text-4xl font-bold sm:text-5xl text-foreground">
              {title}
            </h1>
            <p className="mt-4 text-muted-foreground">
              {subtitle}
            </p>
          </div>

          {/* Category Filter Pills (Like Drinks.tsx) */}
          <div className="scrollbar-hide mt-10 flex gap-2 overflow-x-auto pb-4">
            <div className="mx-auto flex flex-nowrap gap-2 px-4">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setActiveCat(c)}
                  className={`shrink-0 rounded-full border px-5 py-2.5 text-sm font-medium transition-all shadow-soft ${
                    activeCat === c
                      ? "border-primary bg-primary text-primary-foreground shadow-elegant scale-105"
                      : "border-border bg-card text-foreground/70 hover:border-primary/50 hover:text-primary"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Grid of Dishes */}
          <motion.div layout className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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

          {items.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-20 text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                <span className="text-2xl">🍽️</span>
              </div>
              <h3 className="text-xl font-bold font-display text-foreground">No dishes found</h3>
              <p className="mt-2 text-muted-foreground max-w-md mx-auto">
                We couldn't find any dishes under <strong>{activeCat}</strong>. 
                Please try selecting another category or check back later!
              </p>
            </motion.div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}

