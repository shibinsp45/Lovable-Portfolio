import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Mail, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRef } from "react";

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const Contact = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const bgOrbY = useTransform(scrollYProgress, [0, 1], ["40%", "-40%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["15%", "-15%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.95]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.5, 1, 1, 0.8]);

  return (
    <section
      id="contact"
      className="py-16 md:py-20 bg-background relative overflow-hidden"
      ref={containerRef}
    >
      {/* Parallax animated background orbs */}
      <motion.div className="absolute inset-0 pointer-events-none" style={{ y: bgOrbY }}>
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/10 rounded-full blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.5, 0.3, 0.5] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          style={{ y: contentY, scale, opacity }}
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center max-w-2xl mx-auto space-y-8"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Button variant="secondary" className="rounded-full px-6">
              Get in Touch <ArrowUpRight className="ml-1 h-4 w-4" />
            </Button>
          </motion.div>

          <motion.h2
            className="text-3xl sm:text-4xl md:text-6xl font-light tracking-wide"
            style={{ fontFamily: "'Quicksand', sans-serif" }}
            initial={{ opacity: 0, y: 40, filter: "blur(15px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <span className="bg-gradient-to-r from-foreground/80 via-muted-foreground/60 to-muted-foreground/40 bg-clip-text text-transparent">
              Let's Get in
            </span>
            <span className="ml-3 bg-gradient-to-b from-muted-foreground/50 via-muted-foreground/30 to-muted-foreground/20 bg-clip-text text-transparent">
              Touch
            </span>
          </motion.h2>

          <motion.p
            className="text-muted-foreground max-w-md mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Let's connect and start with your project ASAP.
          </motion.p>

          <motion.div
            className="flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6, type: "spring", stiffness: 100 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Button
                variant="outline"
                size="lg"
                className="rounded-full px-8 py-6 text-lg border-border/30 bg-card/30 backdrop-blur-xl hover:bg-card/50 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 group"
                asChild
              >
                <a href="mailto:shibinsp45@gmail.com" className="flex items-center gap-2">
                  <Mail className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                  <span className="hidden md:inline">Email me</span>
                  <ArrowUpRight className="ml-1 h-5 w-5 hidden md:inline group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                </a>
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Button
                variant="outline"
                size="lg"
                className="rounded-full px-8 py-6 text-lg border-border/30 bg-card/30 backdrop-blur-xl hover:bg-card/50 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 group"
                asChild
              >
                <a href="https://wa.me/8606129072" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                  <WhatsAppIcon className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                  <span className="hidden md:inline">WhatsApp</span>
                  <ArrowUpRight className="ml-1 h-5 w-5 hidden md:inline group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                </a>
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Button
                variant="outline"
                size="lg"
                className="rounded-full px-8 py-6 text-lg border-border/30 bg-card/30 backdrop-blur-xl hover:bg-card/50 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 group"
                asChild
              >
                <a href="https://linkedin.com/in/shibinsp45" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                  <Linkedin className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                  <span className="hidden md:inline">LinkedIn</span>
                  <ArrowUpRight className="ml-1 h-5 w-5 hidden md:inline group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                </a>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
