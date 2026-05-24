import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import AnimatedGradientBackground from "@/components/ui/animated-gradient-background";
import { AnimatedAIChat } from "@/components/ui/animated-ai-chat";


const Contact = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const bgOrbY = useTransform(scrollYProgress, [0, 1], ["40%", "-40%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["15%", "-15%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.95]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.5, 1, 1, 0.8]);

  return (
    <section
      id="contact"
      className="py-16 md:py-20 bg-background relative overflow-hidden"
      ref={containerRef}
    >
      {/* Animated gradient background - subtly blended with page */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top + bottom fade to seamlessly blend with adjacent sections */}
        <div className="absolute inset-0 z-20 bg-gradient-to-b from-background via-transparent to-background" />
        <div className="absolute inset-0 opacity-40 mix-blend-screen dark:opacity-50">
          <AnimatedGradientBackground
            Breathing
            startingGap={140}
            breathingRange={6}
            animationSpeed={0.012}
            gradientColors={[
              "hsl(var(--background))",
              "#1e3a8a",
              "#4338ca",
              "#7C4DFF",
              "#2979FF",
              "#0ea5e9",
              "hsl(var(--background))",
            ]}
            gradientStops={[20, 45, 60, 72, 84, 92, 100]}
          />
        </div>
        <div className="absolute inset-0 bg-background/60 backdrop-blur-3xl" />
      </div>



      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          style={{ y: contentY, scale, opacity }}
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center max-w-2xl mx-auto space-y-8"
        >



          <motion.h2
            className="text-3xl sm:text-4xl md:text-6xl font-light tracking-wide"
            style={{ fontFamily: "'Quicksand', sans-serif" }}
            initial={{ opacity: 0, y: 40, filter: "blur(15px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <span className="bg-gradient-to-r from-foreground/80 via-muted-foreground/60 to-muted-foreground/40 bg-clip-text text-transparent">
              Let's Get in
            </span>
            <span className="ml-3 bg-gradient-to-b from-muted-foreground/50 via-muted-foreground/30 to-muted-foreground/20 bg-clip-text text-transparent">
              Touch
            </span>
          </motion.h2>

          <motion.p
            className="text-muted-foreground max-w-md mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Let's connect and start with your project ASAP.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="pt-4"
          >
            <AnimatedAIChat />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};


export default Contact;
