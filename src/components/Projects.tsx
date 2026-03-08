import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Eye } from "lucide-react";

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
  const [activeIndex, setActiveIndex] = useState(0);

  const filteredProjects = useMemo(() => {
    const result = activeCategory === "All" ? projects : projects.filter((p) => p.category === activeCategory);
    return result;
  }, [activeCategory]);

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setActiveIndex(0);
  };

  const handleCardClick = (index: number) => {
    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  };

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
              onClick={() => handleCategoryChange(cat)}
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

        {/* Stacked Cards */}
        <div className="flex justify-center">
          <div className="relative w-full max-w-[420px] sm:max-w-[480px] md:max-w-[520px]" style={{ height: "580px" }}>
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => {
                const position = index - activeIndex;
                // Only show cards that are at or behind the active card (up to 4 deep)
                if (position < 0 || position > 4) return null;

                return (
                  <motion.div
                    key={project.slug}
                    layout
                    className="absolute inset-0 cursor-pointer"
                    initial={{ opacity: 0, scale: 0.9, y: 80 }}
                    animate={{
                      scale: 1 - position * 0.05,
                      y: position * 32,
                      zIndex: filteredProjects.length - position,
                      opacity: 1 - position * 0.2,
                      rotateZ: position * -1.5,
                    }}
                    exit={{ opacity: 0, scale: 0.9, y: -60 }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 30,
                    }}
                    onClick={() => handleCardClick(index)}
                    style={{ transformOrigin: "center bottom" }}
                  >
                    <div className="h-full rounded-3xl overflow-hidden bg-card/30 backdrop-blur-xl border border-border/20 shadow-xl flex flex-col">
                      {/* Project Image */}
                      <div className="relative aspect-[16/10] overflow-hidden flex-shrink-0">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-card/60 via-transparent to-transparent" />
                        {/* Category Badge */}
                        <div className="absolute top-4 left-4">
                          <span
                            className="px-3 py-1 rounded-full text-xs font-medium bg-foreground/80 text-background backdrop-blur-sm"
                            style={{ fontFamily: "'Poppins', sans-serif" }}
                          >
                            {project.category}
                          </span>
                        </div>
                      </div>

                      {/* Card Content */}
                      <div className="flex-1 p-5 sm:p-6 flex flex-col justify-between">
                        <div className="space-y-2">
                          {/* Meta */}
                          <div
                            className="flex items-center gap-3 text-xs tracking-[0.15em] uppercase text-muted-foreground"
                            style={{ fontFamily: "'Poppins', sans-serif" }}
                          >
                            <span>{project.year}</span>
                            <span className="w-1 h-1 rounded-full bg-muted-foreground/50" />
                            <span>{project.role}</span>
                          </div>

                          {/* Title */}
                          <h3
                            className="text-xl sm:text-2xl font-light tracking-tight text-foreground"
                            style={{ fontFamily: "'Quicksand', sans-serif" }}
                          >
                            {project.title}
                          </h3>

                          {/* Description */}
                          <p
                            className="text-sm text-muted-foreground leading-relaxed line-clamp-2"
                            style={{ fontFamily: "'Poppins', sans-serif" }}
                          >
                            {project.description}
                          </p>
                        </div>

                        {/* Tap to Preview CTA */}
                        {position === 0 && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                          >
                            <Link
                              to={`/project/${project.slug}`}
                              className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-foreground/10 border border-border/30 text-sm font-medium text-foreground hover:bg-foreground/20 transition-all duration-300 backdrop-blur-sm"
                              style={{ fontFamily: "'Poppins', sans-serif" }}
                              onClick={(e) => e.stopPropagation()}
                            >
                              <Eye className="w-4 h-4" />
                              Tap to Preview
                              <ArrowUpRight className="w-3.5 h-3.5" />
                            </Link>
                          </motion.div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>

        {/* Dot Navigation */}
        <div className="flex justify-center gap-2 mt-16">
          {filteredProjects.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`rounded-full transition-all duration-300 ${
                index === activeIndex
                  ? "w-8 h-2.5 bg-foreground"
                  : "w-2.5 h-2.5 bg-muted-foreground/30 hover:bg-muted-foreground/60"
              }`}
              aria-label={`Go to project ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-56 bg-gradient-to-t from-background via-background/60 to-transparent pointer-events-none z-20" />
    </section>
  );
};

export default Projects;
