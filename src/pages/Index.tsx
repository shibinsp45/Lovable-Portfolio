import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ModulesCarousel from "@/components/ModulesCarousel";
import Projects from "@/components/Projects";
import About from "@/components/About";
import Career from "@/components/Career";
import WhyChooseMe from "@/components/WhyChooseMe";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <ModulesCarousel />
      <Projects />
      <About />
      <Career />
      <WhyChooseMe />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
