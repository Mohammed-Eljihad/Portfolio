import { Button } from "@/components/Button";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type Link = {
  href: string;
  label: string;
};

const navLinks: Link[] = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#experiences", label: "Experiences" },
  { href: "#testimonials", label: "Testimonials" },
];
function Navbar() {
  const [isMobileMenu, setMobileMenu] = useState<boolean>(false);
  const [isScroll, setScroll] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const handlingScroll = () => {
      setScroll(window.scrollY > 50);

      // Detect active section based on scroll position
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      let currentSection = "";

      for (const link of navLinks) {
        const id = link.href.substring(1);
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            currentSection = link.href;
            break;
          }
        }
      }

      // Check if we are at the bottom of the page
      const isAtBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 100;
      if (isAtBottom && navLinks.length > 0) {
        currentSection = navLinks[navLinks.length - 1].href;
      }

      // Fallback for top of page
      if (window.scrollY < 100) {
        currentSection = "";
      }

      setActiveSection(currentSection);
    };

    // Set initial state
    handlingScroll();

    window.addEventListener("scroll", handlingScroll, { passive: true });

    return () => window.removeEventListener("scroll", handlingScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 transition-all duration-500 ${isScroll ? "glass-strong py-3" : "bg-transparent py-5"} z-50`}
    >
      <nav className="container mx-auto px-6 flex items-center justify-between">
        <a
          href="#"
          className="text-xl font-bold tracking-tight hover:text-primary"
        >
          MJ<span className="text-primary">.</span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          <div className="glass rounded-full px-2 py-1 flex items-center gap-1">
            {navLinks.map((link, index) => {
              const isActive = activeSection === link.href;
              return (
                <a
                  href={link.href}
                  key={index}
                  className={`relative px-4 py-2 text-sm rounded-full transition-colors ${
                    isActive
                      ? "text-primary font-semibold"
                      : "text-muted-foreground hover:text-foreground hover:bg-surface/30"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeNav"
                      className="absolute inset-0 bg-primary/10 rounded-full -z-10"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                  {link.label}
                </a>
              );
            })}
          </div>
        </div>

        <div className="hidden md:block">
          <Button href="#contact">Contact Me</Button>
        </div>

        {/* Mobile Nav Toggle */}
        <button
          className="md:hidden p-2 text-foreground cursor-pointer"
          onClick={() => setMobileMenu(!isMobileMenu)}
          aria-expanded={isMobileMenu}
          aria-controls="mobile-menu"
          aria-label={
            isMobileMenu ? "Close navigation menu" : "Open navigation menu"
          }
        >
          {isMobileMenu ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>
      {isMobileMenu && (
        <div
          id="mobile-menu"
          className="md:hidden glass-strong animate-fade-in"
          role="navigation"
          aria-label="Mobile navigation"
        >
          <div className="container mx-auto px-6 py-6 flex flex-col gap-4">
            {navLinks.map((link, index) => {
              const isActive = activeSection === link.href;
              return (
                <a
                  href={link.href}
                  key={index}
                  onClick={() => setMobileMenu(false)}
                  className={`text-lg transition-colors py-2 ${
                    isActive
                      ? "text-primary font-semibold"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {link.label}
                </a>
              );
            })}

            <Button onClick={() => setMobileMenu(false)}>Contact Me</Button>
          </div>
        </div>
      )}{" "}
    </header>
  );
}

export default Navbar;
