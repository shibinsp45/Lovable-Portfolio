import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const projectsData = {
  "ui-ux-designs": {
    title: "UI UX Designs",
    description: "Designing user-centric solutions that create meaningful digital experiences.",
    fullDescription: "This project showcases a comprehensive collection of UI/UX design work, focusing on creating intuitive and visually appealing interfaces. Each design is crafted with the user in mind, ensuring seamless navigation and engagement.",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&h=800&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=600&h=400&fit=crop",
    ],
    technologies: ["Figma", "Adobe XD", "Sketch", "Protopie"],
    category: "Design",
    year: "2024",
    client: "Various Clients",
    role: "Lead UI/UX Designer",
  },
  "web-development": {
    title: "Web Development",
    description: "Bringing websites to life with responsive design and robust code.",
    fullDescription: "A collection of web development projects showcasing modern frontend and full-stack development skills. Each project demonstrates clean code practices, responsive design, and optimal performance.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=600&h=400&fit=crop",
    ],
    technologies: ["React", "TypeScript", "Tailwind CSS", "Node.js"],
    category: "Development",
    year: "2024",
    client: "Tech Startups",
    role: "Full Stack Developer",
  },
  "product-branding": {
    title: "Product Branding",
    description: "Creating Unique Brand Identities Building that stand out.",
    fullDescription: "Brand identity projects that help businesses stand out in competitive markets. From logo design to complete brand guidelines, each project tells a unique story.",
    image: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=1200&h=800&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1558655146-d09347e92766?w=600&h=400&fit=crop",
    ],
    technologies: ["Illustrator", "Photoshop", "After Effects", "InDesign"],
    category: "Branding",
    year: "2024",
    client: "Various Brands",
    role: "Brand Designer",
  },
};

const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = projectsData[slug as keyof typeof projectsData];

  if (!project) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-serif mb-4">Project Not Found</h1>
          <Link to="/">
            <Button variant="outline" className="rounded-full">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        {/* Glassmorphism background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-[hsl(320,80%,60%)]/15 rounded-full blur-[120px]" />
        </div>

        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link to="/#portfolio">
              <Button variant="ghost" className="mb-8 rounded-full hover:bg-card/50 group">
                <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                Back to Projects
              </Button>
            </Link>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.span 
                className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm mb-6 border border-primary/20"
                whileHover={{ scale: 1.05 }}
              >
                {project.category}
              </motion.span>
              <h1 className="text-4xl md:text-6xl font-serif mb-6">{project.title}</h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                {project.fullDescription}
              </p>
              
              <div className="flex gap-4">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button className="rounded-full px-8">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Live Preview
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="outline" className="rounded-full px-8">
                    <Github className="w-4 h-4 mr-2" />
                    Source Code
                  </Button>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative"
            >
              <motion.div 
                className="rounded-3xl overflow-hidden border border-border/40 bg-card/30 backdrop-blur-xl p-4"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-auto rounded-2xl"
                />
              </motion.div>
              {/* Floating decoration */}
              <motion.div 
                className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/20 rounded-full blur-2xl -z-10"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 4, repeat: Infinity }}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Project Details */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <motion.div 
            className="grid md:grid-cols-4 gap-6 mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {[
              { label: "Client", value: project.client },
              { label: "Role", value: project.role },
              { label: "Year", value: project.year },
              { label: "Category", value: project.category },
            ].map((item, index) => (
              <motion.div 
                key={item.label}
                className="bg-card/50 backdrop-blur-xl rounded-2xl p-6 border border-border/40 hover:border-primary/40 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <p className="text-muted-foreground text-sm mb-1">{item.label}</p>
                <p className="text-foreground font-medium">{item.value}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Technologies */}
          <motion.div 
            className="mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl font-serif mb-6">Technologies Used</h2>
            <div className="flex flex-wrap gap-3">
              {project.technologies.map((tech, index) => (
                <motion.span 
                  key={tech}
                  className="px-6 py-3 rounded-full bg-card/50 backdrop-blur-xl border border-border/40 text-foreground hover:border-primary/40 hover:bg-primary/10 transition-all duration-300 cursor-default"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.1, y: -3 }}
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Gallery */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl font-serif mb-6">Project Gallery</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {project.gallery.map((img, index) => (
                <motion.div 
                  key={index}
                  className="rounded-2xl overflow-hidden border border-border/40 bg-card/30 backdrop-blur-xl group cursor-pointer"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                  whileHover={{ scale: 1.03, y: -5 }}
                >
                  <div className="overflow-hidden">
                    <motion.img 
                      src={img} 
                      alt={`${project.title} gallery ${index + 1}`}
                      className="w-full h-64 object-cover"
                      whileHover={{ scale: 1.15 }}
                      transition={{ duration: 0.6 }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* More Projects CTA */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <motion.div 
            className="bg-card/50 backdrop-blur-xl rounded-3xl p-12 border border-border/40 text-center relative overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.3 }}
          >
            <div className="absolute inset-0 -z-10">
              <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-[80px]" />
              <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-[hsl(320,80%,60%)]/10 rounded-full blur-[80px]" />
            </div>
            <h2 className="text-3xl font-serif mb-4">Interested in working together?</h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Let's create something amazing. I'm always open to discussing new projects and creative ideas.
            </p>
            <div className="flex gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link to="/#contact">
                  <Button className="rounded-full px-8">Get in Touch</Button>
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link to="/#portfolio">
                  <Button variant="outline" className="rounded-full px-8">View More Projects</Button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProjectDetail;
