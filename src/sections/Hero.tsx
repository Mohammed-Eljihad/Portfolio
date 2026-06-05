import { AnimatedBorderButton } from "@/components/AnimatedBorderButton";
import { Button } from "@/components/Button";
import { Section } from "@/components/Section";
import { socials, skills } from "@/constants/hero";
import { ArrowRight, ChevronDown, Download, Eye, FileText } from "lucide-react";
import { useState } from "react";
import { Modal } from "@/components/Modal";
import { motion } from "framer-motion";

/** Stable decorative dots — generated once at module scope, not during render. */
const dots = Array.from({ length: 30 }, (_, id) => ({
  id,
  left: Math.random() * 100,
  top: Math.random() * 100,
  animDuration: 15 + Math.random() * 20,
  animDelay: Math.random() * 5,
}));

// ─────────────────────────────────────────────────────────────────────────────
//  Hexagon geometry — all computed once at module scope, never on render
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Internal SVG canvas size (logical units).
 * The SVG uses viewBox="0 0 SIZE SIZE" and scales to whatever CSS gives it,
 * so this only affects stroke widths and dot sizes — not the rendered pixel size.
 */
const SIZE = 600;
const CX = SIZE / 2;
const CY = SIZE / 2;

/**
 * Returns the SVG `points` string for a regular hexagon centred at (CX, CY)
 * with circumradius `r`.  `flat = true` rotates 30° → flat top/bottom edges.
 */
function hexPoints(r: number, flat = false): string {
  const offset = flat ? Math.PI / 6 : 0;
  return Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 3) * i + offset;
    return `${(CX + r * Math.cos(a)).toFixed(3)},${(CY + r * Math.sin(a)).toFixed(3)}`;
  }).join(" ");
}

// Concentric radii — outer → inner
const R_PULSE = SIZE * 0.47; // slow-breathing outer halo ring
const R_OUTER = SIZE * 0.448; // spinning gradient ring
const R_BORDER = SIZE * 0.418; // crisp coloured border
const R_CLIP = SIZE * 0.404; // photo clip (inset from border)
const R_INNER = SIZE * 0.385; // dashed counter-spin ring

const HEX_PULSE = hexPoints(R_PULSE, true);
const HEX_OUTER = hexPoints(R_OUTER, true);
const HEX_BORDER = hexPoints(R_BORDER, true);
const HEX_CLIP = hexPoints(R_CLIP, true);
const HEX_INNER = hexPoints(R_INNER, true);

const HEX_CLIP_ID = "hex-portrait-clip";

/** 6 vertex jewels sitting at each hex corner of R_OUTER */
const VERTEX_JEWELS = Array.from({ length: 6 }, (_, i) => {
  const a = (Math.PI / 3) * i + Math.PI / 6;
  return {
    cx: CX + R_OUTER * Math.cos(a),
    cy: CY + R_OUTER * Math.sin(a),
    large: i % 2 === 0,
  };
});

/** 12 micro-dots evenly placed on the pulse ring for extra texture */
const MICRO_DOTS = Array.from({ length: 12 }, (_, i) => {
  const a = (Math.PI / 6) * i + Math.PI / 12;
  return {
    cx: CX + R_PULSE * Math.cos(a),
    cy: CY + R_PULSE * Math.sin(a),
  };
});

// ─────────────────────────────────────────────────────────────────────────────
//  HexagonHero — right-column visual
// ─────────────────────────────────────────────────────────────────────────────

const SPRING = [0.22, 1, 0.36, 1] as const;

