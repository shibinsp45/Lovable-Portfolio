import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";

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
        accent: "bg-emerald-500",
      },
      {
        title: "Tools - Service App",
        description: "On-demand tools and repair service app – we are here to help you.",
        image: "/projects/tools-app.png",
        slug: "tools-app",
        year: "2025",
        role: "UI/UX Designer",
        accent: "bg-orange-500",
      },
      {
        title: "Fudit - Food Delivery",
        description: "AI-powered food delivery app – satisfy your cravings, delivered to your home.",
        image: "/projects/fudit-app.png",
        slug: "fudit-app",
        year: "2024",
        role: "UI/UX Designer",
        accent: "bg-red-500",
      },
      {
        title: "GetFit - Fitness Tracker",
        description: "Fitness tracking app case study – where fitness meets passion.",
        image: "/projects/fitness-app.jpg",
        slug: "fitness-app",
        year: "2024",
        role: "UI/UX Designer",
        accent: "bg-lime-500",
      },
      {
        title: "GroPlan - Grocery App",
        description: "Smart grocery & meal planning app – your smart kitchen buddy.",
        image: "/projects/grocery-app.jpg",
        slug: "grocery-app",
        year: "2025",
        role: "UI/UX Designer",
        accent: "bg-emerald-500",
      },
      {
        title: "ProMedic - Medicine Vending",
        description: "Medicine vending machine case study – access medicines faster during emergencies.",
        image: "/projects/medicine-vending.png",
        slug: "medicine-vending",
        year: "2024",
        role: "UI/UX Designer",
        accent: "bg-sky-500",
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
        accent: "bg-violet-500",
      },
      {
        title: "ElitePath Dashboard",
        description: "Student management dashboard with progress tracking and achievements.",
        image: "/projects/elitepath.png",
        slug: "elitepath",
        year: "2024",
        role: "UI/UX Designer",
        accent: "bg-indigo-500",
      },
      {
        title: "Beat Landing Page",
        description: "Education platform landing page – launch your career with India's leading educator.",
        image: "/projects/beat-landing.png",
        slug: "beat-landing",
        year: "2024",
        role: "Web Developer",
        accent: "bg-yellow-500",
      },
      {
        title: "TeaTym Product Website",
        description: "Product website for a tea brand – a cup of tea is a cup of peace.",
        image: "/projects/teatym.jpg",
        slug: "teatym",
        year: "2024",
        role: "Web Developer",
        accent: "bg-amber-600",
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
        accent: "bg-pink-500",
      },
      {
        title: "Smiley Wallpaper Design",
        description: "Desktop wallpaper design with a cheerful smiley theme.",
        image: "/projects/smiley-wallpaper.png",
        slug: "smiley-wallpaper",
        year: "2024",
        role: "Graphic Designer",
        accent: "bg-yellow-400",
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
        accent: "bg-rose-400",
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
        accent: "bg-cyan-500",
      },
      {
        title: "How Your Brain Shapes UX",
        description: "How cognitive psychology influences user experience without you even realizing it.",
        image: "/projects/brain-ux-blog.png",
        slug: "brain-shapes-ux",
        year: "2025",
        role: "Writer",
        accent: "bg-purple-500",
      },
      {
        title: "Human-Computer Interaction",
        description: "The science, principles, and real-world applications of how humans and computers understand each other.",
        image: "/projects/hci-blog.jpg",
        slug: "human-computer-interaction",
        year: "2025",
        role: "Writer & Researcher",
        accent: "bg-teal-500",
      },
    ],
  },
];

