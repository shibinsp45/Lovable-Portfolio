import { motion } from "framer-motion";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import adarshImg from "@/assets/adarsh.png";
import libinImg from "@/assets/libin.png";
import jestinImg from "@/assets/jestin.png";

const testimonials = [
  {
    quote:
      "Shibin's ability to create intuitive user experiences and solve complex problems with ease is commendable. His interpersonal skills foster collaboration, and he consistently brings energy and positivity to every project he undertakes.",
    name: "Dr. Libin P Oommen",
    designation: "HOD at PRC",
    src: libinImg,
  },
  {
    quote:
      "I had the pleasure of working with Shibin. He is skilled with Figma and AI-based UI/UX design tools, and he collaborates seamlessly with dynamic teams. A strong designer with both creativity and adaptability.",
    name: "Adarsh Sharma",
    designation: "CEO Nuren AI",
    src: adarshImg,
  },
  {
    quote:
      "Shibin is an outstanding individual who excels at problem-solving and brings a creative approach to every challenge. His design skills are second to none, and he has consistently demonstrated a knack for finding elegant solutions.",
    name: "Jestin Sabu",
    designation: "Application Developer - IBM",
    src: jestinImg,
  },
];

const Testimonials = () => {
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
            I have helped many people to make designs for their product. Wanna be the next?
          </motion.p>
        </div>

        <AnimatedTestimonials testimonials={testimonials} autoplay />
      </div>
    </section>
  );
};

export default Testimonials;
