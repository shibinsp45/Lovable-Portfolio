import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

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
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <Button variant="secondary" className="rounded-full px-6">
              Testimonials
            </Button>

            <h2 className="text-3xl md:text-4xl font-serif">
              <span className="text-primary">See what others say</span>
              <br />
              <span className="text-muted-foreground">about me</span>
            </h2>

            <p className="text-muted-foreground">
              I have helped many people to make a designs for their product.
              <br />
              Wanna be the next?
            </p>

            <Button
              variant="outline"
              className="rounded-full px-6 border-border hover:bg-secondary"
            >
              Contact <ArrowUpRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>

          {/* Testimonials */}
          <div className="space-y-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-card rounded-3xl p-6 border border-border"
              >
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                  {testimonial.quote}
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                    <span className="text-sm font-medium text-muted-foreground">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
