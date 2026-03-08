import { motion } from "framer-motion";
import logoDark from "@/assets/logo-dark.png";

const footerLinks = {
  pages: [
    { name: "Portfolio", href: "#portfolio" },
    { name: "About", href: "#about" },
    { name: "Contact me", href: "#contact" },
    { name: "Book a call", href: "#contact" },
  ],
  social: [
    { name: "Twitter", href: "https://twitter.com" },
    { name: "Instagram", href: "https://instagram.com" },
    { name: "LinkedIn", href: "https://linkedin.com" },
    { name: "Behance", href: "https://behance.net" },
  ],
};

const Footer = () => {
  return (
    <footer className="py-16 md:py-20 bg-card/20 backdrop-blur-xl border-t border-border/30 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[150px]" />
        <div className="absolute top-0 right-1/4 w-80 h-80 bg-[hsl(280,60%,50%)]/5 rounded-full blur-[120px]" />
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12"
        >
          {/* Brand */}
          <div className="space-y-4">
            <img
              src={logoDark}
              alt="Shibin"
              className="h-12 md:h-14 w-auto object-contain"
            />
            <p className="text-muted-foreground text-sm max-w-xs leading-relaxed">
              UX Designer who crafting clean & modern designs with soul
            </p>
            <p className="text-muted-foreground text-sm">
              shibinsp45@gmail.com
            </p>
          </div>

          {/* Pages */}
          <div>
            <h4 className="text-foreground font-medium text-sm mb-4">Pages</h4>
            <ul className="flex flex-col gap-3">
              {footerLinks.pages.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-foreground font-medium text-sm mb-4">Social</h4>
            <ul className="flex flex-col gap-3">
              {footerLinks.social.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
