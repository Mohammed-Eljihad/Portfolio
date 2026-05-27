import { type LucideIcon, Github, Linkedin, Twitter } from "lucide-react";

type Social = {
  icon: LucideIcon;
  href: string;
  label: string;
};
export const socials: Social[] = [
  {
    icon: Github,
    href: "https://github.com/Mohammed-Eljihad",
    label: "GitHub",
  },
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/in/eljihad-mohammed-98a842352",
    label: "LinkedIn",
  },
  {
    icon: Twitter,
    href: "https://twitter.com/yourhandle",
    label: "Twitter",
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
