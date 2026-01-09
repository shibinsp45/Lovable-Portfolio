import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRef } from "react";

const skills = [
  "Web Development",
  "Mobile App Design",
  "Product Design",
  "Prompt Engineering",
  "Web Development",
  "Mobile App Design",
  "Product Design",
  "Prompt Engineering",
];

const Hero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  return (
    <section ref={ref} className="min-h-screen flex flex-col justify-center pt-20 relative overflow-hidden">
      <motion.div 
        style={{ y, opacity, scale }}
        className="container mx-auto px-6 text-center flex-1 flex flex-col justify-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="space-y-6"
        >
          <motion.h1 
            className="text-5xl md:text-7xl lg:text-8xl font-medium"
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="text-primary">Shibin S P</span>
          </motion.h1>
          <motion.h2 
            className="text-4xl md:text-6xl lg:text-7xl font-medium text-primary"
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            UX Designer
          </motion.h2>
          <motion.p 
            className="text-3xl md:text-5xl lg:text-6xl font-medium text-primary"
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Crafting Soulful Experiences
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.8, type: "spring", stiffness: 100 }}
          className="mt-12"
        >
          <Button
            variant="outline"
            size="lg"
            className="rounded-full px-8 py-6 text-lg border-border hover:bg-secondary hover:scale-105 transition-all duration-300"
          >
            Get Resume <ArrowUpRight className="ml-2 h-5 w-5" />
          </Button>
        </motion.div>
      </motion.div>

      {/* Skills Marquee */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="w-full overflow-hidden bg-secondary/50 py-4 mt-auto backdrop-blur-sm"
      >
        <div className="animate-marquee flex whitespace-nowrap">
          {[...skills, ...skills].map((skill, index) => (
            <motion.span
              key={index}
              className="mx-8 text-muted-foreground text-sm md:text-base"
              whileHover={{ scale: 1.1, color: "hsl(var(--primary))" }}
              transition={{ duration: 0.2 }}
            >
              {skill}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
