import { Section } from "@/components/Section";
import { highlights } from "@/constants/about";
import { motion, type Variants } from "framer-motion";

const textContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const textItemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 100, damping: 15 },
  },
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 100, damping: 15 },
  },
};

const getIconVariants = (title: string): Variants => {
  switch (title) {
    case "Clean Code":
      return {
        hover: {
          rotate: [0, -10, 10, -5, 5, 0],
          transition: { duration: 0.5, ease: "easeInOut" as const },
        },
      };
    case "Performance":
      return {
        hover: {
          y: [0, -6, 2, -2, 0],
          x: [0, 2, -2, 0],
          transition: { duration: 0.6, ease: "easeInOut" as const },
        },
      };
    case "Collaboration":
      return {
        hover: {
          scale: [1, 1.15, 0.95, 1.05, 1],
          transition: { duration: 0.5, ease: "easeInOut" as const },
        },
      };
    case "Innovation":
      return {
        hover: {
          scale: [1, 1.2, 1],
          transition: { duration: 0.8, repeat: Infinity, ease: "easeInOut" as const },
        },
      };
    case "SEO Optimization":
      return {
        hover: {
          scale: [1, 1.15, 1],
          y: [0, -4, 4, 0],
          transition: { duration: 0.6, ease: "easeInOut" as const },
        },
      };
    case "Responsive Design":
      return {
        hover: {
          scale: [1, 1.1, 0.95, 1.05, 1],
          rotate: [0, -5, 5, -3, 3, 0],
          transition: { duration: 0.5, ease: "easeInOut" as const },
        },
      };
    default:
      return {};
  }
};

function About() {
  return (
    <Section id="about">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 -right-48 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] pointer-events-none -z-10 animate-pulse-glow" />
      <div className="absolute bottom-1/4 -left-48 w-[400px] h-[400px] bg-primary/3 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="container relative mx-auto px-6 z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column */}
          <motion.div
            variants={textContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-8"
          >
            <motion.div variants={textItemVariants} className="flex">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold text-primary uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                About Me
              </div>
            </motion.div>

            <motion.h2
              variants={textItemVariants}
              className="text-4xl md:text-5xl font-bold leading-tight text-secondary-foreground"
            >
              Building the future,
              <span className="font-serif italic font-normal text-white">
                {" "}
                one component at a time.
              </span>
            </motion.h2>

            <motion.div
              variants={textItemVariants}
              className="space-y-4 text-muted-foreground"
            >
              <p>
                I'm a passionate software engineer with over{" "}
                <span className="text-foreground font-medium underline decoration-primary/30 decoration-2 underline-offset-4">
                  2+ years of experience
                </span>{" "}
                crafting digital products that make a difference. My journey
                started with a curiosity for how things work on the web, and it
                has evolved into a deep expertise in modern frontend
                technologies.
              </p>
              <p>
                I specialize in{" "}
                <span className="text-foreground font-medium hover:text-primary transition-colors">
                  React
                </span>
                ,{" "}
                <span className="text-foreground font-medium hover:text-primary transition-colors">
                  Next.js
                </span>
                , and{" "}
                <span className="text-foreground font-medium hover:text-primary transition-colors">
                  TypeScript
                </span>
                , building everything from sleek landing pages to complex
                enterprise applications. My approach combines technical
                excellence with a keen eye for design and user experience.
              </p>
              <p>
                When I'm not coding, you'll find me exploring new technologies,
                contributing to open-source projects, or sharing knowledge with
                the developer community.
              </p>
            </motion.div>

            <motion.div
              variants={textItemVariants}
              className="relative glass rounded-2xl p-6 glow-border overflow-hidden group"
            >
              {/* Decorative gradient side-border */}
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary to-primary/40" />
              <p className="text-lg font-medium italic text-foreground leading-relaxed pl-2">
                "My mission is to create digital experiences that are not just
                functional, but truly delightful — products that users love to
                use and developers love to maintain."
              </p>
            </motion.div>
          </motion.div>

          {/* Right column highlights */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid sm:grid-cols-2 gap-6"
          >
            {highlights.map((highlight, i) => (
              <motion.div
                key={i}
                variants={cardVariants}
                whileHover="hover"
                className="glass rounded-2xl glow-border p-6 cursor-pointer relative overflow-hidden transition-all duration-300 hover:border-primary/30 group"
              >
                {/* Spotlight overlay effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 transition-all duration-300 group-hover:bg-primary/20 group-hover:scale-105">
                  <motion.div variants={getIconVariants(highlight.title)}>
                    <highlight.icon className="w-6 h-6 text-primary" />
                  </motion.div>
                </div>
                <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                  {highlight.title}
                </h3>
                <p className="text-sm text-muted-foreground group-hover:text-muted-foreground/80 transition-colors">
                  {highlight.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </Section>
  );
}

export default About;
