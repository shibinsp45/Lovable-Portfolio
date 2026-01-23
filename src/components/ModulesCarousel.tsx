import { motion } from "framer-motion";
import { useState } from "react";

const modules = [
  { name: "Design Systems", initialX: -300, initialY: -80 },
  { name: "Product Design", initialX: 50, initialY: -120 },
  { name: "User Experience Design", initialX: 280, initialY: -60 },
  { name: "Visual Design", initialX: -200, initialY: 40 },
  { name: "Interaction Design", initialX: 120, initialY: 80 },
  { name: "Design Thinking", initialX: -80, initialY: 120 },
  { name: "Prototyping", initialX: 300, initialY: 60 },
  { name: "User Research", initialX: -350, initialY: 100 },
];

const ModulesCarousel = () => {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  return (
    <section className="py-24 bg-background overflow-hidden relative">
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

      {/* Free-drag Module Pills */}
      <div className="relative h-[300px] md:h-[350px] flex items-center justify-center">
        {modules.map((module, index) => {
          const isBeingDragged = draggedIndex === index;
          
          return (
            <motion.div
              key={module.name}
              className="absolute cursor-grab active:cursor-grabbing"
              initial={{ 
                opacity: 0, 
                scale: 0,
                x: 0,
                y: 0,
              }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                x: module.initialX,
                y: isBeingDragged ? module.initialY : module.initialY + Math.sin((index * 0.8)) * 8,
              }}
              transition={isBeingDragged ? {
                type: "spring",
                stiffness: 300,
                damping: 25,
              } : { 
                duration: 0.6, 
                delay: index * 0.1,
                type: "spring",
                stiffness: 100,
                y: {
                  duration: 2 + index * 0.3,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                }
              }}
              drag
              dragMomentum={false}
              dragElastic={0.1}
              dragSnapToOrigin={true}
              whileDrag={{ 
                scale: 1.1, 
                zIndex: 50,
                boxShadow: "0 0 40px hsl(220, 60%, 50%, 0.4)",
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onDragStart={() => setDraggedIndex(index)}
              onDragEnd={() => setDraggedIndex(null)}
              style={{ zIndex: isBeingDragged ? 50 : 10 - index }}
            >
              <div
                className="px-6 md:px-8 py-3 md:py-4 rounded-full bg-[hsl(220,60%,60%)]/20 backdrop-blur-md border border-[hsl(220,60%,50%)]/30 
                          hover:bg-[hsl(220,60%,50%)]/30 hover:border-[hsl(220,60%,50%)]/50 
                          transition-all duration-300
                          shadow-[0_0_20px_hsl(220,60%,50%,0.1)] hover:shadow-[0_0_30px_hsl(220,60%,50%,0.2)]
                          select-none"
              >
                <span className="text-[hsl(220,70%,60%)] font-medium text-sm md:text-base whitespace-nowrap">
                  {module.name}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Drag Hint */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8 }}
        className="text-center text-muted-foreground/50 text-sm mt-4"
      >
        Drag modules anywhere ✨
      </motion.p>
    </section>
  );
};

export default ModulesCarousel;
