import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";

const projectGroups = [
  {
    caption: "UI UX Designs and Case Studies",
    projects: [
      {
        title: "Invoice Generator App",
        description: "A mobile invoice app case study – create bills faster, manage your shop better.",
        image: "/projects/invoice-generator.jpg",
        slug: "invoice-generator",
        year: "2025",
        role: "UI/UX Designer",
        type: "Case Study",
      },
      {
        title: "Tools - Service App",
        description: "On-demand tools and repair service app – we are here to help you.",
        image: "/projects/tools-app.png",
        slug: "tools-app",
        year: "2025",
        role: "UI/UX Designer",
        type: "Case Study",
      },
      {
        title: "Fudit - Food Delivery",
        description: "AI-powered food delivery app – satisfy your cravings, delivered to your home.",
        image: "/projects/fudit-app.png",
        slug: "fudit-app",
        year: "2024",
        role: "UI/UX Designer",
        type: "Case Study",
      },
      {
        title: "GetFit - Fitness Tracker",
        description: "Fitness tracking app case study – where fitness meets passion.",
        image: "/projects/fitness-app.jpg",
        slug: "fitness-app",
        year: "2024",
        role: "UI/UX Designer",
        type: "Case Study",
      },
      {
        title: "GroPlan - Grocery App",
        description: "Smart grocery & meal planning app – your smart kitchen buddy.",
        image: "/projects/grocery-app.jpg",
        slug: "grocery-app",
        year: "2025",
        role: "UI/UX Designer",
        type: "Case Study",
      },
      {
        title: "ProMedic - Medicine Vending",
        description: "Medicine vending machine case study – access medicines faster during emergencies.",
        image: "/projects/medicine-vending.png",
        slug: "medicine-vending",
        year: "2024",
        role: "UI/UX Designer",
        type: "Case Study",
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
        type: "Website",
      },
      {
        title: "ElitePath Dashboard",
        description: "Student management dashboard with progress tracking and achievements.",
        image: "/projects/elitepath.png",
        slug: "elitepath",
        year: "2024",
        role: "UI/UX Designer",
        type: "Dashboard",
      },
      {
        title: "Beat Landing Page",
        description: "Education platform landing page – launch your career with India's leading educator.",
        image: "/projects/beat-landing.png",
        slug: "beat-landing",
        year: "2024",
        role: "Web Developer",
        type: "Landing Page",
      },
      {
        title: "TeaTym Product Website",
        description: "Product website for a tea brand – a cup of tea is a cup of peace.",
        image: "/projects/teatym.jpg",
        slug: "teatym",
        year: "2024",
        role: "Web Developer",
        type: "Product Website",
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
        type: "Branding",
      },
      {
        title: "Smiley Wallpaper Design",
        description: "Desktop wallpaper design with a cheerful smiley theme.",
        image: "/projects/smiley-wallpaper.png",
        slug: "smiley-wallpaper",
        year: "2024",
        role: "Graphic Designer",
        type: "Graphic Design",
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
        type: "AI Design",
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
        type: "Blog",
      },
      {
        title: "How Your Brain Shapes UX",
        description: "How cognitive psychology influences user experience without you even realizing it.",
        image: "/projects/brain-ux-blog.png",
        slug: "brain-shapes-ux",
        year: "2025",
        role: "Writer",
        type: "Blog",
      },
      {
        title: "Human-Computer Interaction",
        description: "The science, principles, and real-world applications of how humans and computers understand each other.",
        image: "/projects/hci-blog.jpg",
        slug: "human-computer-interaction",
        year: "2025",
        role: "Writer & Researcher",
        type: "Article",
      },
    ],
  },
];

