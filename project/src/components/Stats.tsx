import { Stethoscope, Users, Smile } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const stats = [
  {
    value: 7,
    suffix: "+",
    label: "Years Of Experience",
    icon: Stethoscope,
  },
  {
    value: 5000,
    suffix: "+",
    label: "Patients Treated",
    icon: Users,
  },
  {
    value: 95,
    suffix: "%",
    label: "Happy Patients",
    icon: Smile,
  },
];

export default function Stats() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [counts, setCounts] = useState(stats.map(() => 0));

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          animateCounts();
          setHasAnimated(true);
        }
      },
      { threshold: 0.4 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [hasAnimated]);

  const animateCounts = () => {
    stats.forEach((stat, index) => {
      const duration = 1500;
      const startTime = performance.now();

      const update = (currentTime: number) => {
        const progress = Math.min(
          (currentTime - startTime) / duration,
          1
        );

        setCounts((prev) => {
          const updated = [...prev];
          updated[index] = Math.floor(progress * stat.value);
          return updated;
        });

        if (progress < 1) requestAnimationFrame(update);
      };

      requestAnimationFrame(update);
    });
  };

  return (
    <section
      ref={sectionRef}
      className="
        relative w-full
        py-6 sm:py-10 md:py-16
        overflow-hidden
      "
    >
      {/* BACKGROUND IMAGE */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1580281657521-6f0c5b11d6b9?auto=format&fit=crop&w=1600&q=80')",
        }}
      />

      {/* GRADIENT OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0095ff]/85 via-[#0b1324]/85 to-[#ff7197]/85" />

      {/* CONTENT */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div
          className="
            grid grid-cols-1
            sm:grid-cols-3
            gap-6 sm:gap-8 md:gap-12
            text-white text-center
          "
        >
          {stats.map((stat, index) => (
            <div
              key={index}
              className="flex flex-col items-center gap-2 sm:gap-4"
            >
              {/* ICON */}
              <div
                className="
                  w-10 h-10
                  sm:w-14 sm:h-14
                  md:w-16 md:h-16
                  rounded-full
                  bg-white/95
                  flex items-center justify-center
                  shadow-lg
                "
              >
                <stat.icon
                  className="
                    w-5 h-5
                    sm:w-7 sm:h-7
                    md:w-8 md:h-8
                    text-[#0095ff]
                  "
                />
              </div>

              {/* NUMBER */}
              <p
                className="
                  text-2xl
                  sm:text-4xl
                  md:text-5xl
                  font-extrabold
                  tracking-tight
                  leading-none
                  font-heading
                "
              >
                {counts[index]}
                {stat.suffix}
              </p>

              {/* LABEL */}
              <p
                className="
                  text-[11px]
                  sm:text-sm
                  md:text-base
                  text-white/80
                  max-w-[160px]
                  font-heading
                "
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
