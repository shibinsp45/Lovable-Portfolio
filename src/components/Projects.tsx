import { motion, PanInfo } from "framer-motion";
import { useState, useRef, useCallback, useEffect } from "react";
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
    caption: "Blogs and Articles",
    projects: [
      {
        title: "Why UI/UX Design Shapes the World",
        description: "How UI/UX design decides whether we stay, trust, and return to digital products.",
        image: "/projects/uiux-blog.webp",
        slug: "uiux-shapes-world",
        year: "2025",
        role: "Writer",
      },
      {
        title: "How Your Brain Shapes UX",
        description: "How cognitive psychology influences user experience without you even realizing it.",
        image: "/projects/brain-ux-blog.png",
        slug: "brain-shapes-ux",
        year: "2025",
        role: "Writer",
      },
      {
        title: "Human-Computer Interaction",
        description: "The science, principles, and real-world applications of how humans and computers understand each other.",
        image: "/projects/hci-blog.jpg",
        slug: "human-computer-interaction",
        year: "2025",
        role: "Writer & Researcher",
      },
    ],
  },
];

interface CardStackProps {
  projects: typeof projectGroups[0]["projects"];
  caption: string;
}

const cardTints = [
  "from-blue-500/20 via-blue-400/10 to-transparent border-blue-400/20",
  "from-purple-500/20 via-purple-400/10 to-transparent border-purple-400/20",
  "from-emerald-500/20 via-emerald-400/10 to-transparent border-emerald-400/20",
  "from-rose-500/20 via-rose-400/10 to-transparent border-rose-400/20",
  "from-amber-500/20 via-amber-400/10 to-transparent border-amber-400/20",
  "from-cyan-500/20 via-cyan-400/10 to-transparent border-cyan-400/20",
  "from-pink-500/20 via-pink-400/10 to-transparent border-pink-400/20",
  "from-teal-500/20 via-teal-400/10 to-transparent border-teal-400/20",
];

