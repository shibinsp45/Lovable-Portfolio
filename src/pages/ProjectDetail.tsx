import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useImageColor } from "@/hooks/use-image-color";

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
  "invoice-generator": {
    title: "Invoice Generator Mobile App",
    description: "A mobile invoice app – create bills faster, manage your shop better.",
    fullDescription: "BILLZY is an invoice generator mobile app case study created as part of UI/UX design professional practice. The app helps shop owners create bills faster and manage their business better, featuring product catalog management, invoice generation, and easy sharing via PDF, JPEG, WhatsApp, and email.",
    image: "/projects/invoice-generator.jpg",
    gallery: [
      "/projects/invoice-generator-2.jpg",
      "/projects/invoice-generator-3.jpg",
      "/projects/invoice-generator-4.jpg",
    ],
    technologies: ["Figma", "Photoshop", "Illustrator"],
    category: "UI/UX Design",
    year: "2025",
    client: "Case Study",
    role: "UI/UX Designer",
    behanceUrl: "https://www.behance.net/gallery/243058217/Invoice-Generator-Mobile-App-Case-Study",
  },
  "tools-app": {
    title: "Tools - Service App",
    description: "On-demand tools and repair service app – we are here to help you.",
    fullDescription: "Tools is a service booking mobile app that connects users with repair professionals. The app features phone number login, service browsing, booking management, and a clean yellow-themed UI designed for quick and easy access to repair services.",
    image: "/projects/tools-app.png",
    gallery: [
      "/projects/tools-app-2.png",
      "/projects/tools-app-3.png",
    ],
    technologies: ["Figma"],
    category: "UI/UX Design",
    year: "2025",
    client: "Case Study",
    role: "UI/UX Designer",
    behanceUrl: "https://www.behance.net/gallery/245113395/Tools",
  },
  "fudit-app": {
    title: "Fudit - AI Food Delivery App",
    description: "AI-powered food delivery app – satisfy your cravings, delivered to your home.",
    fullDescription: "Fudit is an AI-integrated food ordering mobile application case study. The app leverages AI to suggest favorite food combinations, features category browsing, trending items, and a seamless ordering experience with real-time delivery tracking.",
    image: "/projects/fudit-app.png",
    gallery: [
      "/projects/fudit-app-2.png",
      "/projects/fudit-app-3.png",
    ],
    technologies: ["Figma", "ChatGPT", "Notion"],
    category: "UI/UX Design",
    year: "2024",
    client: "Case Study",
    role: "UI/UX Designer",
    behanceUrl: "https://www.behance.net/gallery/197536833/AI-powered-Food-Delivery-App-Fudit",
  },
  "fitness-app": {
    title: "GetFit - Fitness Tracking App",
    description: "Fitness tracking app case study – where fitness meets passion.",
    fullDescription: "GetFit is a modern fitness app designed to help users stay consistent with workouts, achieve specific fitness goals, and track their health vitals. The app provides curated workout plans, progress tracking, and health insights in a sleek dark-themed interface.",
    image: "/projects/fitness-app.jpg",
    gallery: [
      "/projects/fitness-app.jpg",
    ],
    technologies: ["Figma"],
    category: "UI/UX Design",
    year: "2024",
    client: "Case Study",
    role: "UI/UX Designer",
    behanceUrl: "https://www.behance.net/gallery/202932045/Fitness-Tracking-App-Case-Study",
  },
  "grocery-app": {
    title: "GroPlan - Smart Grocery App",
    description: "Smart grocery & meal planning app – your smart kitchen buddy.",
    fullDescription: "GroPlan is a smart grocery and meal planning app UX case study. It serves as your smart kitchen buddy for groceries, meals, and pantry tracking – all in one app. Features include category browsing, expiry tracking, pantry management, and meal planning with a fresh green-themed design.",
    image: "/projects/grocery-app.jpg",
    gallery: [
      "/projects/grocery-app-2.jpg",
      "/projects/grocery-app-3.jpg",
    ],
    technologies: ["Figma", "Illustrator", "Photoshop", "Miro"],
    category: "UI/UX Design",
    year: "2025",
    client: "Case Study",
    role: "UI/UX Designer",
    behanceUrl: "https://www.behance.net/gallery/240581883/Smart-Grocery-Meal-Planning-App-UX-Case-Study",
  },
  "event-mgmt": {
    title: "Event Management Website Design",
    description: "Crafting unforgettable user experiences for event management.",
    fullDescription: "A comprehensive event management website design featuring location search, people count, date selection, and event type filters. The design focuses on creating an immersive experience with a concert-themed hero section and intuitive booking flow.",
    image: "/projects/event-mgmt.jpg",
    gallery: [
      "/projects/event-mgmt-2.png",
    ],
    technologies: ["Figma"],
    category: "Web Design",
    year: "2024",
    client: "Case Study",
    role: "Web Designer",
    behanceUrl: "https://www.behance.net/gallery/224965571/Event-Management-Website-Design",
  },
  "elitepath": {
    title: "ElitePath Student Management Dashboard",
    description: "Student management dashboard with progress tracking and achievements.",
    fullDescription: "ElitePath is a student management dashboard designed to track academic progress, volunteer hours, and leadership projects. Features include multi-year progress charts, achievement badges, quick stats (GPA, SAT), and mentor feedback integration.",
    image: "/projects/elitepath.png",
    gallery: [
      "/projects/elitepath-2.png",
    ],
    technologies: ["Motiff"],
    category: "Web Design",
    year: "2024",
    client: "Case Study",
    role: "UI/UX Designer",
    behanceUrl: "https://www.behance.net/gallery/219268503/ElitePath-Student-Management-Dashboard",
  },
  "beat-landing": {
    title: "Beat Landing Page",
    description: "Education platform landing page – launch your career with India's leading educator.",
    fullDescription: "Beat is an education platform landing page designed to showcase courses in analytics, programming, ERP training, and financial courses. The design features trust indicators, course browsing, and a clean purple-themed interface. Live at beateducations.com.",
    image: "/projects/beat-landing.png",
    gallery: [
      "/projects/beat-landing-2.png",
    ],
    technologies: ["Figma"],
    category: "Web Development",
    year: "2024",
    client: "Beat Educations",
    role: "Web Developer",
    behanceUrl: "https://www.behance.net/gallery/215987973/Beat-Landing-Page",
  },
  "teatym": {
    title: "TeaTym Product Website",
    description: "Product website for a tea brand – a cup of tea is a cup of peace.",
    fullDescription: "TeaTym is a product website for a tea brand, built with HTML/CSS and designed in Figma. The website features product browsing, services section, and a warm brown-themed design. Live at teatym-website-sp45.netlify.app.",
    image: "/projects/teatym.jpg",
    gallery: [
      "/projects/teatym-2.jpg",
    ],
    technologies: ["Figma", "HTML/CSS", "CSS3"],
    category: "Web Development",
    year: "2024",
    client: "TeaTym",
    role: "Web Developer",
    behanceUrl: "https://www.behance.net/gallery/202930537/TeaTym-Product-Website",
  },
  "happy-cart": {
    title: "Happy Cart Branding",
    description: "Branding design for a shopping cart – vibrant and playful identity.",
    fullDescription: "Happy Cart is a branding design project for a shopping cart brand. The design features a playful smiley cart logo on a vibrant red background with shopping-themed iconography, creating a fun and memorable brand identity.",
    image: "/projects/happy-cart.png",
    gallery: [
      "/projects/happy-cart-2.png",
    ],
    technologies: ["Canva"],
    category: "Branding",
    year: "2024",
    client: "Case Study",
    role: "Brand Designer",
    behanceUrl: "https://www.behance.net/gallery/197538045/Happy-Cart-Branding",
  },
  "perfume-branding": {
    title: "Perfume Branding Collections",
    description: "AI-generated perfume branding with elegant bottle designs and luxury aesthetics.",
    fullDescription: "Perfume Branding Collections is a generative AI project showcasing luxury perfume bottle designs and branding concepts. The collection features elegant bottle shapes, rich color palettes, and sophisticated typography — all crafted using AI-powered design tools to explore the intersection of artificial intelligence and brand identity.",
    image: "/projects/perfume-branding.png",
    gallery: [
      "/projects/perfume-branding-2.jpg",
      "/projects/perfume-branding-3.png",
    ],
    technologies: ["AI Tools", "Photoshop", "Illustrator"],
    category: "Generative AI",
    year: "2025",
    client: "Personal Project",
    role: "AI Designer",
    behanceUrl: "https://www.behance.net/gallery/228929049/Perfume-Branding-Collections",
  },
  "medicine-vending": {
    title: "ProMedic - Medicine Vending Machine",
    description: "Medicine vending machine case study – access medicines faster during emergencies.",
    fullDescription: "PROMEDIC is a UI/UX case study for an Android application that interfaces with a medical vending machine. The project addresses the challenge of accessing essential medicines during emergencies, especially in areas with limited medical facilities. Key features include real-time stock monitoring, cashless payment, and easy access to first-aid and non-prescription medicines via a portable vending system.",
    image: "/projects/medicine-vending.png",
    gallery: [
      "/projects/medicine-vending-2.png",
    ],
    technologies: ["Figma", "Android", "GitHub"],
    category: "UI/UX Design",
    year: "2024",
    client: "Case Study",
    role: "UI/UX Designer",
    behanceUrl: "https://www.behance.net/gallery/197536455/Medicine-Vending-Machine-Case-Study",
  },
  "uiux-shapes-world": {
    title: "Why UI/UX Design Shapes How We Experience the World Today",
    description: "How UI/UX design decides whether we stay, trust, and return to digital products.",
    fullDescription: "This article explores how UI/UX design shapes our daily digital experiences — from ordering food to booking rides. It discusses the power of good design in building trust, reducing friction, and creating seamless interactions that keep users coming back.",
    image: "/projects/uiux-blog.webp",
    gallery: ["/projects/uiux-blog.webp"],
    technologies: ["Medium", "Writing", "UX Research"],
    category: "Blog",
    year: "2025",
    client: "Personal",
    role: "Writer",
    behanceUrl: "https://uxbysoul.medium.com/why-ui-ux-design-shapes-how-we-experience-the-world-today-4bf289c4e09d",
  },
  "brain-shapes-ux": {
    title: "How Your Brain Shapes Your User Experience",
    description: "How cognitive psychology influences user experience without you even realizing it.",
    fullDescription: "This article explores the intersection of cognitive psychology and UX design. It explains how our brains process attention, memory, problem-solving, and decision-making — and how understanding these processes helps designers create more intuitive, user-friendly digital experiences.",
    image: "/projects/brain-ux-blog.png",
    gallery: ["/projects/brain-ux-blog.png"],
    technologies: ["LinkedIn", "Writing", "Psychology", "UX Research"],
    category: "Blog",
    year: "2025",
    client: "Personal",
    role: "Writer",
    behanceUrl: "https://www.linkedin.com/pulse/how-your-brain-shapes-user-experience-without-you-even-realizing-elxec",
  },
  "human-computer-interaction": {
    title: "Human-Computer Interaction",
    description: "The science, principles, and real-world applications of how humans and computers understand each other.",
    fullDescription: "Every day, billions of people interact with apps, websites, and devices. Some feel natural and intuitive. Others frustrate us. The difference comes down to one thing: how well humans and computers understand each other. This presentation explores the science, principles, and real-world applications of Human-Computer Interaction — and why it's becoming more important than ever.",
    image: "/projects/hci-blog.jpg",
    gallery: ["/projects/hci-blog.jpg"],
    technologies: ["Gamma", "Research", "HCI", "UX"],
    category: "Presentation",
    year: "2025",
    client: "Personal",
    role: "Writer & Researcher",
    behanceUrl: "https://gamma.app/docs/Human-Computer-Interaction-dshl6dqgiwm9lgk",
  },
  "smiley-wallpaper": {
    title: "Smiley Desktop Wallpaper Design",
    description: "Desktop wallpaper design with a cheerful smiley theme.",
    fullDescription: "A cheerful desktop wallpaper design featuring a minimalist smiley face on a bright yellow background. The design includes mockup presentations showing the wallpaper on various devices.",
    image: "/projects/smiley-wallpaper.png",
    gallery: [
      "/projects/smiley-wallpaper-2.png",
    ],
    technologies: ["Canva"],
    category: "Graphic Design",
    year: "2024",
    client: "Personal Project",
    role: "Graphic Designer",
    behanceUrl: "https://www.behance.net/gallery/197538631/Smiley-Desktop-Wallpaper-Design",
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
