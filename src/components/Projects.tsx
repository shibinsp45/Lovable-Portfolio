import { motion, PanInfo } from "framer-motion";
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
      {
        title: "Dashboard UI",
        description: "Clean analytics dashboards with data-driven design patterns.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop",
        slug: "dashboard-ui",
        year: "2024",
        role: "UI Designer",
      },
    ],
  },
  {
    caption: "Web Development",
    projects: [
      {
        title: "E-Commerce Platform",
        description: "Bringing websites to life with responsive design and robust code.",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop",
        slug: "web-development",
        year: "2024",
        role: "Full Stack Developer",
      },
      {
        title: "SaaS Landing Page",
        description: "High-converting landing pages with modern frameworks and animations.",
        image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=1200&h=800&fit=crop",
        slug: "saas-landing",
        year: "2024",
        role: "Frontend Developer",
      },
      {
        title: "Portfolio Website",
        description: "Minimal portfolio sites with smooth interactions and fast performance.",
        image: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=1200&h=800&fit=crop",
        slug: "portfolio-website",
        year: "2023",
        role: "Web Developer",
      },
    ],
  },
  {
    caption: "Product Branding",
    projects: [
      {
        title: "Brand Identity System",
        description: "Creating unique brand identities that stand out in the market.",
        image: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=1200&h=800&fit=crop",
        slug: "product-branding",
        year: "2024",
        role: "Brand Designer",
      },
      {
        title: "Packaging Design",
        description: "Eye-catching packaging that tells a brand story on the shelf.",
        image: "https://images.unsplash.com/photo-1636955816868-fcb4e89c3e6a?w=1200&h=800&fit=crop",
        slug: "packaging-design",
        year: "2024",
        role: "Visual Designer",
      },
      {
        title: "Logo Collection",
        description: "Timeless logo designs crafted with precision and purpose.",
        image: "https://images.unsplash.com/photo-1626785774625-ddcddc3445e9?w=1200&h=800&fit=crop",
        slug: "logo-collection",
        year: "2023",
        role: "Logo Designer",
      },
    ],
  },
  {
    caption: "Generative AI",
    projects: [
      {
        title: "AI Art Explorer",
        description: "Exploring creative innovations powered by prompt generation.",
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=800&fit=crop",
        slug: "generative-ai",
        year: "2024",
        role: "AI Explorer",
      },
      {
        title: "AI Chat Interface",
        description: "Conversational AI interfaces with natural language understanding.",
        image: "https://images.unsplash.com/photo-1684487747720-1ba29cda82c8?w=1200&h=800&fit=crop",
        slug: "ai-chat-interface",
        year: "2024",
        role: "AI Designer",
      },
      {
        title: "Prompt Engineering",
        description: "Mastering prompt craft to unlock creative AI potential.",
        image: "https://images.unsplash.com/photo-1685094488371-6d44f76b09da?w=1200&h=800&fit=crop",
        slug: "prompt-engineering",
        year: "2023",
        role: "AI Specialist",
      },
    ],
  },
  {
    caption: "Psychology Articles",
    projects: [
      {
        title: "Cognitive Bias in UX",
        description: "Blending psychology and design to craft more human-centered products.",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=800&fit=crop",
        slug: "psychology-articles",
        year: "2024",
        role: "Writer & Researcher",
      },
      {
        title: "Color Psychology",
        description: "How colors influence user behavior and decision making in design.",
        image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=1200&h=800&fit=crop",
        slug: "color-psychology",
        year: "2024",
        role: "Researcher",
      },
      {
        title: "Design Thinking",
        description: "Applying psychological frameworks to the product design process.",
        image: "https://images.unsplash.com/photo-1456406644174-8ddd4cd52a06?w=1200&h=800&fit=crop",
        slug: "design-thinking",
        year: "2023",
        role: "UX Writer",
      },
    ],
  },
];

interface CardStackProps {
  projects: typeof projectGroups[0]["projects"];
  caption: string;
}

