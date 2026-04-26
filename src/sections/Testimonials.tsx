import { SectionHeader } from "@/components/SectionHeader";
import { Section } from "@/components/Section";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useState } from "react";
import { testimonials } from "@/constants/testimonials";

function Testimonials() {
  const [activeIdx, setActive] = useState<number>(0);

  const next = () => {
    setActive((prev) => (prev + 1) % testimonials.length)
  }

  const previous = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <Section
      id="testimonials" className="mt-40">
        <div
        className="absolute top-1/2 left-1/2
          w-200 h-200 bg-primary/5
          rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"
      />
      <div className="container mx-auto px-6 relative overflow-hidden z-10">

        <SectionHeader
          isCenter={true}
          spanTitle={"what people say"}
          sectionTitle="Kind words from"
          spanSectionTitle="amazing people"
          paragraph="" />
        
        {/* Testimonial Carousal */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Main Testimonial */}
            <div className="glass p-8 rounded-3xl md:p-12 glow-border animate-fade-in animation-delay-200">
              <div className="absolute -top-4 left-8 w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                <Quote className="w-6 h-6 text-primary-foreground" />
              </div>

              <blockquote className="text-xl md:text-2xl font-medium leading-relaxed mb-8 pt-4">{testimonials[activeIdx].quote}</blockquote>
              
              <div className="flex items-center gap-4">
                <img
                  src={testimonials[activeIdx].avatar}
                  alt={testimonials[activeIdx].author}
                  className="w-14 h-14 rounded-full object-cover ring-2 ring-primary/20" />
                <div>

                <div className="font-semibold">{testimonials[activeIdx].author}</div>      
                  <div
                    className=" text-sm text-muted-foreground">
                    {testimonials[0].role}
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonials Navigation */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                onClick={previous}
                className="p-3 rounded-full glass hover:bg-primary/10 hover:text-primary transition-all">
                <ChevronLeft />
              </button>
              <div className="flex gap-2">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActive(idx)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === activeIdx ? "w-8 bg-primary " : "bg-muted-foreground/30 hover:bg-muted-foreground/50"}`}>
                    
                    </button>))}
              </div>
              <button
                onClick={next}
                className="p-3 rounded-full glass hover:bg-primary/10 hover:text-primary transition-all">
                <ChevronRight />
                </button>
            </div>
          </div>
        </div>
      </div>

    </Section>)
}

export default Testimonials;
