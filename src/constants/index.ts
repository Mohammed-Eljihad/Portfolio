import type { ForwardRefExoticComponent, RefAttributes } from "react";

export type ProjectCategory =
  | "All"
  | "E-commerce"
  | "Landing Page"
  | "WordPress"
  | "Shopify"
  | "Dropshipping"
  | "SaaS"
  | "AI";

export interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
  link: string;
  github: string;
  category: ProjectCategory[];
}

export interface Service {
  title: string;
  description: string;
  icon: ForwardRefExoticComponent<
    Omit<import("lucide-react").LucideProps, "ref"> &
      RefAttributes<SVGSVGElement>
  >;
}

export interface Experience {
  period: string;
  role: string;
  company: string;
  description: string;
  technologies: string[];
  current?: boolean;
}

export interface Skill {
  name: string;
  category: "Frontend" | "Backend" | "Tools" | "Other";
  icon?: string;
}

export interface Highlight {
  title: string;
  description: string;
  icon: ForwardRefExoticComponent<
    Omit<import("lucide-react").LucideProps, "ref"> &
      RefAttributes<SVGSVGElement>
  >;
}

export interface SocialLink {
  href: string;
  label: string;
  icon: ForwardRefExoticComponent<
    Omit<import("lucide-react").LucideProps, "ref"> &
      RefAttributes<SVGSVGElement>
  >;
}

export interface HeroStat {
  value: string;
  label: string;
}

export interface HeroProfile {
  name: string;
  /** Accent word rendered in serif italic within the headline. */
  nameAccent: string;
  role: string;
  bio: string;
  image: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  cv: {
    path: string;
    fileName: string;
    sizeLabel: string;
  };
}

export interface ContactInfo {
  icon: ForwardRefExoticComponent<
    Omit<import("lucide-react").LucideProps, "ref"> &
      RefAttributes<SVGSVGElement>
  >;
  label: string;
  value: string;
  href: string;
}
