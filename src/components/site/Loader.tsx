import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

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
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-primary text-primary-foreground shadow-elegant"
            >
              <span className="font-display text-3xl font-bold">ॐ</span>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-6 font-display text-2xl font-bold tracking-wide"
            >
              GANESH <span className="text-primary">DHABA</span>
            </motion.p>
            <div className="mx-auto mt-4 h-1 w-40 overflow-hidden rounded-full bg-secondary">
              <div className="shimmer h-full w-full" />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
