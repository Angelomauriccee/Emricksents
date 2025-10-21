// src/components/promo/PromoGrid.jsx
import PromoCard from "./promoCard";

const PromoGrid = () => {
  // replace these Cloudinary URLs with yours
  const diorImgs = [
    "/src/assets/perfumes-ads/dior-min.png",
    "/src/assets/perfumes-ads/dior-2.png",
    "/src/assets/perfumes-ads/dior-4.png",
    "/src/assets/perfumes-ads/dior-test.png"
  ];

  const amouageImgs = [
    "/src/assets/perfumes-ads/interlude-1.png",
    "/src/assets/perfumes-ads/interlude.png",
    "/src/assets/perfumes-ads/interlude-2.png",
  ];

  const lvImgs = [
    "/src/assets/perfumes-ads/yves-min.png",
    "/src/assets/perfumes-ads/yves-lst.png",
    "/src/assets/perfumes-ads/yves1.png",
    "/src/assets/perfumes-ads/yves.png",
  ];

  return (
    <section className="bg-dark py-16 md:py-20">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {/* 1) Left small */}
          <PromoCard
            href="/product/dior-sauvage-eau-de-parfum-100ml"
            images={diorImgs}
            intervalRange={[2000, 4000]}
            className="h-[260px] sm:h-[300px] md:h-[360px]"
          />

          {/* 2) Right small */}
          <PromoCard
            href="/shop?brand=Amouage"
            images={amouageImgs}
            intervalRange={[2200, 3800]}
            className="h-[260px] sm:h-[300px] md:h-[360px]"
          />

          {/* 3) Full-width */}
          <PromoCard
            href="/product/yves-saint-laurent-libre-le-parfum-90ml"
            images={lvImgs}
            intervalRange={[2400, 4200]}
            className="h-[320px] sm:h-[380px] md:h-[460px] md:col-span-2"
          />
        </div>
      </div>
    </section>
  );
};

export default PromoGrid;
