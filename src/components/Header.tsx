import { useState, useEffect } from "react";
import { Sparkles, Sun, ArrowUpRight, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import logoDark from "@/assets/logo-dark.png";
import logoLight from "@/assets/logo-light.png";

const Header = () => {
  const [isDark, setIsDark] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
  };

  const navLinks = [
    { name: "Portfolio", href: "#portfolio" },
    { name: "About", href: "#about" },
    { name: "Journey", href: "#journey" },
    { name: "Connect", href: "#contact" },
    { name: "LinkedIn", href: "https://linkedin.com/in/shibinsp45", external: true },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-background/60 backdrop-blur-xl border-b border-border/30"
            : ""
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <nav className="flex items-center justify-center relative h-9 sm:h-10">
            {/* Logo - Left (absolute) */}
            <Link
              to="/"
              className="absolute left-0 flex items-center gap-3 group"
            >
              <img
                src={isDark ? logoDark : logoLight}
                alt="Logo"
                className="h-8 sm:h-10 w-auto object-contain transition-all duration-300 group-hover:scale-110 invert dark:invert-0"
              />
            </Link>

            {/* Center Navigation - Desktop */}
            <div className="hidden md:flex items-center gap-0.5 px-1.5 py-1.5 rounded-full border border-border/40 bg-card/30 backdrop-blur-xl">
              {navLinks.map((link) =>
                link.external ? (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 font-sans text-sm px-5 py-2 text-foreground font-medium hover:text-primary hover:bg-secondary/50 rounded-full transition-all duration-200"
                  >
                    {link.name}
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                ) : (
                  <a
                    key={link.name}
                    href={link.href}
                    className="font-sans text-sm px-5 py-2 text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-full transition-all duration-200"
                  >
                    {link.name}
                  </a>
                )
              )}
            </div>

            {/* Theme Toggle - Right (absolute) */}
            <div className="absolute right-0 hidden md:flex">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="h-10 w-10 rounded-full border border-border/40 bg-card/30 backdrop-blur-xl hover:bg-secondary/50"
              >
                {isDark ? (
                  <Sparkles className="h-4 w-4 text-foreground" />
                ) : (
                  <Sun className="h-4 w-4 text-foreground" />
                )}
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="absolute right-0 flex md:hidden items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="h-10 w-10 rounded-full border border-border/40 bg-card/30 backdrop-blur-xl"
              >
                {isDark ? (
                  <Sparkles className="h-4 w-4 text-foreground" />
                ) : (
                  <Sun className="h-4 w-4 text-primary" />
                )}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="h-10 w-10 rounded-full border border-border/40 bg-card/30 backdrop-blur-xl"
              >
                {isMobileMenuOpen ? (
                  <X className="h-4 w-4" />
                ) : (
                  <Menu className="h-4 w-4" />
                )}
              </Button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Menu - Fullscreen (outside header to avoid container clipping) */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 w-full h-full bg-background/95 backdrop-blur-xl md:hidden z-[60] flex flex-col items-center justify-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(false)}
            className="absolute top-6 right-6 h-10 w-10 rounded-full border border-border/40 bg-card/30"
          >
            <X className="h-5 w-5" />
          </Button>
          <div className="flex flex-col items-start gap-6 px-8">
            {navLinks.map((link) =>
              link.external ? (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-2 font-sans text-2xl font-light text-foreground hover:text-primary transition-all duration-200"
                >
                  {link.name} <ArrowUpRight className="w-5 h-5" />
                </a>
              ) : (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-sans text-2xl font-light text-muted-foreground hover:text-foreground transition-all duration-200"
                >
                  {link.name}
                </a>
              )
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
