import { SectionHeader } from "@/components/SectionHeader";
import { Section } from "@/components/Section";
import { experiences } from "@/constants/experiences";
import { motion, type Variants } from "framer-motion";
import { Briefcase, Calendar } from "lucide-react";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 100, damping: 15 },
  },
};

function Experiences() {
  return (
    <Section id="experiences">
      {/* Ambient background glows */}
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 pointer-events-none -z-10 animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-primary/3 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <SectionHeader
          spanTitle="Career Journey"
          sectionTitle="Experience that"
          spanSectionTitle="speaks volumes."
          paragraph="A timeline of my professional growth, from curious beginner to senior engineer leading teams and building products at scale."
        />

        {/* TimeLine */}
        <div className="relative mt-16 max-w-7xl mx-auto">
          {/* Glowing Center Line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary/80 via-primary/20 to-transparent -translate-x-1/2 rounded-full shadow-[0_0_15px_rgba(32,178,166,0.5)]" />
          {/* Mobile Glowing Line */}
          <div className="md:hidden absolute left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-primary/80 via-primary/20 to-transparent rounded-full shadow-[0_0_15px_rgba(32,178,166,0.5)]" />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="space-y-12"
          >
            {experiences.map((exp, expIdx) => (
              <motion.div
                key={expIdx}
                variants={itemVariants}
                className="relative grid md:grid-cols-2 gap-8 md:gap-16 items-center group"
              >
                {/* Timeline Dot (Desktop) */}
                <div className="hidden md:flex absolute left-1/2 top-1/2 w-10 h-10 bg-background border-4 border-primary rounded-full -translate-x-1/2 -translate-y-1/2 items-center justify-center z-10 shadow-[0_0_10px_rgba(32,178,166,0.3)] transition-transform duration-300 group-hover:scale-110">
                  {exp.current ? (
                    <div className="relative flex items-center justify-center w-full h-full">
                      <span className="absolute inline-flex h-full w-full rounded-full bg-primary/50 animate-ping opacity-75" />
                      <Briefcase className="w-4 h-4 text-primary" />
                    </div>
                  ) : (
                    <Briefcase className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  )}
                </div>

                {/* Timeline Dot (Mobile) */}
                <div className="md:hidden absolute left-4 top-8 w-6 h-6 bg-background border-4 border-primary rounded-full -translate-x-1/2 items-center justify-center z-10 shadow-[0_0_10px_rgba(32,178,166,0.3)]">
                  {exp.current && (
                    <span className="absolute inset-0 rounded-full bg-primary/50 animate-ping opacity-75" />
                  )}
                </div>

                {/* Timeline Content */}
                <div
                  className={`pl-12 md:pl-0 text-left ${
                    expIdx % 2 === 0 ? "md:pr-12" : "md:col-start-2 md:pl-12"
                  }`}
                >
                  <div className="relative glass p-8 rounded-3xl glow-border hover:border-primary/50 transition-all duration-500 overflow-hidden group/card">
                    {/* Hover Spotlight */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none" />

                    {/* Active State Gradient Border */}
                    {exp.current && (
                      <div
                        className={`absolute top-0 bottom-0 w-1 bg-gradient-to-b from-primary to-primary/40 ${expIdx % 2 === 0 ? "right-0" : "left-0"}`}
                      />
                    )}

                    <div className="flex flex-col gap-2 items-start">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold text-primary">
                        <Calendar className="w-3 h-3" />
                        {exp.period}
                      </div>
                      <h3 className="text-2xl font-bold mt-2 text-foreground group-hover/card:text-primary transition-colors duration-300">
                        {exp.role}
                      </h3>
                      <p className="text-lg font-medium text-muted-foreground flex items-center gap-2">
                        {exp.company}
                      </p>
                    </div>

                    <p className="text-base text-muted-foreground/90 mt-4 leading-relaxed">
                      {exp.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mt-6 justify-start">
                      {exp.technologies.map((tech, techIdx) => (
                        <span
                          key={techIdx}
                          className="px-4 py-1.5 rounded-full bg-background/50 border border-border/50 text-xs font-medium text-foreground shadow-sm hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </Section>
  );
}

export default Experiences;
