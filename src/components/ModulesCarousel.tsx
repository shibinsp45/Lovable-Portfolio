import { motion } from "framer-motion";

const modules = [
  { name: "Design Systems", x: "5%", y: "15%" },
  { name: "Product Design", x: "30%", y: "8%" },
  { name: "User Experience Design", x: "55%", y: "20%" },
  { name: "Visual Design", x: "80%", y: "12%" },
  { name: "Interaction Design", x: "8%", y: "65%" },
  { name: "Design Thinking", x: "32%", y: "55%" },
  { name: "Prototyping", x: "58%", y: "70%" },
  { name: "User Research", x: "78%", y: "60%" },
];

const ModulesCarousel = () => {
  return (
    <section className="py-16 md:py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="relative w-full h-[200px] md:h-[250px]">
          {modules.map((module, index) => (
            <motion.div
              key={module.name}
              className="absolute"
              style={{ left: module.x, top: module.y }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                y: [0, -8, 0, 6, 0],
                x: [0, 4, 0, -4, 0],
              }}
              transition={{ 
                opacity: { duration: 0.5, delay: index * 0.1 },
                scale: { duration: 0.5, delay: index * 0.1 },
                y: {
                  duration: 4 + index * 0.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: index * 0.3,
                },
                x: {
                  duration: 5 + index * 0.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: index * 0.2,
                },
              }}
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
