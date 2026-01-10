import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useRef } from "react";

const projects = [
  {
    title: "UI UX Designs",
    description: "Designing user-centric solutions that create meaningful digital experiences.",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop",
  },
  {
    title: "Web Development",
    description: "Bringing websites to life with responsive design and robust code.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
  },
  {
    title: "Product Branding",
    description: "Creating Unique Brand Identities Building that stand out.",
    image: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=400&h=300&fit=crop",
  },
];

const Projects = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["5%", "-5%"]);

  return (
    <section id="portfolio" className="py-24 bg-background overflow-hidden relative" ref={containerRef}>
      {/* Glassmorphism background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/3 -left-20 w-72 h-72 bg-primary/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/3 -right-20 w-72 h-72 bg-[hsl(320,80%,60%)]/10 rounded-full blur-[100px]" />
      </div>
      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-4xl md:text-5xl font-serif text-center mb-16"
        >
          My Projects
        </motion.h2>

        <motion.div style={{ y }} className="grid md:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 80, rotateX: 10 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                duration: 0.8, 
                delay: index * 0.15,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className="group perspective-1000"
            >
              <div className="bg-card/50 backdrop-blur-xl rounded-3xl p-6 border border-border/40 hover:border-primary/40 transition-all duration-500 h-full flex flex-col hover:shadow-2xl hover:shadow-primary/10 group">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-6 bg-secondary relative">
                  <motion.img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <motion.h3 
                  className="text-xl font-semibold mb-3 text-card-foreground"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {project.title}
                </motion.h3>
                <p className="text-muted-foreground text-sm mb-6 flex-1">
                  {project.description}
                </p>
                <Button
                  variant="secondary"
                  className="w-full rounded-full hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-[1.02]"
                >
                  View Projects
                </Button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
