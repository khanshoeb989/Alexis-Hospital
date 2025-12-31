import { Phone, Mail, MapPin, Facebook, Instagram, Twitter } from "lucide-react";
import { motion } from "framer-motion";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-[#A7D3F3]/10 via-white to-[#F7C6D3]/10 pt-16 pb-8 font-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ================= MAIN GRID ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">

          {/* MAP */}
          <div className="rounded-3xl overflow-hidden shadow-lg aspect-video">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3765.3388662818693!2d73.06689187467084!3d19.311096444551016!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7bdb6c23e2777%3A0x179da9d8a75fcee6!2sAlexis%20Hospital%20%26%20Critical%20Care%20Centre!5e0!3m2!1sen!2sin!4v1766237546240"
              className="w-full h-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Alexis Hospital Location"
            />
          </div>

          {/* CONTACT INFO */}
          <div className="flex flex-col justify-center">
            <h3 className="text-2xl font-bold text-[#0b1324] mb-4">
              Alexis Hospital & Critical Care
            </h3>

            <p className="text-gray-600 mb-6 max-w-md">
              Advanced healthcare and premium cosmetology services — trusted care
              under one roof.
            </p>

            <ul className="space-y-4 text-gray-700">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#0095ff]" />
                <span>
                  GROUND FLOOR, GULISTAN APARTMENT, near SHANDAR MARKET, Vanjar Patti Naka, Avachit Pada, Bhiwandi, Maharashtra 421302
                </span>
              </li>

              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#0095ff]" />
                <span>+91 9699933358</span>
              </li>

              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#0095ff]" />
                <span>alexishospitalbhiwandi@gmail.com</span>
              </li>
            </ul>

            {/* SOCIALS */}
            <div className="flex gap-4 mt-6">
              {[Facebook, Instagram, Twitter].map((Icon, index) => (
                <motion.a
                  key={index}
                  href="#"
                  whileHover={{ scale: 1.15 }}
                  className="bg-gradient-to-br from-[#0095ff] to-[#ff7197] p-2 rounded-full shadow-md"
                >
                  <Icon className="w-4 h-4 text-white" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* ================= BOTTOM BAR ================= */}
        <div className="border-t border-gray-200 pt-6 text-center">
          <p className="text-sm text-gray-600">
            © {currentYear} Alexis Hospital. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
