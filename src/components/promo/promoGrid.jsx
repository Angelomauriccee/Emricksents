// src/components/promo/PromoGrid.jsx
import PromoCard from "./promoCard";

const PromoGrid = () => {
  // replace these Cloudinary URLs with yours
  const diorImgs = [
    "https://res.cloudinary.com/drtmoxle9/image/upload/v1761008477/8_zakktb.png",
    "https://res.cloudinary.com/drtmoxle9/image/upload/v1761008487/9_rrdob7.png",
    "https://res.cloudinary.com/drtmoxle9/image/upload/v1761008477/7_ejo44i.png",
    "https://res.cloudinary.com/drtmoxle9/image/upload/v1761008471/5_zba3d9.png",
  ];

  const amouageImgs = [
    "https://res.cloudinary.com/drtmoxle9/image/upload/v1761008490/1_eyevcq.png",
    "https://res.cloudinary.com/drtmoxle9/image/upload/v1761008484/11_uakqoy.png",
    "https://res.cloudinary.com/drtmoxle9/image/upload/v1761008485/13_dlxxr4.png",
  ];

  const lvImgs = [
    "https://res.cloudinary.com/drtmoxle9/image/upload/v1761008487/12_s8nsaa.png",
    "https://res.cloudinary.com/drtmoxle9/image/upload/v1761008479/10_si4ymw.png",
    "https://res.cloudinary.com/drtmoxle9/image/upload/v1761008692/Gemini_Generated_Image_d5w8gqd5w8gqd5w8_ghdgkd.png",
    "https://res.cloudinary.com/drtmoxle9/image/upload/v1761008486/2_ew3dbi.png",
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
