import { motion } from "framer-motion";
import { ArrowUpRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRef } from "react";

const testimonials = [
  {
    quote: "Shibin's ability to create intuitive user experiences and solve complex problems with ease is commendable. His interpersonal skills foster collaboration, and he consistently brings energy and positivity to every project he undertakes. Whether working in a team or independently, Shibin adapts seamlessly and delivers outstanding results.",
    name: "Dr.Libin P Oommen",
    role: "HOD at PRC",
    featured: true,
  },
  {
    quote: "I had the pleasure of working with Shibin. He is skilled with Figma and AI-based UI/UX design tools, and he collaborates seamlessly with dynamic teams. A strong designer with both creativity and adaptability, I'd gladly recommend him for software design roles.",
    name: "Adarsh Sharma",
    role: "CEO Nuren AI",
    featured: false,
  },
  {
    quote: "Shibin is an outstanding individual who excels at problem-solving and brings a creative approach to every challenge. His design skills are second to none, and he has consistently demonstrated a knack for finding elegant solutions to complex problems.",
    name: "Jestin Sabu",
    role: "Application Developer - IBM",
    featured: false,
  },
];

// Generate random avatar URL using DiceBear API
const getRandomAvatar = (seed: string) => {
  return `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(seed)}&backgroundColor=b6e3f4,c0aede,d1d4f9`;
};

const Testimonials = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollToContact = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="py-24 bg-background overflow-hidden relative" ref={containerRef}>
      {/* Subtle background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[hsl(280,60%,50%)]/5 rounded-full blur-[100px]" />
      </div>
      
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Button variant="secondary" className="rounded-full px-6 mb-6">
              Testimonials
            </Button>
          </motion.div>

          <motion.p 
            className="text-muted-foreground text-lg leading-relaxed max-w-md mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            I have helped many people to make designs for their product. Wanna be the next?
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-6"
          >
            <Button 
              variant="secondary" 
              className="rounded-full px-6 gap-2 group"
              onClick={scrollToContact}
            >
              Contact
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Button>
          </motion.div>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {/* Featured testimonial - spans 2 columns on larger screens */}
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ 
              duration: 0.8, 
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
            whileHover={{ 
              scale: 1.02,
              transition: { duration: 0.3 } 
            }}
            className="md:col-span-2 lg:col-span-2 bg-card/40 backdrop-blur-xl rounded-3xl p-8 border border-border/30 hover:border-primary/30 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5 group relative overflow-hidden"
          >
            {/* Decorative quote icon */}
            <Quote className="absolute top-6 right-6 w-12 h-12 text-primary/10 group-hover:text-primary/20 transition-colors duration-300" />
            
            <p className="text-foreground/80 text-lg md:text-xl leading-relaxed mb-8 relative z-10">
              "{testimonials[0].quote}"
            </p>
            
            <div className="flex items-center gap-4">
              <motion.div 
                className="w-14 h-14 rounded-full overflow-hidden bg-secondary/50 ring-2 ring-primary/20"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
              >
                <img 
                  src={getRandomAvatar(testimonials[0].name)} 
                  alt={testimonials[0].name}
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <div>
                <div className="font-semibold text-foreground text-lg">
                  {testimonials[0].name}
                </div>
                <div className="text-sm text-muted-foreground">
                  {testimonials[0].role}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Second testimonial */}
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ 
              duration: 0.8, 
              delay: 0.15,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
            whileHover={{ 
              scale: 1.02,
              transition: { duration: 0.3 } 
            }}
            className="bg-card/40 backdrop-blur-xl rounded-3xl p-6 border border-border/30 hover:border-primary/30 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5 group relative overflow-hidden flex flex-col"
          >
            <Quote className="absolute top-4 right-4 w-8 h-8 text-primary/10 group-hover:text-primary/20 transition-colors duration-300" />
            
            <p className="text-foreground/80 text-sm leading-relaxed mb-6 flex-1 relative z-10">
              "{testimonials[1].quote}"
            </p>
            
            <div className="flex items-center gap-3">
              <motion.div 
                className="w-10 h-10 rounded-full overflow-hidden bg-secondary/50 ring-2 ring-primary/20"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
              >
                <img 
                  src={getRandomAvatar(testimonials[1].name)} 
                  alt={testimonials[1].name}
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <div>
                <div className="font-medium text-foreground text-sm">
                  {testimonials[1].name}
                </div>
                <div className="text-xs text-muted-foreground">
                  {testimonials[1].role}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Third testimonial - spans full width on mobile, 2 cols on tablet, 3 cols on desktop */}
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ 
              duration: 0.8, 
              delay: 0.3,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
            whileHover={{ 
              scale: 1.02,
              transition: { duration: 0.3 } 
            }}
            className="md:col-span-2 lg:col-span-3 bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-xl rounded-3xl p-8 border border-border/30 hover:border-primary/30 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5 group relative overflow-hidden"
          >
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <Quote className="w-10 h-10 text-primary/20 flex-shrink-0" />
              
              <p className="text-foreground/80 text-base md:text-lg leading-relaxed flex-1">
                "{testimonials[2].quote}"
              </p>
              
              <div className="flex items-center gap-3 flex-shrink-0">
                <motion.div 
                  className="w-12 h-12 rounded-full overflow-hidden bg-secondary/50 ring-2 ring-primary/20"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                >
                  <img 
                    src={getRandomAvatar(testimonials[2].name)} 
                    alt={testimonials[2].name}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                <div>
                  <div className="font-medium text-foreground">
                    {testimonials[2].name}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {testimonials[2].role}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
