import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";

const skills = [
  { label: "Design Systems", x: -35, y: -38 },
  { label: "Gamification", x: -8, y: -45 },
  { label: "Experience Design", x: 25, y: -40 },
  { label: "Design Research", x: -42, y: -15 },
  { label: "User Interface Design", x: 38, y: -12 },
  { label: "Prototyping", x: -38, y: 18 },
  { label: "Branding", x: 35, y: 15 },
  { label: "Game UI/UX", x: -12, y: 38 },
  { label: "Visual Design", x: 20, y: 35 },
];

const DraggableChip = ({
  label,
  x,
  y,
  index,
}: {
  label: string;
  x: number;
  y: number;
  index: number;
}) => {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const springX = useSpring(mx, { stiffness: 30, damping: 12 });
  const springY = useSpring(my, { stiffness: 30, damping: 12 });

  const handleDragEnd = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.div
      style={{
        x: springX,
        y: springY,
        left: `calc(50% + ${x}%)`,
        top: `calc(50% + ${y}%)`,
        translateX: "-50%",
        translateY: "-50%",
      }}
      className="absolute cursor-grab active:cursor-grabbing z-10"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.06,
        type: "spring",
        stiffness: 200,
        damping: 20,
      }}
      drag
      dragMomentum={false}
      dragElastic={0.8}
      onDrag={(_, info) => {
        mx.set(info.offset.x);
        my.set(info.offset.y);
      }}
      onDragEnd={handleDragEnd}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      whileDrag={{ scale: 1.12, zIndex: 50 }}
    >
      <div className="px-5 md:px-7 py-2.5 md:py-3 rounded-full bg-[hsl(var(--primary)/0.12)] text-[hsl(var(--primary))] text-xs md:text-sm font-medium whitespace-nowrap select-none">
        {label}
      </div>
    </motion.div>
  );
};

const ModulesCarousel = () => {
  const [isHovered, setIsHovered] = useState(false);
  const sectionRef = useRef(null);

  return (
    <section ref={sectionRef} className="relative py-12 md:py-20 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="relative w-full"
          style={{ minHeight: "350px" }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Center title */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-20">
            {/* Diamond icon */}
            <motion.div
              className="mb-4 w-12 h-16 border border-foreground/20 rounded-md flex items-center justify-center pointer-events-auto"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 0L16 8L8 16L0 8L8 0Z" fill="hsl(var(--primary))" />
              </svg>
            </motion.div>

            <motion.h2
              className="text-3xl md:text-4xl lg:text-5xl font-['Cormorant_Garamond'] italic text-center text-foreground pointer-events-auto cursor-default"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              My Design
              <br />
              Superpowers
            </motion.h2>
          </div>

          {/* Scattered skill chips - appear on hover */}
          <AnimatePresence>
            {isHovered &&
              skills.map((skill, index) => (
                <DraggableChip
                  key={skill.label}
                  label={skill.label}
                  x={skill.x}
                  y={skill.y}
                  index={index}
                />
              ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default ModulesCarousel;
