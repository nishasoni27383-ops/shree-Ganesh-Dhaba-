import { useMemo, useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineSearch, HiOutlineHeart, HiHeart, HiChevronDown } from "react-icons/hi";
import { FaLeaf } from "react-icons/fa";
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

export function Menu() {
  const [q, setQ] = useState("");
  const [activeCat, setActiveCat] = useState<string>("All");
  const [openDropdown, setOpenDropdown] = useState<"Starter" | "Main Course" | null>(null);
  const [favs, setFavs] = useState<Record<string, boolean>>({});
  
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const items = useMemo(() => {
    const ql = q.trim().toLowerCase();
    
    return MENU.filter((m) => {
      // For now, if activeCat is "All", show all.
      // Otherwise we match exactly (even if the current data doesn't perfectly align with the new categories, they will show when matched).
      // We also map some existing categories so it's not completely empty.
      const matchCat = activeCat === "All" || activeCat === "All Starters" || activeCat === "All Main Course" || m.category === activeCat;
      
      return matchCat;
    }).filter((m) => (ql ? m.name.toLowerCase().includes(ql) || m.desc.toLowerCase().includes(ql) : true));
  }, [q, activeCat]);

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

  const isStarterActive = STARTERS.includes(activeCat);
  const isMainCourseActive = MAIN_COURSES.includes(activeCat);

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

        {/* Categories Dropdowns */}
        <div className="mt-10 flex justify-center gap-4 relative z-30" ref={dropdownRef}>
          {/* Starter Dropdown */}
          <div 
            className="relative group" 
            onMouseEnter={() => setOpenDropdown("Starter")}
            onMouseLeave={() => setOpenDropdown(null)}
          >
            <button
              onClick={() => setOpenDropdown(openDropdown === "Starter" ? null : "Starter")}
              className={`flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-bold transition-all shadow-soft ${
                isStarterActive || openDropdown === "Starter"
                  ? "border-primary bg-primary text-primary-foreground shadow-elegant scale-105"
                  : "border-border bg-card text-foreground/80 hover:border-primary/50 hover:text-primary"
              }`}
            >
              Starter <HiChevronDown className={`transition-transform ${openDropdown === "Starter" ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence>
              {openDropdown === "Starter" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-1/2 top-full mt-2 w-56 -translate-x-1/2 rounded-2xl border border-border bg-card p-2 shadow-elegant"
                >
                  <div className="flex max-h-80 flex-col overflow-y-auto scrollbar-hide">
                    {STARTERS.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => {
                          setActiveCat(cat);
                          setOpenDropdown(null);
                        }}
                        className={`text-left rounded-xl px-4 py-2.5 text-sm font-medium transition ${
                          activeCat === cat
                            ? "bg-primary/10 text-primary"
                            : "text-foreground/70 hover:bg-muted hover:text-foreground"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Main Course Dropdown */}
          <div 
            className="relative group"
            onMouseEnter={() => setOpenDropdown("Main Course")}
            onMouseLeave={() => setOpenDropdown(null)}
          >
            <button
              onClick={() => setOpenDropdown(openDropdown === "Main Course" ? null : "Main Course")}
              className={`flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-bold transition-all shadow-soft ${
                isMainCourseActive || openDropdown === "Main Course"
                  ? "border-primary bg-primary text-primary-foreground shadow-elegant scale-105"
                  : "border-border bg-card text-foreground/80 hover:border-primary/50 hover:text-primary"
              }`}
            >
              Main Course <HiChevronDown className={`transition-transform ${openDropdown === "Main Course" ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence>
              {openDropdown === "Main Course" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-1/2 top-full mt-2 w-56 -translate-x-1/2 rounded-2xl border border-border bg-card p-2 shadow-elegant"
                >
                  <div className="flex max-h-80 flex-col overflow-y-auto scrollbar-hide">
                    {MAIN_COURSES.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => {
                          setActiveCat(cat);
                          setOpenDropdown(null);
                        }}
                        className={`text-left rounded-xl px-4 py-2.5 text-sm font-medium transition ${
                          activeCat === cat
                            ? "bg-primary/10 text-primary"
                            : "text-foreground/70 hover:bg-muted hover:text-foreground"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          {(activeCat !== "All" && !isStarterActive && !isMainCourseActive) || activeCat !== "All" ? (
             <button
               onClick={() => setActiveCat("All")}
               className="flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-bold text-foreground/80 shadow-soft transition hover:border-primary/50 hover:text-primary"
             >
               View All
             </button>
          ) : null}
        </div>

        {/* Selected Category Label */}
        {activeCat !== "All" && activeCat !== "All Starters" && activeCat !== "All Main Course" && (
          <div className="mt-8 text-center">
            <h3 className="text-xl font-bold font-display text-foreground">Showing: {activeCat}</h3>
          </div>
        )}

        {/* Grid */}
        <motion.div layout className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 relative z-10">
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
                      Add to Cart
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {items.length === 0 && (
          <div className="mt-16 text-center">
            <p className="text-muted-foreground">
              No dishes found in <strong>{activeCat}</strong> yet.
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              (More dishes will be added soon!)
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
