import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import { HiArrowUp } from "react-icons/hi";

const WA_URL =
  "https://wa.me/919999999999?text=Hi%20Ganesh%20Dhaba%2C%20I'd%20like%20to%20place%20an%20order.";

export function FloatingActions() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 500);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <a
        href={WA_URL}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 right-6 z-40 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_15px_40px_-10px_rgba(37,211,102,0.7)] transition hover:scale-110"
      >
        <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#25D366]/40" />
        <FaWhatsapp size={26} />
      </a>
      <AnimatePresence>
        {show && (
          <motion.button
            key="totop"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Back to top"
            className="fixed bottom-24 right-6 z-40 grid h-12 w-12 place-items-center rounded-full bg-primary text-primary-foreground shadow-elegant transition hover:scale-110"
          >
            <HiArrowUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
