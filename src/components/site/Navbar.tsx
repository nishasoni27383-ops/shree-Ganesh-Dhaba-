import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { Logo } from "./Logo";

const NAV = [
  { id: "about", label: "Our Story", href: "/#about" },
  { id: "ambience", label: "Ambience", href: "/#ambience" },
  { id: "menu", label: "Menu", href: "/menu" },
  { id: "chefs-creation", label: "Chefs Creation", href: "/#chefs-creation" },
  { id: "reviews", label: "Reviews", href: "/#reviews" },
  { id: "location", label: "Location", href: "/#contact" },
  { id: "contact", label: "Contact Us", href: "/#contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const { scrollYProgress } = useScroll();
  const width = useSpring(scrollYProgress, { stiffness: 120, damping: 25 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    NAV.forEach((n) => {
      const el = document.getElementById(n.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
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
            <Logo hideWordmark logoClassName="h-[70px] w-[70px]" />
            <nav className="hidden items-center gap-1 lg:flex">
              {NAV.map((n) => (
                <a
                  key={n.id}
                  href={n.href}
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
                </a>
              ))}
            </nav>
            <button
              aria-label="Toggle menu"
              onClick={() => setOpen((o) => !o)}
              className="grid h-10 w-10 place-items-center rounded-full border border-border bg-background/60 text-foreground lg:hidden"
            >
              {open ? <HiX size={20} /> : <HiMenuAlt3 size={20} />}
            </button>
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
                <a
                  key={n.id}
                  href={n.href}
                  onClick={() => setOpen(false)}
                  className={`rounded-xl px-4 py-3 text-sm font-medium transition ${
                    active === n.id
                      ? "bg-primary/10 text-primary"
                      : "text-foreground/80 hover:bg-secondary"
                  }`}
                >
                  {n.label}
                </a>
              ))}
            </nav>
          </div>
        </motion.div>
      </header>
    </>
  );
}
