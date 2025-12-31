import { useEffect, useState } from "react";
import axios from "axios";
import { ChevronRight } from "lucide-react";
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

export default function Service() {
  const [services, setServices] = useState<ServiceType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get(
          "https://alexis-hospital.onrender.com/api/v1/service/"
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
    <section
      className="
        relative
        py-4 md:py-6
        bg-gradient-to-br from-white via-[#F7F9FC] to-white
        overflow-hidden
      "
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 5500, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          loop
          speed={800}
          slidesPerView={1}
          className="!overflow-hidden"
        >
          {services.map((service) => (
            <SwiperSlide key={service._id}>
              <div className="py-4 md:py-2">
                <div
                  className="
                    grid grid-cols-1 lg:grid-cols-2
                    gap-8 md:gap-12
                    items-start lg:items-center
                  "
                >
                  {/* LEFT CONTENT */}
                  <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                  >
                    {/* BADGE */}
                    <span
                      className="
                        inline-block mb-3 px-4 py-1.5 rounded-full
                        text-xs font-semibold
                        bg-gradient-to-r from-[#0095ff]/20 to-[#ff7197]/20
                        text-[#0b1324] font-heading
                      "
                    >
                      {service.badgeText}
                    </span>

                    {/* TITLE */}
                    <h2
                      className="
                        text-xl sm:text-2xl md:text-3xl
                        font-extrabold text-[#0b1324]
                        mb-3 font-heading
                      "
                    >
                      {service.title}
                    </h2>

                    {/* DESCRIPTION */}
                    <p className="text-sm sm:text-base text-gray-600 mb-5 max-w-xl font-body">
                      {service.description}
                    </p>

                    {/* POINTS */}
                    <ul className="space-y-2 mb-6">
                      {service.rightPoints.map((point, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-3"
                        >
                          <div
                            className="
                              w-5 h-5 mt-0.5 rounded-full
                              bg-gradient-to-br from-[#0095ff] to-[#ff7197]
                              flex items-center justify-center
                              flex-shrink-0
                            "
                          >
                            <ChevronRight className="w-3 h-3 text-white" />
                          </div>
                          <span className="text-sm sm:text-base text-gray-700">
                            {point}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <button
                      className="
                        inline-flex items-center justify-center
                        px-6 py-3
                        rounded-full
                        bg-gradient-to-r from-[#0095ff] to-[#ff7197]
                        text-white text-sm sm:text-base font-semibold
                        shadow-md hover:shadow-xl
                        transition font-heading
                      "
                    >
                      {service.buttonText}
                    </button>
                  </motion.div>

                  {/* RIGHT IMAGE SECTION */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.96 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="w-full"
                  >
                    {/* MOBILE STACK */}
                    <div className="flex flex-col gap-4 sm:hidden">
                      {service.images.map((img, idx) => (
                        <div
                          key={idx}
                          className="
                            w-full aspect-square
                            rounded-xl overflow-hidden
                            bg-gray-100 shadow-sm
                          "
                        >
                          <img
                            src={img}
                            alt="Service"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>

                    {/* DESKTOP GRID */}
                    <div className="hidden sm:grid grid-cols-2 gap-4">
                      {service.images.slice(0, 4).map((img, idx) => (
                        <div
                          key={idx}
                          className="
                            aspect-square
                            rounded-2xl overflow-hidden
                            bg-gray-100 shadow-md
                          "
                        >
                          <img
                            src={img}
                            alt="Service"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
