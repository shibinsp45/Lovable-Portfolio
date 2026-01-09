import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Contact = () => {
  return (
    <section id="contact" className="py-24 bg-background relative overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/20 to-transparent" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-8"
        >
          <Button variant="secondary" className="rounded-full px-6">
            Contact
          </Button>

          <h2 className="text-4xl md:text-6xl font-serif">
            <span className="text-muted-foreground">Let's </span>
            <span className="text-primary">Get in Touch</span>
          </h2>

          <p className="text-muted-foreground max-w-md mx-auto">
            Let's connect and start with your project ASAP.
          </p>

          <div className="flex justify-center">
            <div className="w-2 h-2 rounded-full bg-primary" />
          </div>

          <Button
            variant="outline"
            size="lg"
            className="rounded-full px-8 py-6 text-lg border-border hover:bg-secondary"
            asChild
          >
            <a href="mailto:shibinsp45@gmail.com">
              Email me <ArrowUpRight className="ml-2 h-5 w-5" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
