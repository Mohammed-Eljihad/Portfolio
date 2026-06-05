type Project = {
  title: string;
  description: string;
  image: string;
  tags: string[];
  link: string;
  github: string;
  category: string;
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
    category: "Landing Page",
  },
  {
    title: "E-Commerce Platform",
    description:
      "A full-featured e-commerce solution with inventory management, payment processing, and analytics dashboard.",
    image: "/projects/project2.png",
    tags: ["Next.js", "Stripe", "PostgreSQL", "Tailwind"],
    link: "#",
    github: "#",
    category: "E-commerce",
  },
  {
    title: "AI Writing Assistant",
    description:
      "An intelligent writing tool powered by GPT-4, helping users create better content faster.",
    image: "/projects/project3.png",
    tags: ["React", "OpenAI", "Python", "FastAPI"],
    link: "#",
    github: "#",
    category: "SaaS",
  },
  {
    title: "Project Management Tool",
    description:
      "A collaborative workspace for teams with real-time updates, task tracking, and integrations.",
    image: "/projects/project4.png",
    tags: ["Next.js", "Socket.io", "MongoDB", "Redis"],
    link: "#",
    github: "#",
    category: "SaaS",
  },
  {
    title: "Organic Cosmetics – Custom WordPress",
    description:
      "A high-performing custom WordPress website built for a premium organic cosmetics brand, optimized for loading speeds and SEO visibility.",
    image: "/projects/project5.png",
    tags: ["WordPress", "PHP", "Elementor Pro", "SEO"],
    link: "#",
    github: "#",
    category: "Wordpress",
  },
  {
    title: "Dropshipping Store – Shopify & Youcan",
    description:
      "A high-converting e-commerce storefront customized on Shopify and YouCan platforms, featuring automated fulfillment hooks and advanced sales funnel optimizations.",
    image: "/projects/project6.png",
    tags: ["Shopify", "YouCan", "Liquid", "E-commerce Layouts"],
    link: "#",
    github: "#",
    category: "Shopify & Youcan store",
  },
];
