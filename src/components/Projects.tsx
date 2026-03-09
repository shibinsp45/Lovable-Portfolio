import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

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

const ProjectCard = ({
  project,
  index,
}: {
  project: (typeof projectGroups)[0]["projects"][0];
  index: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link
        to={`/project/${project.slug}`}
        className="group block rounded-2xl bg-card border border-border/50 overflow-hidden hover:border-border transition-all duration-300 hover:shadow-lg hover:shadow-border/5"
      >
        {/* Header */}
        <div className="p-5 sm:p-6 pb-3 sm:pb-4">
          <div className="flex items-center gap-2 mb-3">
            <div className={`w-8 h-8 rounded-lg ${project.accent} flex items-center justify-center`}>
              <span className="text-xs font-bold text-background" style={{ fontFamily: "'Poppins', sans-serif" }}>
                {project.role.split(" ")[0].charAt(0)}
              </span>
            </div>
            <span
              className="text-[10px] tracking-[0.1em] uppercase text-muted-foreground"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              {project.role}
            </span>
          </div>

          <h4
            className="text-lg sm:text-xl font-semibold tracking-tight text-foreground mb-1.5 group-hover:text-primary transition-colors"
            style={{ fontFamily: "'Quicksand', sans-serif" }}
          >
            {project.title}
          </h4>
          <p
            className="text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-2"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            {project.description}
          </p>
        </div>

        {/* Image */}
        <div className="px-5 sm:px-6 pb-5 sm:pb-6">
          <div className="relative rounded-xl overflow-hidden bg-muted/30 aspect-[4/3]">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
              <div className="w-8 h-8 rounded-full bg-foreground flex items-center justify-center">
                <ArrowUpRight className="w-4 h-4 text-background" />
              </div>
            </div>
          </div>
        </div>
      </Link>
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
          {projectGroups.map((group, groupIndex) => (
            <div key={group.caption}>
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-xl sm:text-2xl md:text-3xl font-light tracking-tight text-foreground mb-8 sm:mb-10 text-center"
                style={{ fontFamily: "'Quicksand', sans-serif" }}
              >
                {group.caption}
              </motion.h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                {group.projects.map((project, index) => (
                  <ProjectCard key={project.slug} project={project} index={index} />
                ))}
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
