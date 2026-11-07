import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Linkedin, Mail } from "lucide-react";

const contactLinks = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/shibinsp45/",
    icon: <Linkedin aria-hidden="true" />,
  },
  {
    label: "Email",
    href: "mailto:shibnsp45@gmail.com",
    icon: <Mail aria-hidden="true" />,
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/8606129072",
    icon: (
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className="size-4">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884" />
      </svg>
    ),
  },
];

const Contact = () => {
  return (
    <section
      id="contact"
      className="py-14 md:py-20 relative overflow-hidden"
    >

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center max-w-2xl mx-auto space-y-6"
        >
          <motion.h2
            className="text-3xl sm:text-4xl md:text-6xl font-light"
            style={{ fontFamily: "'Quicksand', sans-serif" }}
            initial={{ opacity: 0, y: 40, filter: "blur(15px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <span className="bg-gradient-to-r from-foreground/80 via-muted-foreground/60 to-muted-foreground/40 bg-clip-text text-transparent">
              Get in
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
            Let's connect and talk about your next project.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap justify-center gap-3 pt-2"
          >
            {contactLinks.map((link) => (
              <Button key={link.label} asChild variant="outline" className="gap-2">
                <a href={link.href} target={link.label === "Email" ? undefined : "_blank"} rel="noreferrer">
                  {link.icon}
                  {link.label}
                </a>
              </Button>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};


export default Contact;
