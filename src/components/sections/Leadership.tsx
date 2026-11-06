import { Cpu, Flag, Quote } from "lucide-react";
import { leadership } from "@/content/site";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";

export function Leadership() {
  const sides = [
    { ...leadership.engineering, Icon: Cpu, tone: "from-electric/20" },
    { ...leadership.sports, Icon: Flag, tone: "from-violet/20" },
  ];
  return (
    <section id="leadership" className="section" data-recruiter="hide">
      <SectionHeading eyebrow="Leadership Philosophy" title="Leadership On and Off the Field" align="center" />
      <div className="relative mt-14 grid overflow-hidden rounded-[2rem] border hairline md:grid-cols-2">
        <div aria-hidden className="absolute left-1/2 top-1/2 z-10 hidden h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-gradient-to-br from-electric to-violet font-display text-xs font-bold text-white shadow-[0_0_40px_rgb(var(--electric)/0.6)] md:grid">&amp;</div>
        {sides.map(({ title, text, points, Icon, tone }, i) => (
          <Reveal key={title} delay={i * 0.1} className={`relative bg-gradient-to-br ${tone} to-transparent p-8 sm:p-12 ${i === 0 ? "border-b hairline md:border-b-0 md:border-r" : ""}`}>
            <Icon className="h-7 w-7 text-electric" aria-hidden />
            <h3 className="mt-5 font-display text-2xl font-semibold text-fg sm:text-3xl">{title}</h3>
            <p className="mt-3 leading-relaxed text-muted">{text}</p>
            <ul className="mt-6 space-y-3">
              {points.map((p) => <li key={p} className="flex items-start gap-3 text-sm text-fg/85"><span aria-hidden className="mt-1.5 h-1.5 w-1.5 shrink-0 rotate-45 bg-electric" />{p}</li>)}
            </ul>
          </Reveal>
        ))}
      </div>
      <Reveal className="mt-8 flex flex-wrap justify-center gap-2">
        {leadership.values.map((v) => <span key={v} className="chip">{v}</span>)}
      </Reveal>
      <Reveal className="mx-auto mt-14 max-w-3xl text-center">
        <Quote className="mx-auto h-8 w-8 text-violet" aria-hidden />
        <p className="mt-4 font-display text-xl leading-relaxed text-fg sm:text-2xl">{leadership.statement}</p>
      </Reveal>
    </section>
  );
}
