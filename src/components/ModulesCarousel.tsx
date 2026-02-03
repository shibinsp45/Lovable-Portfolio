import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const modules = [
  { name: "Design Systems", desktop: { x: "5%", y: "15%" }, mobile: { x: "5%", y: "5%" } },
  { name: "Product Design", desktop: { x: "28%", y: "8%" }, mobile: { x: "25%", y: "0%" } },
  { name: "User Experience Design", desktop: { x: "52%", y: "20%" }, mobile: { x: "15%", y: "18%" } },
  { name: "Visual Design", desktop: { x: "78%", y: "10%" }, mobile: { x: "55%", y: "8%" } },
  { name: "Interaction Design", desktop: { x: "8%", y: "65%" }, mobile: { x: "2%", y: "55%" } },
  { name: "Design Thinking", desktop: { x: "30%", y: "58%" }, mobile: { x: "28%", y: "48%" } },
  { name: "Prototyping", desktop: { x: "55%", y: "68%" }, mobile: { x: "35%", y: "65%" } },
  { name: "User Research", desktop: { x: "76%", y: "62%" }, mobile: { x: "55%", y: "55%" } },
];

const ModulesCarousel = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section className="py-8 md:py-16 bg-background overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div 
          ref={containerRef}
          className="relative w-full h-[180px] md:h-[250px]"
        >
          {modules.map((module, index) => {
            const pos = isMobile ? module.mobile : module.desktop;
            return (
              <motion.div
                key={module.name}
                className="absolute cursor-grab active:cursor-grabbing"
                style={{ left: pos.x, top: pos.y }}
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
                  className="px-3 md:px-5 py-1.5 md:py-2.5 rounded-full bg-transparent border border-border/60 
                            transition-all duration-300 hover:border-primary/40"
                >
                  <span className="text-muted-foreground font-normal text-[10px] md:text-sm whitespace-nowrap">
                    {module.name}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ModulesCarousel;
