import { motion } from "framer-motion";
import { Clock, MessageCircle, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: Clock,
    title: "Efficient Workflow",
    description: "Streamlined design process for rapid delivery, meeting tight deadlines without compromising quality or detail.",
  },
  {
    icon: MessageCircle,
    title: "Collaborative Process",
    description: "I work closely with you, integrating your feedback to create designs that exceed your expectations.",
  },
  {
    icon: Search,
    title: "Attention to Detail",
    description: "Meticulous attention to every element, ensuring a polished and cohesive final product that impresses.",
  },
];

const WhyChooseMe = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Button variant="secondary" className="rounded-full px-6 mb-6">
            Why u choose me ?
          </Button>
          <h2 className="text-3xl md:text-5xl font-serif text-muted-foreground">
            I'll help you to make unique
          </h2>
          <div className="flex justify-center mt-4">
            <div className="w-2 h-2 rounded-full bg-primary" />
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-card rounded-3xl p-8 border border-border hover:border-primary/50 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center mb-6">
                <feature.icon className="w-6 h-6 text-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-card-foreground">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseMe;
