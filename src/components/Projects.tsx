import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo } from "react";
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
  },
  {
    title: "Web Development",
    description: "Bringing websites to life with responsive design and robust code.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=500&fit=crop",
    slug: "web-development",
    category: "Development",
    bgGradient: "from-cyan-500/80 via-teal-600/70 to-emerald-700/80",
  },
  {
    title: "Product Branding",
    description: "Creating Unique Brand Identities Building that stand out.",
    image: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=600&h=500&fit=crop",
    slug: "product-branding",
    category: "Design",
    bgGradient: "from-violet-500/80 via-purple-600/70 to-indigo-700/80",
  },
  {
    title: "Mobile App Design",
    description: "Creating intuitive mobile experiences that users love to engage with.",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=500&fit=crop",
    slug: "mobile-app-design",
    category: "Design",
    bgGradient: "from-amber-500/80 via-orange-600/70 to-red-700/80",
  },
  {
    title: "Generative AI",
    description: "Exploring creative innovations powered by prompt generation.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=500&fit=crop",
    slug: "generative-ai",
    category: "AI",
    bgGradient: "from-blue-500/80 via-indigo-600/70 to-purple-700/80",
  },
  {
    title: "Psychology Articles",
    description: "Blending psychology and design to craft more human-centered products.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=500&fit=crop",
    slug: "psychology-articles",
    category: "Writing",
    bgGradient: "from-emerald-500/80 via-green-600/70 to-teal-700/80",
  },
];

const categories = ["All", ...Array.from(new Set(projects.map((p) => p.category)))];

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = useMemo(
    () => activeCategory === "All" ? projects : projects.filter((p) => p.category === activeCategory),
    [activeCategory]
  );

  // Use the first filtered project's gradient, or a default
  const activeBgGradient = filteredProjects[0]?.bgGradient ?? projects[0].bgGradient;

  return (
    <section id="portfolio" className="relative min-h-screen overflow-hidden">
      {/* Top Gradient Fade */}
      <div className="absolute top-0 left-0 right-0 h-56 bg-gradient-to-b from-background via-background/60 to-transparent pointer-events-none z-20" />

      {/* Dynamic Background */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className={`absolute inset-0 bg-gradient-to-br ${activeBgGradient}`}
        />
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        {/* Bold Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-7xl font-bold text-white text-center mb-12"
          style={{ fontFamily: "'Quicksand', sans-serif" }}
        >
          Projects
        </motion.h2>

        {/* Horizontal Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 sm:gap-8 mb-16"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`relative text-lg sm:text-xl italic transition-all duration-300 pb-1 ${
                activeCategory === cat
                  ? "text-white opacity-100 font-semibold"
                  : "text-white/50 hover:text-white/80 font-light"
              }`}
              style={{ fontFamily: "'Quicksand', sans-serif" }}
            >
              {cat}
              {activeCategory === cat && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-white rounded-full"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          ))}
        </motion.div>

        {/* Project Cards Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.slug}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <Link
                  to={`/project/${project.slug}`}
                  className="group block rounded-2xl overflow-hidden bg-card/30 backdrop-blur-xl border border-white/10 hover:scale-[1.03] hover:shadow-2xl transition-all duration-300"
                >
                  {/* Image */}
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>

                  {/* Info */}
                  <div className="p-5">
                    <span className="inline-block text-xs font-medium tracking-wider uppercase text-white/60 bg-white/10 rounded-full px-3 py-1 mb-3">
                      {project.category}
                    </span>
                    <h3
                      className="text-xl font-semibold text-white mb-2"
                      style={{ fontFamily: "'Quicksand', sans-serif" }}
                    >
                      {project.title}
                    </h3>
                    <p className="text-sm text-white/70 leading-relaxed mb-4">
                      {project.description}
                    </p>
                    <div className="flex items-center gap-2 text-white/80 group-hover:text-white transition-colors text-sm font-medium">
                      View Project
                      <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-56 bg-gradient-to-t from-background via-background/60 to-transparent pointer-events-none z-20" />
    </section>
  );
};

export default Projects;
