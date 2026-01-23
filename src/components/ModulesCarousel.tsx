import { motion } from "framer-motion";
import { useRef, useState } from "react";

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

// Initial positions for modules - spread across the container
const getInitialPositions = () => [
  { x: 50, y: 20 },
  { x: 280, y: 60 },
  { x: 520, y: 25 },
  { x: 750, y: 70 },
  { x: 120, y: 120 },
  { x: 380, y: 140 },
  { x: 620, y: 110 },
  { x: 850, y: 150 },
];

const ModulesCarousel = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [positions] = useState(getInitialPositions);

  return (
    <section className="py-16 bg-background overflow-hidden relative">
      {/* Container for draggable modules */}
      <div 
        ref={containerRef}
        className="container mx-auto px-6 relative h-[220px] md:h-[200px]"
      >
        {modules.map((module, index) => (
          <motion.div
            key={module}
            className="absolute cursor-grab active:cursor-grabbing"
            initial={{ 
              x: positions[index]?.x || index * 120, 
              y: positions[index]?.y || 50,
              opacity: 0,
              scale: 0.8
            }}
            animate={{ 
              opacity: 1,
              scale: 1
            }}
            transition={{ 
              duration: 0.5, 
              delay: index * 0.08,
              type: "spring",
              stiffness: 100
            }}
            drag
            dragMomentum={false}
            dragElastic={0.1}
            dragConstraints={containerRef}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            whileDrag={{ scale: 1.1, zIndex: 50 }}
          >
            <div
              className="px-6 md:px-8 py-3 md:py-4 rounded-full bg-transparent border border-border/60 
                        transition-all duration-300"
            >
              <span className="text-muted-foreground font-normal text-sm md:text-base whitespace-nowrap">
                {module}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Drag Hint */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8 }}
        className="text-center text-muted-foreground/50 text-sm mt-4"
      >
        ← Drag modules anywhere →
      </motion.p>
    </section>
  );
};

export default ModulesCarousel;
