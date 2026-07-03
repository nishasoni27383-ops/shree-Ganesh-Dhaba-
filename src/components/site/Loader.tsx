import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import logoMark from "@/assets/ganesh-logo.png.asset.json";
import wordmark from "@/assets/ganesh-wordmark.png.asset.json";

export function Loader() {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 1200);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6 } }}
          className="fixed inset-0 z-[100] grid place-items-center bg-background"
        >
          <div className="text-center">
            <motion.img
              src={logoMark.url}
              alt="Ganesh Dhaba"
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="mx-auto h-24 w-24 object-contain"
            />
            <motion.img
              src={wordmark.url}
              alt="Ganesh Dhaba"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mx-auto mt-4 h-10 w-auto object-contain"
            />
            <div className="mx-auto mt-4 h-1 w-40 overflow-hidden rounded-full bg-secondary">
              <div className="shimmer h-full w-full" />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