const CarouselGroup = ({
  group,
  groupIndex,
}: {
  group: (typeof projectGroups)[0];
  groupIndex: number;
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const scrollToIndex = (index: number) => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const cards = container.children;
    if (cards[index]) {
      const card = cards[index] as HTMLElement;
      const containerRect = container.getBoundingClientRect();
      const cardRect = card.getBoundingClientRect();
      const scrollLeft = card.offsetLeft - containerRect.width / 2 + cardRect.width / 2;
      container.scrollTo({ left: scrollLeft, behavior: "smooth" });
    }
    setActiveIndex(index);
  };

  useEffect(() => {
    if (isPlaying && group.projects.length > 1) {
      intervalRef.current = setInterval(() => {
        setActiveIndex((prev) => {
          const next = (prev + 1) % group.projects.length;
          scrollToIndex(next);
          return next;
        });
      }, 4000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying, group.projects.length]);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const scrollCenter = container.scrollLeft + container.clientWidth / 2;
    let closestIndex = 0;
    let closestDist = Infinity;
    Array.from(container.children).forEach((child, i) => {
      const el = child as HTMLElement;
      const center = el.offsetLeft + el.offsetWidth / 2;
      const dist = Math.abs(scrollCenter - center);
      if (dist < closestDist) {
        closestDist = dist;
        closestIndex = i;
      }
    });
    setActiveIndex(closestIndex);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: groupIndex * 0.1 }}
    >
      {/* Section Title */}
      <h3
        className="text-center text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-8 sm:mb-10"
        style={{ fontFamily: "'Quicksand', sans-serif" }}
      >
        {group.caption}
      </h3>

      {/* Carousel */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex gap-4 sm:gap-5 overflow-x-auto snap-x snap-mandatory scrollbar-hide px-4 sm:px-8 pb-2"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {group.projects.map((project, index) => (
          <Link
            key={project.slug}
            to={`/project/${project.slug}`}
            className="group flex-shrink-0 snap-center w-[85vw] sm:w-[70vw] md:w-[50vw] lg:w-[40vw] xl:w-[35vw]"
          >
            <div className="relative rounded-2xl overflow-hidden bg-card border border-border/30">
              {/* Cover Image */}
              <div className="relative w-full aspect-[3/4] sm:aspect-[4/5]">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                {/* Gradient overlay at bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Role chip */}
                <div className="absolute bottom-28 sm:bottom-32 left-4 sm:left-5">
                  <span
                    className="inline-block px-3 py-1 rounded-md bg-muted/80 backdrop-blur-sm text-[10px] sm:text-xs text-foreground font-medium"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    {project.role}
                  </span>
                </div>

                {/* Bottom content overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                  <p
                    className="text-xs sm:text-sm text-white/80 leading-relaxed mb-3 sm:mb-4 line-clamp-2"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    {project.description}
                  </p>
                  <div className="flex items-center justify-center w-full py-2.5 sm:py-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-colors duration-300">
                    <span
                      className="text-xs sm:text-sm font-medium text-white tracking-wide"
                      style={{ fontFamily: "'Quicksand', sans-serif" }}
                    >
                      Explore
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Dots & controls */}
      {group.projects.length > 1 && (
        <div className="flex items-center justify-center gap-4 mt-5 sm:mt-6">
          <div className="flex items-center gap-1.5">
            {group.projects.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollToIndex(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === activeIndex
                    ? "w-6 h-2.5 bg-foreground"
                    : "w-2.5 h-2.5 bg-muted-foreground/40 hover:bg-muted-foreground/60"
                }`}
              />
            ))}
          </div>
          <button
            onClick={() => setIsPlaying((p) => !p)}
            className="w-8 h-8 rounded-full border border-border/50 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
          >
            {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
          </button>
        </div>
      )}
    </motion.div>
  );
};

const Projects = () => {
  return (
    <section id="portfolio" className="relative bg-background">
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-background to-transparent pointer-events-none z-10" />

      <div className="relative z-10 py-16 sm:py-24 md:py-32">
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

        <div className="flex flex-col gap-20 sm:gap-28">
          {projectGroups.map((group, groupIndex) => (
            <CarouselGroup key={group.caption} group={group} groupIndex={groupIndex} />
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none z-10" />
    </section>
  );
};

export default Projects;
