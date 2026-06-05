import { SectionHeader } from "@/components/SectionHeader";
import { Section } from "@/components/Section";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useState } from "react";
import { testimonials } from "@/constants/testimonials";
import { motion, AnimatePresence, type Variants } from "framer-motion";

function Testimonials() {
  const [activeIdx, setActive] = useState<number>(0);
  const [direction, setDirection] = useState<number>(0);

  const next = () => {
    setDirection(1);
    setActive((prev) => (prev + 1) % testimonials.length);
  };

  const previous = () => {
    setDirection(-1);
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const slideVariants: Variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 30,
      },
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 50 : -50,
      opacity: 0,
      scale: 0.95,
      transition: {
        opacity: { duration: 0.2 },
        scale: { duration: 0.2 },
      },
    }),
  };

  return (
    <Section id="testimonials" className="mt-40">
      {/* Ambient Background Glows */}
      <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none -z-10 animate-pulse-glow" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-primary/3 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="container mx-auto px-6 relative overflow-hidden z-10">
        <SectionHeader
          isCenter={true}
          spanTitle="what people say"
          sectionTitle="Kind words from"
          spanSectionTitle="amazing people"
          paragraph="Hear from clients and colleagues I've had the pleasure of working with."
        />

        {/* Testimonial Carousel */}
        <div className="max-w-4xl mx-auto mt-16">
          <div className="relative">
            {/* Main Testimonial */}
            <div className="relative min-h-[350px] sm:min-h-[280px] md:min-h-[250px]">
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                  key={activeIdx}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="glass p-8 md:p-12 rounded-3xl glow-border shadow-2xl relative w-full h-full flex flex-col justify-between overflow-hidden group/testimonial"
                >
                  {/* Hover Spotlight */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover/testimonial:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  <div className="absolute top-8 left-8 md:left-12 w-14 h-14 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-[0_0_20px_rgba(32,178,166,0.4)] z-20">
                    <Quote className="w-6 h-6 text-primary-foreground" />
                  </div>

                  <blockquote className="text-xl md:text-2xl lg:text-3xl font-medium leading-relaxed mb-10 pt-24 text-foreground/90 italic relative z-10">
                    "{testimonials[activeIdx].quote}"
                  </blockquote>

                  <div className="flex items-center gap-5 relative z-10">
                    <div className="relative">
                      <div className="absolute inset-0 bg-primary rounded-full animate-ping opacity-20" />
                      <img
                        src={testimonials[activeIdx].avatar}
                        alt={testimonials[activeIdx].author}
                        className="w-16 h-16 rounded-full object-cover ring-2 ring-primary/40 shadow-lg relative z-10"
                        width="64"
                        height="64"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <div>
                      <div className="text-lg font-bold text-foreground">
                        {testimonials[activeIdx].author}
                      </div>
                      <div className="text-sm font-medium text-primary">
                        {testimonials[activeIdx].role}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Testimonials Navigation */}
            <div className="flex items-center justify-center gap-6 mt-12">
              <button
                onClick={previous}
                className="p-4 rounded-full glass hover:bg-primary/20 hover:text-primary transition-all duration-300 hover:scale-110 active:scale-95 shadow-md group"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5 text-muted-foreground group-hover:text-primary" />
              </button>
              
              <div className="flex gap-3">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setDirection(idx > activeIdx ? 1 : -1);
                      setActive(idx);
                    }}
                    className={`h-2.5 rounded-full transition-all duration-500 ${
                      idx === activeIdx
                        ? "w-10 bg-gradient-to-r from-primary to-primary/80 shadow-[0_0_10px_rgba(32,178,166,0.5)]"
                        : "w-2.5 bg-muted-foreground/30 hover:bg-primary/50"
                    }`}
                    aria-label={`Go to testimonial ${idx + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={next}
                className="p-4 rounded-full glass hover:bg-primary/20 hover:text-primary transition-all duration-300 hover:scale-110 active:scale-95 shadow-md group"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

export default Testimonials;
