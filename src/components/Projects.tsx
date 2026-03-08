import { motion, PanInfo } from "framer-motion";
import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Eye } from "lucide-react";

const projectGroups = [
  {
    caption: "UI UX Design",
    projects: [
      {
        title: "Invoice Generator App",
        description: "A mobile invoice app case study – create bills faster, manage your shop better.",
        image: "/projects/invoice-generator.jpg",
        slug: "invoice-generator",
        year: "2025",
        role: "UI/UX Designer",
      },
      {
        title: "Tools - Service App",
        description: "On-demand tools and repair service app – we are here to help you.",
        image: "/projects/tools-app.png",
        slug: "tools-app",
        year: "2025",
        role: "UI/UX Designer",
      },
      {
        title: "Fudit - Food Delivery",
        description: "AI-powered food delivery app – satisfy your cravings, delivered to your home.",
        image: "/projects/fudit-app.png",
        slug: "fudit-app",
        year: "2024",
        role: "UI/UX Designer",
      },
      {
        title: "GetFit - Fitness Tracker",
        description: "Fitness tracking app case study – where fitness meets passion.",
        image: "/projects/fitness-app.jpg",
        slug: "fitness-app",
        year: "2024",
        role: "UI/UX Designer",
      },
      {
        title: "GroPlan - Grocery App",
        description: "Smart grocery & meal planning app – your smart kitchen buddy.",
        image: "/projects/grocery-app.jpg",
        slug: "grocery-app",
        year: "2025",
        role: "UI/UX Designer",
      },
      {
        title: "ProMedic - Medicine Vending",
        description: "Medicine vending machine case study – access medicines faster during emergencies.",
        image: "/projects/medicine-vending.png",
        slug: "medicine-vending",
        year: "2024",
        role: "UI/UX Designer",
      },
    ],
  },
  {
    caption: "Web Development",
    projects: [
      {
        title: "Event Management Website",
        description: "Crafting unforgettable user experiences for event management.",
        image: "/projects/event-mgmt.jpg",
        slug: "event-mgmt",
        year: "2024",
        role: "Web Designer",
      },
      {
        title: "ElitePath Dashboard",
        description: "Student management dashboard with progress tracking and achievements.",
        image: "/projects/elitepath.png",
        slug: "elitepath",
        year: "2024",
        role: "UI/UX Designer",
      },
      {
        title: "Beat Landing Page",
        description: "Education platform landing page – launch your career with India's leading educator.",
        image: "/projects/beat-landing.png",
        slug: "beat-landing",
        year: "2024",
        role: "Web Developer",
      },
      {
        title: "TeaTym Product Website",
        description: "Product website for a tea brand – a cup of tea is a cup of peace.",
        image: "/projects/teatym.jpg",
        slug: "teatym",
        year: "2024",
        role: "Web Developer",
      },
    ],
  },
  {
    caption: "Product Branding",
    projects: [
      {
        title: "Happy Cart Branding",
        description: "Branding design for a shopping cart – vibrant and playful identity.",
        image: "/projects/happy-cart.png",
        slug: "happy-cart",
        year: "2024",
        role: "Brand Designer",
      },
      {
        title: "Smiley Wallpaper Design",
        description: "Desktop wallpaper design with a cheerful smiley theme.",
        image: "/projects/smiley-wallpaper.png",
        slug: "smiley-wallpaper",
        year: "2024",
        role: "Graphic Designer",
      },
    ],
  },
  {
    caption: "Generative AI",
    projects: [
      {
        title: "Perfume Branding Collections",
        description: "AI-generated perfume branding with elegant bottle designs and luxury aesthetics.",
        image: "/projects/perfume-branding.png",
        slug: "perfume-branding",
        year: "2025",
        role: "AI Designer",
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
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);
  const pauseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const pauseAutoCycle = useCallback(() => {
    // No-op: auto-rotation disabled
  }, []);

  const handleSwipe = (_: any, info: PanInfo) => {
    pauseAutoCycle();
    const swipeThreshold = 50;
    if (info.offset.y < -swipeThreshold) {
      setActiveIndex((prev) => (prev + 1) % projects.length);
    } else if (info.offset.y > swipeThreshold) {
      setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);
    }
  };

  const handleCardTap = (index: number, position: number) => {
    pauseAutoCycle();
    if (position > 0) {
      setActiveIndex(index);
      setFlippedIndex(null);
    } else if (position === 0) {
      setFlippedIndex(flippedIndex === index ? null : index);
    }
  };

  const cardHeight = 320;
  const titleBarHeight = 44;

  // Get wrapped position for infinite scrolling
  const getPosition = (index: number) => {
    let pos = index - activeIndex;
    if (pos < -Math.floor(projects.length / 2)) pos += projects.length;
    if (pos > Math.floor(projects.length / 2)) pos -= projects.length;
    return pos;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-center"
    >
      <h3
        className="text-2xl sm:text-3xl font-light tracking-tight text-foreground mb-8"
        style={{ fontFamily: "'Quicksand', sans-serif" }}
      >
        {caption}
      </h3>

      <div
        className="relative w-full max-w-[380px] sm:max-w-[420px]"
        style={{
          height: `${cardHeight + 16}px`,
          marginTop: `${Math.min(projects.length - 1, 3) * titleBarHeight}px`,
          perspective: "1200px",
        }}
      >
        {projects.map((project, index) => {
          const position = getPosition(index);
          if (position < -1 || position > 3) return null;

          const isFront = position === 0;
          const isSwiped = position < 0;
          const isFlipped = flippedIndex === index && isFront;
          const tint = cardTints[index % cardTints.length];

          return (
            <motion.div
              key={project.slug}
              className="absolute left-0 right-0 top-0"
              animate={{
                y: isSwiped ? -cardHeight - 60 : position * -titleBarHeight,
                zIndex: isSwiped ? 0 : projects.length - position,
                opacity: isSwiped ? 0 : 1,
                rotateY: isFlipped ? 180 : 0,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              drag={isFront && !isFlipped ? "y" : false}
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={0.15}
              onDragEnd={isFront ? handleSwipe : undefined}
              onClick={() => handleCardTap(index, position)}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{
                transformOrigin: "center center",
                height: `${cardHeight}px`,
                cursor: "pointer",
                transformStyle: "preserve-3d",
              }}
            >
              {/* Front face */}
              <div
                className={`absolute inset-0 rounded-2xl overflow-hidden border backdrop-blur-xl flex flex-col bg-gradient-to-b ${tint}`}
                style={{ backfaceVisibility: "hidden" }}
              >
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

                <div className="relative flex-1 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    draggable={false}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
                  {/* Tap hint on front card */}
                  {isFront && !isFlipped && (
                    <div className="absolute bottom-3 right-3 text-[10px] tracking-wider uppercase text-foreground/60 bg-background/30 backdrop-blur-sm px-3 py-1 rounded-full"
                      style={{ fontFamily: "'Poppins', sans-serif" }}
                    >
                      Tap to flip
                    </div>
                  )}
                </div>

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
                {isFront && !isFlipped && (
                  <motion.div
                    className="absolute inset-0 bg-background/70 backdrop-blur-sm flex items-center justify-center rounded-2xl"
                    initial={false}
                    animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
                    transition={{ duration: 0.2 }}
                    style={{ pointerEvents: hoveredIndex === index ? "auto" : "none" }}
                  >
                    <div className="flex flex-col items-center gap-3">
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
                      <span
                        className="text-[10px] tracking-wider uppercase text-muted-foreground"
                        style={{ fontFamily: "'Poppins', sans-serif" }}
                      >
                        or tap to flip
                      </span>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Back face — View Project */}
              <div
                className={`absolute inset-0 rounded-2xl overflow-hidden border backdrop-blur-xl flex flex-col items-center justify-center bg-gradient-to-b ${tint}`}
                style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
              >
                <div className="text-center px-6">
                  <h4
                    className="text-2xl font-light tracking-tight text-foreground mb-2"
                    style={{ fontFamily: "'Quicksand', sans-serif" }}
                  >
                    {project.title}
                  </h4>
                  <p
                    className="text-sm text-muted-foreground mb-6 leading-relaxed"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    {project.description}
                  </p>
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
                  <p
                    className="text-[10px] tracking-wider uppercase text-muted-foreground/60 mt-4"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    Tap to flip back
                  </p>
                </div>
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
