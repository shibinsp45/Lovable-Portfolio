import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const projects = [
  {
    title: "UI UX Designs",
    description: "Designing user-centric solutions that create meaningful digital experiences.",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop",
  },
  {
    title: "Web Development",
    description: "Bringing websites to life with responsive design and robust code.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
  },
  {
    title: "Product Branding",
    description: "Creating Unique Brand Identities Building that stand out.",
    image: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=400&h=300&fit=crop",
  },
];

const Projects = () => {
  return (
    <section id="portfolio" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-serif text-center mb-16"
        >
          My Projects
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="group"
            >
              <div className="bg-card rounded-3xl p-6 border border-border hover:border-primary/50 transition-all duration-300 h-full flex flex-col">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-6 bg-secondary">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-card-foreground">
                  {project.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-6 flex-1">
                  {project.description}
                </p>
                <Button
                  variant="secondary"
                  className="w-full rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  View Projects
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
