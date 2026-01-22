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
    <section ref={ref} className="min-h-screen flex flex-col justify-center pt-20 relative overflow-hidden bg-background">
      {/* Dark background with animated glowing gradient orbs */}
      <div className="absolute inset-0 -z-10">
        {/* Base dark background */}
        <div className="absolute inset-0 bg-background" />
        
        {/* Large soft purple/violet orb - top right */}
        <motion.div 
          className="absolute -top-20 right-0 w-[600px] h-[600px] bg-[hsl(270,60%,40%)] rounded-full blur-[200px] opacity-30"
          animate={{ 
            scale: [1, 1.15, 1],
            opacity: [0.3, 0.4, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Teal/cyan orb - top center */}
        <motion.div 
          className="absolute top-10 left-1/3 w-[500px] h-[400px] bg-[hsl(180,50%,35%)] rounded-full blur-[180px] opacity-25"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.25, 0.35, 0.25],
            x: [0, 30, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        
        {/* Purple/magenta orb - bottom left */}
        <motion.div 
          className="absolute bottom-20 -left-20 w-[550px] h-[550px] bg-[hsl(280,55%,35%)] rounded-full blur-[200px] opacity-25"
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.25, 0.35, 0.25],
            y: [0, -20, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        
        {/* Blue accent orb - center right */}
        <motion.div 
          className="absolute top-1/2 right-10 w-[400px] h-[400px] bg-[hsl(220,60%,40%)] rounded-full blur-[180px] opacity-20"
          animate={{ 
            scale: [1, 1.25, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        />
        
        {/* Subtle inner glow ring effect */}
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-[hsl(270,40%,30%)] opacity-20 blur-sm"
          animate={{ 
            scale: [1, 1.05, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Subtle stars/particles effect */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_random,_hsl(0,0%,100%)_1px,_transparent_1px)] bg-[length:100px_100px] opacity-5" />
      </div>

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
            className="text-5xl md:text-7xl lg:text-8xl font-sans font-normal tracking-tight"
            style={{ textShadow: "0 0 40px hsl(220, 80%, 50%), 0 0 80px hsl(220, 70%, 40%), 0 0 120px hsl(220, 60%, 30%)" }}
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="text-[hsl(220,70%,45%)]">
              Shibin S P
            </span>
          </motion.h1>
          <motion.h2 
            className="text-4xl md:text-6xl lg:text-7xl font-sans font-normal tracking-tight"
            style={{ textShadow: "0 0 40px hsl(220, 80%, 50%), 0 0 80px hsl(220, 70%, 40%), 0 0 120px hsl(220, 60%, 30%)" }}
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <span className="text-[hsl(220,70%,45%)]">
              UX Designer
            </span>
          </motion.h2>
          <motion.p 
            className="text-3xl md:text-5xl lg:text-6xl font-sans font-normal tracking-tight"
            style={{ textShadow: "0 0 40px hsl(220, 80%, 50%), 0 0 80px hsl(220, 70%, 40%), 0 0 120px hsl(220, 60%, 30%)" }}
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <span className="text-[hsl(220,70%,45%)]">
              Crafting Soulful Experiences
            </span>
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

      {/* Skills Marquee - Full width with silver border */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="w-full mb-0"
      >
        <div className="overflow-hidden border-y border-border/40 bg-card/20 backdrop-blur-xl py-5 hover:bg-card/30 transition-all duration-500">
          <div className="animate-marquee flex whitespace-nowrap">
            {[...skills, ...skills, ...skills].map((skill, index) => (
              <motion.span
                key={index}
                className="mx-10 text-muted-foreground text-base md:text-lg font-medium cursor-default"
                whileHover={{ scale: 1.1, color: "hsl(var(--primary))" }}
                transition={{ duration: 0.2 }}
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
