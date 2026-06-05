import { Code2, Lightbulb, Rocket, Users, Search, MonitorSmartphone, type LucideIcon } from "lucide-react";

type Highlights = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export const highlights: Highlights[] = [
  {
    icon: Code2,
    title: "Clean Code",
    description:
      "Writing maintainable, scalable code that stands the test of time.",
  },
  {
    icon: Rocket,
    title: "Performance",
    description:
      "Optimizing for speed and delivering lightning-fast user experiences.",
  },
  {
    icon: Users,
    title: "Collaboration",
    description: "Working closely with teams to bring ideas to life.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description:
      "Staying ahead with the latest technologies and best practices.",
  },
  {
    icon: Search,
    title: "SEO Optimization",
    description:
      "Structuring websites for search engine visibility and semantic excellence.",
  },
  {
    icon: MonitorSmartphone,
    title: "Responsive Design",
    description:
      "Crafting seamless, adaptive interfaces that look stunning on any screen size.",
  },
];
