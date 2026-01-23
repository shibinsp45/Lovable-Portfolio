import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";

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

// Responsive positions based on container width
const getResponsivePositions = (containerWidth: number) => {
  const isMobile = containerWidth < 400;
  const isTablet = containerWidth >= 400 && containerWidth < 768;
  
  if (isMobile) {
    // Stack vertically with slight horizontal offset on mobile
    return [
      { x: 10, y: 0 },
      { x: 20, y: 55 },
      { x: 10, y: 110 },
      { x: 25, y: 165 },
      { x: 15, y: 220 },
      { x: 20, y: 275 },
      { x: 10, y: 330 },
      { x: 25, y: 385 },
    ];
  } else if (isTablet) {
    // 2 columns on tablet
    return [
      { x: 20, y: 0 },
      { x: 200, y: 10 },
      { x: 30, y: 60 },
      { x: 220, y: 70 },
      { x: 20, y: 120 },
      { x: 210, y: 130 },
      { x: 30, y: 180 },
      { x: 200, y: 190 },
    ];
  } else {
    // Wide spread on desktop
    return [
      { x: 50, y: 20 },
      { x: 250, y: 60 },
      { x: 480, y: 25 },
      { x: 720, y: 70 },
      { x: 100, y: 120 },
      { x: 350, y: 140 },
      { x: 580, y: 110 },
      { x: 820, y: 150 },
    ];
  }
};

const ModulesCarousel = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [positions, setPositions] = useState(() => getResponsivePositions(1024));
  const [containerHeight, setContainerHeight] = useState("200px");

  useEffect(() => {
    const updatePositions = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        setPositions(getResponsivePositions(width));
        
        // Adjust container height based on screen size
        if (width < 400) {
          setContainerHeight("480px");
        } else if (width < 768) {
          setContainerHeight("280px");
        } else {
          setContainerHeight("200px");
        }
      }
    };

    updatePositions();
    window.addEventListener("resize", updatePositions);
    return () => window.removeEventListener("resize", updatePositions);
  }, []);

  return (
    <section className="py-8 md:py-16 bg-background overflow-hidden relative">
      {/* Container for draggable modules */}
      <div 
        ref={containerRef}
        className="container mx-auto px-4 md:px-6 relative"
        style={{ height: containerHeight }}
      >
        {modules.map((module, index) => (
          <motion.div
            key={module}
            className="absolute cursor-grab active:cursor-grabbing"
            initial={{ 
              x: positions[index]?.x || 10, 
              y: positions[index]?.y || index * 55,
              opacity: 0,
              scale: 0.8
            }}
            animate={{ 
              x: positions[index]?.x || 10,
              y: positions[index]?.y || index * 55,
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
              className="px-4 md:px-6 lg:px-8 py-2 md:py-3 lg:py-4 rounded-full bg-transparent border border-border/60 
                        transition-all duration-300"
            >
              <span className="text-muted-foreground font-normal text-xs md:text-sm lg:text-base whitespace-nowrap">
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
        className="text-center text-muted-foreground/50 text-xs md:text-sm mt-4"
      >
        ← Drag modules anywhere →
      </motion.p>
    </section>
  );
};

export default ModulesCarousel;
