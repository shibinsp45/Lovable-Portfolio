import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const experiences = [
  {
    title: "UI UX Designer - Webcastle",
    period: "2025 - Now",
    description: "Helping humans with UI/UX design and development, AI-driven social insights, and mentoring designers!",
  },
  {
    title: "UI/UX Designer - Kreative Sparkz",
    period: "2024 - 2024",
    description: "Designed user-centered UI/UX solutions, leading user research to inform design decisions. Developed interactive prototypes and wireframes, ensuring seamless user experiences. Mentored budding designers on UX best practices and integrated AI-driven enhancements to improve frontend experiences.",
  },
  {
    title: "UI/UX Designer Intern – Nuren AI",
    period: "2023 - 2024",
    description: "Created web UI and interactions for a CRM system with a focus on user-centered design. Conducted user research and developed prototypes to improve the overall user experience. Worked closely with teams to ensure the delivery of a smooth and visually engaging interface.",
  },
];

const Career = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <Button variant="secondary" className="rounded-full px-6 mb-6">
            Career
          </Button>
          <h2 className="text-3xl md:text-5xl font-serif text-muted-foreground">
            And This Is My Creative Journey
          </h2>
        </motion.div>

        <div className="space-y-12">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="grid md:grid-cols-2 gap-6 md:gap-12"
            >
              <div className="flex items-start gap-4">
                <div className="hidden md:block w-2 h-2 rounded-full bg-primary mt-3 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold text-foreground">
                    {exp.title}
                  </h3>
                  <span className="text-muted-foreground text-sm">{exp.period}</span>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                {exp.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Career;
