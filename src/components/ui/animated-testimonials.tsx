import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";

export type AnimatedTestimonial = {
  quote: string;
  name: string;
  designation: string;
  src: string;
};

export const AnimatedTestimonials = ({
  testimonials,
  autoplay = true,
}: {
  testimonials: AnimatedTestimonial[];
  autoplay?: boolean;
}) => {
  const [active, setActive] = useState(0);

  const handleNext = React.useCallback(() => {
    setActive((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    if (!autoplay) return;
    const interval = setInterval(handleNext, 5000);
    return () => clearInterval(interval);
  }, [autoplay, handleNext]);

  const isActive = (index: number) => index === active;

  const rotations = React.useMemo(
    () => testimonials.map(() => `${Math.floor(Math.random() * 16) - 8}deg`),
    [testimonials]
  );

  return (
    <div className="mx-auto max-w-sm md:max-w-4xl px-4 md:px-8 lg:px-12 py-10">
      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
        {/* Image stack */}
        <div>
          <div className="relative h-72 w-72 md:h-96 md:w-96 mx-auto">
            <AnimatePresence>
              {testimonials.map((t, index) => (
                <motion.div
                  key={t.src + index}
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                    z: -100,
                    rotate: rotations[index],
                  }}
                  animate={{
                    opacity: isActive(index) ? 1 : 0.7,
                    scale: isActive(index) ? 1 : 0.95,
                    z: isActive(index) ? 0 : -100,
                    rotate: isActive(index) ? "0deg" : rotations[index],
                    zIndex: isActive(index) ? 40 : testimonials.length + 2 - index,
                    y: isActive(index) ? [0, -40, 0] : 0,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.9,
                    z: 100,
                    rotate: rotations[index],
                  }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="absolute inset-0 origin-bottom"
                >
                  <img
                    src={t.src}
                    alt={t.name}
                    draggable={false}
                    className="h-full w-full rounded-full object-cover object-center"
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>


        {/* Text + controls */}
        <div className="flex flex-col justify-between py-4">
          <motion.div
            key={active}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            <h3
              className="text-2xl font-bold text-foreground"
              style={{ fontFamily: "'Quicksand', sans-serif" }}
            >
              {testimonials[active].name}
            </h3>
            <p className="text-sm text-muted-foreground">
              {testimonials[active].designation}
            </p>
            <motion.p
              className="mt-6 text-base md:text-lg text-foreground/90 leading-relaxed"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              {testimonials[active].quote.split(" ").map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ filter: "blur(10px)", opacity: 0, y: 5 }}
                  animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.2,
                    ease: "easeInOut",
                    delay: 0.02 * i,
                  }}
                  className="inline-block"
                >
                  {word}&nbsp;
                </motion.span>
              ))}
            </motion.p>
          </motion.div>

          <div className="flex gap-4 pt-8 md:pt-0">
            <button
              onClick={handlePrev}
              aria-label="Previous testimonial"
              className="group flex h-9 w-9 items-center justify-center rounded-full bg-card/70 border border-border/40 backdrop-blur hover:bg-primary/20 transition-colors"
            >
              <ArrowLeft className="h-5 w-5 text-foreground transition-transform duration-300 group-hover:-translate-x-0.5" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next testimonial"
              className="group flex h-9 w-9 items-center justify-center rounded-full bg-card/70 border border-border/40 backdrop-blur hover:bg-primary/20 transition-colors"
            >
              <ArrowRight className="h-5 w-5 text-foreground transition-transform duration-300 group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
