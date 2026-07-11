import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const projectGroups = [
  {
    caption: "UI UX Designs and Case Studies",
    projects: [
      {
        title: "Billzy - Simple Invoice Generator App",
        description: "A mobile invoice app case study – create bills faster, manage your shop better.",
        image: "/projects/invoice-generator.jpg",
        slug: "invoice-generator",
        year: "2025",
        role: "UI/UX Designer",
        type: "Case Study",
      },
      {
        title: "Tools - Emergency Service App",
        description: "On-demand tools and repair service app – we are here to help you.",
        image: "/projects/tools-app.png",
        slug: "tools-app",
        year: "2025",
        role: "UI/UX Designer",
        type: "Case Study",
      },
      {
        title: "Fudit -AI powered  Food Delivery App",
        description: "AI-powered food delivery app – satisfy your cravings, delivered to your home.",
        image: "/projects/fudit-app.png",
        slug: "fudit-app",
        year: "2024",
        role: "UI/UX Designer",
        type: "Case Study",
      },
      {
        title: "GetFit - Personalized  Fitness Tracker",
        description: "Fitness tracking app case study – where fitness meets passion.",
        image: "/projects/fitness-app.jpg",
        slug: "fitness-app",
        year: "2024",
        role: "UI/UX Designer",
        type: "Case Study",
      },
      {
        title: "GroPlan - Grocery Planner  App",
        description: "Smart grocery & meal planning app – your smart kitchen buddy.",
        image: "/projects/grocery-app.jpg",
        slug: "grocery-app",
        year: "2025",
        role: "UI/UX Designer",
        type: "Case Study",
      },
      {
        title: "PROMedic - Emergency Medicine ",
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
        title: "AJ Delight Point Branding",
        description: "Complete branding design for AJ Delight Point Bakery – packaging, logo, and visual identity.",
        image: "/projects/aj-delight-point.png",
        slug: "aj-delight-point",
        year: "2026",
        role: "Brand Designer",
        type: "Branding",
        objectFit: "contain" as const,
        imageBg: "#f5efe6",
      },
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
      <div className="relative rounded-2xl overflow-hidden bg-card/50 backdrop-blur-2xl border border-border/30 shadow-sm group-hover:border-border/50 group-hover:shadow-md transition-all duration-500">
        <div className="px-5 pt-5 pb-3 relative z-20">
          <h4
            className="text-base sm:text-lg font-semibold text-foreground truncate"
            style={{ fontFamily: "'Quicksand', sans-serif" }}
          >
            {project.title}
          </h4>
        </div>

        <div className="relative w-full aspect-[4/3] overflow-hidden" style={{ backgroundColor: project.imageBg || 'hsl(var(--muted))' }}>
          <img
            src={project.image}
            alt={project.title}
            className={`w-full h-full ${project.objectFit === "contain" ? "object-contain" : "object-cover"} group-hover:scale-105 transition-transform duration-700`}
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

const MobileStickyCard = ({
  project,
  index,
  total,
}: {
  project: (typeof projectGroups)[0]["projects"][0];
  index: number;
  total: number;
}) => {
  return (
    <div
      className="sticky"
      style={{
        top: `${80 + index * 12}px`,
        zIndex: index + 1,
        paddingBottom: index === total - 1 ? 0 : "1rem",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-30px" }}
        transition={{ duration: 0.4, delay: index * 0.05 }}
        style={{
          transform: `scale(${1 - (total - 1 - index) * 0.02})`,
        }}
      >
        <Link to={`/project/${project.slug}`} className="group block">
          <div className="relative rounded-2xl overflow-hidden bg-card border border-border/30 shadow-lg">
            <div className="px-4 pt-4 pb-2 relative z-20">
              <h4
                className="text-base font-semibold text-foreground truncate"
                style={{ fontFamily: "'Quicksand', sans-serif" }}
              >
                {project.title}
              </h4>
            </div>

            <div className="relative w-full aspect-[4/3] overflow-hidden" style={{ backgroundColor: project.imageBg || 'hsl(var(--muted))' }}>
              <img
                src={project.image}
                alt={project.title}
                className={`w-full h-full ${project.objectFit === "contain" ? "object-contain" : "object-cover"}`}
                loading="lazy"
              />
            </div>

            <div className="px-4 pt-3 pb-4 relative z-20">
              <p
                className="text-sm text-muted-foreground leading-relaxed line-clamp-2 mb-3"
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
                <ArrowUpRight className="w-5 h-5 text-muted-foreground" />
              </div>
            </div>
          </div>
        </Link>
      </motion.div>
    </div>
  );
};

const DesktopProjectGrid = ({
  group,
}: {
  group: (typeof projectGroups)[0];
}) => {
  return (
    <div className="max-w-6xl mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
        {group.projects.map((project, index) => (
          <motion.div
            key={project.slug}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: (index % 2) * 0.1 }}
          >
            <Link to={`/project/${project.slug}`} className="group block">
              <div
                className="relative rounded-3xl overflow-hidden aspect-[4/3] shadow-sm group-hover:shadow-xl transition-all duration-500"
                style={{ backgroundColor: project.imageBg || "hsl(var(--muted))" }}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className={`w-full h-full ${
                    project.objectFit === "contain" ? "object-contain" : "object-cover"
                  } group-hover:scale-[1.03] transition-transform duration-700`}
                  loading="lazy"
                />
              </div>

              <div className="mt-5 flex items-start justify-between gap-6">
                <div className="flex-1 min-w-0">
                  <h4
                    className="text-xl md:text-2xl font-semibold text-foreground tracking-tight"
                    style={{ fontFamily: "'Quicksand', sans-serif" }}
                  >
                    {project.title}
                  </h4>
                  <p
                    className="mt-1 text-sm md:text-base text-muted-foreground leading-relaxed line-clamp-2"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    {project.description}
                  </p>
                </div>
                <span
                  className="shrink-0 inline-flex items-center gap-1 text-sm md:text-base text-primary font-medium whitespace-nowrap pt-1 group-hover:gap-2 transition-all"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  Peek inside
                  <ArrowUpRight className="w-4 h-4 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};


const ScrollableProjectRow = ({
  group,
  groupIndex,
}: {
  group: (typeof projectGroups)[0];
  groupIndex: number;
}) => {
  const isMobile = useIsMobile();

  return (
    <div>
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

      {isMobile ? (
        <div className="px-4">
          {group.projects.map((project, i) => (
            <MobileStickyCard
              key={project.slug}
              project={project}
              index={i}
              total={group.projects.length}
            />
          ))}
        </div>
      ) : (
        <DesktopProjectGrid group={group} />
      )}
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

      <div className="relative z-10 py-14 sm:py-16 md:py-20">
        <motion.div
          style={{ y: headerY }}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 130, damping: 20 }}
          className="text-center mb-10 sm:mb-12 md:mb-14"
        >
          <span
            className="text-xs sm:text-sm font-light tracking-[0.3em] uppercase text-muted-foreground mb-3 sm:mb-4 block"
            style={{ fontFamily: "'Quicksand', sans-serif" }}
          >
            Selected Work
          </span>
          <h2
            className="font-light tracking-tight text-muted-foreground"
            style={{ fontFamily: "'Quicksand', sans-serif", fontSize: "clamp(2rem, 6vw, 4.5rem)" }}
          >
            Projects
          </h2>
        </motion.div>

        <div className="flex flex-col gap-16 sm:gap-20 md:gap-24">
          {projectGroups.map((group, groupIndex) => (
            <ScrollableProjectRow key={group.caption} group={group} groupIndex={groupIndex} />
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none z-10" />
    </section>
  );
};

export default Projects;
