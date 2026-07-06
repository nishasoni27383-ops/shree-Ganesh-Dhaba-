import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { HiArrowDown } from "react-icons/hi";
import gsap from "gsap";
import thaliBg from "@/assets/thali-bg.jpg.asset.json";

export function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null);

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

  return (
    <section
      id="home"
      className="relative isolate flex min-h-[100svh] items-center justify-center overflow-hidden"
    >
      {/* Background image with slow zoom */}
      <div className="absolute inset-0 -z-20">
        <img
          src={thaliBg.url}
          alt="Traditional Indian thali spread"
          className="h-full w-full animate-gentle-zoom object-cover"
          width={1920}
          height={1280}
        />
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
      <div className="relative z-10 mx-auto max-w-5xl px-6 py-24 text-center text-white">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-[11px] uppercase tracking-[0.32em] backdrop-blur"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-gold)]" />
          Authentic Indian Dhaba • Est. 2014
        </motion.p>

        <h1
          ref={titleRef}
          className="font-display text-5xl font-bold leading-[0.95] sm:text-7xl md:text-[104px]"
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

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="mx-auto mt-6 max-w-2xl text-base text-white/85 sm:text-lg"
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
