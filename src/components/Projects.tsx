import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    title: "UI UX Designs",
    description: "Designing user-centric solutions that create meaningful digital experiences.",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&h=800&fit=crop",
    slug: "ui-ux-designs",
    category: "Design",
    year: "2024",
    role: "Lead Designer",
  },
  {
    title: "Web Development",
    description: "Bringing websites to life with responsive design and robust code.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop",
    slug: "web-development",
    category: "Development",
    year: "2024",
    role: "Full Stack Developer",
  },
  {
    title: "Product Branding",
    description: "Creating Unique Brand Identities Building that stand out.",
    image: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=1200&h=800&fit=crop",
    slug: "product-branding",
    category: "Design",
    year: "2024",
    role: "Brand Designer",
  },
  {
    title: "Mobile App Design",
    description: "Creating intuitive mobile experiences that users love to engage with.",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&h=800&fit=crop",
    slug: "mobile-app-design",
    category: "Design",
    year: "2024",
    role: "Product Designer",
  },
  {
    title: "Generative AI",
    description: "Exploring creative innovations powered by prompt generation.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=800&fit=crop",
    slug: "generative-ai",
    category: "AI",
    year: "2024",
    role: "AI Explorer",
  },
  {
    title: "Psychology Articles",
    description: "Blending psychology and design to craft more human-centered products.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=800&fit=crop",
    slug: "psychology-articles",
    category: "Writing",
    year: "2024",
    role: "Writer & Researcher",
  },
];

const categories = ["All", ...Array.from(new Set(projects.map((p) => p.category)))];

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = useMemo(
    () => activeCategory === "All" ? projects : projects.filter((p) => p.category === activeCategory),
    [activeCategory]
  );

  return (
    <section id="portfolio" className="relative min-h-screen overflow-hidden bg-background">
      {/* Top Gradient Fade */}
      <div className="absolute top-0 left-0 right-0 h-56 bg-gradient-to-b from-background via-background/60 to-transparent pointer-events-none z-20" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <span
            className="text-sm font-light tracking-[0.3em] uppercase text-muted-foreground mb-4 block"
            style={{ fontFamily: "'Quicksand', sans-serif" }}
          >
            Selected Work
          </span>
          <h2
            className="text-5xl md:text-7xl font-light tracking-tight text-muted-foreground"
            style={{ fontFamily: "'Quicksand', sans-serif" }}
          >
            Projects
          </h2>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-16 md:mb-20"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`relative px-5 py-2 rounded-full text-sm font-medium tracking-wide transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-foreground text-background shadow-lg"
                  : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Case Study Cards */}
        <div className="space-y-24 md:space-y-32">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => {
              const isEven = index % 2 === 0;
              return (
                <motion.div
                  key={project.slug}
                  layout
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30, scale: 0.95 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  <Link to={`/project/${project.slug}`} className="group block">
                    <div
                      className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center ${
                        !isEven ? "lg:direction-rtl" : ""
                      }`}
                    >
                      {/* Image Side */}
                      <motion.div
                        className={`relative rounded-3xl overflow-hidden bg-card/20 backdrop-blur-xl border border-border/10 ${
                          !isEven ? "lg:order-2" : ""
                        }`}
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.4 }}
                      >
                        <div className="aspect-[16/10] overflow-hidden">
                          <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                          />
                        </div>
                        <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors duration-500" />
                      </motion.div>

                      {/* Info Side */}
                      <div
                        className={`space-y-5 ${
                          !isEven ? "lg:order-1 lg:text-right" : ""
                        }`}
                      >
                        <span
                          className="text-7xl md:text-8xl font-extralight text-muted-foreground/15 block leading-none"
                          style={{ fontFamily: "'Quicksand', sans-serif" }}
                        >
                          {String(index + 1).padStart(2, "0")}
                        </span>

                        <div
                          className={`flex items-center gap-4 text-xs tracking-[0.2em] uppercase text-muted-foreground ${
                            !isEven ? "lg:justify-end" : ""
                          }`}
                        >
                          <span>{project.category}</span>
                          <span className="w-1 h-1 rounded-full bg-muted-foreground/50" />
                          <span>{project.year}</span>
                          <span className="w-1 h-1 rounded-full bg-muted-foreground/50" />
                          <span>{project.role}</span>
                        </div>

                        <h3
                          className="text-3xl md:text-4xl lg:text-5xl font-light tracking-tight text-foreground"
                          style={{ fontFamily: "'Quicksand', sans-serif" }}
                        >
                          {project.title}
                        </h3>

                        <p
                          className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-md"
                          style={{
                            fontFamily: "'Poppins', sans-serif",
                            ...(isEven ? {} : { marginLeft: "auto" }),
                          }}
                        >
                          {project.description}
                        </p>

                        <div
                          className={`flex items-center gap-3 text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors duration-300 ${
                            !isEven ? "lg:justify-end" : ""
                          }`}
                        >
                          <span
                            className="tracking-wide"
                            style={{ fontFamily: "'Poppins', sans-serif" }}
                          >
                            View Case Study
                          </span>
                          <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                        </div>

                        <div
                          className={`h-px bg-border/30 group-hover:bg-border/60 transition-colors duration-500 ${
                            !isEven ? "lg:ml-auto" : ""
                          }`}
                          style={{ width: "100%", maxWidth: "120px" }}
                        />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-56 bg-gradient-to-t from-background via-background/60 to-transparent pointer-events-none z-20" />
    </section>
  );
};

export default Projects;
