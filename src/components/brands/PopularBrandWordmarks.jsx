/// src/components/brands/PopularBrandWordmarks.jsx
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const BRANDS = [
  { label: "Emrickscents",       className: "word-emrick",        query: "Emrick" },
  { label: "DIOR",               className: "word-dior",          query: "Dior" },
  { label: "GUCCI",              className: "word-gucci",         query: "Gucci" },
  { label: "LOUIS VUITTON",      className: "word-louisvuitton",  query: "Louis Vuitton" },
  { label: "YVES SAINT LAURENT", className: "word-ysl",           query: "Yves Saint Laurent (YSL)" },
  { label: "AMOUAGE",            className: "word-amouage",       query: "Amouage" },
  { label: "TOM FORD",           className: "word-tomford",       query: "Tom Ford" },
  { label: "calvin klein",       className: "word-calvinklein",   query: "Calvin Klein" },
  { label: "CREED",              className: "word-creed",         query: "Creed" },
];

const PopularBrandWordmarks = () => {
  const preventNativeDrag = (e) => e.preventDefault();

  return (
    <section className="brand-section py-10 md:py-14">
      <div className="container-custom">
        <Swiper
          modules={[Autoplay]}
          loop
          // Continuous marquee; no clustering from freeMode
          autoplay={{ delay: 0, disableOnInteraction: false }}
          speed={5500}
          // Key: auto-width slides + spacing handled in CSS
          slidesPerView={"auto"}
          spaceBetween={0}
          centeredSlides={false}
          // Make loop smoother with more virtual clones
          loopAdditionalSlides={BRANDS.length}
          className="brand-rail !overflow-hidden"
        >
          {[...BRANDS, ...BRANDS].map((b, i) => (
            <SwiperSlide key={b.label + i} className="brand-slide">
              <div className="brand-card select-none" draggable={false} onDragStart={preventNativeDrag}>
                <Link
                  to={`/shop?brand=${encodeURIComponent(b.query)}`}
                  className="block"
                  aria-label={`Shop ${b.query}`}
                  title={`Shop ${b.query}`}
                  draggable={false}
                  onDragStart={preventNativeDrag}
                >
                  <span
                    className={`brand-word ${b.className} text-[22px] md:text-[28px] lg:text-[34px]`}
                    draggable={false}
                    onDragStart={preventNativeDrag}
                  >
                    {b.label}
                  </span>
                </Link>
                <span className="brand-underline" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default PopularBrandWordmarks;
