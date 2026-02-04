import { motion, useMotionValue, useSpring } from "framer-motion";

const modules = [
  // Row 1
  ["Design Systems", "Product Design", "User Research", "User Experience Design"],
  // Row 2
  ["Interaction Design", "Design Thinking", "Visual Design", "Prototyping"],
];

const DraggableModule = ({ module, delay }: { module: string; delay: number }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springX = useSpring(x, { stiffness: 30, damping: 12 });
  const springY = useSpring(y, { stiffness: 30, damping: 12 });

  const handleDragEnd = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      style={{ x: springX, y: springY }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      drag
      dragMomentum={false}
      dragElastic={0.8}
      onDrag={(_, info) => {
        x.set(info.offset.x);
        y.set(info.offset.y);
      }}
      onDragEnd={handleDragEnd}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      whileDrag={{ scale: 1.1, zIndex: 50 }}
      className="cursor-grab active:cursor-grabbing"
    >
      <div
        className="px-4 md:px-6 py-2 md:py-2.5 rounded-full bg-transparent border border-border/60 
                  transition-all duration-300 hover:border-primary/40"
      >
        <span className="text-muted-foreground font-normal text-xs md:text-sm whitespace-nowrap">
          {module}
        </span>
      </div>
    </motion.div>
  );
};

const ModulesCarousel = () => {
  return (
    <section className="py-8 md:py-16 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center gap-4 md:gap-6">
          {modules.map((row, rowIndex) => (
            <div 
              key={rowIndex} 
              className="flex flex-wrap justify-center gap-3 md:gap-4"
            >
              {row.map((module, index) => (
                <DraggableModule 
                  key={module} 
                  module={module} 
                  delay={(rowIndex * 4 + index) * 0.08} 
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ModulesCarousel;