// Different glassmorphism color tints for each card
const cardTints = [
  "from-blue-500/20 via-blue-400/10 to-transparent border-blue-400/20",
  "from-purple-500/20 via-purple-400/10 to-transparent border-purple-400/20",
  "from-emerald-500/20 via-emerald-400/10 to-transparent border-emerald-400/20",
  "from-rose-500/20 via-rose-400/10 to-transparent border-rose-400/20",
  "from-amber-500/20 via-amber-400/10 to-transparent border-amber-400/20",
];

const CardStack = ({ projects, caption }: CardStackProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleSwipe = (_: any, info: PanInfo) => {
    const swipeThreshold = 50;
    if (info.offset.y < -swipeThreshold && activeIndex < projects.length - 1) {
      setActiveIndex((prev) => prev + 1);
    } else if (info.offset.y > swipeThreshold && activeIndex > 0) {
      setActiveIndex((prev) => prev - 1);
    }
  };

  const cardHeight = 320;
  const titleBarHeight = 44; // height of each title tab peeking

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
        className="relative w-full max-w-[380px] sm:max-w-[420px]"
        style={{
          height: `${cardHeight + 16}px`,
          marginTop: `${Math.min(projects.length - 1, 3) * titleBarHeight}px`,
        }}
      >
        {projects.map((project, index) => {
          const position = index - activeIndex;
          if (position < -1 || position > 3) return null;

          const isHovered = hoveredIndex === index && position === 0;
          const isFront = position === 0;
          const isSwiped = position < 0;
          const tint = cardTints[index % cardTints.length];

          return (
            <motion.div
              key={project.slug}
              className="absolute left-0 right-0 top-0"
              animate={{
                y: isSwiped ? -cardHeight - 60 : position * -titleBarHeight,
                zIndex: isSwiped ? 0 : projects.length - position,
                opacity: isSwiped ? 0 : 1,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              drag={isFront ? "y" : false}
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={0.15}
              onDragEnd={isFront ? handleSwipe : undefined}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => {
                if (position > 0) setActiveIndex(index);
              }}
              style={{
                transformOrigin: "center top",
                height: `${cardHeight}px`,
                cursor: position > 0 ? "pointer" : "grab",
              }}
            >
              <div
                className={`relative h-full rounded-2xl overflow-hidden border backdrop-blur-xl flex flex-col bg-gradient-to-b ${tint}`}
              >
                {/* Title bar — always visible, acts as the peeking tab */}
                <div className="px-4 sm:px-5 py-3 flex items-center justify-between border-b border-border/10 flex-shrink-0">
                  <h4
                    className="text-base sm:text-lg font-light tracking-tight text-foreground truncate"
                    style={{ fontFamily: "'Quicksand', sans-serif" }}
                  >
                    {project.title}
                  </h4>
                  <div
                    className="text-[9px] tracking-[0.12em] uppercase text-muted-foreground flex-shrink-0 ml-3"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    {project.year}
                  </div>
                </div>

                {/* Image — only meaningful on front card */}
                <div className="relative flex-1 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    draggable={false}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
                </div>

                {/* Description & role at bottom */}
                <div className="px-4 sm:px-5 py-3">
                  <div
                    className="flex items-center gap-2 text-[10px] tracking-[0.12em] uppercase text-muted-foreground mb-1"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    <span>{project.role}</span>
                  </div>
                  <p
                    className="text-xs text-muted-foreground leading-relaxed line-clamp-2"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    {project.description}
                  </p>
                </div>

                {/* Hover overlay — View Project */}
                <motion.div
                  className="absolute inset-0 bg-background/70 backdrop-blur-sm flex items-center justify-center rounded-2xl"
                  initial={false}
                  animate={{ opacity: isHovered ? 1 : 0 }}
                  transition={{ duration: 0.2 }}
                  style={{ pointerEvents: isHovered ? "auto" : "none" }}
                >
                  <Link
                    to={`/project/${project.slug}`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-foreground text-background text-sm font-medium hover:scale-105 transition-transform duration-200"
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
    </motion.div>
  );
};

const Projects = () => {
  return (
    <section id="portfolio" className="relative bg-background">
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-background to-transparent pointer-events-none z-10" />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
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

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-20 md:gap-14">
          {projectGroups.map((group) => (
            <CardStack key={group.caption} caption={group.caption} projects={group.projects} />
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none z-10" />
    </section>
  );
};

export default Projects;
