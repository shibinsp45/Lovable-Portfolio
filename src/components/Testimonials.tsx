import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRef } from "react";
import adarshImg from "@/assets/adarsh.png";
import libinImg from "@/assets/libin.png";
import jestinImg from "@/assets/jestin.png";

const testimonials = [
  {
    quote: "Shibin's ability to create intuitive user experiences and solve complex problems with ease is commendable. His interpersonal skills foster collaboration, and he consistently brings energy and positivity to every project he undertakes.",
    name: "Dr.Libin P Oommen",
    role: "HOD at PRC",
    avatar: libinImg,
  },
  {
    quote: "I had the pleasure of working with Shibin. He is skilled with Figma and AI-based UI/UX design tools, and he collaborates seamlessly with dynamic teams. A strong designer with both creativity and adaptability.",
    name: "Adarsh Sharma",
    role: "CEO Nuren AI",
    avatar: adarshImg,
  },
  {
    quote: "Shibin is an outstanding individual who excels at problem-solving and brings a creative approach to every challenge. His design skills are second to none, and he has consistently demonstrated a knack for finding elegant solutions.",
    name: "Jestin Sabu",
    role: "Application Developer - IBM",
    avatar: jestinImg,
  },
];

const Testimonials = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const titleY = useTransform(scrollYProgress, [0, 1], ["15%", "-15%"]);
  const bgGlowY = useTransform(scrollYProgress, [0, 1], ["35%", "-35%"]);

  const scrollToContact = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      className="py-24 md:py-32 bg-background overflow-hidden relative"
      ref={containerRef}
    >
      {/* Parallax background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div style={{ y: bgGlowY }}>
          <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-[100px]" />
        </motion.div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          style={{ y: titleY }}
          className="text-center mb-12 md:mb-16"
        >
          <motion.h2
            className="text-3xl md:text-5xl font-bold text-foreground mb-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Recommendations
          </motion.h2>
          <motion.p
            className="text-muted-foreground text-lg max-w-md mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            I have helped many people to make designs for their product. Wanna be the next?
          </motion.p>
        </motion.div>

        {/* Horizontal scrolling cards - Porsche Discover style */}
        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="flex-shrink-0 w-[85vw] sm:w-[70vw] md:w-[45vw] lg:w-[32%] snap-start relative rounded-2xl overflow-hidden group cursor-pointer"
              style={{ aspectRatio: "4/5" }}
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              {/* Full card background with avatar */}
              <div className="absolute inset-0 bg-card">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-full h-full object-cover object-top opacity-90 group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Bottom gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

              {/* Content at bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 flex flex-col gap-4">
                <p className="text-white/80 text-sm leading-relaxed line-clamp-3 group-hover:line-clamp-none transition-all duration-300">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <h3 className="text-white font-semibold text-lg md:text-xl leading-tight">
                      {testimonial.name}
                    </h3>
                    <span className="text-white/60 text-sm">{testimonial.role}</span>
                  </div>
                  <div className="flex-shrink-0 w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white/10 transition-colors duration-300">
                    <ArrowRight className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Button
            variant="secondary"
            className="rounded-full px-8 gap-2 group"
            onClick={scrollToContact}
          >
            Get in Touch
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
