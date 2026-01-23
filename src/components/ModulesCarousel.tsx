import { motion } from "framer-motion";
import { useRef } from "react";

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

// Fixed positions for a contained layout
const getPositions = () => [
  { x: 20, y: 20 },
  { x: 180, y: 25 },
  { x: 40, y: 80 },
  { x: 220, y: 85 },
  { x: 20, y: 140 },
  { x: 190, y: 145 },
  { x: 50, y: 200 },
  { x: 200, y: 205 },
];

const ModulesCarousel = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const positions = getPositions();

  return (
    <section className="py-8 md:py-16 bg-background overflow-hidden relative">
      <div className="container mx-auto px-4 md:px-6 flex flex-col items-center">
        {/* Bounded container for modules */}
        <div 
          ref={containerRef}
          className="relative w-full max-w-[380px] h-[300px] border border-border/30 rounded-2xl bg-card/5"
        >
          {modules.map((module, index) => (
            <motion.div
              key={module}
              className="absolute cursor-grab active:cursor-grabbing"
              initial={{ 
                x: positions[index]?.x || 20, 
                y: positions[index]?.y || index * 50,
                opacity: 0,
                scale: 0.8
              }}
              animate={{ 
                x: positions[index]?.x || 20,
                y: positions[index]?.y || index * 50,
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
              whileTap={{ 
                scale: [1, 0.9, 1.1, 0.95, 1],
                transition: { duration: 0.3 }
              }}
              whileDrag={{ scale: 1.1, zIndex: 50 }}
            >
              <div
                className="px-4 md:px-5 py-2 md:py-2.5 rounded-full bg-transparent border border-border/60 
                          transition-all duration-300"
              >
                <span className="text-muted-foreground font-normal text-xs md:text-sm whitespace-nowrap">
                  {module}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Hint Text */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="text-center text-muted-foreground/50 text-xs md:text-sm mt-6"
        >
          Interact with my skills
        </motion.p>
      </div>
    </section>
  );
};

export default ModulesCarousel;
