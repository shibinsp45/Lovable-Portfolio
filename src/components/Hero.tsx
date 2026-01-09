import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const skills = [
  "Web Development",
  "Mobile App Design",
  "Product Design",
  "Prompt Engineering",
  "Web Development",
  "Mobile App Design",
  "Product Design",
  "Prompt Engineering",
];

const Hero = () => {
  return (
    <section className="min-h-screen flex flex-col justify-center pt-20">
      <div className="container mx-auto px-6 text-center flex-1 flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-6"
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-medium">
            <span className="text-primary">Shibin S P</span>
          </h1>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-medium text-primary">
            UX Designer
          </h2>
          <p className="text-3xl md:text-5xl lg:text-6xl font-medium text-primary">
            Crafting Soulful Experiences
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12"
        >
          <Button
            variant="outline"
            size="lg"
            className="rounded-full px-8 py-6 text-lg border-border hover:bg-secondary"
          >
            Get Resume <ArrowUpRight className="ml-2 h-5 w-5" />
          </Button>
        </motion.div>
      </div>

      {/* Skills Marquee */}
      <div className="w-full overflow-hidden bg-secondary/50 py-4 mt-auto">
        <div className="animate-marquee flex whitespace-nowrap">
          {[...skills, ...skills].map((skill, index) => (
            <span
              key={index}
              className="mx-8 text-muted-foreground text-sm md:text-base"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
