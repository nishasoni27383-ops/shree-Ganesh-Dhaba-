import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiX } from "react-icons/hi";

const IMAGES = [
  { src: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=800&q=80", h: "row-span-2" },
  { src: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=600&q=80", h: "" },
  { src: "https://images.unsplash.com/photo-1563379091339-03246963d51a?auto=format&fit=crop&w=800&q=80", h: "" },
  { src: "https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&w=800&q=80", h: "row-span-2" },
  { src: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=600&q=80", h: "" },
  { src: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&w=800&q=80", h: "" },
  { src: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=600&q=80", h: "row-span-2" },
  { src: "https://images.unsplash.com/photo-1626777553635-e7c3a76debb2?auto=format&fit=crop&w=800&q=80", h: "" },
  { src: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=600&q=80", h: "" },
];

export function Gallery() {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <section id="gallery" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.28em] text-primary">
            Gallery
          </span>
          <h2 className="mt-4 font-display text-4xl font-bold sm:text-5xl">
            A feast for the eyes
          </h2>
        </div>

        <div className="mt-14 grid auto-rows-[180px] grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {IMAGES.map((im, i) => (
            <motion.button
              key={i}
              onClick={() => setOpen(im.src)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: (i % 6) * 0.06 }}
              className={`group relative overflow-hidden rounded-2xl shadow-soft ${im.h}`}
            >
              <img
                src={im.src}
                alt=""
                loading="lazy"
                className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-primary/10 to-transparent opacity-0 transition group-hover:opacity-100" />
              <span className="absolute bottom-3 left-4 translate-y-2 text-xs font-semibold uppercase tracking-widest text-white opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100">
                View
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] grid place-items-center bg-black/85 p-4 backdrop-blur"
            onClick={() => setOpen(null)}
          >
            <button
              aria-label="Close"
              className="absolute right-6 top-6 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20"
              onClick={() => setOpen(null)}
            >
              <HiX size={22} />
            </button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              src={open}
              alt=""
              className="max-h-[85vh] max-w-[92vw] rounded-2xl object-contain shadow-elegant"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
