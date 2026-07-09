import { motion } from "framer-motion";

const experiences = [
  {
    company: "Webcastle",
    role: "UI/UX Designer",
    period: "2025 — Now",
  },
  {
    company: "Kreative Sparkz",
    role: "UI/UX Designer",
    period: "2024",
  },
  {
    company: "Nuren AI",
    role: "UI/UX Designer Intern",
    period: "2023 — 2024",
  },
];

const socials = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/shibinsp45/" },
  { label: "Behance", href: "https://www.behance.net/shibinsp" },
];

const About = () => {
  return (
    <section id="about" className="relative bg-background overflow-hidden py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left: Headline + Image + Socials */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight leading-[1.05] text-foreground mb-8 md:mb-10"
              style={{ fontFamily: "'Quicksand', sans-serif" }}
            >
              <span className="text-muted-foreground">Crafted by mind,</span>
              <br />
              designed with soul.
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="aspect-[4/5] w-full rounded-2xl overflow-hidden bg-secondary"
            >
              <img
                alt="Shibin S P"
                className="w-full h-full object-cover"
                src="/lovable-uploads/271586bf-e3ab-4edd-a6f9-6916bef817ff.jpg"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="mt-6 flex flex-wrap gap-3"
            >
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center px-5 py-2 rounded-full border border-border/60 text-sm font-medium text-foreground hover:bg-foreground hover:text-background transition-colors"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  {s.label}
                </a>
              ))}
            </motion.div>
          </div>

          {/* Right: Where I've been + Bio */}
          <div className="lg:pt-4">



            <div
              className="mt-10 space-y-5 text-[15px] md:text-base text-muted-foreground leading-relaxed"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <span className="text-foreground font-semibold">
                  I'm an engineer turned UI/UX designer
                </span>{" "}
                — I spent years learning how systems work, then realized what I loved
                most was shaping how they feel to use.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <span className="text-foreground font-semibold">
                  Right now I design across mobile, web, and brand
                </span>{" "}
                — building case studies, product experiences, and interfaces that lean
                on clarity, motion, and a bit of AI to make the work sharper.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <span className="text-foreground font-semibold">
                  I care about the small things
                </span>{" "}
                — the weight of a button, the rhythm of a flow, the copy on an empty
                state. That's where trust gets built.
              </motion.p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
