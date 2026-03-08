import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Eye } from "lucide-react";

const projectGroups = [
  {
    caption: "UI UX Design",
    projects: [
      {
        title: "UI UX Designs",
        description: "Designing user-centric solutions that create meaningful digital experiences.",
        image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&h=800&fit=crop",
        slug: "ui-ux-designs",
        year: "2024",
        role: "Lead Designer",
      },
      {
        title: "Mobile App Design",
        description: "Creating intuitive mobile experiences that users love to engage with.",
        image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&h=800&fit=crop",
        slug: "mobile-app-design",
        year: "2024",
        role: "Product Designer",
      },
    ],
  },
  {
    caption: "Web Development",
    projects: [
      {
        title: "Web Development",
        description: "Bringing websites to life with responsive design and robust code.",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop",
        slug: "web-development",
        year: "2024",
        role: "Full Stack Developer",
      },
    ],
  },
  {
    caption: "Product Branding",
    projects: [
      {
        title: "Product Branding",
        description: "Creating Unique Brand Identities Building that stand out.",
        image: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=1200&h=800&fit=crop",
        slug: "product-branding",
        year: "2024",
        role: "Brand Designer",
      },
    ],
  },
  {
    caption: "Generative AI",
    projects: [
      {
        title: "Generative AI",
        description: "Exploring creative innovations powered by prompt generation.",
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=800&fit=crop",
        slug: "generative-ai",
        year: "2024",
        role: "AI Explorer",
      },
    ],
  },
  {
    caption: "Psychology Articles",
    projects: [
      {
        title: "Psychology Articles",
        description: "Blending psychology and design to craft more human-centered products.",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=800&fit=crop",
        slug: "psychology-articles",
        year: "2024",
        role: "Writer & Researcher",
      },
    ],
  },
];

interface CardStackProps {
  projects: typeof projectGroups[0]["projects"];
  caption: string;
}

const CardStack = ({ projects, caption }: CardStackProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleCardClick = (index: number) => {
    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  };

  const stackHeight = projects.length > 1 ? "520px" : "480px";

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-center"
    >
      {/* Caption */}
      <h3
        className="text-2xl sm:text-3xl font-light tracking-tight text-foreground mb-8"
        style={{ fontFamily: "'Quicksand', sans-serif" }}
      >
        {caption}
      </h3>

      {/* Stack Container */}
      <div className="relative w-full max-w-[400px] sm:max-w-[440px]" style={{ height: stackHeight }}>
        <AnimatePresence mode="popLayout">
          {projects.map((project, index) => {
            const position = index - activeIndex;
            if (position < 0 || position > 3) return null;

            return (
              <motion.div
                key={project.slug}
                layout
                className="absolute inset-0 cursor-pointer"
                initial={{ opacity: 0, scale: 0.9, y: 80 }}
                animate={{
                  scale: 1 - position * 0.05,
                  y: position * 28,
                  zIndex: projects.length - position,
                  opacity: 1 - position * 0.25,
                  rotateZ: position * -1.2,
                }}
                exit={{ opacity: 0, scale: 0.9, y: -50 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                onClick={() => handleCardClick(index)}
                style={{ transformOrigin: "center bottom" }}
              >
                <div className="h-full rounded-3xl overflow-hidden bg-card/30 backdrop-blur-xl border border-border/20 shadow-xl flex flex-col">
                  {/* Image */}
                  <div className="relative aspect-[16/10] overflow-hidden flex-shrink-0">
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-card/60 via-transparent to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-5 sm:p-6 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div
                        className="flex items-center gap-3 text-xs tracking-[0.15em] uppercase text-muted-foreground"
                        style={{ fontFamily: "'Poppins', sans-serif" }}
                      >
                        <span>{project.year}</span>
                        <span className="w-1 h-1 rounded-full bg-muted-foreground/50" />
                        <span>{project.role}</span>
                      </div>
                      <h4
                        className="text-xl sm:text-2xl font-light tracking-tight text-foreground"
                        style={{ fontFamily: "'Quicksand', sans-serif" }}
                      >
                        {project.title}
                      </h4>
                      <p
                        className="text-sm text-muted-foreground leading-relaxed line-clamp-2"
                        style={{ fontFamily: "'Poppins', sans-serif" }}
                      >
                        {project.description}
                      </p>
                    </div>

                    {/* CTA for front card */}
                    {position === 0 && (
                      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
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

      {/* Dots (only if multiple cards) */}
      {projects.length > 1 && (
        <div className="flex justify-center gap-2 mt-8">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`rounded-full transition-all duration-300 ${
                index === activeIndex
                  ? "w-7 h-2 bg-foreground"
                  : "w-2 h-2 bg-muted-foreground/30 hover:bg-muted-foreground/60"
              }`}
              aria-label={`Go to project ${index + 1}`}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
};

const Projects = () => {
  return (
    <section id="portfolio" className="relative min-h-screen overflow-hidden bg-background">
      {/* Top Gradient Fade */}
      <div className="absolute top-0 left-0 right-0 h-56 bg-gradient-to-b from-background via-background/60 to-transparent pointer-events-none z-20" />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-24"
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

        {/* Project Groups */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-16 md:gap-12">
          {projectGroups.map((group) => (
            <CardStack key={group.caption} caption={group.caption} projects={group.projects} />
          ))}
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-56 bg-gradient-to-t from-background via-background/60 to-transparent pointer-events-none z-20" />
    </section>
  );
};

export default Projects;
