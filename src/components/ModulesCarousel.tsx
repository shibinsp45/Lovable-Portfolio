import { motion, useMotionValue, useSpring, useScroll, useTransform } from "framer-motion";
import { useState, useRef } from "react";

const modules = [
  ["Design Systems", "Product Design", "User Research", "User Experience Design"],
  ["Interaction Design", "Design Thinking", "Visual Design", "Prototyping"],
];

const moduleGlows: Record<string, { border: string; glow: string; bg: string }> = {
  "Design Systems": { border: "border-rose-400/40", glow: "shadow-rose-500/20", bg: "from-rose-500/15 to-pink-500/10" },
  "Product Design": { border: "border-cyan-400/40", glow: "shadow-cyan-500/20", bg: "from-cyan-500/15 to-teal-500/10" },
  "User Research": { border: "border-violet-400/40", glow: "shadow-violet-500/20", bg: "from-violet-500/15 to-purple-500/10" },
  "User Experience Design": { border: "border-amber-400/40", glow: "shadow-amber-500/20", bg: "from-amber-500/15 to-orange-500/10" },
  "Interaction Design": { border: "border-blue-400/40", glow: "shadow-blue-500/20", bg: "from-blue-500/15 to-indigo-500/10" },
  "Design Thinking": { border: "border-emerald-400/40", glow: "shadow-emerald-500/20", bg: "from-emerald-500/15 to-green-500/10" },
  "Visual Design": { border: "border-fuchsia-400/40", glow: "shadow-fuchsia-500/20", bg: "from-fuchsia-500/15 to-pink-500/10" },
  "Prototyping": { border: "border-red-400/40", glow: "shadow-red-500/20", bg: "from-red-500/15 to-rose-500/10" },
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
  const [isHovered, setIsHovered] = useState(false);

  const glowStyle = moduleGlows[module];

  const handleDragEnd = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      style={{ x: springX, y: springY }}
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
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
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.08, y: -3 }}
      whileTap={{ scale: 0.95 }}
      whileDrag={{ scale: 1.12, zIndex: 50 }}
      className="cursor-grab active:cursor-grabbing"
    >
      <div
        className={`relative px-5 md:px-7 py-2.5 md:py-3 rounded-full border backdrop-blur-2xl transition-all duration-500 overflow-hidden ${
          isActive
            ? `${glowStyle.border} shadow-lg ${glowStyle.glow} bg-gradient-to-r ${glowStyle.bg}`
            : isHovered
              ? "border-border/50 bg-card/40 shadow-md shadow-primary/5"
              : "border-border/30 bg-card/20"
        }`}
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-b from-foreground/[0.06] via-transparent to-transparent pointer-events-none" />
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-foreground/[0.03] to-foreground/[0.08] pointer-events-none" />
        
        <span
          className={`relative z-10 font-normal text-xs md:text-sm whitespace-nowrap transition-colors duration-300 ${
            isActive ? "text-foreground font-medium" : "text-muted-foreground"
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
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgGlowY = useTransform(scrollYProgress, [0, 1], ["30%", "-30%"]);
  const chipsY = useTransform(scrollYProgress, [0, 1], ["15%", "-15%"]);

  return (
    <section ref={sectionRef} className="relative py-10 md:py-16 overflow-hidden">
      {/* Parallax ambient glow */}
      <motion.div className="absolute inset-0 -z-10" style={{ y: bgGlowY }}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[200px] bg-primary/5 rounded-full blur-[120px]" />
      </motion.div>

      {/* Gradient Fades */}
      <div className="absolute top-0 left-0 right-0 h-24 md:h-32 bg-gradient-to-b from-background via-background/50 to-transparent pointer-events-none z-10" />
      <div className="absolute bottom-0 left-0 right-0 h-24 md:h-32 bg-gradient-to-t from-background via-background/50 to-transparent pointer-events-none z-10" />

      <motion.div style={{ y: chipsY }} className="relative z-[5] container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-4 md:gap-5">
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
      </motion.div>
    </section>
  );
};

export default ModulesCarousel;
