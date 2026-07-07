import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import { SmoothScroll } from "@/components/site/SmoothScroll";
import { Loader } from "@/components/site/Loader";
import { Hero } from "@/components/site/Hero";
import { About } from "@/components/site/About";
import { WhyChooseUs } from "@/components/site/WhyChooseUs";
import { Menu } from "@/components/site/Menu";
import { Signature } from "@/components/site/Signature";

import { FamilyDining } from "@/components/site/FamilyDining";
import { Drinks } from "@/components/site/Drinks";
import { Reviews } from "@/components/site/Reviews";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";
import { FloatingActions } from "@/components/site/FloatingActions";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ganesh Dhaba — Authentic Family Dining, Fast Food & Beverages" },
      {
        name: "description",
        content:
          "Ganesh Dhaba — an authentic Indian family restaurant serving North Indian, Chinese, South Indian, fast food & fresh beverages. Warm ambience, hygienic kitchen, pocket-friendly.",
      },
      { property: "og:title", content: "Ganesh Dhaba — Authentic Family Dhaba" },
      {
        property: "og:description",
        content: "Warm, hygienic and affordable family dhaba. Explore our menu and visit us today.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <SmoothScroll />
      <Loader />
      <Navbar />
      <main>
        <Hero />
        <About />
        <WhyChooseUs />
        <Menu />
        <Signature />
        <FamilyDining />
        <Drinks />
        <Reviews />
        <Contact />
      </main>
      <Footer />
      <FloatingActions />
      <Toaster position="top-center" richColors closeButton />
    </>
  );
}
