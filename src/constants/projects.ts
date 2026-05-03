type Project = {
  title: string;
  description: string;
  image: string;
  tags: string[];
  link: string;
  github: string;
};
export const projects: Project[] = [
  {
    title: "Coffret à Bijoux – Landing page interactive",
    description:
      "Landing page interactive pour un coffret à bijoux, avec un sélecteur de couleur animé permettant une visualisation en temps réel de la personnalisation.",
    image: "/projects/project1.png",
    tags: ["Three.js", "Next.js 16", "TypeScript", "Framer Motion"],
    link: "https://coffret-bijoux.vercel.app",
    github: "https://github.com/Mohammed-Eljihad/coffret_bijoux",
  },
  {
    title: "E-Commerce Platform",
    description:
      "A full-featured e-commerce solution with inventory management, payment processing, and analytics dashboard.",
    image: "/projects/project2.png",
    tags: ["Next.js", "Stripe", "PostgreSQL", "Tailwind"],
    link: "#",
    github: "#",
  },
  {
    title: "AI Writing Assistant",
    description:
      "An intelligent writing tool powered by GPT-4, helping users create better content faster.",
    image: "/projects/project3.png",
    tags: ["React", "OpenAI", "Python", "FastAPI"],
    link: "#",
    github: "#",
  },
  {
    title: "Project Management Tool",
    description:
      "A collaborative workspace for teams with real-time updates, task tracking, and integrations.",
    image: "/projects/project4.png",
    tags: ["Next.js", "Socket.io", "MongoDB", "Redis"],
    link: "#",
    github: "#",
  },
];
