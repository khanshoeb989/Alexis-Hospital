import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import ServiceCards from "../components/ServiceCards";

type Category = "Medical" | "Cosmetology";

export default function Services() {
  const [activeTab, setActiveTab] = useState<Category>("Medical");

  return (
    <div className="min-h-screen bg-white pt-20">
      {/* HERO */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative py-24 px-4 sm:px-6 lg:px-8
                   bg-gradient-to-br from-[#A7D3F3]/20 via-white to-[#F7C6D3]/20"
      >
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-6xl font-bold text-gray-800 mb-6"
          >
            Our{" "}
            <span className="bg-gradient-to-r from-[#A7D3F3] to-[#F7C6D3]
                             bg-clip-text text-transparent">
              Services
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Comprehensive healthcare and premium cosmetology services tailored to
            your unique needs.
          </motion.p>
        </div>
      </motion.section>

      {/* TOGGLE */}
      <section className="py-12">
        <div className="flex justify-center">
          <div
            className="relative flex items-center rounded-full p-2
                       bg-gradient-to-r from-[#F5EAD7]/60 to-[#F5EAD7]/40
                       shadow-inner"
          >
            {/* Sliding pill */}
            <motion.div
              layout
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className={`absolute top-2 bottom-2 w-1/2 rounded-full shadow-lg
                ${
                  activeTab === "Medical"
                    ? "left-2 bg-gradient-to-r from-[#A7D3F3] to-[#BFDFF7]"
                    : "left-[calc(50%+0.5rem)] bg-gradient-to-r from-[#F7C6D3] to-[#FAD3DF]"
                }`}
            />

            {/* Buttons */}
            <button
              onClick={() => setActiveTab("Medical")}
              className={`relative z-10 px-10 py-4 rounded-full font-semibold
                transition-colors
                ${activeTab === "Medical" ? "text-white" : "text-gray-800"}`}
            >
              Medical Services
            </button>

            <button
              onClick={() => setActiveTab("Cosmetology")}
              className={`relative z-10 px-10 py-4 rounded-full font-semibold
                transition-colors
                ${activeTab === "Cosmetology" ? "text-white" : "text-gray-800"}`}
            >
              Cosmetology Services
            </button>
          </div>
        </div>
      </section>

      {/* SERVICES (DYNAMIC) */}
      <motion.section
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <ServiceCards category={activeTab} />
      </motion.section>

      {/* CTA ONLY FOR COSMETOLOGY */}
      {activeTab === "Cosmetology" && (
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="py-20 px-4 sm:px-6 lg:px-8
                     bg-gradient-to-br from-[#F5EAD7]/30 to-white"
        >
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Want Detailed Cosmetology Insights?
            </h2>
            <p className="text-gray-600 text-lg mb-8">
              Explore before & after results, procedures, and detailed treatment
              explanations.
            </p>

            <Link to="/services/cosmetology">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-[#A7D3F3] to-[#F7C6D3]
                           text-white px-10 py-4 rounded-full
                           font-semibold shadow-xl"
              >
                View Detailed Page
              </motion.button>
            </Link>
          </div>
        </motion.section>
      )}
    </div>
  );
}
