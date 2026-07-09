import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { HiMenuAlt3, HiX, HiOutlineShoppingCart } from "react-icons/hi";
import { useCart } from "@/hooks/use-cart";
import { Link } from "@tanstack/react-router";

const NAV = [
  { id: "about", label: "Our Story", to: "/", hash: "about" },
  { id: "menu", label: "Menu", to: "/menu", hash: undefined },
  { id: "chefs-creation", label: "Chefs Creation", to: "/", hash: "chefs-creation" },
  { id: "ambience", label: "Ambience", to: "/", hash: "ambience" },
  { id: "reviews", label: "Reviews", to: "/", hash: "reviews" },
  { id: "contact", label: "Contact Us", to: "/", hash: "contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const { scrollYProgress } = useScroll();
  const width = useSpring(scrollYProgress, { stiffness: 120, damping: 25 });
  const { cartCount, setCartOpen } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handleScrollSpy = () => {
      const sections = NAV.map((n) => (n.hash ? document.getElementById(n.hash) : null)).filter(Boolean) as HTMLElement[];
      let currentActive = "";
      for (const section of sections) {
        const rect = section.getBoundingClientRect();
        // 40% of viewport height as the trigger line
        if (rect.top <= window.innerHeight * 0.4) {
          currentActive = section.id;
        }
      }
      if (currentActive) {
        setActive(currentActive);
      }
    };

    window.addEventListener("scroll", handleScrollSpy, { passive: true });
    // Initial check after a short delay to ensure DOM is ready
    const timeout = setTimeout(handleScrollSpy, 200);

    return () => {
      window.removeEventListener("scroll", handleScrollSpy);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <>
      <motion.div
        style={{ scaleX: width }}
        className="fixed left-0 right-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-primary via-[var(--color-gold)] to-primary"
      />
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled ? "py-2" : "py-4"
        }`}
      >
        <div className="flex justify-center px-4 sm:px-6">
          <div
            className={`glass mx-auto flex w-full max-w-3xl items-center justify-between gap-4 rounded-full px-4 py-1.5 shadow-soft transition-all ${
              scrolled ? "border-primary/10" : ""
            }`}
          >
            <div className="flex w-full items-center justify-between gap-2">
              <nav className="hidden items-center gap-1 lg:flex">
                {NAV.map((n) => (
                  <Link
                    key={n.id}
                    to={n.to as any}
                    {...(n.hash ? { hash: n.hash } : {})}
                    className="relative rounded-full px-3 py-2 text-sm font-medium text-foreground/80 transition hover:text-primary"
                  >
                    {n.label}
                    {active === n.id && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 -z-10 rounded-full bg-primary/10"
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      />
                    )}
                  </Link>
                ))}
              </nav>

              {/* Cart Button with Count Badge */}
              <button
                onClick={() => setCartOpen(true)}
                className="relative grid h-10 w-10 place-items-center rounded-full border border-border bg-background/60 text-foreground hover:text-primary hover:border-primary/30 transition shadow-soft hover:scale-105 active:scale-95 shrink-0"
                aria-label="View Cart"
              >
                <HiOutlineShoppingCart size={20} />
                {cartCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground leading-none">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Mobile menu toggle */}
              <button
                aria-label="Toggle menu"
                onClick={() => setOpen((o) => !o)}
                className="grid h-10 w-10 place-items-center rounded-full border border-border bg-background/60 text-foreground lg:hidden hover:text-primary hover:border-primary/30 transition shadow-soft shrink-0"
              >
                {open ? <HiX size={20} /> : <HiMenuAlt3 size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <motion.div
          initial={false}
          animate={{ opacity: open ? 1 : 0, y: open ? 0 : -8, pointerEvents: open ? "auto" : "none" }}
          transition={{ duration: 0.25 }}
          className="mx-auto mt-2 max-w-3xl px-4 sm:px-6 lg:hidden"
        >
          <div className="glass rounded-2xl p-3 shadow-soft">
            <nav className="flex flex-col">
              {NAV.map((n) => (
                <Link
                  key={n.id}
                  to={n.to as any}
                  {...(n.hash ? { hash: n.hash } : {})}
                  onClick={() => setOpen(false)}
                  className={`rounded-xl px-4 py-3 text-sm font-medium transition ${
                    active === n.id
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground hover:bg-muted"
                  }`}
                >
                  {n.label}
                </Link>
              ))}
            </nav>
          </div>
        </motion.div>
      </header>
    </>
  );
}
