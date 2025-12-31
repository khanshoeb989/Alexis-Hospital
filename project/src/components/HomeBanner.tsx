import { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { motion } from "framer-motion";

import "swiper/css";
import "swiper/css/pagination";

interface HomeBannerType {
  _id: string;
  title: string;
  subtitle?: string;
  bannerImage: string;
  ctaText?: string;
  ctaLink?: string;
}

export default function HomeBanner() {
  const [banners, setBanners] = useState<HomeBannerType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const res = await axios.get(
          "https://alexis-hospital.onrender.com/api/v1/homeBanner/"
        );
        setBanners(res.data.banners || []);
      } catch (error) {
        console.error("Failed to fetch banners", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBanners();
  }, []);

  if (loading || banners.length === 0) return null;

  return (
    <section className="relative w-full overflow-hidden">

      {/* BACKGROUND */}
      <div className="absolute inset-0 bg-gradient-to-br  via-white to-[#ff7197]/10" />

      {/* BLOBS (RESPONSIVE) */}
      <motion.div
        className="absolute top-16 left-6 sm:left-16 w-56 h-56 sm:w-72 sm:h-72  rounded-full blur-3xl"
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-16 right-6 sm:right-16 w-72 h-72 sm:w-96 sm:h-96 rounded-full blur-3xl"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* SLIDER */}
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop
        speed={900}
        className="relative z-10 h-[85vh] sm:h-[80vh] md:h-[90vh]"
      >
        {banners.map((banner) => (
          <SwiperSlide key={banner._id}>
            <div className="w-full h-full">
              <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-10">
                <div
                  className="
                    grid grid-cols-1 md:grid-cols-2
                    h-full items-center
                    gap-10 md:gap-16
                  "
                >

                  {/* TEXT */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="
                      max-w-xl
                      mx-auto md:mx-0
                      text-center md:text-left
                    "
                  >
                    {banner.subtitle && (
                      <span
                        className="
                          inline-block mb-4
                          px-5 py-2
                          rounded-full
                          text-xs sm:text-sm
                          font-medium
                          bg-white/80 backdrop-blur
                          border border-gray-200
                          text-gray-700 shadow-sm
                          font-body
                        "
                      >
                        {banner.subtitle}
                      </span>
                    )}

                    <h1
                      className="
                        text-3xl sm:text-4xl md:text-5xl lg:text-6xl
                        font-extrabold
                        text-[#0b1324]
                        leading-tight
                        font-heading
                      "
                    >
                      {banner.title}
                    </h1>

                    {banner.ctaText && banner.ctaLink && (
                      <motion.a
                        href={banner.ctaLink}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.96 }}
                        className="
                          inline-flex items-center gap-3
                          mt-6 sm:mt-8
                          px-7 sm:px-8
                          py-3.5 sm:py-4
                          rounded-full
                          bg-gradient-to-r from-[#0095ff] to-[#ff7197]
                          text-white
                          font-semibold
                          text-sm sm:text-lg
                          shadow-lg hover:shadow-xl
                          transition
                        "
                      >
                        {banner.ctaText}
                        <span className="text-xl">→</span>
                      </motion.a>
                    )}
                  </motion.div>

                  {/* IMAGE */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                    className="
                      relative
                      w-full
                      h-[240px] sm:h-[320px] md:h-[65vh]
                      rounded-2xl
                      overflow-hidden
                      shadow-xl
                      bg-white
                    "
                  >
                    <img
                      src={banner.bannerImage}
                      alt={banner.title}
                      className="w-full h-full object-cover object-center"
                      loading="eager"
                    />
                  </motion.div>

                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* PAGINATION */}
      <style>{`
        .swiper-pagination {
          bottom: 18px !important;
        }
        .swiper-pagination-bullet {
          background: #cbd5e1;
          opacity: 1;
        }
        .swiper-pagination-bullet-active {
          background: #0095ff;
        }
      `}</style>
    </section>
  );
}
