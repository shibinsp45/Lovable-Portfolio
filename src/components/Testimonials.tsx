import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRef, useEffect, useState } from "react";

const testimonials = [
  {
    quote: "Shibin's ability to create intuitive user experiences and solve complex problems with ease is commendable. His interpersonal skills foster collaboration, and he consistently brings energy and positivity to every project he undertakes. Whether working in a team or independently, Shibin adapts seamlessly and delivers outstanding results.",
    name: "Dr.Libin P Oommen",
    role: "HOD at PRC",
  },
  {
    quote: "I had the pleasure of working with Shibin. He is skilled with Figma and AI-based UI/UX design tools, and he collaborates seamlessly with dynamic teams. A strong designer with both creativity and adaptability, I'd gladly recommend him for software design roles.",
    name: "Adarsh Sharma",
    role: "CEO Nuren AI",
  },
  {
    quote: "Shibin is an outstanding individual who excels at problem-solving and brings a creative approach to every challenge. His design skills are second to none, and he has consistently demonstrated a knack for finding elegant solutions to complex problems.",
    name: "Jestin Sabu",
    role: "Application Developer - IBM",
  },
];

// Generate random avatar URL using DiceBear API
const getRandomAvatar = (seed: string) => {
  return `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(seed)}&backgroundColor=b6e3f4,c0aede,d1d4f9`;
};

const Testimonials = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Double the testimonials for seamless loop
  const duplicatedTestimonials = [...testimonials, ...testimonials];

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
      </div>
      
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left Column - Header */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="lg:sticky lg:top-32"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Button variant="secondary" className="rounded-full px-6 mb-8">
                Testimonials
              </Button>
            </motion.div>

            <motion.p 
              className="text-muted-foreground text-lg leading-relaxed mb-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              I have helped many people to make a designs for their product.
            </motion.p>
            
            <motion.p 
              className="text-muted-foreground text-lg mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Wanna be the next?
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
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

          {/* Right Column - Animated Carousel */}
          <div 
            className="relative h-[500px] overflow-hidden"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Gradient masks for seamless effect */}
            <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-background to-transparent z-10 pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent z-10 pointer-events-none" />
            
            {/* Scrolling container */}
            <motion.div
              className="space-y-6"
              animate={{
                y: isHovered ? 0 : [0, -50 * testimonials.length * 4],
              }}
              transition={{
                y: {
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                  repeatType: "loop",
                },
              }}
            >
              {duplicatedTestimonials.map((testimonial, index) => (
                <motion.div
                  key={`${testimonial.name}-${index}`}
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ 
                    duration: 0.8, 
                    delay: (index % testimonials.length) * 0.15,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }}
                  whileHover={{ 
                    scale: 1.02,
                    transition: { duration: 0.3 } 
                  }}
                  className="bg-card/30 backdrop-blur-sm rounded-2xl p-6 border border-border/30 hover:border-border/50 transition-all duration-300 cursor-pointer"
                >
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6 italic">
                    {testimonial.quote}
                  </p>
                  
                  <div className="flex items-center gap-3">
                    <motion.div 
                      className="w-10 h-10 rounded-full overflow-hidden bg-secondary/50"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <img 
                        src={getRandomAvatar(testimonial.name)} 
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                    <div>
                      <div className="font-medium text-foreground text-sm">
                        {testimonial.name}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {testimonial.role}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
