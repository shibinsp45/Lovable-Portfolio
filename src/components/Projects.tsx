import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    title: "Mobile App Design",
    description: "Creating intuitive mobile experiences that users love to engage with.",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop",
    slug: "mobile-app-design",
  },
  {
    title: "Generative AI",
    description: "Exploring creative innovations powered by prompt generation.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop",
    slug: "generative-ai",
  },
  {
    title: "Psychology Articles",
    description: "Blending psychology and design to craft more human-centered products.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
    slug: "psychology-articles",
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
          className="text-4xl md:text-5xl text-center mb-16"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          <span className="bg-gradient-to-b from-foreground via-muted-foreground/80 to-muted-foreground/50 bg-clip-text text-transparent">
            My Projects
          </span>
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
                <Link to={`/project/${project.slug}`}>
                  <Button
                    variant="secondary"
                    className="w-full rounded-full hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-[1.02] group/btn"
                  >
                    View Project
                    <ArrowUpRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
