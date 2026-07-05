import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { HiStar } from "react-icons/hi";
import { FaGoogle, FaQuoteLeft } from "react-icons/fa";

const REVIEWS = [
  { name: "Aashirwad Jaat", avatar: "https://i.pravatar.cc/120?img=12", text: "Best quality food, neat and clean place, staff behaviour good." },
  { name: "Ramswaroop Mishra", avatar: "https://i.pravatar.cc/120?img=15", text: "Awesome food experience, fastest service." },
  { name: "Wanderlust", avatar: "https://i.pravatar.cc/120?img=32", text: "The portion size was enough to serve two people, and it was very flavourful." },
  { name: "Rahul Suthar", avatar: "https://i.pravatar.cc/120?img=52", text: "Authentic Rajasthani taste — Dal Bati Churma was absolutely delicious. Highly recommended in Bikaner." },
  { name: "Pooja Rathore", avatar: "https://i.pravatar.cc/120?img=45", text: "Perfect stop on the highway. Hot rotis, fresh sabzi and warm hospitality. Feels like home food." },
  { name: "Manish Vyas", avatar: "https://i.pravatar.cc/120?img=68", text: "Value for money, generous portions and a very family-friendly atmosphere. Will visit again." },
];

export function Reviews() {
  return (
    <section id="reviews" className="relative bg-secondary/40 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.28em] text-primary">
            Reviews
          </span>
          <h2 className="mt-4 font-display text-4xl font-bold sm:text-5xl">
            Loved by 1000+ families
          </h2>
        </div>

        <div className="mt-14">
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={24}
            loop
            autoplay={{ delay: 3200, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            breakpoints={{ 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
            className="!pb-14"
          >
            {REVIEWS.map((r, i) => (
              <SwiperSlide key={i}>
                <div className="h-full rounded-3xl border border-border bg-card p-7 shadow-soft">
                  <div className="flex items-center justify-between">
                    <FaQuoteLeft className="text-primary/30" size={26} />
                    <FaGoogle className="text-muted-foreground" />
                  </div>
                  <div className="mt-4 flex text-[var(--color-gold)]">
                    {Array.from({ length: 5 }).map((_, s) => <HiStar key={s} size={18} />)}
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-foreground/80">"{r.text}"</p>
                  <div className="mt-6 flex items-center gap-3">
                    <img src={r.avatar} alt={r.name} loading="lazy" className="h-11 w-11 rounded-full object-cover" />
                    <div>
                      <p className="text-sm font-semibold">{r.name}</p>
                      <p className="text-xs text-muted-foreground">Google Review</p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      <style>{`
        .swiper-pagination-bullet-active { background: var(--color-primary) !important; }
      `}</style>
    </section>
  );
}
