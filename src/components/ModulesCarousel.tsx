import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const modules = [
  "Design Systems",
  "Product Design",
  "User Experience Design",
  "Visual Design",
  "Interaction Design",
  "Design Thinking",
  "Prototyping",
  "User Research",
];

const ModulesCarousel = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [contentWidth, setContentWidth] = useState(0);
  const x = useMotionValue(0);

  useEffect(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.offsetWidth);
      setContentWidth(containerRef.current.scrollWidth);
    }
  }, []);

  const dragConstraints = {
    left: -(contentWidth - containerWidth),
    right: 0,
  };

  return (
    <section className="py-16 bg-background overflow-hidden relative">
      {/* Glassmorphism background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-[hsl(280,60%,50%)]/5 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 mb-8">
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-2xl md:text-3xl text-center text-muted-foreground/80 font-normal"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          My Expertise
        </motion.h3>
      </div>

      {/* Draggable Carousel */}
      <motion.div
        ref={containerRef}
        className="cursor-grab active:cursor-grabbing overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <motion.div
          className="flex gap-4 md:gap-6 px-6 py-4"
          drag="x"
          dragConstraints={dragConstraints}
          dragElastic={0.1}
          dragTransition={{ bounceStiffness: 300, bounceDamping: 30 }}
          style={{ x }}
        >
          {[...modules, ...modules].map((module, index) => (
            <motion.div
              key={`${module}-${index}`}
              className="flex-shrink-0"
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <div
                className="px-6 md:px-8 py-3 md:py-4 rounded-full bg-[hsl(220,60%,60%)]/20 backdrop-blur-md border border-[hsl(220,60%,50%)]/30 
                          hover:bg-[hsl(220,60%,50%)]/30 hover:border-[hsl(220,60%,50%)]/50 
                          transition-all duration-300 cursor-pointer
                          shadow-[0_0_20px_hsl(220,60%,50%,0.1)] hover:shadow-[0_0_30px_hsl(220,60%,50%,0.2)]"
              >
                <span className="text-[hsl(220,70%,60%)] font-medium text-sm md:text-base whitespace-nowrap">
                  {module}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Drag Hint */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        className="text-center text-muted-foreground/50 text-sm mt-4"
      >
        ← Drag to explore →
      </motion.p>
    </section>
  );
};

export default ModulesCarousel;
