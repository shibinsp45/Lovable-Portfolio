import { motion } from "framer-motion";

const modules = [
  // Row 1
  ["Design Systems", "Product Design", "User Research", "User Experience Design"],
  // Row 2
  ["Interaction Design", "Design Thinking", "Visual Design", "Prototyping"],
];

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
                <motion.div
                  key={module}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: (rowIndex * 4 + index) * 0.08 
                  }}
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
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ModulesCarousel;
