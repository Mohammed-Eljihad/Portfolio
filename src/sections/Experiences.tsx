import { SectionHeader } from "@/components/SectionHeader";
import { Section } from "@/components/Section";
import { experiences } from "@/constants/experiences";

function Experiences() {
  return <Section id="experiences">
      <div
        className="absolute top-1/2 left-1/4 w-96
        h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2"
      />

    <div className="container mx-auto px-6 relative z-10">
      {/* Section Header */}
      <SectionHeader
        spanTitle="Career Journey"
        sectionTitle="Experience that"
        spanSectionTitle="speaks volumes."
        paragraph="A timeline of my professional growth, from curious beginner to
          senior engineer leading teams and building products at scale."/>

      {/* TimeLine */}
      <div className="relative">
        <div
          className="timeline-glow absolute left-0 md:left-1/2 top-0 bottom-0 
          w-0.5 bg-linear-to-b from-primary/70 via-primary/30 to-transparent
          md:-translate-x-1/2 shadow-[0_0_25px_rgba(32,178,166,0.8)]" />
        
        <div className="space-y-12">
          {experiences.map((exp, expIdx) => (
            <div
              key={expIdx}
              className="relative grid md:grid-cols-2 gap-8 animate-fade-in"
              style={{ animationDelay: `${(expIdx + 1) * 100}ms` }}>
              
              {/* Timeline Dot */}
              <div
                className="absolute left-0 md:left-1/2 top-0 w-3 h-3 bg-primary rounded-full -translate-x-1/2 ring-4 ring-background z-10">
                {exp.current && (<span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-75"/>)}
              </div>
              
              {/* Timeline Content */}
              <div
                className={`pl-8 md:pl-0 ${expIdx % 2 === 0 ? "md:pr-16 md:text-right" : "md:col-start-2 md:pl-16"}`}>
                <div className="glass p-6 rounded-2xl border border-primary/30 hover:border-primary/50 transition-all duration-500">
                  <span className="text-sm text-primary font-medium">{exp.period}</span>
                  <h3 className="text-xl font-semibold mt-2">{exp.role}</h3>
                  <p className="text-muted-foreground">{exp.company}</p>
                  <p className="text-sm text-muted-foreground mt-4">{exp.description}</p>
                  <div className={`flex flex-wrap gap-2 mt-4 ${expIdx % 2 === 0 && "md:justify-end"}`}>
                    {exp.technologies.map((tech, techIdx) => (
                      <span
                        key={techIdx}
                        className="px-3 py-1 rounded-full bg-surface text-xs text-muted-foreground">
                        {tech}
                      </span>))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </Section>
} 

export default Experiences;
