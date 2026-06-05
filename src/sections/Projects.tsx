import { useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { AnimatedBorderButton } from "@/components/AnimatedBorderButton";
import { SectionHeader } from "@/components/SectionHeader";
import { projects } from "@/constants/projects";
import { ArrowUpRight, Github } from "lucide-react";

export const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [visibleCount, setVisibleCount] = useState<number>(4);

  const categories = ["All", ...Array.from(new Set(projects.map((p) => p.category)))];

  const filteredProjects = selectedCategory === "All"
    ? projects
    : projects.filter((p) => p.category === selectedCategory);

  const displayedProjects = filteredProjects.slice(0, visibleCount);
  const hasMore = filteredProjects.length > visibleCount;

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <section id="projects" className="py-32 relative overflow-hidden">
      {/* Bg glows */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse-glow" />
      <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-highlight/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <SectionHeader
          isCenter={true}
          spanTitle="Featured Work"
          sectionTitle="Projects that"
          spanSectionTitle="make an impact."
          paragraph="A selection of my recent work, from complex web applications to
            innovative tools that solve real-world problems."
        />

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          <div className="glass p-1.5 rounded-full flex flex-wrap items-center gap-1">
            {categories.map((category) => {
              const isActive = selectedCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => {
                    setSelectedCategory(category);
                    setVisibleCount(4);
                  }}
                  className={`relative px-5 py-2 text-sm font-medium rounded-full cursor-pointer transition-colors ${
                    isActive
                      ? "text-primary-foreground font-semibold"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeFilter"
                      className="absolute inset-0 bg-primary rounded-full -z-10"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          layout="position"
          className="grid md:grid-cols-2 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {displayedProjects.map((project) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.4, type: "spring", stiffness: 100, damping: 15 }}
                key={project.title}
                className="group glass rounded-2xl overflow-hidden relative border border-border/50 hover:border-primary/30 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Spotlight overlay effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none -z-10" />

                <div>
                  {/* Image */}
                  <div className="relative overflow-hidden aspect-video">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      width="640"
                      height="360"
                      loading="lazy"
                      decoding="async"
                    />
                    <div
                      className="absolute inset-0 
                      bg-linear-to-t from-card via-card/50
                      to-transparent opacity-60"
                    />
                    
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full bg-surface/90 backdrop-blur-xs text-xs font-semibold border border-border/50 text-primary">
                        {project.category}
                      </span>
                    </div>

                    {/* Overlay Links */}
                    <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-background/30 backdrop-blur-xs">
                      <motion.a
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3.5 rounded-full glass bg-surface hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer shadow-lg"
                      >
                        <ArrowUpRight className="w-5 h-5" />
                      </motion.a>
                      <motion.a
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3.5 rounded-full glass bg-surface hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer shadow-lg"
                      >
                        <Github className="w-5 h-5" />
                      </motion.a>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 space-y-3">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="text-xl font-bold group-hover:text-primary transition-colors duration-300">
                        {project.title}
                      </h3>
                      <ArrowUpRight
                        className="w-5 h-5 shrink-0
                        text-muted-foreground group-hover:text-primary
                        group-hover:translate-x-1 
                        group-hover:-translate-y-1 transition-all duration-300"
                      />
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, tagIdx) => (
                      <span
                        key={tagIdx}
                        className="px-3.5 py-1.5 rounded-full bg-surface/50 text-xs font-medium border border-border/30 text-muted-foreground hover:border-primary/30 hover:text-primary transition-all duration-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Pagination CTA */}
        <div className="flex flex-col items-center gap-4 mt-12">
          {hasMore && (
            <div className="animate-fade-in">
              <AnimatedBorderButton onClick={() => setVisibleCount((prev) => prev + 2)}>
                View More Projects
                <ArrowUpRight className="w-5 h-5" />
              </AnimatedBorderButton>
            </div>
          )}

          {visibleCount > 4 && (
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={() => setVisibleCount(4)}
              className="text-sm font-semibold text-muted-foreground hover:text-primary transition-colors cursor-pointer underline underline-offset-4"
            >
              Show Less
            </motion.button>
          )}
        </div>
      </div>
    </section>
  );
};

export default Projects;
