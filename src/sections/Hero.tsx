import { AnimatedBorderButton } from "@/components/AnimatedBorderButton";
import { Button } from "@/components/Button";
import { Section } from "@/components/Section";
import { socials, skills } from "@/constants/hero";
import { ArrowRight, ChevronDown, Download, Eye, FileText } from "lucide-react";
import { useState } from "react";
import { Modal } from "@/components/Modal";

/** Stable decorative dots — generated once at module scope, not during render. */
const dots = Array.from({ length: 30 }, (_, id) => ({
  id,
  left: Math.random() * 100,
  top: Math.random() * 100,
  animDuration: 15 + Math.random() * 20,
  animDelay: Math.random() * 5,
}));

function Hero() {
  const [isCVModalOpen, setIsCVModalOpen] = useState(false);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/pdf/cv.pdf";
    link.download = "Mohamed_Eljihad_CV.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setIsCVModalOpen(false);
  };

  return (
    <Section
      id="#"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background */}
      <img
        src="/hero-bg.jpg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover opacity-40"
        loading="eager"
        decoding="async"
      />

      <div className="absolute inset-0 bg-linear-to-b from-background/20 via-background/80 to-background" />

      {/* Green dots */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {dots.map((dot) => (
          <div
            key={dot.id}
            className="absolute h-1.5 w-1.5 rounded-full bg-[#20B2A6] opacity-60"
            style={{
              left: `${dot.left}%`,
              top: `${dot.top}%`,
              animation: `slow-drift ${dot.animDuration}s ease-in-out infinite`,
              animationDelay: `${dot.animDelay}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 pt-32 pb-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="space-y-8">
            <div className="animate-fade-in">
              <span className="inline-flex items-center gap-2 px-4 py-4 rounded-full glass text-primary text-sm">
                <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                Software Engineer ● React Specialist
              </span>
            </div>

            {/* Headline */}
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-bold leading-tight animate-fade-in animation-delay-100">
                Crafting <span className="text-primary glow-text">digital</span>
                <br />
                experiences with
                <br />
                <span className="font-serif italic font-normal text-white">
                  precision
                </span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-lg animate-fade-in animation-delay-200">
                Hi, I'm Mohamed Eljihad — a software engineer specializing in
                React, Next.js, and TypeScript. I build scalable, performant web
                applications that users love.
              </p>
            </div>
            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 animate-fade-in animation-delay-300">
              <Button size="lg" href="#contact">
                Contact Me <ArrowRight className="w-5 h-5" />
              </Button>
              <AnimatedBorderButton onClick={() => setIsCVModalOpen(true)}>
                <Download className="w-5 h-5" /> Download CV
              </AnimatedBorderButton>
            </div>
            {/* Social */}
            <div className="flex gap-4 items-center animate-fade-in animation-delay-400">
              {socials.filter(s => s.href).map((social, i) => (
                <a
                  href={social.href}
                  key={i}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label || "Social link"}
                  className="p-2 rounded-full glass hover:bg-primary/10 hover:text-primary transition-all duration-300"
                >
                  <social.icon />
                </a>
              ))}
            </div>
          </div>

          {/* Right Column - Image Hero */}
          <div className="relative animate-fade-in animation-delay-300">
            {/* Glow background ONLY */}
            <div
              className="pointer-events-none absolute inset-0 rounded-3xl 
                                    bg-linear-to-br from-primary/30 via-transparent to-primary/10 
                                    blur-2xl animate-pulse-glow"
            />

            {/* Image wrapper */}
            <div className="relative z-10 max-w-md mx-auto">
              <div className="relative glass rounded-3xl p-2 glow-border">
                <img
                  src="/profile-photo.jpg"
                  alt="Mohamed Eljihad — Software Engineer"
                  className="w-full aspect-[4/5] object-cover rounded-2xl"
                  width="400"
                  height="500"
                  loading="eager"
                  decoding="async"
                />

                {/* Floating badge   */}
                <div className="absolute -bottom-4 -right-4 glass rounded-xl px-4 py-3 animate-float">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-sm font-medium">
                      Available for work
                    </span>
                  </div>
                </div>
                {/* Stats Badge */}
                <div className="absolute -top-4 -left-4 glass rounded-xl px-4 py-3 animate-float animation-delay-500">
                  <div className="text-2xl font-bold text-primary">2+</div>
                  <div className="text-xs text-muted-foreground">
                    Years Exp.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div className="mt-20 animate-fade-in animation-delay-600">
          <p className="text-sm text-muted-foreground mb-6 text-center">
            Technologies I work with
          </p>
          <div className="relative overflow-hidden">
            <div
              className="absolute left-0 top-0 bottom-0 w-32
                            bg-linear-to-r from-background to-transparent z-10"
            />
            <div
              className="absolute right-0 top-0 bottom-0 w-32
                            bg-linear-to-l from-background to-transparent z-10"
            />
            <div className="flex animate-marquee">
              {[...skills, ...skills].map((skill, i) => (
                <div key={i} className="shrink-0 px-8 py-4">
                  <span className="text-xl font-semibold text-muted-foreground/50 hover:text-muted-foreground transition-colors">
                    {skill}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-fade-in animation-delay-800">
          <a
            href="#about"
            className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors group"
          >
            <span className="text-xs uppercase tracking-wide">Scroll</span>
            <ChevronDown className="w-6 h-6 animate-bounce" />
          </a>
        </div>
      </div>

      {/* Choice Modal */}
      <Modal
        isOpen={isCVModalOpen}
        onClose={() => setIsCVModalOpen(false)}
        title="Curriculum Vitae"
      >
        <div className="grid gap-6">
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-primary/5 border border-primary/10">
            <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
              <FileText className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h4 className="font-semibold">Mohamed Eljihad CV</h4>
              <p className="text-xs text-muted-foreground">PDF Document • 488 KB</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => {
                setIsCVModalOpen(false);
                setIsViewerOpen(true);
              }}
              className="flex flex-col items-center justify-center gap-3 p-6 rounded-2xl border border-border hover:border-primary/50 hover:bg-primary/5 transition-all group cursor-pointer"
            >
              <div className="w-12 h-12 rounded-full bg-surface flex items-center justify-center group-hover:scale-110 transition-transform">
                <Eye className="w-6 h-6" />
              </div>
              <span className="font-medium text-sm">View CV</span>
            </button>

            <button
              onClick={handleDownload}
              className="flex flex-col items-center justify-center gap-3 p-6 rounded-2xl border border-border hover:border-primary/50 hover:bg-primary/5 transition-all group cursor-pointer"
            >
              <div className="w-12 h-12 rounded-full bg-surface flex items-center justify-center group-hover:scale-110 transition-transform">
                <Download className="w-6 h-6" />
              </div>
              <span className="font-medium text-sm">Download</span>
            </button>
          </div>
        </div>
      </Modal>

      {/* Viewer Modal */}
      <Modal
        isOpen={isViewerOpen}
        onClose={() => setIsViewerOpen(false)}
        title="CV Preview"
        size="full"
      >
        <div className="w-full h-full bg-surface rounded-xl overflow-hidden border border-primary/20 shadow-inner">
          <iframe
            src="/pdf/cv.pdf#toolbar=0"
            className="w-full h-full border-none"
            title="CV Viewer"
          />
        </div>
      </Modal>
    </Section>
  );
}

export default Hero;
