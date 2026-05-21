import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Quote } from "lucide-react";
import { useRef, useState } from "react";
import adarshImg from "@/assets/adarsh.png";
import libinImg from "@/assets/libin.png";
import jestinImg from "@/assets/jestin.png";

const testimonials = [
  {
    quote:
      "Shibin's ability to create intuitive user experiences and solve complex problems with ease is commendable. His interpersonal skills foster collaboration, and he consistently brings energy and positivity to every project he undertakes.",
    name: "Dr.Libin P Oommen",
    role: "HOD at PRC",
    avatar: libinImg,
  },
  {
    quote:
      "I had the pleasure of working with Shibin. He is skilled with Figma and AI-based UI/UX design tools, and he collaborates seamlessly with dynamic teams. A strong designer with both creativity and adaptability.",
    name: "Adarsh Sharma",
    role: "CEO Nuren AI",
    avatar: adarshImg,
  },
  {
    quote:
      "Shibin is an outstanding individual who excels at problem-solving and brings a creative approach to every challenge. His design skills are second to none, and he has consistently demonstrated a knack for finding elegant solutions.",
    name: "Jestin Sabu",
    role: "Application Developer - IBM",
    avatar: jestinImg,
  },
];

// Scattered positions (percent based) — one per testimonial, no duplicates.
const scatter = [
  { left: "18%", top: "20%", size: 72, idx: 0 },
  { left: "48%", top: "8%", size: 80, idx: 1 },
  { left: "78%", top: "22%", size: 72, idx: 2 },
];

const Testimonials = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const titleY = useTransform(scrollYProgress, [0, 1], ["15%", "-15%"]);

  const current = testimonials[active];

  return (
    <section
      className="py-16 md:py-24 bg-background overflow-hidden relative"
      ref={containerRef}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div style={{ y: titleY }} className="text-center mb-10 md:mb-14">
          <motion.h2
            className="text-3xl md:text-5xl font-bold text-foreground mb-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{ fontFamily: "'Quicksand', sans-serif" }}
          >
            Recommendations
          </motion.h2>
          <motion.p
            className="text-muted-foreground text-lg max-w-md mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            I have helped many people to make designs for their product. Wanna be the next?
          </motion.p>
        </motion.div>

        {/* Scatter + quote */}
        <div className="relative max-w-5xl mx-auto">
          {/* Avatar scatter (desktop) */}
          <div className="relative hidden md:block h-[320px]">
            {scatter.map((pos, i) => {
              const t = testimonials[pos.idx];
              const isActive = pos.idx === active;
              return (
                <motion.button
                  key={i}
                  onClick={() => setActive(pos.idx)}
                  className="absolute focus:outline-none"
                  style={{ left: pos.left, top: pos.top }}
                  initial={{ opacity: 0, scale: 0.6, y: 20 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  whileHover={{ scale: 1.08, y: -4 }}
                >
                  <motion.img
                    src={t.avatar}
                    alt={t.name}
                    style={{ width: pos.size, height: pos.size }}
                    animate={{
                      y: [0, -6, 0],
                    }}
                    transition={{
                      duration: 4 + (i % 3),
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.2,
                    }}
                    className={`rounded-[22%] object-cover shadow-lg transition-all duration-300 ${
                      isActive
                        ? "ring-4 ring-primary/60 shadow-2xl"
                        : "ring-1 ring-border/40 opacity-80 hover:opacity-100"
                    }`}
                  />
                </motion.button>
              );
            })}
          </div>

          {/* Mobile: simple row of avatars */}
          <div className="md:hidden flex flex-wrap justify-center gap-4 mb-8">
            {testimonials.map((t, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className="focus:outline-none"
              >
                <img
                  src={t.avatar}
                  alt={t.name}
                  className={`w-14 h-14 rounded-[22%] object-cover shadow-md transition-all ${
                    active === i
                      ? "ring-4 ring-primary/60"
                      : "ring-1 ring-border/40 opacity-70"
                  }`}
                />
              </button>
            ))}
          </div>

          {/* Active quote */}
          <div className="md:absolute md:inset-x-0 md:top-1/2 md:-translate-y-1/2 md:pointer-events-none">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.4 }}
                className="mx-auto max-w-sm text-center bg-card/70 backdrop-blur-xl border border-border/40 rounded-2xl p-4 md:p-5 shadow-lg pointer-events-auto"
              >
                <Quote className="w-5 h-5 text-primary/40 mx-auto mb-2" />
                <p
                  className="text-xs md:text-sm text-foreground/90 leading-relaxed mb-3"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  "{current.quote}"
                </p>
                <h3
                  className="text-xs font-semibold text-foreground"
                  style={{ fontFamily: "'Quicksand', sans-serif" }}
                >
                  {current.name}
                </h3>
                <span className="text-[10px] text-muted-foreground">{current.role}</span>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
