import { motion, useScroll, useTransform, useMotionValue, useSpring, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useRef, useEffect, useState } from "react";

const stats = [
  { value: 2.8, suffix: "+", label: "Years of experience", decimals: 1 },
  { value: 5, suffix: "+", label: "Clients", decimals: 0 },
  { value: 10, suffix: "+", label: "Projects Completed", decimals: 0 },
  { value: 100, suffix: "+", label: "Hours of Designing", decimals: 0 },
];

const AnimatedCounter = ({ value, suffix, decimals }: { value: number; suffix: string; decimals: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const duration = 2000;
    const startTime = Date.now();
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(eased * value);
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {decimals > 0 ? displayValue.toFixed(decimals) : Math.round(displayValue)}
      {suffix}
    </span>
  );
};

const About = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const bgGlow1Y = useTransform(scrollYProgress, [0, 1], ["40%", "-40%"]);
  const bgGlow2Y = useTransform(scrollYProgress, [0, 1], ["-30%", "30%"]);
  const headingY = useTransform(scrollYProgress, [0, 1], ["25%", "-25%"]);
  const statsY = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);

  return (
    <section
      id="about"
      className="py-16 md:py-24 bg-background overflow-hidden relative"
      ref={containerRef}
    >
      {/* Parallax background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          style={{ y: bgGlow1Y }}
          className="absolute top-1/4 right-0 w-96 h-96 bg-[hsl(280,70%,55%)]/10 rounded-full blur-[120px]"
        />
        <motion.div
          style={{ y: bgGlow2Y }}
          className="absolute bottom-1/4 left-0 w-96 h-96 bg-primary/10 rounded-full blur-[120px]"
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.p
          style={{ y: headingY }}
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-4xl font-light text-center mb-4"
          {...{ style: { fontFamily: "'Quicksand', sans-serif", y: headingY } }}
        >
          <span className="bg-gradient-to-b from-foreground via-muted-foreground/80 to-muted-foreground/50 bg-clip-text text-transparent">
            Craft by mind
            {"\n"}Design with soul
          </span>
        </motion.p>

        <motion.div
          className="flex justify-center mb-16 md:mb-20"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3, type: "spring" }}
        />

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Profile Image - parallax layer */}
          <motion.div
            style={{ y: imageY }}
            initial={{ opacity: 0, x: -80, rotateY: 15 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative"
          >
            <motion.div
              className="aspect-[3/4] rounded-3xl overflow-hidden bg-secondary"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.4 }}
            >
              <img
                alt="Shibin S P"
                className="w-full h-full object-cover"
                src="/lovable-uploads/271586bf-e3ab-4edd-a6f9-6916bef817ff.jpg"
              />
            </motion.div>
            <motion.div
              className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary/20 rounded-full blur-2xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>

          {/* About Content - different parallax speed */}
          <motion.div
            style={{ y: contentY }}
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="space-y-8"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Button variant="secondary" className="rounded-full px-6">
                Who I'am
              </Button>
            </motion.div>

            <div className="space-y-4">
              <motion.h2
                className="text-3xl md:text-4xl font-light"
                style={{ fontFamily: "'Quicksand', sans-serif" }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <span className="bg-gradient-to-b from-muted-foreground/90 via-muted-foreground/60 to-muted-foreground/30 bg-clip-text text-transparent">
                  I am an Engineer turned
                </span>
                <br />
                <span className="bg-gradient-to-b from-foreground via-muted-foreground/80 to-muted-foreground/50 bg-clip-text text-transparent">
                  Into a UI/UX Developer
                </span>
              </motion.h2>

              <motion.p
                className="text-muted-foreground leading-relaxed"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Experienced UI/UX Designer and Front-End Developer with a strong
                focus on creating user-centered, visually appealing digital
                experiences. Skilled in front-end development and UI/UX design
                principles, I design intuitive, high-fidelity prototypes and
                collaborate with cross-functional teams to deliver innovative,
                high-quality solutions. I also have a solid understanding of AI
                integration to enhance user experiences and improve design
                efficiency.
              </motion.p>
            </div>

            <motion.div style={{ y: statsY }} className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6 pt-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 40, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.6,
                    delay: 0.5 + index * 0.1,
                    type: "spring",
                    stiffness: 100,
                  }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="text-center cursor-default bg-white/[0.04] backdrop-blur-2xl rounded-2xl p-4 border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.06)] hover:border-white/[0.15] hover:shadow-[0_8px_40px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.1)] transition-all duration-500"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/[0.06] via-transparent to-transparent pointer-events-none rounded-2xl" />
                  <div
                    className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground relative z-10"
                  >
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} decimals={stat.decimals} />
                  </div>
                  <div className="text-sm text-muted-foreground mt-1 relative z-10">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
