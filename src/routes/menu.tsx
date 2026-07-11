import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { HiArrowLeft } from "react-icons/hi";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/menu")({
  head: () => ({
    meta: [
      { title: "Menu Categories — Ganesh Dhaba" },
      {
        name: "description",
        content:
          "Explore Ganesh Dhaba's menu: Starters and Main Course.",
      },
      { property: "og:title", content: "Menu Categories — Ganesh Dhaba" },
      {
        property: "og:description",
        content: "Handcrafted Indian favourites.",
      },
    ],
  }),
  component: MenuPage,
});

const img = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=80`;

const CATEGORIES = [
  {
    name: "Starter",
    desc: "Tandoori, Chinese, Pasta & more",
    image: img("photo-1626777553635-e7c3a76debb2"),
    options: [
      "Tandoori Starter", "Chinese Starter", "Pasta", "Soup", 
      "Pizza and Bread", "Street Chaat", "Uttapam", "South Indian", 
      "Sandwich and Fries", "Burger"
    ]
  },
  {
    name: "Main Course",
    desc: "Aloo Special, Paneer, Dal & more",
    image: img("photo-1585937421612-70a008356fbe"),
    options: [
      "Aloo Special", "Paneer Special", "Dal", "Main Course", 
      "Roti and Naan", "Dhai and Raita", "Rice Pulao", "Salad and Papad"
    ]
  }
];

function MenuPage() {
  return (
    <>
      <Navbar />
      <main className="pt-28">
        <section className="mx-auto max-w-7xl px-6 py-16">
          <div className="mx-auto max-w-2xl text-center">
            <Link
              to="/"
              className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
            >
              <HiArrowLeft /> Back to Home
            </Link>
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.28em] text-primary">
              Our Menu
            </span>
            <h1 className="mt-4 font-display text-4xl font-bold sm:text-5xl">
              Explore our categories
            </h1>
            <p className="mt-4 text-muted-foreground">
              From delicious starters to fulfilling main courses — pick your craving.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 max-w-5xl mx-auto">
            {CATEGORIES.map((c, i) => (
              <motion.article
                key={c.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                whileHover={{ y: -6 }}
                className="group relative overflow-hidden rounded-3xl border border-border bg-card shadow-soft transition hover:shadow-elegant"
              >
                <div className="relative aspect-[4/5] overflow-hidden sm:aspect-[3/4]">
                  <img
                    src={c.image}
                    alt={c.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20" />
                  
                  {/* Default State */}
                  <div className="absolute inset-x-0 bottom-0 p-6 text-white transition-opacity duration-300 group-hover:opacity-0">
                    <h3 className="font-display text-3xl font-bold">{c.name}</h3>
                    <p className="mt-2 text-sm text-white/85">{c.desc}</p>
                    <span className="mt-4 inline-flex rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground">
                      Hover to view options
                    </span>
                  </div>

                  {/* Hover State */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-center items-center text-center opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-black/75 backdrop-blur-sm">
                    <h3 className="font-display text-3xl font-bold text-white mb-6">{c.name} Options</h3>
                    <ul className="grid grid-cols-2 gap-x-3 gap-y-3 w-full max-w-sm mx-auto">
                      {c.options.map((opt) => (
                        <li key={opt} className="text-sm font-medium text-white/90 bg-white/10 rounded-lg py-2 px-3 hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer flex items-center justify-center text-center leading-tight min-h-[44px]">
                          {opt}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

