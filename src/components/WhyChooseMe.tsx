import { motion, useScroll, useTransform } from "framer-motion";
import { Clock, MessageCircle, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRef } from "react";

const features = [
  {
    icon: Clock,
    title: "Efficient Workflow",
    description: "Streamlined design process for rapid delivery, meeting tight deadlines without compromising quality or detail.",
  },
  {
    icon: MessageCircle,
    title: "Collaborative Process",
    description: "I work closely with you, integrating your feedback to create designs that exceed your expectations.",
  },
  {
    icon: Search,
    title: "Attention to Detail",
    description: "Meticulous attention to every element, ensuring a polished and cohesive final product that impresses.",
  },
];

const WhyChooseMe = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const cardsY = useTransform(scrollYProgress, [0, 1], ["12%", "-12%"]);
  const headerY = useTransform(scrollYProgress, [0, 1], ["25%", "-25%"]);
  const bgGlow1Y = useTransform(scrollYProgress, [0, 1], ["50%", "-50%"]);
  const bgGlow2Y = useTransform(scrollYProgress, [0, 1], ["-40%", "40%"]);

  return (
    <section
      className="py-16 md:py-20 bg-background overflow-hidden relative"
      ref={containerRef}
    >
      {/* Parallax background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          style={{ y: bgGlow1Y }}
          className="absolute top-0 left-1/4 w-80 h-80 bg-[hsl(320,80%,60%)]/10 rounded-full blur-[100px]"
        />
        <motion.div
          style={{ y: bgGlow2Y }}
          className="absolute bottom-0 right-1/4 w-80 h-80 bg-[hsl(220,80%,60%)]/10 rounded-full blur-[100px]"
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          style={{ y: headerY }}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-10 md:mb-12"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Button variant="secondary" className="rounded-full px-6 mb-6">
              Why u choose me ?
            </Button>
          </motion.div>
          <motion.h2
            className="text-3xl md:text-5xl font-light"
            style={{ fontFamily: "'Quicksand', sans-serif" }}
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="bg-gradient-to-b from-foreground via-muted-foreground/80 to-muted-foreground/50 bg-clip-text text-transparent">
              I'll help you to make unique
            </span>
          </motion.h2>
        </motion.div>

        <motion.div
          style={{ y: cardsY }}
          className="grid md:grid-cols-3 gap-6 lg:gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 80, rotateX: 15 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.8,
                delay: index * 0.15,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              whileHover={{ y: -15, transition: { duration: 0.3 } }}
              className="bg-card/30 backdrop-blur-2xl rounded-3xl p-8 border border-border/20 hover:border-primary/40 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 group flex flex-col relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-br before:from-primary/5 before:via-transparent before:to-transparent before:rounded-3xl before:pointer-events-none"
            >
              <motion.div
                className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center mb-6 group-hover:bg-primary/10 transition-colors duration-300"
                whileHover={{ rotate: 10, scale: 1.1 }}
                transition={{ duration: 0.3 }}
              >
                <feature.icon className="w-6 h-6 text-foreground group-hover:text-primary transition-colors duration-300" />
              </motion.div>
              <h3 className="text-xl font-semibold mb-3 text-card-foreground group-hover:text-primary transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseMe;
