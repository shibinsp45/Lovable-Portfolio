import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="min-h-[92vh] flex flex-col justify-center pt-24 pb-12 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ type: "spring", stiffness: 120, damping: 18, delay: 0.1 }}
          className="font-sans font-black tracking-tight leading-[1.03]"
          style={{ fontSize: "clamp(2.5rem, 8vw, 5.5rem)" }}
        >
          <span className="flex flex-wrap items-center gap-x-3 sm:gap-x-5 gap-y-1 text-muted-foreground/70">
            <span>Hey</span>
            <span className="whitespace-nowrap">I'm Shibin S P.</span>
          </span>
          <span className="block text-foreground mt-1 sm:mt-2">I'm a Product Designer</span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 140, damping: 20, delay: 0.35 }}
          className="mt-8 sm:mt-10 max-w-2xl text-base sm:text-lg leading-relaxed"
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
