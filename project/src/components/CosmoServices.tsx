import { useEffect, useState } from "react";
import axios from "axios";
import { ChevronRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

interface ServiceType {
  _id: string;
  badgeText: string;
  title: string;
  description: string;
  rightPoints: string[];
  buttonText: string;
  images: string[];
}

export default function CosmoService() {
  const [services, setServices] = useState<ServiceType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get(
          "https://alexis-hospital.onrender.com/api/v1/service/cosmetology"
        );
        setServices(res.data.services || []);
      } catch (error) {
        console.error("Failed to fetch services", error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading || services.length === 0) return null;

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-[#F7C6D3]/20 via-white to-[#A7D3F3]/20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 5500, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          loop
          speed={800}
          slidesPerView={1}
          className="overflow-hidden"
        >
          {services.map((service) => (
            <SwiperSlide key={service._id}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center"
              >
                {/* ================= LEFT CONTENT ================= */}
                <div className="text-center lg:text-left">
                  <span className="inline-block mb-4 px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium bg-gradient-to-r from-[#0095ff] to-[#ff7197] text-white">
                    {service.badgeText}
                  </span>

                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                    {service.title}
                  </h2>

                  <p className="text-gray-600 text-sm sm:text-base mb-6 max-w-xl mx-auto lg:mx-0">
                    {service.description}
                  </p>

                  <ul className="space-y-3 mb-8">
                    {service.rightPoints.map((point, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-3 justify-center lg:justify-start"
                      >
                        <span className="mt-0.5 w-5 h-5 rounded-full flex items-center justify-center bg-gradient-to-br from-[#0095ff] to-[#ff7197] shrink-0">
                          <ChevronRight className="w-3.5 h-3.5 text-white" />
                        </span>
                        <span className="text-gray-700 text-sm sm:text-base">
                          {point}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="
                      inline-flex items-center justify-center
                      gap-3
                      px-7 sm:px-9
                      py-3
                      rounded-full
                      bg-gradient-to-r from-[#0095ff] to-[#ff7197]
                      text-white font-semibold
                      shadow-lg
                      w-full sm:w-auto
                    "
                  >
                    {service.buttonText}
                  </motion.button>
                </div>

                {/* ================= RIGHT IMAGES ================= */}
                <div className="w-full">
                  {/* MOBILE: 1 IMAGE ONLY */}
                  <div className="sm:hidden">
                    <div className="w-full aspect-square rounded-2xl overflow-hidden bg-white shadow-md">
                      <img
                        src={service.images[0]}
                        alt="Service"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* TABLET & DESKTOP GRID */}
                  <div className="hidden sm:grid grid-cols-2 gap-4 sm:gap-6">
                    {service.images.slice(0, 4).map((img, idx) => (
                      <motion.div
                        key={idx}
                        whileHover={{ y: -4, scale: 1.02 }}
                        className="aspect-square rounded-2xl sm:rounded-3xl overflow-hidden bg-white shadow-lg"
                      >
                        <img
                          src={img}
                          alt="Service"
                          className="w-full h-full object-cover"
                        />
                      </motion.div>
                    ))}

                    {Array.from({
                      length: Math.max(0, 4 - service.images.length),
                    }).map((_, idx) => (
                      <div
                        key={`placeholder-${idx}`}
                        className="aspect-square rounded-3xl bg-gradient-to-br from-[#F7C6D3]/20 to-[#A7D3F3]/20 flex items-center justify-center"
                      >
                        <Sparkles className="w-8 h-8 text-[#F7C6D3]" />
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
