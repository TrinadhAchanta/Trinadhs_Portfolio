import { Code2, GraduationCap, Trophy, Users } from "lucide-react";
import { story } from "@/content/site";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";
import { ImpactDashboard } from "./ImpactDashboard";
import { JourneyMap } from "./JourneyMap";

const icons = [Code2, GraduationCap, Trophy, Users];

export function About() {
  return (
    <section id="about" className="section">
      <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr]">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading eyebrow="02 · About Me" title={story.title} lead={story.lead} />
          <div className="mt-10 grid grid-cols-2 gap-3">
            {story.pillars.map((p, i) => {
              const Icon = icons[i];
              return (
                <Reveal key={p.label} delay={0.08 * i}>
                  <div className="glass h-full rounded-2xl p-5 transition hover:-translate-y-1 hover:border-electric/40">
                    <Icon className="h-5 w-5 text-electric" aria-hidden />
                    <p className="mt-4 font-display font-semibold text-fg">{p.label}</p>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{p.text}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
        <div className="relative space-y-8 border-l hairline pl-8">
          {story.paragraphs.map((para, i) => (
            <Reveal key={i} delay={0.05}>
              <span aria-hidden className="absolute -left-[5px] mt-2 h-2.5 w-2.5 rounded-full bg-gradient-to-br from-electric to-violet" />
              <p className={`leading-relaxed ${i === 0 ? "font-display text-xl text-fg sm:text-2xl" : "text-lg text-muted"}`}>{para}</p>
            </Reveal>
          ))}
        </div>
      </div>
      <ImpactDashboard />
      <div data-recruiter="hide"><JourneyMap /></div>
    </section>
  );
}
