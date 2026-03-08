import { motion } from "framer-motion";
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
  const [expanded, setExpanded] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const toggleExpand = () => {
    if (projects.length > 1) {
      setExpanded(!expanded);
    }
  };

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
      <div
        className="relative w-full max-w-[400px] sm:max-w-[440px] cursor-pointer"
        onClick={toggleExpand}
        style={{
          height: expanded
            ? `${projects.length * 280 + (projects.length - 1) * 16}px`
            : `${280 + (Math.min(projects.length - 1, 3)) * 32}px`,
          transition: "height 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        {projects.map((project, index) => {
          const isHovered = hoveredIndex === index;

          // Collapsed: cards stack behind with slight y offset
          // Expanded: cards fan out vertically like the reference
          const collapsedY = index * 32;
          const expandedY = index * 296;

          return (
            <motion.div
              key={project.slug}
              className="absolute left-0 right-0 top-0"
              animate={{
                y: expanded ? expandedY : collapsedY,
                scale: expanded ? 1 : 1 - index * 0.04,
                zIndex: projects.length - index,
                opacity: expanded ? 1 : 1 - index * 0.2,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{ transformOrigin: "center top" }}
            >
              <div className="relative h-[280px] rounded-2xl overflow-hidden bg-card/30 backdrop-blur-xl border border-border/20 shadow-xl group">
                {/* Image */}
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-card/90 via-card/30 to-transparent" />

                {/* Content at bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <div
                    className="flex items-center gap-3 text-xs tracking-[0.15em] uppercase text-muted-foreground mb-1"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    <span>{project.year}</span>
                    <span className="w-1 h-1 rounded-full bg-muted-foreground/50" />
                    <span>{project.role}</span>
                  </div>
                  <h4
                    className="text-xl font-light tracking-tight text-foreground"
                    style={{ fontFamily: "'Quicksand', sans-serif" }}
                  >
                    {project.title}
                  </h4>
                </div>

                {/* Hover overlay with View Project */}
                <motion.div
                  className="absolute inset-0 bg-background/70 backdrop-blur-sm flex items-center justify-center"
                  initial={false}
                  animate={{ opacity: isHovered ? 1 : 0 }}
                  transition={{ duration: 0.25 }}
                  style={{ pointerEvents: isHovered ? "auto" : "none" }}
                >
                  <Link
                    to={`/project/${project.slug}`}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-foreground text-background text-sm font-medium hover:scale-105 transition-transform duration-200"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Eye className="w-4 h-4" />
                    View Project
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Expand/Collapse hint for multi-card stacks */}
      {projects.length > 1 && (
        <button
          onClick={toggleExpand}
          className="mt-6 text-xs tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-colors"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          {expanded ? "Collapse" : `+${projects.length - 1} more`}
        </button>
      )}
    </motion.div>
  );
};

const Projects = () => {
  return (
    <section id="portfolio" className="relative min-h-screen overflow-hidden bg-background">
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

      <div className="absolute bottom-0 left-0 right-0 h-56 bg-gradient-to-t from-background via-background/60 to-transparent pointer-events-none z-20" />
    </section>
  );
};

export default Projects;
