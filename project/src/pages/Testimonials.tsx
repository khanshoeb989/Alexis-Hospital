import { Quote, Star } from "lucide-react";
import { motion } from "framer-motion";
import TestimonialsBanner from "../components/TestimonialsBanner";

interface Testimonial {
  name: string;
  message: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    name: "Poonam Nair",
    rating: 5,
    message:
      "One of the finest hospitals in Bhiwandi. Dr. Ganesh is extremely compassionate and explains everything clearly. My elderly father has been under his care for more than a year, and the treatment approach has been excellent. Highly recommended.",
  },
  {
    name: "Sonali Pathak",
    rating: 5,
    message:
      "Doctors here are very caring and experienced. I am undergoing treatment for SLE, and I have seen remarkable improvement. The nursing staff is polite and handles patients very gently. The hospital is clean and well managed.",
  },
  {
    name: "Ramesh Patil",
    rating: 5,
    message:
      "I visited Alexis Hospital for general medical treatment. The doctor listened patiently and explained medicines properly. Staff behaviour was good and the overall experience was very satisfactory.",
  },
  {
    name: "Shabana Khan",
    rating: 5,
    message:
      "My mother was admitted for treatment and received excellent care. Doctors and nurses were very supportive and respectful. We felt confident and reassured throughout the treatment.",
  },
];

export default function Testimonials() {
  return (
    <section
      className="
        relative
        py-10 sm:py-14 md:py-16
        bg-gradient-to-br from-[#A7D3F3]/10 via-white to-[#F7C6D3]/10
        overflow-hidden
      "
    >
      {/* Soft background texture */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5f0ff_1px,transparent_1px)] [background-size:22px_22px] opacity-30" />

      <TestimonialsBanner />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12"
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0b1324]">
            What Our{" "}
            <span className="bg-gradient-to-r from-[#0095ff] to-[#ff7197] bg-clip-text text-transparent">
              Patients Say
            </span>
          </h1>
          <p className="mt-3 text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
            Trusted by patients across Bhiwandi for compassionate care,
            advanced treatment, and professional medical support.
          </p>
        </motion.div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {testimonials.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="
                relative
                bg-white
                rounded-2xl
                shadow-lg
                p-6 sm:p-8
                border border-gray-100
              "
            >
              {/* Quote icon */}
              <div
                className="
                  absolute
                  -top-5 left-6
                  w-10 h-10
                  rounded-full
                  bg-gradient-to-br from-[#0095ff] to-[#ff7197]
                  flex items-center justify-center
                  shadow-md
                "
              >
                <Quote className="w-5 h-5 text-white" />
              </div>

              {/* Message */}
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed mt-4">
                “{item.message}”
              </p>

              {/* Footer */}
              <div className="mt-6 flex items-center justify-between">
                <p className="font-semibold text-[#0b1324] text-sm sm:text-base">
                  {item.name}
                </p>

                <div className="flex gap-1">
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-orange-400 text-orange-400"
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
