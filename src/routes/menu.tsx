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
          "Explore Ganesh Dhaba's menu: Breakfast, Lunch, Starters, Our Special, Main Course, Rajasthani Thali, Dal Bati Churma and Drinks & Beverages.",
      },
      { property: "og:title", content: "Menu Categories — Ganesh Dhaba" },
      {
        property: "og:description",
        content: "Handcrafted Indian favourites across breakfast, thalis, main course and beverages.",
      },
    ],
  }),
  component: MenuPage,
});

const img = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=80`;

const CATEGORIES = [
  { name: "Breakfast", desc: "Poha, paratha, chole bhature & morning classics.", image: img("photo-1626200419199-391ae4be7a41") },
  { name: "Lunch", desc: "Wholesome thalis & everyday comfort meals.", image: img("photo-1567337710282-00832b415979") },
  { name: "Starters", desc: "Crispy tikkas, kebabs & tandoor bites.", image: img("photo-1626777553635-e7c3a76debb2") },
  { name: "Our Special", desc: "Chef's signature dishes you can't miss.", image: img("photo-1631452180519-c014fe946bc7") },
  { name: "Main Course", desc: "Rich curries, paneer & dal specialties.", image: img("photo-1585937421612-70a008356fbe") },
  { name: "Rajasthani Thali", desc: "A royal platter of Rajasthan's finest.", image: img("photo-1567337710282-00832b415979") },
  { name: "Dal Bati Churma", desc: "The iconic trio — smoky, sweet & soulful.", image: img("photo-1601050690597-df0568f70950") },
  { name: "Drinks & Beverages", desc: "Lassi, chai, mocktails & fresh juices.", image: img("photo-1571877227200-a0d98ea607e9") },
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
              From hearty breakfasts to royal Rajasthani thalis — pick your craving.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img
                    src={c.image}
                    alt={c.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                    <h3 className="font-display text-2xl font-bold">{c.name}</h3>
                    <p className="mt-2 text-sm text-white/85">{c.desc}</p>
                    <span className="mt-4 inline-flex rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground">
                      View Dishes
                    </span>
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
