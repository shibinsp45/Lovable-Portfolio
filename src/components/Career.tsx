import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useRef } from "react";

const experiences = [
  {
    title: "UI UX Designer - Webcastle",
    period: "2025 - Now",
    description:
      "Helping humans with UI/UX design and development, AI-driven social insights, and mentoring designers!",
    scrollColor: "#22c55e",
  },
  {
    title: "UI/UX Designer - Kreative Sparkz",
    period: "2024 - 2024",
    description:
      "Designed user-centered UI/UX solutions, leading user research to inform design decisions. Developed interactive prototypes and wireframes, ensuring seamless user experiences. Mentored budding designers on UX best practices and integrated AI-driven enhancements to improve frontend experiences.",
    scrollColor: "#ef4444",
  },
  {
    title: "UI/UX Designer Intern – Nuren AI",
    period: "2023 - 2024",
    description:
      "Created web UI and interactions for a CRM system with a focus on user-centered design. Conducted user research and developed prototypes to improve the overall user experience. Worked closely with teams to ensure the delivery of a smooth and visually engaging interface.",
    scrollColor: "#60a5fa",
  },
];

const Career = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 0.8], ["0%", "100%"]);

  return (
    <section
      className="py-24 md:py-32 bg-background overflow-hidden"
      ref={containerRef}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Button variant="secondary" className="rounded-full px-6 mb-6">
              Career
            </Button>
          </motion.div>
          <motion.h2
            className="text-3xl md:text-5xl font-light text-muted-foreground"
            style={{ fontFamily: "'Quicksand', sans-serif" }}
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Here Is My Creative Journey
          </motion.h2>
        </motion.div>

        <div className="space-y-16 relative">
          {/* Animated timeline line */}
          <div className="absolute left-[5px] top-0 bottom-0 w-[2px] bg-border hidden md:block">
            <motion.div
              style={{ height: lineHeight }}
              className="w-full bg-primary"
            />
          </div>

          {experiences.map((exp, index) => (
            <motion.div
              key={exp.title}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.8,
                delay: index * 0.15,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="grid md:grid-cols-2 gap-4 md:gap-12 group md:pl-8"
            >
              <div className="flex items-start gap-4">
                <motion.div
                  className="hidden md:block w-3 h-3 rounded-full bg-primary mt-2 flex-shrink-0 relative z-10 -ml-8"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.2,
                    type: "spring",
                  }}
                  whileHover={{ scale: 1.5 }}
                />
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                >
                  <motion.h3
                    className="text-xl font-semibold transition-colors duration-500"
                    initial={{ color: "inherit" }}
                    whileInView={{ color: exp.scrollColor }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                  >
                    {exp.title}
                  </motion.h3>
                  <motion.span
                    className="text-muted-foreground text-sm inline-block mt-1"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    {exp.period}
                  </motion.span>
                </motion.div>
              </div>
              <motion.p
                className="text-muted-foreground leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.25 }}
              >
                {exp.description}
              </motion.p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Career;
