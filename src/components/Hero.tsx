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
        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="font-sans font-black tracking-tight leading-[1.05] text-[10vw] sm:text-[8vw] lg:text-[6vw] xl:text-[5.25rem]"
        >
          <span className="flex flex-wrap items-center gap-x-3 sm:gap-x-5 gap-y-2 text-muted-foreground/70">
            <span>Hey</span>
            <Sparkle
              className="w-6 h-6 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-muted-foreground/60 fill-muted-foreground/40 shrink-0"
              strokeWidth={1.5}
            />
            <span className="whitespace-nowrap">I'm Shibin S P.</span>
          </span>
          <span className="block text-foreground mt-2 sm:mt-3">I'm a Product Designer</span>
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
