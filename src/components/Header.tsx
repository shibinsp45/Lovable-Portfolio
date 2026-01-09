import { useState, useEffect } from "react";
import { Moon, Sun, ArrowUpRight, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

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
    { name: "Connect", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/80 backdrop-blur-lg border-b border-border" : ""
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <nav className="flex items-center justify-between">
          <a href="#" className="text-2xl font-serif italic text-foreground">
            Shibin
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                {link.name}
              </a>
            ))}
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-foreground hover:text-primary transition-colors duration-200"
            >
              LinkedIn <ArrowUpRight className="w-4 h-4" />
            </a>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="ml-2"
            >
              {isDark ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <Button variant="ghost" size="icon" onClick={toggleTheme}>
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-border pt-4">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  {link.name}
                </a>
              ))}
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-foreground hover:text-primary transition-colors duration-200"
              >
                LinkedIn <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
