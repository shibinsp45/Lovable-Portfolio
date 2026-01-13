import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Mail, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRef } from "react";
const Contact = () => {
  const containerRef = useRef(null);
  const {
    scrollYProgress
  } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.95]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.5, 1, 1, 0.8]);
  return <section id="contact" className="py-24 bg-background relative overflow-hidden" ref={containerRef}>
      {/* Animated background elements */}
      <motion.div className="absolute inset-0 pointer-events-none" style={{
      y
    }}>
        <motion.div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl" animate={{
        scale: [1, 1.2, 1],
        opacity: [0.3, 0.5, 0.3]
      }} transition={{
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }} />
        <motion.div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/10 rounded-full blur-3xl" animate={{
        scale: [1.2, 1, 1.2],
        opacity: [0.5, 0.3, 0.5]
      }} transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut"
      }} />
      </motion.div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div style={{
        scale,
        opacity
      }} initial={{
        opacity: 0,
        y: 80
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} transition={{
        duration: 1,
        ease: [0.25, 0.46, 0.45, 0.94]
      }} className="text-center space-y-8">
          <motion.div initial={{
          opacity: 0,
          scale: 0.9
        }} whileInView={{
          opacity: 1,
          scale: 1
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.5,
          delay: 0.2
        }}>
            <Button variant="secondary" className="rounded-full px-6">
              Contact
            </Button>
          </motion.div>

          <motion.h2 
            className="text-4xl md:text-6xl font-serif font-light tracking-wide" 
            initial={{
              opacity: 0,
              y: 40,
              filter: "blur(15px)"
            }} 
            whileInView={{
              opacity: 1,
              y: 0,
              filter: "blur(0px)"
            }} 
            viewport={{
              once: true
            }} 
            transition={{
              duration: 1,
              delay: 0.3
            }}
          >
            <span className="italic bg-gradient-to-r from-foreground/80 via-muted-foreground/60 to-muted-foreground/40 bg-clip-text text-transparent">
              Let's Get in
            </span>
            <span className="ml-3 bg-gradient-to-b from-muted-foreground/50 via-muted-foreground/30 to-muted-foreground/20 bg-clip-text text-transparent">
              Touch
            </span>
          </motion.h2>

          <motion.p className="text-muted-foreground max-w-md mx-auto" initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.6,
          delay: 0.4
        }}>
            Let's connect and start with your project ASAP.
          </motion.p>

          

          <motion.div initial={{
          opacity: 0,
          y: 30,
          scale: 0.9
        }} whileInView={{
          opacity: 1,
          y: 0,
          scale: 1
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.8,
          delay: 0.6,
          type: "spring",
          stiffness: 100
        }} whileHover={{
          scale: 1.05
        }} whileTap={{
          scale: 0.98
        }}>
            <Button variant="outline" size="lg" className="rounded-full px-8 py-6 text-lg border-border hover:bg-secondary hover:border-primary/50 transition-all duration-300 group" asChild>
              <a href="mailto:shibinsp45@gmail.com" className="flex items-center gap-2">
                <Mail className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                Email me 
                <ArrowUpRight className="ml-1 h-5 w-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
              </a>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>;
};
export default Contact;