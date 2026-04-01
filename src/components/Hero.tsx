import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRef, useMemo, useState, useEffect } from "react";

const roles = ["product designer", "UI/UX designer", "frontend developer", "artist"];

const generateStars = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 0.5,
    opacity: Math.random() * 0.8 + 0.2,
    twinkle: Math.random() * 3 + 2,
  }));
};

const generateShootingStars = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    startX: Math.random() * 100,
    startY: Math.random() * 40,
    delay: Math.random() * 8,
    duration: Math.random() * 1.5 + 0.8,
  }));
};

const Hero = () => {
  const ref = useRef(null);
  const [roleIndex, setRoleIndex] = useState(0);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  const stars = useMemo(() => generateStars(150), []);
  const shootingStars = useMemo(() => generateShootingStars(5), []);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      ref={ref}
      className="min-h-screen flex flex-col justify-center pt-20 relative overflow-hidden bg-background"
    >
      {/* Galaxy background with planet horizon */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-[hsl(240,20%,3%)] via-[hsl(240,15%,5%)] to-[hsl(240,10%,8%)]" />
        {stars.map((star) => (
          <motion.div
            key={star.id}
            className="absolute rounded-full bg-foreground"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: star.size,
              height: star.size,
            }}
            animate={{
              opacity: [star.opacity, star.opacity * 0.3, star.opacity],
            }}
            transition={{
              duration: star.twinkle,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
        {shootingStars.map((star) => (
          <motion.div
            key={`shooting-${star.id}`}
            className="absolute w-[2px] h-[2px] bg-foreground rounded-full"
            style={{
              left: `${star.startX}%`,
              top: `${star.startY}%`,
              boxShadow:
                "0 0 6px 2px hsl(var(--foreground) / 0.6), -40px 0 20px 1px hsl(var(--foreground) / 0.3)",
            }}
            initial={{ x: 0, y: 0, opacity: 0 }}
            animate={{
              x: [0, 200],
              y: [0, 200],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: star.duration,
              delay: star.delay,
              repeat: Infinity,
              repeatDelay: Math.random() * 10 + 5,
              ease: "easeOut",
            }}
          />
        ))}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[85%]">
          <div
            className="w-[200vw] h-[200vw] rounded-full bg-[hsl(240,15%,4%)]"
            style={{
              boxShadow: `
                0 -80px 150px 30px hsl(var(--primary) / 0.15),
                0 -40px 80px 20px hsl(var(--primary) / 0.2),
                0 -20px 40px 10px hsl(220,70%,50% / 0.3),
                inset 0 -20px 60px 0 hsl(220,70%,30% / 0.5)
              `,
            }}
          />
        </div>
        <div
          className="absolute bottom-0 left-0 right-0 h-[300px]"
          style={{
            background: `
              radial-gradient(ellipse 80% 50% at 50% 100%, hsl(var(--primary) / 0.2) 0%, transparent 60%),
              radial-gradient(ellipse 60% 30% at 50% 100%, hsl(220,70%,50% / 0.3) 0%, transparent 50%),
              linear-gradient(to top, hsl(220,70%,45% / 0.1) 0%, transparent 30%)
            `,
          }}
        />
        <motion.div
          className="absolute top-0 right-0 w-[600px] h-[600px] bg-[hsl(var(--primary))] rounded-full blur-[250px] opacity-10"
          animate={{ scale: [1, 1.15, 1], opacity: [0.1, 0.15, 0.1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-20 left-1/4 w-[400px] h-[400px] bg-[hsl(280,50%,40%)] rounded-full blur-[200px] opacity-8"
          animate={{ scale: [1, 1.2, 1], opacity: [0.08, 0.12, 0.08] }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </div>

      <motion.div
        style={{ y, opacity, scale }}
        className="container mx-auto px-4 sm:px-6 lg:px-8 text-left flex-1 flex flex-col justify-center max-w-6xl"
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <motion.p
            className="text-sm sm:text-base md:text-lg tracking-[0.3em] uppercase text-muted-foreground mb-6 md:mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Hey there, I'm Shibin S P
          </motion.p>

          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.5rem] font-sans font-medium tracking-tight leading-[1.1] text-white"
            initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            A Product Design
            <br />
            partner with focus on
            <br />
            interactive experiences
          </motion.h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 0.8,
            delay: 0.8,
            type: "spring",
            stiffness: 100,
          }}
          className="mt-10 md:mt-12"
        >
          <a href="https://drive.google.com/drive/folders/1FMTzFedlti8jhFb-k_y83SzHGbcjUjvF" target="_blank" rel="noopener noreferrer">
            <Button
              variant="outline"
              size="lg"
              className="rounded-full px-8 py-6 text-lg border-border hover:bg-primary hover:text-primary-foreground hover:scale-105 transition-all duration-300"
            >
              Get Resume <ArrowUpRight className="ml-2 h-5 w-5" />
            </Button>
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
