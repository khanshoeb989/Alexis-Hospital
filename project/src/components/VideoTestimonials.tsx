import { useRef, useState } from "react";
import { Play } from "lucide-react";
import { motion } from "framer-motion";

interface VideoTestimonial {
  id: string;
  name: string;
  role: string;
  videoSrc: string;
  poster: string;
}

const videos: VideoTestimonial[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    role: "Cosmetology Patient",
    videoSrc: "/videos/testimonial-1.mp4",
    poster: "/images/testimonials/thumb-1.jpg",
  },
  {
    id: "2",
    name: "Michael Chen",
    role: "Medical Patient",
    videoSrc: "/videos/testimonial-2.mp4",
    poster: "/images/testimonials/thumb-2.jpg",
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    role: "Laser Treatment Patient",
    videoSrc: "/videos/testimonial-3.mp4",
    poster: "/images/testimonials/thumb-3.jpg",
  },
];

export default function VideoTestimonials() {
  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});
  const [playingId, setPlayingId] = useState<string | null>(null);

  const handlePlay = (id: string) => {
    Object.values(videoRefs.current).forEach((video) => {
      if (video && !video.paused) video.pause();
    });

    const selected = videoRefs.current[id];
    if (selected) {
      selected.play();
      setPlayingId(id);
    }
  };

  return (
    <section className="relative py-8 md:py-12 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#0b1324] font-heading">
            Patient{" "}
            <span className="bg-gradient-to-r from-[#0095ff] to-[#ff7197] bg-clip-text text-transparent">
              Video Testimonials
            </span>
          </h2>
          <p className="mt-2 text-sm md:text-base text-gray-600 font-body">
            Real stories. Real experiences. Trusted care.
          </p>
        </motion.div>

        {/* VIDEO GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.12 }}
              className="
                bg-white rounded-2xl overflow-hidden
                shadow-md hover:shadow-xl transition
              "
            >
              {/* VIDEO */}
              <div className="relative group">
                <video
                  ref={(el) => (videoRefs.current[item.id] = el)}
                  src={item.videoSrc}
                  poster={item.poster}
                  controls={playingId === item.id}
                  className="w-full h-48 sm:h-52 object-cover"
                  onEnded={() => setPlayingId(null)}
                />

                {playingId !== item.id && (
                  <button
                    onClick={() => handlePlay(item.id)}
                    className="
                      absolute inset-0
                      flex items-center justify-center
                      bg-black/30 group-hover:bg-black/40
                      transition
                    "
                  >
                    <div
                      className="
                        w-12 h-12
                        bg-white
                        rounded-full
                        flex items-center justify-center
                        shadow-lg
                      "
                    >
                      <Play className="w-5 h-5 text-[#0095ff] ml-0.5" />
                    </div>
                  </button>
                )}
              </div>

              {/* INFO */}
              <div className="px-5 py-4">
                <p className="font-semibold text-[#0b1324] text-base font-heading">
                  {item.name}
                </p>
                <p className="text-xs text-gray-500 font-body">
                  {item.role}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
