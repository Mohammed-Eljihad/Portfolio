/* eslint-disable react-hooks/purity */
import { AnimatedBorderButton } from "@/components/AnimatedBorderButton";
import { Button } from "@/components/Button";
import { Section } from "@/components/Section";
import { socials, skills } from "@/constants/hero";
import { ArrowRight, ChevronDown, Download } from "lucide-react";
import { useRef } from "react";

function Hero() {
  const dotsRef = useRef<
    {
      id: number;
      left: number;
      top: number;
    }[]
  >(
    Array.from({ length: 30 }, (_, id) => ({
      id,
      left: Math.random() * 100,
      top: Math.random() * 100,
    })),
  );

  const dots = dotsRef.current;

  return (
    <Section
      id="#"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background */}
      <img
        src="/hero-bg.jpg"
        alt="Hero background"
        className="absolute inset-0 h-full w-full object-cover opacity-40"
      />

      <div className="absolute inset-0 bg-linear-to-b from-background/20 via-background/80 to-background" />

      {/* Green dots */}
      <div className="pointer-events-none absolute inset-0">
        {dots.map((dot) => (
          <div
            key={dot.id}
            className="absolute h-1.5 w-1.5 rounded-full bg-[#20B2A6] opacity-60"
            style={{
              left: `${dot.left}%`,
              top: `${dot.top}%`,
              animation: `slow-drift ${15 + Math.random() * 20}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
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
              <Button size="lg">
                Contact Me <ArrowRight className="w-5 h-5" />
              </Button>
              <AnimatedBorderButton>
                <Download className="w-5 h-5" /> Download CV
              </AnimatedBorderButton>
            </div>
            {/* Social */}
            <div className="flex gap-4 items-center animate-fade-in animation-delay-400">
              {socials.map((social, i) => (
                <a
                  href={social.href}
                  key={i}
                  className="p-2 rounded-full glass hover: bg-primary/10 hover:text-primary transition-all duration-300"
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
                  src="/my-profile.png"
                  alt="Mohammed Eljihad"
                  className="w-full aspect-4/5 object-cover rounded-2xl"
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
    </Section>
  );
}

export default Hero;
