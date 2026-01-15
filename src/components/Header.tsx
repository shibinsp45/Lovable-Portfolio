import { useState, useEffect } from "react";
import { Sparkles, Sun, ArrowUpRight, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";
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
  const navLinks = [{
    name: "Portfolio",
    href: "#portfolio"
  }, {
    name: "About",
    href: "#about"
  }, {
    name: "Connect",
    href: "#contact"
  }];
  return <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-background/60 backdrop-blur-xl border-b border-border/30" : ""}`}>
      <div className="container mx-auto px-6 py-4">
        <nav className="flex items-center justify-between">
          {/* Logo - Left */}
          <Link to="/" className="flex items-center gap-3 group">
            <img src={logo} alt="Logo" className="h-10 w-auto object-contain transition-all duration-300 group-hover:scale-110" />
            
          </Link>

          {/* Center Navigation - Desktop */}
          <div className="hidden md:flex items-center gap-1 px-4 py-2 rounded-full border border-border/40 bg-card/30 backdrop-blur-xl">
            {navLinks.map(link => <a key={link.name} href={link.href} className="text-sm px-4 py-2 text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-full transition-all duration-200">
                {link.name}
              </a>)}
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-sm px-4 py-2 text-foreground hover:text-primary hover:bg-secondary/50 rounded-full transition-all duration-200">
              LinkedIn <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>

          <div className="hidden md:flex">
            <Button variant="ghost" size="icon" onClick={toggleTheme} className="h-10 w-10 rounded-full border border-border/40 bg-card/30 backdrop-blur-xl hover:bg-secondary/50">
              {isDark ? <Sparkles className="h-4 w-4 text-foreground" /> : <Sun className="h-4 w-4 text-amber-500" />}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <Button variant="ghost" size="icon" onClick={toggleTheme} className="h-10 w-10 rounded-full border border-border/40 bg-card/30 backdrop-blur-xl">
              {isDark ? <Sparkles className="h-4 w-4 text-foreground" /> : <Sun className="h-4 w-4 text-amber-500" />}
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="h-10 w-10 rounded-full border border-border/40 bg-card/30 backdrop-blur-xl">
              {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {isMobileMenuOpen && <div className="mt-4 p-4 rounded-2xl border border-border/40 bg-card/50 backdrop-blur-xl md:hidden">
            <div className="flex flex-col gap-2">
              {navLinks.map(link => <a key={link.name} href={link.href} onClick={() => setIsMobileMenuOpen(false)} className="text-muted-foreground hover:text-foreground hover:bg-secondary/50 px-4 py-3 rounded-xl transition-all duration-200">
                  {link.name}
                </a>)}
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-foreground hover:text-primary hover:bg-secondary/50 px-4 py-3 rounded-xl transition-all duration-200">
                LinkedIn <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>}
      </div>
    </header>;
};
export default Header;