const CardStack = ({ projects, caption }: CardStackProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [tappedIndex, setTappedIndex] = useState<number | null>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    setIsTouchDevice("ontouchstart" in window || navigator.maxTouchPoints > 0);
  }, []);

  const handleSwipe = (_: any, info: PanInfo) => {
    const swipeThreshold = 50;
    if (info.offset.y < -swipeThreshold) {
      setActiveIndex((prev) => (prev + 1) % projects.length);
    } else if (info.offset.y > swipeThreshold) {
      setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);
    }
  };

  const handleCardTap = (index: number, position: number) => {
    if (position > 0) {
      setActiveIndex(index);
      setTappedIndex(null);
    } else if (isTouchDevice) {
      // Toggle overlay on tap for touch devices
      setTappedIndex((prev) => (prev === index ? null : index));
    }
  };

  const smCardHeight = 360;
  const titleBarHeight = 40;
  const maxVisible = 3;

  const getPosition = (index: number) => {
    let pos = index - activeIndex;
    if (pos < -Math.floor(projects.length / 2)) pos += projects.length;
    if (pos > Math.floor(projects.length / 2)) pos -= projects.length;
    return pos;
  };

  const showOverlay = (index: number) => {
    if (isTouchDevice) return tappedIndex === index;
    return hoveredIndex === index;
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
        className="text-xl sm:text-2xl md:text-3xl font-light tracking-tight text-foreground mb-6 sm:mb-8"
        style={{ fontFamily: "'Quicksand', sans-serif" }}
      >
        {caption}
      </h3>

      <div
        className="relative w-full max-w-[340px] sm:max-w-[440px] md:max-w-[520px] lg:max-w-[480px] xl:max-w-[500px]"
        style={{
          height: `${smCardHeight + 16}px`,
          marginTop: `${Math.min(projects.length - 1, maxVisible - 1) * titleBarHeight}px`,
          perspective: "1200px",
        }}
      >
        {projects.map((project, index) => {
          const position = getPosition(index);
          if (position < -1 || position >= maxVisible) return null;

          const isFront = position === 0;
          const isSwiped = position < 0;
          const tint = cardTints[index % cardTints.length];

          return (
            <motion.div
              key={project.slug}
              className="absolute left-0 right-0 top-0"
              animate={{
                y: isSwiped ? -smCardHeight - 60 : position * -titleBarHeight,
                zIndex: isSwiped ? 0 : projects.length - position,
                opacity: isSwiped ? 0 : 1,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              drag={isFront ? "y" : false}
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={0.15}
              onDragEnd={isFront ? handleSwipe : undefined}
              onClick={() => handleCardTap(index, position)}
              onMouseEnter={() => !isTouchDevice && setHoveredIndex(index)}
              onMouseLeave={() => !isTouchDevice && setHoveredIndex(null)}
              style={{
                transformOrigin: "center center",
                height: `${smCardHeight}px`,
                cursor: "pointer",
                touchAction: isFront ? "pan-x" : "auto",
              }}
            >
              <div
                className={`absolute inset-0 rounded-2xl overflow-hidden border backdrop-blur-xl flex flex-col bg-gradient-to-b ${tint}`}
              >
                <div className="px-3 sm:px-4 md:px-5 py-2.5 sm:py-3 flex items-center justify-between border-b border-border/10 flex-shrink-0">
                  <h4
                    className="text-sm sm:text-base md:text-lg font-light tracking-tight text-foreground truncate"
                    style={{ fontFamily: "'Quicksand', sans-serif" }}
                  >
                    {project.title}
                  </h4>
                  {isFront && projects.length > 1 && (
                    <div
                      className="text-[8px] sm:text-[9px] tracking-[0.12em] text-muted-foreground/60 flex-shrink-0 ml-2 sm:ml-3"
                      style={{ fontFamily: "'Poppins', sans-serif" }}
                    >
                      {activeIndex + 1}/{projects.length}
                    </div>
                  )}
                </div>

                <div className="relative flex-1 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    draggable={false}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
                  {isFront && (
                    <Link
                      to={`/project/${project.slug}`}
                      className="absolute bottom-2 sm:bottom-3 right-2 sm:right-3 text-[9px] sm:text-[10px] tracking-wider uppercase text-foreground/60 bg-background/30 backdrop-blur-sm px-2.5 sm:px-3 py-1 rounded-full"
                      style={{ fontFamily: "'Poppins', sans-serif" }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      Tap to view
                    </Link>
                  )}
                </div>

                <div className="px-3 sm:px-4 md:px-5 py-2.5 sm:py-3">
                  <div
                    className="flex items-center gap-2 text-[9px] sm:text-[10px] tracking-[0.12em] uppercase text-muted-foreground mb-1"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    <span>{project.role}</span>
                  </div>
                  <p
                    className="text-[11px] sm:text-xs text-muted-foreground leading-relaxed line-clamp-2"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    {project.description}
                  </p>
                </div>

                {/* Overlay — View Project (hover on desktop, tap on mobile) */}
                {isFront && (
                  <motion.div
                    className="absolute inset-0 bg-background/70 backdrop-blur-sm flex items-center justify-center rounded-2xl"
                    initial={false}
                    animate={{ opacity: showOverlay(index) ? 1 : 0 }}
                    transition={{ duration: 0.2 }}
                    style={{ pointerEvents: showOverlay(index) ? "auto" : "none" }}
                  >
                    <div className="flex flex-col items-center gap-3">
                      <Link
                        to={`/project/${project.slug}`}
                        className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-foreground text-background text-xs sm:text-sm font-medium hover:scale-105 active:scale-95 transition-transform duration-200"
                        style={{ fontFamily: "'Poppins', sans-serif" }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        View Project
                        <ArrowUpRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      </Link>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Navigation dots for mobile */}
      {projects.length > 1 && (
        <div className="flex items-center gap-1.5 mt-4">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setActiveIndex(index);
                setTappedIndex(null);
              }}
              className={`rounded-full transition-all duration-300 ${
                index === activeIndex
                  ? "w-6 h-2 bg-primary"
                  : "w-2 h-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
              }`}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
};

const Projects = () => {
  return (
    <section id="portfolio" className="relative bg-background">
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-background to-transparent pointer-events-none z-10" />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16 md:mb-24"
        >
          <span
            className="text-xs sm:text-sm font-light tracking-[0.3em] uppercase text-muted-foreground mb-3 sm:mb-4 block"
            style={{ fontFamily: "'Quicksand', sans-serif" }}
          >
            Selected Work
          </span>
          <h2
            className="text-3xl sm:text-5xl md:text-7xl font-light tracking-tight text-muted-foreground"
            style={{ fontFamily: "'Quicksand', sans-serif" }}
          >
            Projects
          </h2>
        </motion.div>

        <div className="flex flex-col gap-16 sm:gap-20 max-w-7xl mx-auto">
          {projectGroups.map((group, index) => (
            <div
              key={group.caption}
              className={`flex ${index % 2 === 0 ? "justify-start" : "justify-end"}`}
            >
              <div className="w-full max-w-[340px] sm:max-w-[440px] md:max-w-[520px] lg:max-w-[560px] xl:max-w-[580px]">
                <CardStack caption={group.caption} projects={group.projects} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none z-10" />
    </section>
  );
};

export default Projects;
