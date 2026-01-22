import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";

const categories = ["All", "Design", "Development", "AI", "Writing"];

const projects = [
  {
    title: "UI UX Designs",
    description: "Designing user-centric solutions that create meaningful digital experiences.",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop",
    slug: "ui-ux-designs",
    category: "Design",
  },
  {
    title: "Web Development",
    description: "Bringing websites to life with responsive design and robust code.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
    slug: "web-development",
    category: "Development",
  },
  {
    title: "Product Branding",
    description: "Creating Unique Brand Identities Building that stand out.",
    image: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=400&h=300&fit=crop",
    slug: "product-branding",
    category: "Design",
  },
  {
    title: "Mobile App Design",
    description: "Creating intuitive mobile experiences that users love to engage with.",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop",
    slug: "mobile-app-design",
    category: "Design",
  },
  {
    title: "Generative AI",
    description: "Exploring creative innovations powered by prompt generation.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop",
    slug: "generative-ai",
    category: "AI",
  },
  {
    title: "Psychology Articles",
    description: "Blending psychology and design to craft more human-centered products.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
    slug: "psychology-articles",
    category: "Writing",
  },
];

const Projects = () => {
  const containerRef = useRef(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeFilter, setActiveFilter] = useState("All");
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["5%", "-5%"]);

  const filteredProjects = activeFilter === "All" 
    ? projects 
    : projects.filter(p => p.category === activeFilter);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section id="portfolio" className="py-24 bg-background overflow-hidden relative" ref={containerRef}>
      {/* Glassmorphism background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/3 -left-20 w-72 h-72 bg-primary/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/3 -right-20 w-72 h-72 bg-[hsl(320,80%,60%)]/10 rounded-full blur-[100px]" />
      </div>
      
      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-4xl md:text-5xl text-center mb-8"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          <span className="bg-gradient-to-b from-foreground via-muted-foreground/80 to-muted-foreground/50 bg-clip-text text-transparent">
            My Projects
          </span>
        </motion.h2>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeFilter === category ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveFilter(category)}
              className={`rounded-full px-6 transition-all duration-300 ${
                activeFilter === category 
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25" 
                  : "bg-card/50 backdrop-blur-sm border-border/40 hover:border-primary/40 hover:bg-card/80"
              }`}
            >
              {category}
            </Button>
          ))}
        </motion.div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Arrows */}
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 rounded-full bg-card/80 backdrop-blur-sm border border-border/40 flex items-center justify-center hover:bg-card hover:border-primary/40 transition-all duration-300 shadow-lg hidden md:flex"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-6 h-6 text-foreground" />
          </button>
          
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 rounded-full bg-card/80 backdrop-blur-sm border border-border/40 flex items-center justify-center hover:bg-card hover:border-primary/40 transition-all duration-300 shadow-lg hidden md:flex"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-6 h-6 text-foreground" />
          </button>

          {/* Scroll Container */}
          <motion.div
            ref={scrollContainerRef}
            style={{ 
              y,
              scrollbarWidth: "none", 
              msOverflowStyle: "none",
              WebkitOverflowScrolling: "touch",
            }}
            className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory"
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.1,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className="flex-shrink-0 w-[320px] md:w-[380px] snap-start"
              >
                <div className="bg-card/50 backdrop-blur-xl rounded-3xl p-6 border border-border/40 hover:border-primary/40 transition-all duration-500 h-full flex flex-col hover:shadow-2xl hover:shadow-primary/10 group">
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-6 bg-secondary relative">
                    <motion.img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/90 text-primary-foreground backdrop-blur-sm">
                        {project.category}
                      </span>
                    </div>
                  </div>
                  
                  <motion.h3 
                    className="text-xl font-semibold mb-3 text-card-foreground"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    {project.title}
                  </motion.h3>
                  <p className="text-muted-foreground text-sm mb-6 flex-1">
                    {project.description}
                  </p>
                  <Link to={`/project/${project.slug}`}>
                    <Button
                      variant="secondary"
                      className="w-full rounded-full hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-[1.02] group/btn"
                    >
                      View Project
                      <ArrowUpRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Gradient Fade Edges */}
          <div className="absolute left-0 top-0 bottom-4 w-16 bg-gradient-to-r from-background to-transparent pointer-events-none hidden md:block" />
          <div className="absolute right-0 top-0 bottom-4 w-16 bg-gradient-to-l from-background to-transparent pointer-events-none hidden md:block" />
        </div>

        {/* Scroll Indicator for Mobile */}
        <div className="flex justify-center mt-6 md:hidden">
          <div className="flex gap-2">
            {filteredProjects.map((_, index) => (
              <div
                key={index}
                className="w-2 h-2 rounded-full bg-muted-foreground/30"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
