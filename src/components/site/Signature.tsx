import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import { MENU, SIGNATURE_IDS } from "@/lib/menu-data";
import { HiStar } from "react-icons/hi";

export function Signature() {
  const items = SIGNATURE_IDS.map((id) => MENU.find((m) => m.id === id)!).filter(Boolean);

  return (
    <section id="chefs-creation" className="relative overflow-hidden bg-gradient-to-b from-background via-secondary/40 to-background py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.28em] text-primary">
            Our Best Sold
          </span>
          <h2 className="mt-4 font-display text-4xl font-bold sm:text-5xl">
            Rajasthani Special
          </h2>
        </div>

        <div className="mt-14">
          <Swiper
            modules={[Autoplay, Navigation, EffectCoverflow]}
            effect="coverflow"
            centeredSlides
            slidesPerView="auto"
            loop
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            navigation
            coverflowEffect={{ rotate: 20, stretch: 0, depth: 200, modifier: 1, slideShadows: false }}
            className="!py-6"
          >
            {items.map((m) => (
              <SwiperSlide key={m.id} className="!w-[300px] sm:!w-[360px]">
                <div className="group overflow-hidden rounded-3xl border border-border bg-card shadow-elegant">
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <img src={m.image} alt={m.name} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                      <div className="flex items-center gap-2 text-xs text-[var(--color-gold)]">
                        <HiStar /> {m.rating} rating
                      </div>
                      <h3 className="mt-2 font-display text-2xl font-bold">{m.name}</h3>
                      <p className="mt-1 line-clamp-2 text-sm text-white/85">{m.desc}</p>
                      <div className="mt-4 flex items-center justify-between">
                        <span className="font-display text-xl font-bold text-[var(--color-gold)]">₹{m.price}</span>
                        <a
                          href="#menu"
                          className="rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground"
                        >
                          Order Now
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <style>{`
        .swiper-button-next, .swiper-button-prev { color: var(--color-primary); }
        .swiper-button-next::after, .swiper-button-prev::after { font-size: 18px; font-weight: 900; }
      `}</style>
    </section>
  );
}
