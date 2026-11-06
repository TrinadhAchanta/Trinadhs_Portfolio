"use client";
import { AnimatePresence, motion, useScroll } from "framer-motion";
import { ChevronDown, GraduationCap, MapPin } from "lucide-react";
import { useRef, useState } from "react";
import { education } from "@/content/site";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";

export function Journey() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const [open, setOpen] = useState<string | null>("btech");

  return (
    <section id="journey" className="section">
      <SectionHeading eyebrow="03 · My Journey" title={<>From the Classroom<br />to the Cloud</>} lead="An education built step by step, from school in India to graduate study in the United States, and now a PhD in Business and Artificial Intelligence." />
      <div ref={ref} className="relative mt-16">
        <div aria-hidden className="absolute left-5 top-0 h-full w-px bg-line/10 md:left-1/2" />
        <motion.div aria-hidden className="absolute left-5 top-0 h-full w-px origin-top bg-gradient-to-b from-electric via-violet to-electric md:left-1/2" style={{ scaleY: scrollYProgress }} />
        <ol className="space-y-10 md:space-y-16">
          {education.map((e, i) => {
            const isOpen = open === e.id;
            const right = i % 2 === 1;
            return (
              <li key={e.id} className="relative grid md:grid-cols-2 md:gap-16">
                <span aria-hidden className="absolute left-5 top-7 z-10 grid h-4 w-4 -translate-x-1/2 place-items-center rounded-full bg-ink ring-2 ring-electric md:left-1/2">
                  <span className="h-1.5 w-1.5 rounded-full bg-electric" />
                </span>
                <div className={`pl-12 md:pl-0 ${right ? "md:col-start-2" : "md:text-right"}`}>
                  <Reveal>
                    <p className="eyebrow">{String(i + 1).padStart(2, "0")} · {e.stage}</p>
                    {e.dates && <p className="mt-2 font-display text-sm text-muted">{e.dates}</p>}
                  </Reveal>
                </div>
                <div className={`mt-4 pl-12 md:mt-0 md:pl-0 ${right ? "md:col-start-1 md:row-start-1" : ""}`}>
                  <Reveal delay={0.1}>
                    <div className={`glass overflow-hidden rounded-3xl transition ${isOpen ? "border-electric/40" : ""}`}>
                      <button onClick={() => setOpen(isOpen ? null : e.id)} aria-expanded={isOpen} aria-controls={`edu-${e.id}`} className="focus-ring w-full rounded-3xl p-6 text-left sm:p-7">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-start gap-4">
                            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-electric/20 to-violet/20 text-electric"><GraduationCap className="h-5 w-5" aria-hidden /></span>
                            <div>
                              <h3 className="font-display text-xl font-semibold text-fg">{e.institution}</h3>
                              <p className="mt-1 text-sm text-fg/80">{e.level}</p>
                              {e.field && <p className="mt-1 text-sm text-muted">{e.field}</p>}
                              {e.location && <p className="mt-2 inline-flex items-center gap-1.5 text-xs text-muted"><MapPin className="h-3.5 w-3.5" aria-hidden />{e.location}</p>}
                            </div>
                          </div>
                          <ChevronDown className={`mt-1 h-5 w-5 shrink-0 text-muted transition-transform ${isOpen ? "rotate-180" : ""}`} aria-hidden />
                        </div>
                        {e.subjects && (
                          <div className="mt-5 grid grid-cols-3 gap-2">
                            {e.subjects.map((s) => (
                              <div key={s.name} className="rounded-2xl border hairline bg-fg/[0.02] px-2 py-3 text-center">
                                <span aria-hidden className="block font-display text-2xl text-accent">{s.symbol}</span>
                                <span className="mt-1 block text-[0.7rem] uppercase tracking-wider text-muted">{s.name}</span>
                              </div>
                            ))}
                          </div>
                        )}
                        <p className="mt-5 text-sm leading-relaxed text-muted">{e.highlight}</p>
                      </button>
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div id={`edu-${e.id}`} initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.45 }}>
                            <ul className="space-y-2.5 border-t hairline px-6 pb-6 pt-5 text-sm leading-relaxed text-muted sm:px-7">
                              {e.details.map((d) => <li key={d} className="flex gap-3"><span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-electric" />{d}</li>)}
                            </ul>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </Reveal>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
