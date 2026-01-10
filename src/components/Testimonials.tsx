import { motion, useScroll, useTransform } from "framer-motion";
import { Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRef } from "react";

const testimonials = [
  {
    quote: "Shibin's ability to create intuitive user experiences and solve complex problems with ease is commendable. His interpersonal skills foster collaboration, and he consistently brings energy and positivity to every project he undertakes. Whether working in a team or independently, Shibin adapts seamlessly and delivers outstanding results.",
    name: "Dr.Libin P Oommen",
    role: "HOD at PRC",
  },
  {
    quote: "I had the pleasure of working with Shibin. He is skilled with Figma and AI-based UI/UX design tools, and he collaborates effectively with teams to deliver exceptional designs.",
    name: "Jestin Sabu",
    role: "Application Developer - IBM",
  },
];

const Testimonials = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["5%", "-5%"]);

  return (
    <section className="py-24 bg-background overflow-hidden relative" ref={containerRef}>
      {/* Glassmorphism background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-[hsl(320,80%,60%)]/10 rounded-full blur-[100px]" />
      </div>
      <div className="container mx-auto px-6">
        {/* Centered Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
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

          <motion.h2 
            className="text-3xl md:text-4xl font-serif"
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <span className="text-primary">See what others say</span>
            <br />
            <span className="text-muted-foreground">about me</span>
          </motion.h2>

          <motion.p 
            className="text-muted-foreground mt-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            I have helped many people to make designs for their product.
            <br />
            Wanna be the next?
          </motion.p>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div style={{ y }} className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 60, rotateX: 10 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                duration: 0.8, 
                delay: index * 0.2,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              whileHover={{ 
                y: -8, 
                scale: 1.02,
                transition: { duration: 0.3 } 
              }}
              className="bg-card/50 backdrop-blur-xl rounded-3xl p-6 border border-border/40 hover:border-primary/40 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 relative group"
            >
              {/* Quote icon */}
              <motion.div
                className="absolute -top-3 -left-3 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center"
                initial={{ scale: 0, rotate: -180 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.2, type: "spring" }}
              >
                <Quote className="w-4 h-4 text-primary" />
              </motion.div>

              <p className="text-muted-foreground text-sm leading-relaxed mb-6 group-hover:text-foreground/80 transition-colors duration-300">
                {testimonial.quote}
              </p>
              <div className="flex items-center gap-4">
                <motion.div 
                  className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center group-hover:bg-primary/10 transition-colors duration-300"
                  whileHover={{ scale: 1.1, rotate: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors duration-300">
                    {testimonial.name.charAt(0)}
                  </span>
                </motion.div>
                <div>
                  <div className="font-medium text-card-foreground">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;