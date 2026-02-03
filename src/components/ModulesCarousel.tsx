import { motion } from "framer-motion";
import { useRef } from "react";

const modules = [
  { name: "Design Systems", x: "5%", y: "15%" },
  { name: "Product Design", x: "28%", y: "8%" },
  { name: "User Experience Design", x: "52%", y: "20%" },
  { name: "Visual Design", x: "78%", y: "10%" },
  { name: "Interaction Design", x: "8%", y: "65%" },
  { name: "Design Thinking", x: "30%", y: "58%" },
  { name: "Prototyping", x: "55%", y: "68%" },
  { name: "User Research", x: "76%", y: "62%" },
];

const ModulesCarousel = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section className="py-16 md:py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div 
          ref={containerRef}
          className="relative w-full h-[200px] md:h-[250px]"
        >
          {modules.map((module, index) => (
            <motion.div
              key={module.name}
              className="absolute cursor-grab active:cursor-grabbing"
              style={{ left: module.x, top: module.y }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
              }}
              transition={{ 
                opacity: { duration: 0.5, delay: index * 0.1 },
                scale: { duration: 0.5, delay: index * 0.1 },
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
                className="px-4 md:px-5 py-2 md:py-2.5 rounded-full bg-transparent border border-border/60 
                          transition-all duration-300 hover:border-primary/40"
              >
                <span className="text-muted-foreground font-normal text-xs md:text-sm whitespace-nowrap">
                  {module.name}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ModulesCarousel;
