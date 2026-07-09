import { useState, useEffect } from "react";
import { Sun, Moon, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import logoDark from "@/assets/logo-dark.png";
import logoLight from "@/assets/logo-light.png";

const Header = () => {
  const [isDark, setIsDark] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
  };

  const navLinks = [
    { name: "Work", href: "#portfolio" },
    { name: "About", href: "#about" },
    { name: "Process", href: "#journey" },
    { name: "Experience", href: "#journey" },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
          <nav className="flex justify-center">
            {/* Unified pill */}
            <div className="hidden md:flex items-center gap-6 pl-2 pr-2 py-2 rounded-full border border-border/60 bg-card/70 backdrop-blur-xl shadow-sm">
              <Link to="/" className="flex items-center pl-1 pr-1" aria-label="Home">
                <img
                  src={isDark ? logoDark : logoLight}
                  alt="Shibin SP"
                  className="h-9 w-9 rounded-full object-cover bg-secondary invert dark:invert-0"
                />
              </Link>


              <div className="flex items-center gap-1">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="font-sans text-sm px-4 py-2 text-muted-foreground hover:text-foreground rounded-full transition-colors"
                  >
                    {link.name}
                  </a>
                ))}
              </div>

              <a
                href="#contact"
                className="font-sans text-sm px-5 py-2 rounded-full bg-background border border-border text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all"
              >
                Connect
              </a>

              <button
                onClick={toggleTheme}
                className="w-9 h-9 rounded-full border border-border/60 flex items-center justify-center text-foreground hover:bg-secondary transition-colors"
                aria-label="Toggle theme"
              >
                {isDark ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
              </button>
            </div>

            {/* Mobile compact pill */}
            <div className="flex md:hidden items-center gap-2 w-full justify-between px-3 py-2 rounded-full border border-border/60 bg-card/70 backdrop-blur-xl">
              <Link to="/" className="flex items-center" aria-label="Home">
                <img
                  src={isDark ? logoDark : logoLight}
                  alt="Shibin SP"
                  className="h-8 w-8 rounded-full object-cover bg-secondary invert dark:invert-0"
                />
              </Link>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="w-8 h-8 rounded-full border border-border/60 flex items-center justify-center"
                aria-label="Menu"
              >
                {isMobileMenuOpen ? <X className="h-3.5 w-3.5" /> : <Menu className="h-3.5 w-3.5" />}
              </button>

            </div>
          </nav>
        </div>
      </header>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 w-full h-full bg-background/95 backdrop-blur-xl md:hidden z-[60] flex flex-col items-center justify-center">
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="absolute top-6 right-6 h-10 w-10 rounded-full border border-border/60 flex items-center justify-center"
          >
            <X className="h-5 w-5" />
          </button>
          <div className="flex flex-col items-start gap-6 px-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="font-sans text-2xl font-medium text-foreground hover:text-primary transition-colors"
              >
                {link.name}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="mt-4 font-sans text-lg px-6 py-3 rounded-full bg-primary text-primary-foreground"
            >
              Connect
            </a>
            <button
              onClick={toggleTheme}
              className="mt-2 flex items-center gap-3 font-sans text-base px-5 py-3 rounded-full border border-border/60 text-foreground hover:bg-secondary transition-colors"
              aria-label="Toggle theme"
            >
              {isDark ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
              <span>{isDark ? "Dark mode" : "Light mode"}</span>
            </button>

          </div>
        </div>
      )}
    </>
  );
};

export default Header;