const ProjectCard = ({
  project,
  index,
}: {
  project: (typeof projectGroups)[0]["projects"][0];
  index: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
  >
    <Link to={`/project/${project.slug}`} className="group block">
      <div className="relative rounded-2xl overflow-hidden bg-white/[0.04] backdrop-blur-2xl border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.06)] group-hover:border-white/[0.15] group-hover:shadow-[0_8px_40px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.1)] transition-all duration-500">
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] via-transparent to-transparent pointer-events-none z-10 rounded-2xl" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none z-10 rounded-2xl" />

        <div className="px-5 pt-5 pb-3 relative z-20">
          <h4
            className="text-base sm:text-lg font-semibold text-foreground truncate"
            style={{ fontFamily: "'Quicksand', sans-serif" }}
          >
            {project.title}
          </h4>
        </div>

        <div className="relative w-full aspect-[4/3] overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            loading="lazy"
          />
        </div>

        <div className="px-5 pt-4 pb-5 relative z-20">
          <p
            className="text-sm text-muted-foreground leading-relaxed line-clamp-2 mb-4"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            {project.description}
          </p>
          <div className="flex items-center justify-between">
            <span
              className="text-xs text-muted-foreground/70 font-medium uppercase tracking-wider"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              {project.type} · {project.year}
            </span>
            <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
          </div>
        </div>
      </div>
    </Link>
  </motion.div>
);

const Projects = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const headerY = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);

  return (
    <section id="portfolio" className="relative bg-background" ref={sectionRef}>
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-background to-transparent pointer-events-none z-10" />

      <div className="relative z-10 py-16 sm:py-24 md:py-32">
        <motion.div
          style={{ y: headerY }}
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

        <div className="flex flex-col gap-20 sm:gap-28">
          {projectGroups.map((group, groupIndex) => {
            const scrollRef = useRef<HTMLDivElement>(null);
            const [canScrollLeft, setCanScrollLeft] = useState(false);
            const [canScrollRight, setCanScrollRight] = useState(true);

            const checkScroll = useCallback(() => {
              if (!scrollRef.current) return;
              const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
              setCanScrollLeft(scrollLeft > 10);
              setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
            }, []);

            useEffect(() => {
              checkScroll();
            }, [checkScroll]);

            const scroll = (direction: "left" | "right") => {
              if (!scrollRef.current) return;
              const amount = scrollRef.current.clientWidth * 0.75;
              scrollRef.current.scrollBy({
                left: direction === "left" ? -amount : amount,
                behavior: "smooth",
              });
            };

            return (
              <div key={group.caption}>
                <motion.h3
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: groupIndex * 0.1 }}
                  className="text-center text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-8 sm:mb-12"
                  style={{ fontFamily: "'Quicksand', sans-serif" }}
                >
                  {group.caption}
                </motion.h3>

                <div className="relative group/scroll">
                  {/* Left arrow */}
                  {canScrollLeft && (
                    <button
                      onClick={() => scroll("left")}
                      className="absolute left-2 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm border border-border/50 flex items-center justify-center text-foreground opacity-0 group-hover/scroll:opacity-100 transition-opacity duration-300 hover:bg-primary hover:text-primary-foreground"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                  )}

                  {/* Right arrow */}
                  {canScrollRight && (
                    <button
                      onClick={() => scroll("right")}
                      className="absolute right-2 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm border border-border/50 flex items-center justify-center text-foreground opacity-0 group-hover/scroll:opacity-100 transition-opacity duration-300 hover:bg-primary hover:text-primary-foreground"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  )}

                  {/* Fade edges */}
                  {canScrollLeft && (
                    <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-background to-transparent z-20 pointer-events-none" />
                  )}
                  {canScrollRight && (
                    <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-background to-transparent z-20 pointer-events-none" />
                  )}

                  <div
                    ref={scrollRef}
                    onScroll={checkScroll}
                    className="flex gap-6 sm:gap-8 overflow-x-auto snap-x snap-mandatory px-6 sm:px-12 pb-4"
                    style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                  >
                    {group.projects.map((project, i) => (
                      <div key={project.slug} className="flex-shrink-0 snap-center w-[85vw] sm:w-[60vw] md:w-[45vw] lg:w-[30vw]">
                        <ProjectCard project={project} index={i} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none z-10" />
    </section>
  );
};

export default Projects;
