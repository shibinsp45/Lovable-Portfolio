import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useRef } from "react";

const stats = [
  { value: "1.5+", label: "Years of experience" },
  { value: "5+", label: "Clients" },
  { value: "10+", label: "Projects Completed" },
  { value: "100+", label: "Hours of Designing" },
];

const About = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  return (
    <section id="about" className="py-24 bg-background overflow-hidden relative" ref={containerRef}>
      {/* Glassmorphism background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-[hsl(280,70%,55%)]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />
      </div>
      <div className="container mx-auto px-6">
        <motion.p
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-4xl font-serif text-muted-foreground text-center mb-4"
        >
          Craft by mind Design with soul
        </motion.p>
        
        <motion.div 
          className="flex justify-center mb-16"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3, type: "spring" }}
        >
          <div className="w-2 h-2 rounded-full bg-primary" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Profile Image */}
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
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=667&fit=crop"
                alt="Shibin S P"
                className="w-full h-full object-cover"
              />
            </motion.div>
            {/* Floating accent */}
            <motion.div
              className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary/20 rounded-full blur-2xl"
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>

          {/* About Content */}
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
                className="text-3xl md:text-4xl font-serif"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <span className="text-muted-foreground">I am an Engineer turned</span>
                <br />
                <span className="text-primary">Into a UI/UX Developer</span>
              </motion.h2>
              
              <motion.p 
                className="text-muted-foreground leading-relaxed"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Experienced UI/UX Designer and Front-End Developer with a strong focus on 
                creating user-centered, visually appealing digital experiences. Skilled in 
                front-end development and UI/UX design principles, I design intuitive, 
                high-fidelity prototypes and collaborate with cross-functional teams to 
                deliver innovative, high-quality solutions. I also have a solid understanding 
                of AI integration to enhance user experiences and improve design efficiency.
              </motion.p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
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
                    stiffness: 100
                  }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="text-center md:text-left cursor-default"
                >
                  <motion.div 
                    className="text-3xl md:text-4xl font-bold text-foreground"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
