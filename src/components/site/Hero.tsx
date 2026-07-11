import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiArrowDown, HiOutlineShoppingCart } from "react-icons/hi";
import gsap from "gsap";
import ganeshDhaba from "@/assets/ganesh dhaba.jpeg";
import heroDhaba from "@/assets/hero-dhaba.jpg";
import ambience1 from "@/assets/ambience 1.jpeg";
import ambience2 from "@/assets/ambience2.jpeg";
import ambience3 from "@/assets/ambience3.jpeg";
import ambience4 from "@/assets/ambience 4.jpeg";
import { Logo } from "./Logo";
import { useCart } from "@/hooks/use-cart";

const SLIDES = [
  { src: ambience3, alt: "Dhaba Evening View" },
  { src: ambience4, alt: "Dhaba Night View" },
  { src: ambience1, alt: "Dhaba Interior" },
  { src: ambience2, alt: "Dhaba Seating" },
  { src: ganeshDhaba, alt: "Shree Ganesh Dhaba" },
  { src: heroDhaba, alt: "Dhaba Ambience" },
];


export function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [index, setIndex] = useState(0);
  const { cartCount, setCartOpen } = useCart();

  useEffect(() => {
    if (!titleRef.current) return;
    const letters = titleRef.current.querySelectorAll("[data-letter]");
    gsap.fromTo(
      letters,
      { y: 60, opacity: 0, rotateX: -40 },
      {
        y: 0,
        opacity: 1,
        rotateX: 0,
        duration: 1.1,
        ease: "power4.out",
        stagger: 0.045,
        delay: 0.2,
      }
    );
  }, []);

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % SLIDES.length), 4500);
    return () => clearInterval(t);
  }, []);

  return (
    <section
      id="home"
      className="relative isolate flex min-h-[100svh] items-center justify-center overflow-hidden"
    >
      {/* Header Area (Logo & Cart) */}
      <div className="absolute left-4 right-4 top-4 z-30 flex items-center justify-between sm:left-6 sm:right-6 sm:top-6">
        <Logo hideWordmark logoClassName="h-24 w-24 sm:h-32 sm:w-32" />
        
        <button
          onClick={() => setCartOpen(true)}
          className="group relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-background/10 backdrop-blur-md border border-white/20 text-white transition hover:bg-white/20 sm:h-14 sm:w-14 shadow-elegant"
        >
          <HiOutlineShoppingCart className="h-6 w-6" />
          {cartCount > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground sm:h-6 sm:w-6 sm:text-xs"
            >
              {cartCount}
            </motion.span>
          )}
        </button>
      </div>

      {/* Animated background slideshow */}
      <div className="absolute inset-0 -z-20">
        <AnimatePresence mode="sync">
          <motion.img
            key={index}
            src={SLIDES[index].src}
            alt={SLIDES[index].alt}
            initial={{ opacity: 0, scale: 1.15 }}
            animate={{ opacity: 1, scale: 1.05 }}
            exit={{ opacity: 0, scale: 1.0 }}
            transition={{ opacity: { duration: 1.4, ease: "easeInOut" }, scale: { duration: 6, ease: "linear" } }}
            className="absolute inset-0 h-full w-full object-cover"
            width={1920}
            height={1280}
          />
        </AnimatePresence>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-24 left-1/2 z-10 flex -translate-x-1/2 gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`Show slide ${i + 1}`}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              i === index ? "w-8 bg-[var(--color-gold)]" : "w-3 bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>

      {/* Overlays */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/70 via-black/40 to-black/85" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.55)_100%)]" />

      {/* Floating spice particles */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        {Array.from({ length: 22 }).map((_, i) => (
          <span
            key={i}
            className="absolute block h-1.5 w-1.5 rounded-full bg-[var(--color-gold)]/70 blur-[1px] animate-float-up"
            style={{
              left: `${(i * 4.7) % 100}%`,
              bottom: `-${Math.random() * 40}px`,
              animationDelay: `${(i % 8) * 0.6}s`,
              animationDuration: `${6 + (i % 5)}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-5xl px-4 py-24 flex flex-col items-center justify-center text-center text-white">

        {/* Top Row: Shree + Ganesh Dhaba */}
        <div className="flex items-center justify-center gap-4 sm:gap-6 md:gap-8 text-left">
          {/* Large Shree Calligraphy (White) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: -30 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            className="font-devanagari font-normal text-[85px] sm:text-[135px] md:text-[185px] text-white leading-none select-none drop-shadow-[0_4px_24px_rgba(255,255,255,0.2)] shrink-0 pr-1"
          >
            श्री
          </motion.div>

          {/* Title Stack */}
          <h1
            ref={titleRef}
            className="font-display text-5xl font-bold leading-[0.95] sm:text-7xl md:text-[104px] text-left"
            aria-label="GANESH DHABA"
          >
            <span className="block overflow-hidden">
              {"GANESH".split("").map((c, i) => (
                <span key={i} data-letter className="inline-block">{c}</span>
              ))}
            </span>
            <span className="block overflow-hidden text-white">
              {"DHABA".split("").map((c, i) => (
                <span key={i} data-letter className="inline-block">{c}</span>
              ))}
            </span>
          </h1>
        </div>

        {/* Subtitle centered under the entire block */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="mt-8 max-w-md text-xs text-white/85 sm:max-w-2xl sm:text-base md:text-lg text-center"
        >
          Authentic Family Dining • Fast Food • Refreshing Beverages
        </motion.p>

      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#about"
        aria-label="Scroll to about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ opacity: { delay: 1.4 }, y: { repeat: Infinity, duration: 1.8 } }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-white/80"
      >
        <span className="flex flex-col items-center gap-2 text-[10px] uppercase tracking-[0.3em]">
          Scroll
          <HiArrowDown size={18} />
        </span>
      </motion.a>
    </section>
  );
}
