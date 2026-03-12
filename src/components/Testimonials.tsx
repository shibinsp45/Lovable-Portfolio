import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Quote } from "lucide-react";
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
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const titleY = useTransform(scrollYProgress, [0, 1], ["15%", "-15%"]);

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
            style={{ fontFamily: "'Quicksand', sans-serif" }}
          >
            Recommendations
          </motion.h2>
          <motion.p
            className="text-muted-foreground text-lg max-w-md mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            I have helped many people to make designs for their product. Wanna be the next?
          </motion.p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="relative bg-white/[0.04] backdrop-blur-2xl border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.06)] hover:border-white/[0.15] hover:shadow-[0_8px_40px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.1)] rounded-2xl p-6 md:p-8 flex flex-col gap-5 transition-all duration-500"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              <Quote className="w-8 h-8 text-primary/20" />
              <p
                className="text-sm sm:text-base text-muted-foreground leading-relaxed flex-1"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                "{testimonial.quote}"
              </p>
              <div className="flex items-center gap-3 pt-2 border-t border-border/20">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <h3
                    className="text-sm font-semibold text-foreground"
                    style={{ fontFamily: "'Quicksand', sans-serif" }}
                  >
                    {testimonial.name}
                  </h3>
                  <span className="text-xs text-muted-foreground">{testimonial.role}</span>
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
