import { type LucideIcon, Github, Linkedin, Twitter } from "lucide-react";

type social = {
  icon: LucideIcon;
  href: string;
};
export const socials: social[] = [
  {
    icon: Github,
    href: "https://github.com/Mohammed-Eljihad",
  },
  {
    icon: Linkedin,
    href: "",
  },
  {
    icon: Twitter,
    href: "#",
  },
];

export const skills: string[] = [
  "Flutter",
  "Bloc",
  "Dio",
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "GraphQL",
  "PostgreSQL",
  "MongoDB",
  "Docker",
  "Tailwind CSS",
  "Figma",
  "Git",
  "GitHub Actions",
];
