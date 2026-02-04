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
    <footer className="py-16 bg-background border-t border-border">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-10"
        >
          {/* Row 1 - Brand */}
          <div className="space-y-4">
            <img src={logoDark} alt="Shibin" className="h-12 md:h-16 w-auto object-contain" />
            <p className="text-muted-foreground text-xs md:text-sm max-w-xs">
              UX Designer who crafting clean & modern designs with soul
            </p>
            <p className="text-muted-foreground text-xs md:text-sm">
              shibinsp45@gmail.com
            </p>
          </div>

          {/* Row 2 - Pages */}
          <div>
            <h4 className="text-foreground font-medium text-sm mb-4">Pages</h4>
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {footerLinks.pages.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors duration-200 text-xs md:text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Row 3 - Social */}
          <div>
            <h4 className="text-foreground font-medium text-sm mb-4">Social</h4>
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {footerLinks.social.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors duration-200 text-xs md:text-sm"
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
