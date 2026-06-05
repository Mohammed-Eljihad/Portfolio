import { motion, type Variants } from "framer-motion";
import { SectionHeader } from "@/components/SectionHeader";
import { 
  Code2, 
  Database, 
  Smartphone, 
  Paintbrush
} from "lucide-react";
import { 
  SiHtml5, SiCss, SiJavascript, SiTypescript, SiReact, SiNextdotjs, SiTailwindcss, SiFramer,
  SiNodedotjs, SiExpress, SiPython, SiFastapi, SiDjango, SiPhp, SiPostgresql, SiMysql, SiMongodb,
  SiDart, SiFlutter, SiFigma
} from "react-icons/si";
import { FaDatabase, FaSearch } from "react-icons/fa";

// Categorized Skills Data
const skillCategories = [
  {
    title: "Frontend Development",
    icon: Code2,
    skills: [
      { name: "HTML", icon: SiHtml5 },
      { name: "CSS", icon: SiCss },
      { name: "JavaScript", icon: SiJavascript },
      { name: "TypeScript", icon: SiTypescript },
      { name: "React", icon: SiReact },
      { name: "Next.js", icon: SiNextdotjs },
      { name: "Tailwind CSS", icon: SiTailwindcss },
      { name: "Framer Motion", icon: SiFramer }
    ],
    color: "from-blue-500/20 to-cyan-500/20",
    borderColor: "group-hover:border-blue-500/50",
    iconColor: "text-blue-500"
  },
  {
    title: "Backend & Databases",
    icon: Database,
    skills: [
      { name: "Node.js", icon: SiNodedotjs },
      { name: "Express", icon: SiExpress },
      { name: "Python", icon: SiPython },
      { name: "FastAPI", icon: SiFastapi },
      { name: "Django", icon: SiDjango },
      { name: "PHP", icon: SiPhp },
      { name: "SQL", icon: FaDatabase },
      { name: "PostgreSQL", icon: SiPostgresql },
      { name: "MySQL", icon: SiMysql },
      { name: "MongoDB", icon: SiMongodb }
    ],
    color: "from-green-500/20 to-emerald-500/20",
    borderColor: "group-hover:border-green-500/50",
    iconColor: "text-green-500"
  },
  {
    title: "Mobile Development",
    icon: Smartphone,
    skills: [
      { name: "Dart", icon: SiDart },
      { name: "Flutter", icon: SiFlutter }
    ],
    color: "from-purple-500/20 to-fuchsia-500/20",
    borderColor: "group-hover:border-purple-500/50",
    iconColor: "text-purple-500"
  },
  {
    title: "UI/UX & Optimization",
    icon: Paintbrush,
    skills: [
      { name: "Figma UI/UX Design", icon: SiFigma },
      { name: "SEO Performance", icon: FaSearch }
    ],
    color: "from-rose-500/20 to-pink-500/20",
    borderColor: "group-hover:border-rose-500/50",
    iconColor: "text-rose-500"
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 15 }
  },
};

const badgeVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { type: "spring", stiffness: 200, damping: 10 }
  },
};

export const Skills = () => {
  return (
    <section id="skills" className="py-32 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse-glow" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-highlight/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="container mx-auto px-6 relative z-10">
        <SectionHeader
          isCenter={true}
          spanTitle="3 Years of Growth"
          sectionTitle="What I've Learned"
          spanSectionTitle="Languages & Tech"
          paragraph="A comprehensive overview of the tools, frameworks, and languages I have mastered over the past 3 years to build premium digital experiences."
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto mt-16"
        >
          {skillCategories.map((category, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              className={`group relative glass p-8 rounded-3xl border border-border/50 transition-all duration-500 overflow-hidden ${category.borderColor} hover:shadow-[0_0_30px_rgba(0,0,0,0.1)]`}
            >
              {/* Card Background Gradient on Hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none -z-10`} />
              
              <div className="flex items-center gap-4 mb-8">
                <div className={`p-3 rounded-2xl bg-surface border border-border shadow-sm ${category.iconColor} group-hover:scale-110 group-hover:shadow-md transition-all duration-300`}>
                  <category.icon className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold tracking-tight text-foreground">
                  {category.title}
                </h3>
              </div>

              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill, skillIdx) => (
                  <motion.div
                    key={skillIdx}
                    variants={badgeVariants}
                    className="relative group/badge"
                  >
                    <div className="absolute inset-0 bg-primary/20 rounded-xl blur-md opacity-0 group-hover/badge:opacity-100 transition-opacity duration-300" />
                    <span className="relative z-10 px-4 py-2 rounded-xl text-sm font-semibold text-muted-foreground border border-border/60 bg-surface/80 backdrop-blur-md group-hover/badge:text-foreground group-hover/badge:border-primary/50 group-hover/badge:bg-surface transition-all duration-300 flex items-center gap-2 cursor-default">
                      <skill.icon className="w-3.5 h-3.5 text-primary opacity-0 group-hover/badge:opacity-100 transition-opacity duration-300 hidden group-hover/badge:block" />
                      {skill.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
