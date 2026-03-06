import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { useState } from "react";

const modules = [
  ["Design Systems", "Product Design", "User Research", "User Experience Design"],
  ["Interaction Design", "Design Thinking", "Visual Design", "Prototyping"],
];

const moduleGradients: Record<string, string> = {
  "Design Systems": "from-rose-500/80 via-pink-600/70 to-fuchsia-700/80",
  "Product Design": "from-cyan-500/80 via-teal-600/70 to-emerald-700/80",
  "User Research": "from-violet-500/80 via-purple-600/70 to-indigo-700/80",
  "User Experience Design": "from-amber-500/80 via-orange-600/70 to-red-700/80",
  "Interaction Design": "from-blue-500/80 via-indigo-600/70 to-purple-700/80",
  "Design Thinking": "from-emerald-500/80 via-green-600/70 to-teal-700/80",
  "Visual Design": "from-fuchsia-500/80 via-pink-600/70 to-rose-700/80",
  "Prototyping": "from-red-500/80 via-rose-600/70 to-pink-700/80",
};

const DraggableModule = ({
  module,
  delay,
  isActive,
  onSelect,
}: {
  module: string;
  delay: number;
  isActive: boolean;
  onSelect: () => void;
}) => {
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
      onClick={onSelect}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      whileDrag={{ scale: 1.1, zIndex: 50 }}
      className="cursor-grab active:cursor-grabbing"
    >
      <div
        className={`px-4 md:px-6 py-2 md:py-2.5 rounded-full border transition-all duration-300 ${
          isActive
            ? "bg-white/20 border-white/40 shadow-lg"
            : "bg-transparent border-border/60 hover:border-primary/40"
        }`}
      >
        <span
          className={`font-normal text-xs md:text-sm whitespace-nowrap transition-colors duration-300 ${
            isActive ? "text-white font-medium" : "text-muted-foreground"
          }`}
        >
          {module}
        </span>
      </div>
    </motion.div>
  );
};

const ModulesCarousel = () => {
  const [activeModule, setActiveModule] = useState<string | null>(null);
  const activeGradient = activeModule ? moduleGradients[activeModule] : null;

  return (
    <section className="relative py-10 md:py-16 overflow-hidden">
      {/* Dynamic Background */}
      <AnimatePresence mode="wait">
        {activeGradient ? (
          <motion.div
            key={activeModule}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className={`absolute inset-0 bg-gradient-to-br ${activeGradient}`}
          />
        ) : (
          <motion.div
            key="default"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-background"
          />
        )}
      </AnimatePresence>

      {/* Gradient Fades */}
      <div className="absolute top-0 left-0 right-0 h-24 md:h-32 bg-gradient-to-b from-background via-background/50 to-transparent pointer-events-none z-10" />
      <div className="absolute bottom-0 left-0 right-0 h-24 md:h-32 bg-gradient-to-t from-background via-background/50 to-transparent pointer-events-none z-10" />

      <div className="relative z-[5] container mx-auto px-4 sm:px-6 lg:px-8">
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
                  isActive={activeModule === module}
                  onSelect={() =>
                    setActiveModule((prev) => (prev === module ? null : module))
                  }
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
