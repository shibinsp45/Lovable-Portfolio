import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    title: "UI UX Designs",
    description: "Designing user-centric solutions that create meaningful digital experiences.",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=500&fit=crop",
    slug: "ui-ux-designs",
    category: "Design",
    bgGradient: "from-rose-500/80 via-pink-600/70 to-fuchsia-700/80",
    cardBg: "bg-rose-500",
  },
  {
    title: "Web Development",
    description: "Bringing websites to life with responsive design and robust code.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=500&fit=crop",
    slug: "web-development",
    category: "Development",
    bgGradient: "from-cyan-500/80 via-teal-600/70 to-emerald-700/80",
    cardBg: "bg-teal-500",
  },
  {
    title: "Product Branding",
    description: "Creating Unique Brand Identities Building that stand out.",
    image: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=600&h=500&fit=crop",
    slug: "product-branding",
    category: "Design",
    bgGradient: "from-violet-500/80 via-purple-600/70 to-indigo-700/80",
    cardBg: "bg-violet-500",
  },
  {
    title: "Mobile App Design",
    description: "Creating intuitive mobile experiences that users love to engage with.",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=500&fit=crop",
    slug: "mobile-app-design",
    category: "Design",
    bgGradient: "from-amber-500/80 via-orange-600/70 to-red-700/80",
    cardBg: "bg-orange-500",
  },
  {
    title: "Generative AI",
    description: "Exploring creative innovations powered by prompt generation.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=500&fit=crop",
    slug: "generative-ai",
    category: "AI",
    bgGradient: "from-blue-500/80 via-indigo-600/70 to-purple-700/80",
    cardBg: "bg-blue-500",
  },
  {
    title: "Psychology Articles",
    description: "Blending psychology and design to craft more human-centered products.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=500&fit=crop",
    slug: "psychology-articles",
    category: "Writing",
    bgGradient: "from-emerald-500/80 via-green-600/70 to-teal-700/80",
    cardBg: "bg-emerald-500",
  },
];

const Projects = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeProject = projects[activeIndex];

  return (
    <section id="portfolio" className="relative min-h-screen overflow-hidden">
      {/* Dynamic Background */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className={`absolute inset-0 bg-gradient-to-br ${activeProject.bgGradient}`}
        />
      </AnimatePresence>

      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 min-h-screen flex flex-col items-center justify-center">
        {/* Centered Project Types List */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center gap-3 sm:gap-4"
        >
          {projects.map((project, index) => (
            <motion.button
              key={project.slug}
              onClick={() => setActiveIndex(index)}
              className={`group flex items-center gap-3 transition-all duration-300 ${
                index === activeIndex 
                  ? "opacity-100 scale-105" 
                  : "opacity-40 hover:opacity-70"
              }`}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              {index === activeIndex && (
                <motion.div
                  layoutId="activeArrow"
                  className="flex items-center"
                >
                  <ArrowUpRight className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </motion.div>
              )}
              <span 
                className={`font-light italic text-white transition-all duration-300 ${
                  index === activeIndex 
                    ? "text-3xl sm:text-4xl lg:text-5xl xl:text-6xl" 
                    : "text-2xl sm:text-3xl lg:text-4xl xl:text-5xl"
                }`}
                style={{ fontFamily: "'Quicksand', sans-serif" }}
              >
                {project.title}
              </span>
              {index === activeIndex && (
                <Link to={`/project/${activeProject.slug}`}>
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="ml-2 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors"
                  >
                    <ArrowUpRight className="w-5 h-5 text-white" />
                  </motion.div>
                </Link>
              )}
            </motion.button>
          ))}
        </motion.div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none z-20" />
    </section>
  );
};

export default Projects;
