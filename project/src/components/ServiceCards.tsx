import { useEffect, useState } from "react";
import axios from "axios";
import { Check, Sparkles, Clock, DollarSign } from "lucide-react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

interface ServiceCardType {
  _id: string;
  title: string;
  shortDescription: string;
  checklist: string[];
  priceRange: string;
  duration: string;
  slug: string;
}

interface Props {
  category: "Cosmetology" | "Medical";
}

export default function ServiceCards({ category }: Props) {
  const [services, setServices] = useState<ServiceCardType[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get(
          `https://alexis-hospital.onrender.com/api/v1/serviceDetails/${category.toLowerCase()}`
        );
        setServices(res.data.services || []);
      } catch (err) {
        console.error("Failed to fetch services", err);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [category]);

  if (loading) {
    return (
      <section className="py-12 md:py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 shadow-lg animate-pulse"
              >
                <div className="w-12 h-12 bg-gray-200 rounded-xl mb-4"></div>
                <div className="h-6 bg-gray-200 rounded mb-3"></div>
                <div className="h-4 bg-gray-200 rounded mb-4"></div>
                <div className="space-y-2">
                  <div className="h-3 bg-gray-200 rounded"></div>
                  <div className="h-3 bg-gray-200 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (services.length === 0) {
    return (
      <section className="py-12 md:py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg">
            <Sparkles className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No Services Available
            </h3>
            <p className="text-gray-500">
              Check back soon for {category.toLowerCase()} services.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Category Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 md:mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#0095ff] to-[#ff7197] text-white px-4 py-2 rounded-full text-sm font-medium mb-3 md:mb-4">
            <span className="w-2 h-2 bg-white rounded-full"></span>
            {category} Services
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Available {category} Treatments
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
            Professional treatments with modern equipment and experienced specialists
          </p>
        </motion.div>

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-8">
          {services.map((service, index) => (
            <Link key={service._id} to={`/services/${service.slug}`}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -6, scale: 1.01 }}
                className="
                  cursor-pointer
                  bg-white
                  rounded-xl md:rounded-2xl
                  p-4 sm:p-5 md:p-6 lg:p-8
                  shadow-lg
                  hover:shadow-xl
                  transition-all duration-300
                  border border-gray-100
                  h-full
                  flex flex-col
                "
              >
                {/* Icon and Title Row */}
                <div className="flex items-start gap-3 sm:gap-4 mb-4 md:mb-6">
                  <div
                    className="
                      w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14
                      rounded-lg sm:rounded-xl
                      bg-gradient-to-br from-[#0095ff] to-[#ff7197]
                      flex items-center justify-center
                      flex-shrink-0
                    "
                  >
                    <span className="text-white text-lg sm:text-xl md:text-2xl font-bold">
                      {service.title.charAt(0)}
                    </span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-1 sm:mb-2 line-clamp-2">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 text-xs sm:text-sm md:text-base line-clamp-2">
                      {service.shortDescription}
                    </p>
                  </div>
                </div>

                {/* Checklist - Collapsible on mobile */}
                <div className="mb-4 md:mb-6 flex-1">
                  <ul className="space-y-2 sm:space-y-3">
                    {service.checklist.slice(0, 3).map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-[#F7C6D3] flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 text-xs sm:text-sm line-clamp-2">
                          {item}
                        </span>
                      </li>
                    ))}
                    {service.checklist.length > 3 && (
                      <li className="text-xs text-gray-500 pl-6">
                        +{service.checklist.length - 3} more benefits
                      </li>
                    )}
                  </ul>
                </div>

                {/* Divider */}
                <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-4 md:mb-6" />

                {/* Footer */}
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 sm:p-2 bg-blue-50 rounded-lg">
                      <DollarSign className="w-3 h-3 sm:w-4 sm:h-4 text-[#A7D3F3]" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Price Range</p>
                      <p className="font-semibold text-sm sm:text-base text-gray-900">
                        {service.priceRange}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="p-1.5 sm:p-2 bg-pink-50 rounded-lg">
                      <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-[#F7C6D3]" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Duration</p>
                      <p className="font-semibold text-sm sm:text-base text-gray-900">
                        {service.duration}
                      </p>
                    </div>
                  </div>

                  {/* View Details Button - Mobile only */}
                  <div className="sm:hidden ml-auto">
                    <div className="bg-gradient-to-r from-[#0095ff] to-[#ff7197] text-white px-3 py-1.5 rounded-lg text-xs font-medium">
                      View →
                    </div>
                  </div>
                </div>

                {/* View Details - Desktop only */}
                <div className="hidden sm:flex justify-center mt-4 md:mt-6">
                  <div className="
                    bg-gradient-to-r from-[#0095ff] to-[#ff7197]
                    text-white
                    px-4 sm:px-6 py-2 sm:py-2.5
                    rounded-lg sm:rounded-xl
                    text-sm sm:text-base
                    font-medium
                    hover:shadow-lg
                    transition-shadow
                    w-full text-center
                  ">
                    View Details
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>

        {/* Load More Button if many services */}
        {services.length > 6 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-8 md:mt-12"
          >
            <button className="
              border border-[#F7C6D3]
              text-[#F7C6D3]
              hover:bg-gradient-to-r hover:from-[#F7C6D3] hover:to-[#A7D3F3]
              hover:text-white
              px-6 py-3
              rounded-xl
              font-medium
              text-sm md:text-base
              transition-all duration-300
            ">
              View All {category} Services
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}