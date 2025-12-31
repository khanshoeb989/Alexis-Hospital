import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

interface BeforeAfterCaseType {
  _id: string;
  title: string;
  description: string;
  serviceCategory: string;
  beforeImage: string;
  afterImage: string;
}

export default function BeforeAfterCase() {
  const [cases, setCases] = useState<BeforeAfterCaseType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCases = async () => {
      try {
        const res = await axios.get(
          "https://alexis-hospital.onrender.com/api/v1/beforeAfterCase/"
        );
        setCases(res.data.cases || []);
      } catch (error) {
        console.error("Failed to fetch cases", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCases();
  }, []);

  if (loading || cases.length === 0) return null;

  /* ---------------- CARD ---------------- */

  const CaseContent = ({ item }: { item: BeforeAfterCaseType }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="
        bg-white rounded-3xl shadow-xl
        max-w-[1100px] mx-auto
        p-5 sm:p-8 lg:p-12
        grid grid-cols-1 lg:grid-cols-2
        gap-6 sm:gap-8 lg:gap-14
        items-center
      "
    >
      {/* LEFT CONTENT */}
      <div>
        <span
          className="
            inline-block mb-3 px-4 py-1.5 rounded-full
            text-xs sm:text-sm font-semibold
            bg-gradient-to-r from-[#A7D3F3]/40 to-[#F7C6D3]/40
            text-gray-800 font-heading
          "
        >
          {item.serviceCategory}
        </span>

        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-3 font-heading">
          {item.title}
        </h2>

        <p className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-md font-body">
          {item.description}
        </p>
      </div>

      {/* RIGHT IMAGES */}
      <div className="grid grid-cols-2 gap-4 sm:gap-6">
        {[
          { src: item.beforeImage, label: "BEFORE" },
          { src: item.afterImage, label: "AFTER" },
        ].map((img) => (
          <motion.div
            key={img.label}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
            className="
              rounded-2xl overflow-hidden
              bg-white border border-gray-100
              shadow-lg
            "
          >
            <div className="w-full aspect-square">
              <img
                src={img.src}
                alt={img.label}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="py-2 text-center text-xs sm:text-sm font-semibold tracking-wide text-gray-700">
              {img.label}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );

  /* ---------------- RENDER ---------------- */

  return (
    <section
      className="
        py-6 sm:py-8 md:py-10
        bg-white
        overflow-hidden
      "
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">

        {/* RIGHT FADE — DESKTOP ONLY */}
        <div
          className="
            hidden lg:block
            pointer-events-none absolute right-0 top-0 z-20 h-full w-36
            bg-gradient-to-l from-white via-white/80 to-transparent
          "
        />

        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 5500, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          loop
          speed={900}
          centeredSlides
          watchSlidesProgress
          spaceBetween={24}
          breakpoints={{
            0: {
              slidesPerView: 1,
              spaceBetween: 16,
            },
            768: {
              slidesPerView: 1.05,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 1.22,
              spaceBetween: 48,
            },
          }}
          className="before-after-swiper"
        >
          {cases.map((item) => (
            <SwiperSlide
              key={item._id}
              className="!overflow-visible bg-transparent"
            >
              <CaseContent item={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
