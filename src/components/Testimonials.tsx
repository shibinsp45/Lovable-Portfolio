import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Testimonial } from "@/components/ui/testimonial";
import adarshImg from "@/assets/adarsh.png";
import libinImg from "@/assets/libin.png";
import jestinImg from "@/assets/jestin.png";

const testimonials = [
  {
    quote:
      "Shibin's ability to create intuitive user experiences and solve complex problems with ease is commendable. His interpersonal skills foster collaboration, and he consistently brings energy and positivity to every project.",
    highlightedText: "intuitive user experiences",
    authorName: "Dr. Libin P Oommen",
    authorPosition: "HOD at PRC",
    authorImage: libinImg,
  },
  {
    quote:
      "I had the pleasure of working with Shibin. He is skilled with Figma and AI-based UI/UX design tools, and collaborates seamlessly with dynamic teams. A strong designer with both creativity and adaptability.",
    highlightedText: "creativity and adaptability",
    authorName: "Adarsh Sharma",
    authorPosition: "CEO, Nuren AI",
    authorImage: adarshImg,
  },
  {
    quote:
      "Shibin is an outstanding individual who excels at problem-solving and brings a creative approach to every challenge. His design skills are second to none, with a knack for finding elegant solutions.",
    highlightedText: "elegant solutions",
    authorName: "Jestin Sabu",
    authorPosition: "Application Developer, IBM",
    authorImage: jestinImg,
  },
];

const Testimonials = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(id);
  }, []);

  const active = testimonials[index];

  return (
    <section className="py-16 md:py-24 bg-background overflow-hidden relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 md:mb-14">
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
            I have helped many people make designs for their product. Wanna be the next?
          </motion.p>
        </div>

        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Testimonial
            quote={active.quote}
            highlightedText={active.highlightedText}
            authorName={active.authorName}
            authorPosition={active.authorPosition}
            authorImage={active.authorImage}
          />
        </motion.div>

        <div className="flex justify-center gap-2 mt-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              aria-label={`Show testimonial ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-2 rounded-full transition-all ${
                i === index ? "w-8 bg-primary" : "w-2 bg-muted-foreground/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
