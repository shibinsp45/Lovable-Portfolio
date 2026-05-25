import FlowArt, { FlowSection } from "@/components/ui/story-scroll";

const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <p className="text-xs md:text-sm uppercase tracking-[0.3em] text-primary font-mono mb-6">
    {children}
  </p>
);

const Headline = ({ children }: { children: React.ReactNode }) => (
  <h2
    className="text-[14vw] md:text-[9vw] leading-[0.85] font-black uppercase tracking-tighter text-foreground"
    style={{ fontFamily: "'Inter Tight', sans-serif" }}
  >
    {children}
  </h2>
);

const Word = ({ children, accent }: { children: React.ReactNode; accent?: "orange" | "blue" }) => (
  <span
    className={
      accent === "orange"
        ? "text-primary"
        : accent === "blue"
        ? "text-accent"
        : "text-foreground"
    }
  >
    {children}
  </span>
);

const StoryScroll = () => {
  return (
    <section id="story" className="relative bg-background">
      <FlowArt aria-label="My story">
        {/* 01 — Who I am */}
        <FlowSection className="bg-background border-t border-border" aria-label="Who I am">
          <div className="container mx-auto px-6 md:px-12 max-w-7xl">
            <Eyebrow>01 — Who I am</Eyebrow>
            <Headline>
              <Word>Engineer</Word>
              <br />
              <Word accent="orange">Turned</Word>
              <br />
              <Word accent="blue">Designer</Word>
            </Headline>
            <p className="mt-10 max-w-2xl text-lg md:text-xl text-muted-foreground leading-relaxed">
              I'm Shibin — a UI/UX Designer and Front-End Developer crafting
              user-centered digital experiences. Pixels with purpose, motion
              with meaning.
            </p>
          </div>
        </FlowSection>

        {/* 02 — The mission */}
        <FlowSection className="bg-background border-t border-border" aria-label="Mission">
          <div className="container mx-auto px-6 md:px-12 max-w-7xl">
            <Eyebrow>02 — What I do</Eyebrow>
            <Headline>
              <Word>Design</Word>
              <br />
              <Word accent="orange">Build</Word>
              <br />
              <Word accent="blue">Ship</Word>
            </Headline>
            <p className="mt-10 max-w-2xl text-lg md:text-xl text-muted-foreground leading-relaxed">
              From research to high-fidelity prototypes to production code.
              I bridge the gap between design intent and engineering reality.
            </p>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-px bg-border">
              {[
                { k: "UI/UX", v: "Wireframes, prototypes, design systems built to scale." },
                { k: "Front-End", v: "React, TypeScript, Tailwind — pixel-precise builds." },
                { k: "AI Integration", v: "Embedding intelligence into user experiences." },
              ].map((b) => (
                <div key={b.k} className="bg-background p-8">
                  <p className="text-primary text-sm uppercase tracking-widest font-mono mb-3">
                    {b.k}
                  </p>
                  <p className="text-foreground text-base leading-relaxed">{b.v}</p>
                </div>
              ))}
            </div>
          </div>
        </FlowSection>

        {/* 03 — Journey */}
        <FlowSection className="bg-background border-t border-border" aria-label="Career">
          <div className="container mx-auto px-6 md:px-12 max-w-7xl">
            <Eyebrow>03 — The journey</Eyebrow>
            <Headline>
              <Word>Three</Word>
              <br />
              <Word accent="orange">Years.</Word>
              <br />
              <Word accent="blue">Real Work.</Word>
            </Headline>
            <div className="mt-12 space-y-px bg-border">
              {[
                {
                  role: "UI/UX Designer — Webcastle",
                  period: "2025 — Now",
                  body: "Designing intuitive interfaces, mentoring designers, and weaving AI-driven insights into product flows.",
                },
                {
                  role: "UI/UX Designer — Kreative Sparkz",
                  period: "2024",
                  body: "Led user research, built interactive prototypes, and shipped user-centered solutions end-to-end.",
                },
                {
                  role: "UI/UX Designer Intern — Nuren AI",
                  period: "2023 — 2024",
                  body: "Crafted CRM web UI and interaction patterns grounded in user research and rapid prototyping.",
                },
              ].map((e) => (
                <div
                  key={e.role}
                  className="bg-background p-8 md:p-10 grid md:grid-cols-[1fr_2fr] gap-6 hover:bg-secondary/40 transition-colors"
                >
                  <div>
                    <p className="text-primary font-mono text-sm uppercase tracking-widest">
                      {e.period}
                    </p>
                    <h3 className="text-2xl md:text-3xl font-bold text-foreground mt-2 leading-tight">
                      {e.role}
                    </h3>
                  </div>
                  <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                    {e.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </FlowSection>

        {/* 04 — Why */}
        <FlowSection className="bg-background border-t border-border" aria-label="Why work with me">
          <div className="container mx-auto px-6 md:px-12 max-w-7xl">
            <Eyebrow>04 — Why work with me</Eyebrow>
            <Headline>
              <Word>Fast.</Word>
              <br />
              <Word accent="orange">Sharp.</Word>
              <br />
              <Word accent="blue">Honest.</Word>
            </Headline>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-px bg-border">
              {[
                { n: "01", t: "Efficient Workflow", d: "Streamlined process — tight deadlines without dropping quality." },
                { n: "02", t: "Collaborative", d: "Your feedback shapes the work. No black-box deliverables." },
                { n: "03", t: "Pixel-Perfect", d: "Meticulous on every element. Polished, cohesive, intentional." },
              ].map((f) => (
                <div key={f.n} className="bg-background p-8 group">
                  <p className="text-7xl font-black text-primary/30 group-hover:text-primary transition-colors">
                    {f.n}
                  </p>
                  <h3 className="text-xl font-bold text-foreground mt-4">{f.t}</h3>
                  <p className="text-muted-foreground mt-3 leading-relaxed">{f.d}</p>
                </div>
              ))}
            </div>
          </div>
        </FlowSection>

        {/* 05 — Numbers */}
        <FlowSection className="bg-background border-t border-border" aria-label="By the numbers">
          <div className="container mx-auto px-6 md:px-12 max-w-7xl">
            <Eyebrow>05 — By the numbers</Eyebrow>
            <Headline>
              <Word>Let's</Word>
              <br />
              <Word accent="orange">Build</Word>
              <br />
              <Word accent="blue">Together.</Word>
            </Headline>
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-px bg-border">
              {[
                { v: "2.8+", l: "Years experience" },
                { v: "5+", l: "Clients" },
                { v: "10+", l: "Projects shipped" },
                { v: "100+", l: "Hours designing" },
              ].map((s) => (
                <div key={s.l} className="bg-background p-8">
                  <p className="text-5xl md:text-6xl font-black text-primary leading-none">
                    {s.v}
                  </p>
                  <p className="text-muted-foreground text-sm mt-3 uppercase tracking-widest font-mono">
                    {s.l}
                  </p>
                </div>
              ))}
            </div>
            <a
              href="#contact"
              className="inline-block mt-12 px-8 py-4 bg-primary text-primary-foreground font-bold uppercase tracking-widest hover:bg-accent transition-colors"
            >
              Get in touch →
            </a>
          </div>
        </FlowSection>
      </FlowArt>
    </section>
  );
};

export default StoryScroll;
