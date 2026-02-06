import { motion, useMotionValue, useSpring } from "framer-motion";
import { useState } from "react";

const modules = [
  ["Design Systems", "Product Design", "User Research", "User Experience Design"],
  ["Interaction Design", "Design Thinking", "Visual Design", "Prototyping"],
];

const randomColors = [
  "from-rose-500 to-pink-600",
  "from-cyan-500 to-teal-600",
  "from-violet-500 to-purple-600",
  "from-amber-500 to-orange-600",
  "from-blue-500 to-indigo-600",
  "from-emerald-500 to-green-600",
  "from-fuchsia-500 to-pink-600",
  "from-red-500 to-rose-600",
];

const DraggableModule = ({ module, delay }: { module: string; delay: number }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const [active, setActive] = useState(false);
  const [colorClass, setColorClass] = useState("");
  
  const springX = useSpring(x, { stiffness: 30, damping: 12 });
  const springY = useSpring(y, { stiffness: 30, damping: 12 });

  const handleDragEnd = () => {
    x.set(0);
    y.set(0);
  };

  const handleClick = () => {
    if (active) {
      setActive(false);
    } else {
      const randomColor = randomColors[Math.floor(Math.random() * randomColors.length)];
      setColorClass(randomColor);
      setActive(true);
    }
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
      onClick={handleClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      whileDrag={{ scale: 1.1, zIndex: 50 }}
      className="cursor-grab active:cursor-grabbing"
    >
      <div
        className={`px-4 md:px-6 py-2 md:py-2.5 rounded-full border transition-all duration-300 ${
          active
            ? `bg-gradient-to-r ${colorClass} border-transparent shadow-lg`
            : "bg-transparent border-border/60 hover:border-primary/40"
        }`}
      >
        <span className={`font-normal text-xs md:text-sm whitespace-nowrap transition-colors duration-300 ${
          active ? "text-white" : "text-muted-foreground"
        }`}>
          {module}
        </span>
      </div>
    </motion.div>
  );
};

const ModulesCarousel = () => {
  return (
    <section className="relative py-8 md:py-16 bg-background">
      {/* Top Gradient Fade */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-background to-transparent pointer-events-none z-10" />
      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent pointer-events-none z-10" />
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
