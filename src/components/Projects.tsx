import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Pause, Play } from "lucide-react";

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
        accent: "bg-emerald-500",
      },
      {
        title: "Tools - Service App",
        description: "On-demand tools and repair service app – we are here to help you.",
        image: "/projects/tools-app.png",
        slug: "tools-app",
        year: "2025",
        role: "UI/UX Designer",
        type: "Case Study",
        accent: "bg-orange-500",
      },
      {
        title: "Fudit - Food Delivery",
        description: "AI-powered food delivery app – satisfy your cravings, delivered to your home.",
        image: "/projects/fudit-app.png",
        slug: "fudit-app",
        year: "2024",
        role: "UI/UX Designer",
        type: "Case Study",
        accent: "bg-red-500",
      },
      {
        title: "GetFit - Fitness Tracker",
        description: "Fitness tracking app case study – where fitness meets passion.",
        image: "/projects/fitness-app.jpg",
        slug: "fitness-app",
        year: "2024",
        role: "UI/UX Designer",
        type: "Case Study",
        accent: "bg-lime-500",
      },
      {
        title: "GroPlan - Grocery App",
        description: "Smart grocery & meal planning app – your smart kitchen buddy.",
        image: "/projects/grocery-app.jpg",
        slug: "grocery-app",
        year: "2025",
        role: "UI/UX Designer",
        type: "Case Study",
        accent: "bg-emerald-500",
      },
      {
        title: "ProMedic - Medicine Vending",
        description: "Medicine vending machine case study – access medicines faster during emergencies.",
        image: "/projects/medicine-vending.png",
        slug: "medicine-vending",
        year: "2024",
        role: "UI/UX Designer",
        type: "Case Study",
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
        type: "Website",
        accent: "bg-violet-500",
      },
      {
        title: "ElitePath Dashboard",
        description: "Student management dashboard with progress tracking and achievements.",
        image: "/projects/elitepath.png",
        slug: "elitepath",
        year: "2024",
        role: "UI/UX Designer",
        type: "Dashboard",
        accent: "bg-indigo-500",
      },
      {
        title: "Beat Landing Page",
        description: "Education platform landing page – launch your career with India's leading educator.",
        image: "/projects/beat-landing.png",
        slug: "beat-landing",
        year: "2024",
        role: "Web Developer",
        type: "Landing Page",
        accent: "bg-yellow-500",
      },
      {
        title: "TeaTym Product Website",
        description: "Product website for a tea brand – a cup of tea is a cup of peace.",
        image: "/projects/teatym.jpg",
        slug: "teatym",
        year: "2024",
        role: "Web Developer",
        type: "Product Website",
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
        type: "Branding",
        accent: "bg-pink-500",
      },
      {
        title: "Smiley Wallpaper Design",
        description: "Desktop wallpaper design with a cheerful smiley theme.",
        image: "/projects/smiley-wallpaper.png",
        slug: "smiley-wallpaper",
        year: "2024",
        role: "Graphic Designer",
        type: "Graphic Design",
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
        type: "AI Design",
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
        type: "Blog",
        accent: "bg-cyan-500",
      },
      {
        title: "How Your Brain Shapes UX",
        description: "How cognitive psychology influences user experience without you even realizing it.",
        image: "/projects/brain-ux-blog.png",
        slug: "brain-shapes-ux",
        year: "2025",
        role: "Writer",
        type: "Blog",
        accent: "bg-purple-500",
      },
      {
        title: "Human-Computer Interaction",
        description: "The science, principles, and real-world applications of how humans and computers understand each other.",
        image: "/projects/hci-blog.jpg",
        slug: "human-computer-interaction",
        year: "2025",
        role: "Writer & Researcher",
        type: "Article",
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
  const groupRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: groupRef,
    offset: ["start end", "end start"],
  });

  const titleY = useTransform(scrollYProgress, [0, 1], ["30%", "-30%"]);
  const cardsY = useTransform(scrollYProgress, [0, 1], ["15%", "-15%"]);
  const dotsY = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);

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
    <div ref={groupRef}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, delay: groupIndex * 0.1 }}
      >
        <motion.h3
          style={{ y: titleY }}
          className="text-center text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-8 sm:mb-10"
          {...{ style: { fontFamily: "'Quicksand', sans-serif", y: titleY } }}
        >
          {group.caption}
        </motion.h3>

        <motion.div style={{ y: cardsY }}>
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex gap-6 sm:gap-8 overflow-x-auto snap-x snap-mandatory scrollbar-hide px-6 sm:px-12 pb-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {group.projects.map((project) => (
              <Link
                key={project.slug}
                to={`/project/${project.slug}`}
                className="group flex-shrink-0 snap-center w-[75vw] sm:w-[50vw] md:w-[38vw] lg:w-[28vw] xl:w-[24vw]"
              >
                <div className="relative rounded-2xl overflow-hidden bg-card border border-border/30">
                  {/* Project name on top */}
                  <div className="px-4 pt-4 pb-2">
                    <h4
                      className="text-sm sm:text-base font-semibold text-foreground truncate"
                      style={{ fontFamily: "'Quicksand', sans-serif" }}
                    >
                      {project.title}
                    </h4>
                  </div>

                  {/* Image - standard card ratio */}
                  <div className="relative w-full aspect-[16/10] overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                  </div>

                  {/* Description and type at bottom */}
                  <div className="px-4 pt-3 pb-4">
                    <p
                      className="text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-2 mb-3"
                      style={{ fontFamily: "'Poppins', sans-serif" }}
                    >
                      {project.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span
                        className="text-[10px] sm:text-xs text-muted-foreground/70 font-medium uppercase tracking-wider"
                        style={{ fontFamily: "'Poppins', sans-serif" }}
                      >
                        {project.type} · {project.year}
                      </span>
                      <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </motion.div>

        {group.projects.length > 1 && (
          <motion.div style={{ y: dotsY }} className="flex items-center justify-center gap-4 mt-5 sm:mt-6">
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
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

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
