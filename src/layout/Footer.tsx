import { Github, Linkedin, Twitter, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const socialLinks = [
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

const footerLinks = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

const expertise = [
  "Frontend Development",
  "UI/UX Design",
  "React & Next.js Ecosystem",
  "Performance Optimization",
];

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-32 pt-20 pb-8 overflow-hidden bg-background/50 backdrop-blur-xl">
      {/* Premium Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-70" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/10 rounded-[100%] blur-[100px] pointer-events-none -z-10" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16"
        >
          {/* Column 1: Brand & Social */}
          <div className="flex flex-col items-center md:items-start lg:pr-8 text-center md:text-left">
            <a href="#" className="group inline-flex items-center gap-1.5 text-3xl font-bold tracking-tight text-foreground transition-colors mb-6">
              MJ
              <span className="w-2.5 h-2.5 rounded-full bg-primary inline-block group-hover:scale-150 group-hover:shadow-[0_0_15px_rgba(32,178,166,0.8)] transition-all duration-300" />
            </a>
            <p className="text-sm font-medium text-muted-foreground leading-relaxed mb-8">
              Crafting premium digital experiences with precision, passion, and modern technologies. Transforming ideas into beautiful code.
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="relative p-3.5 rounded-2xl glass border border-transparent hover:border-primary/30 text-muted-foreground hover:text-primary transition-all duration-300 group hover:-translate-y-1.5 hover:shadow-[0_10px_20px_rgba(32,178,166,0.15)] overflow-hidden"
                >
                  <div className="absolute inset-0 bg-primary/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  <social.icon className="w-5 h-5 relative z-10" />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="flex flex-col items-center md:items-start lg:pl-8">
            <h3 className="text-lg font-bold mb-6 text-foreground tracking-wide">Quick Links</h3>
            <nav className="flex flex-col gap-4">
              {footerLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="group relative text-sm font-medium text-muted-foreground hover:text-foreground transition-colors w-max"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-primary rounded-full transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </nav>
          </div>

          {/* Column 3: Expertise */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-lg font-bold mb-6 text-foreground tracking-wide">Expertise</h3>
            <div className="flex flex-col gap-4">
              {expertise.map((item, idx) => (
                <p key={idx} className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/50" />
                  {item}
                </p>
              ))}
            </div>
          </div>

          {/* Column 4: Contact CTA */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="text-lg font-bold mb-6 text-foreground tracking-wide">Get in Touch</h3>
            <p className="text-sm font-medium text-muted-foreground mb-6 leading-relaxed">
              Ready to start your next project? Let's build something amazing together.
            </p>
            <a 
              href="#contact" 
              className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-primary to-primary/80 text-primary-foreground font-semibold hover:shadow-[0_0_20px_rgba(32,178,166,0.4)] transition-all duration-300 hover:-translate-y-1 w-full md:w-auto"
            >
              Let's Talk
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </a>
          </div>
        </motion.div>

        {/* Bottom Copyright */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="pt-8 border-t border-border/40 flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <p className="text-sm font-medium text-muted-foreground text-center md:text-left">
            © {currentYear} Mohamed Eljihad. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <span>Built with</span>
            <span className="text-red-500 animate-pulse">❤</span>
            <span>in React & Tailwind</span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};
