import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const stats = [
  { value: "1.5+", label: "Years of experience" },
  { value: "5+", label: "Clients" },
  { value: "10+", label: "Projects Completed" },
  { value: "100+", label: "Hours of Designing" },
];

const About = () => {
  return (
    <section id="about" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-serif text-muted-foreground text-center mb-4"
        >
          Craft by mind Design with soul
        </motion.p>
        
        <div className="flex justify-center mb-16">
          <div className="w-2 h-2 rounded-full bg-primary" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="aspect-[3/4] rounded-3xl overflow-hidden bg-secondary">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=667&fit=crop"
                alt="Shibin S P"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* About Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <Button variant="secondary" className="rounded-full px-6">
              Who I'am
            </Button>

            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-serif">
                <span className="text-muted-foreground">I am an Engineer turned</span>
                <br />
                <span className="text-primary">Into a UI/UX Developer</span>
              </h2>
              
              <p className="text-muted-foreground leading-relaxed">
                Experienced UI/UX Designer and Front-End Developer with a strong focus on 
                creating user-centered, visually appealing digital experiences. Skilled in 
                front-end development and UI/UX design principles, I design intuitive, 
                high-fidelity prototypes and collaborate with cross-functional teams to 
                deliver innovative, high-quality solutions. I also have a solid understanding 
                of AI integration to enhance user experiences and improve design efficiency.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="text-center md:text-left"
                >
                  <div className="text-3xl md:text-4xl font-bold text-foreground">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
