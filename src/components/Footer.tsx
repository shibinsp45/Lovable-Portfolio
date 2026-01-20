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
          className="grid md:grid-cols-3 gap-12"
        >
          {/* Brand */}
          <div className="space-y-4">
            <img src={logoDark} alt="Shibin" className="h-16 w-auto object-contain" />
            <p className="text-muted-foreground text-sm">
              UX Designer who crafting
              <br />
              clean & modern designs with soul
            </p>
            <p className="text-muted-foreground text-sm">
              shibinsp45@gmail.com
            </p>
          </div>

          {/* Pages */}
          <div>
            <ul className="space-y-3">
              {footerLinks.pages.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <ul className="space-y-3">
              {footerLinks.social.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        <div className="mt-16 pt-8 border-t border-border text-center">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Shibin S P. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