function HexagonHero() {
  return (
    /*
     * The outer div stretches to fill the right grid column (w-full h-full).
     * The hexagon SVG is then width-100% of that column so it naturally grows
     * to match the left column's visual weight.
     */
    <motion.div
      className="relative flex items-center justify-center w-full h-full select-none"
      initial={{ opacity: 0, scale: 0.9, y: 32 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.95, ease: SPRING, delay: 0.3 }}
    >
      {/* ── Static deep-ambient glow blob ────────────────────────── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <div
          style={{
            width: "90%",
            aspectRatio: "1",
            borderRadius: "50%",
            background:
              "radial-gradient(ellipse at 50% 52%, rgba(32,178,166,0.22) 0%, rgba(15,118,110,0.10) 42%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
      </div>

      {/*
       * Floating wrapper — takes full column width.
       * The extra horizontal padding (px) gives the absolute-positioned badges
       * room to breathe without overflowing the column.
       */}
      <motion.div
        animate={{ y: [0, -18, 0] }}
        transition={{ duration: 6.5, ease: "easeInOut", repeat: Infinity }}
        className="relative w-full"
        style={{ paddingInline: "clamp(40px, 7%, 72px)" }}
      >
        {/* ── Layer A: slow-breathing outer halo (pure SVG, no rotation) ── */}
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 w-full h-full"
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          preserveAspectRatio="xMidYMid meet"
          fill="none"
        >
          <defs>
            <linearGradient id="hex-halo" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#20B2A6" stopOpacity="0.12" />
              <stop offset="50%" stopColor="#0f766e" stopOpacity="0.06" />
              <stop offset="100%" stopColor="#20B2A6" stopOpacity="0.12" />
            </linearGradient>
          </defs>
          <polygon points={HEX_PULSE} fill="url(#hex-halo)" />

          {/* 12 micro-dots on the pulse ring */}
          {MICRO_DOTS.map((d, i) => (
            <circle
              key={i}
              cx={d.cx}
              cy={d.cy}
              r={2.5}
              fill="rgba(32,178,166,0.35)"
            />
          ))}
        </svg>
        {/* ── Layer B: CW spinning gradient ring ───────────────────── */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          animate={{ rotate: 360 }}
          transition={{ duration: 30, ease: "linear", repeat: Infinity }}
        >
          <svg
            width="100%"
            height="100%"
            viewBox={`0 0 ${SIZE} ${SIZE}`}
            fill="none"
          >
            <defs>
              <linearGradient
                id="hex-ring-cw"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#20B2A6" stopOpacity="0.95" />
                <stop offset="30%" stopColor="#0f766e" stopOpacity="0.45" />
                <stop offset="60%" stopColor="#134e4a" stopOpacity="0.10" />
                <stop offset="100%" stopColor="#20B2A6" stopOpacity="0.0" />
              </linearGradient>
            </defs>
            <polygon
              points={HEX_OUTER}
              fill="none"
              stroke="url(#hex-ring-cw)"
              strokeWidth="3"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
        {/* ── Layer C: CCW dashed inner accent ring ────────────────── */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          animate={{ rotate: -360 }}
          transition={{ duration: 22, ease: "linear", repeat: Infinity }}
        >
          <svg
            width="100%"
            height="100%"
            viewBox={`0 0 ${SIZE} ${SIZE}`}
            fill="none"
          >
            <defs>
              <linearGradient
                id="hex-ring-ccw"
                x1="100%"
                y1="0%"
                x2="0%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#20B2A6" stopOpacity="0.0" />
                <stop offset="45%" stopColor="#14b8a6" stopOpacity="0.60" />
                <stop offset="100%" stopColor="#20B2A6" stopOpacity="0.0" />
              </linearGradient>
            </defs>
            <polygon
              points={HEX_INNER}
              fill="none"
              stroke="url(#hex-ring-ccw)"
              strokeWidth="1.5"
              strokeLinejoin="round"
              strokeDasharray="14 9"
            />
          </svg>
        </motion.div>
        {/* ── Layer D: Main portrait SVG ───────────────────────────── */}
        <svg
          width="100%"
          height="100%"
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          preserveAspectRatio="xMidYMid meet"
          fill="none"
          role="img"
          aria-label="Mohamed Eljihad — Software Engineer"
          style={{ display: "block", position: "relative", zIndex: 1 }}
        >
          <defs>
            {/* Photo clip region */}
            <clipPath id={HEX_CLIP_ID}>
              <polygon points={HEX_CLIP} />
            </clipPath>

            {/* Gradient for the coloured border stroke */}
            <linearGradient
              id="hex-stroke-grad"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#20B2A6" stopOpacity="0.80" />
              <stop offset="50%" stopColor="#0f766e" stopOpacity="0.40" />
              <stop offset="100%" stopColor="#20B2A6" stopOpacity="0.65" />
            </linearGradient>

            {/* Depth vignette — darkens photo edges for a framed feel */}
            <radialGradient id="hex-vignette" cx="50%" cy="5%" r="105%">
              <stop offset="0%" stopColor="rgba(15,20,24,0.00)" />
              <stop offset="68%" stopColor="rgba(15,20,24,0.06)" />
              <stop offset="100%" stopColor="rgba(15,20,24,0.50)" />
            </radialGradient>

            {/* Subtle brand-colour tint over the photo */}
            <linearGradient id="hex-tint" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(32,178,166,0.08)" />
              <stop offset="100%" stopColor="rgba(20,184,166,0.03)" />
            </linearGradient>

            {/* Glow filter for the border stroke */}
            <filter
              id="border-glow"
              x="-10%"
              y="-10%"
              width="120%"
              height="120%"
            >
              <feGaussianBlur
                in="SourceGraphic"
                stdDeviation="4"
                result="blur"
              />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Glowing border backdrop (behind photo) */}
          <polygon
            points={HEX_BORDER}
            fill="none"
            stroke="url(#hex-stroke-grad)"
            strokeWidth="5"
            strokeLinejoin="round"
            filter="url(#border-glow)"
          />

          {/* Portrait photo — xMidYMin keeps the face at the top */}
          <image
            href="/avatar2.png"
            x="0"
            y="0"
            width={SIZE}
            height={SIZE}
            preserveAspectRatio="xMidYMin slice"
            clipPath={`url(#${HEX_CLIP_ID})`}
          />

          {/* Brand-tint overlay */}
          <polygon points={HEX_CLIP} fill="url(#hex-tint)" />

          {/* Depth vignette overlay */}
          <polygon points={HEX_CLIP} fill="url(#hex-vignette)" />

          {/* Crisp top-layer border stroke */}
          <polygon
            points={HEX_BORDER}
            fill="none"
            stroke="rgba(32,178,166,0.60)"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />

          {/* Vertex jewel dots (6 corners) */}
          {VERTEX_JEWELS.map((j, i) => (
            <g key={i}>
              {/* Halo ring */}
              <circle
                cx={j.cx}
                cy={j.cy}
                r={j.large ? 11 : 8}
                fill="rgba(32,178,166,0.12)"
              />
              {/* Mid ring */}
              <circle
                cx={j.cx}
                cy={j.cy}
                r={j.large ? 7 : 5}
                fill="rgba(32,178,166,0.22)"
              />
              {/* Solid centre */}
              <circle
                cx={j.cx}
                cy={j.cy}
                r={j.large ? 4.5 : 3}
                fill={j.large ? "#20B2A6" : "rgba(32,178,166,0.70)"}
              />
            </g>
          ))}
        </svg>
        {/* ── Floating badge: Available for work ─────────────────── */}
        <motion.div
          className="absolute glass rounded-2xl px-4 py-3 shadow-lg"
          style={{ bottom: "12%", right: "0%" }}
          initial={{ opacity: 0, x: 20, scale: 0.88 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ delay: 1.05, duration: 0.7, ease: SPRING }}
        >
          <div className="flex items-center gap-2.5">
            <div className="relative flex items-center justify-center w-3 h-3 shrink-0">
              <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-50 animate-ping" />
              <span className="relative w-2.5 h-2.5 rounded-full bg-green-500" />
            </div>
            <span className="text-sm font-medium tracking-tight whitespace-nowrap">
              Available for work
            </span>
          </div>
        </motion.div>
        {/* ── Floating badge: Years Exp. ──────────────────────────── */}
        <motion.div
          className="absolute glass rounded-2xl px-4 py-3 shadow-lg"
          style={{ top: "12%", left: "0%" }}
          initial={{ opacity: 0, x: -20, scale: 0.88 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ delay: 1.2, duration: 0.7, ease: SPRING }}
        >
          <div className="text-2xl font-bold text-primary leading-none">{new Date().getFullYear() - 2024}+</div>
          <div className="text-xs text-muted-foreground mt-1 tracking-wide">
            Years Exp.
          </div>
        </motion.div>
        {/* ── Floating badge: Projects ──────────────────────────────
        <motion.div
          className="absolute glass rounded-2xl px-4 py-3 shadow-lg"
          style={{ bottom: "36%", right: "0%" }}
          initial={{ opacity: 0, x: 20, scale: 0.88 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ delay: 1.35, duration: 0.7, ease: SPRING }}
        >
          <div className="text-xl font-bold text-primary leading-none">10+</div>
          <div className="text-xs text-muted-foreground mt-1 tracking-wide">
            Projects
          </div>
        </motion.div> */}
      </motion.div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  Hero section
// ─────────────────────────────────────────────────────────────────────────────

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
        {/*
         * items-stretch → both columns share the same row height.
         * The left column drives the height via its content stack;
         * HexagonHero fills that height with w-full h-full.
         */}
        <div className="grid lg:grid-cols-2 gap-12 items-stretch">
          {/* Left Column — Text Content */}
          <div className="flex flex-col justify-center space-y-8">
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
              {socials
                .filter((s) => s.href)
                .map((social, i) => (
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

          {/* Right Column — Hexagon Hero */}
          <HexagonHero />
        </div>

        {/* Skills Section */}
        <div className="mt-20 animate-fade-in animation-delay-600">
          <p className="text-sm text-muted-foreground mb-6 text-center">
            Technologies I work with
          </p>
          <div className="relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-linear-to-r from-background to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-linear-to-l from-background to-transparent z-10" />
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

        {/* Scroll indicator */}
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
              <p className="text-xs text-muted-foreground">
                PDF Document • 488 KB
              </p>
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
