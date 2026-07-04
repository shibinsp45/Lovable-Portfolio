import { motion } from "framer-motion";
import { Sparkle } from "lucide-react";

const Hero = () => {
  return (
    <section className="min-h-screen flex flex-col justify-center pt-32 pb-20 relative overflow-hidden bg-background">
      {/* Soft ambient background — subtle in dark, cream-hint in light */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-secondary/40" />
        <div className="absolute top-1/3 -left-40 w-[500px] h-[500px] rounded-full bg-primary/10 blur-[180px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-accent/10 blur-[160px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        {/* Status pill */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border/70 bg-card/60 backdrop-blur-md mb-10 sm:mb-14"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
          </span>
          <span className="font-sans text-sm text-foreground">Open to opportunities</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="font-sans font-black tracking-tight leading-[1.02] text-[13vw] sm:text-[10vw] lg:text-[7.5vw] xl:text-[6.5rem]"
        >
          <span className="inline-flex items-center gap-3 sm:gap-5 text-muted-foreground/70">
            Hey
            <Sparkle
              className="w-8 h-8 sm:w-12 sm:h-12 lg:w-14 lg:h-14 text-muted-foreground/60 fill-muted-foreground/40"
              strokeWidth={1.5}
            />
            I'm Shibin S P.
          </span>
          <br />
          <span className="text-foreground">I'm a Product Designer</span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-10 sm:mt-14 max-w-2xl text-base sm:text-lg leading-relaxed"
        >
          <span className="font-semibold text-foreground">
            Welcome to my little corner of the internet.
          </span>{" "}
          <span className="text-muted-foreground">
            I'm a lead product designer who finds the signal in the noise — then makes it pretty.
          </span>
        </motion.p>
      </div>
    </section>
  );
};

export default Hero;
