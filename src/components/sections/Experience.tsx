"use client";
import { AnimatePresence, motion } from "framer-motion";
import { Briefcase, ChevronDown, MapPin, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
import { experience } from "@/content/site";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";

export function Experience() {
  const [idx, setIdx] = useState(0);
  const role = experience[idx];
  const [expanded, setExpanded] = useState(false);
  useEffect(() => setExpanded(false), [idx]);
  const shown = expanded ? role.highlights : role.highlights.slice(0, 4);

  function onKey(e: React.KeyboardEvent) {
    if (!["ArrowDown", "ArrowRight", "ArrowUp", "ArrowLeft"].includes(e.key)) return;
    e.preventDefault();
    const d = e.key === "ArrowDown" || e.key === "ArrowRight" ? 1 : -1;
    const n = (idx + d + experience.length) % experience.length;
    setIdx(n);
    document.getElementById(`tab-${n}`)?.focus();
  }

  return (
    <section id="experience" className="section">
      <SectionHeading eyebrow="04 · Professional Experience" title="Engineering Career" lead="Data science, NLP and machine-learning work across healthcare, telecom, fintech, automotive and academia." />

      <Reveal className="mt-14 grid gap-6 lg:grid-cols-[19rem_1fr]">
        <div role="tablist" aria-label="Employers" aria-orientation="vertical" onKeyDown={onKey}
          className="relative -mx-4 flex gap-2 overflow-x-auto px-4 pb-2 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0 lg:pl-7">
          <span aria-hidden className="absolute bottom-6 left-[9px] top-6 hidden w-px bg-gradient-to-b from-electric via-violet/60 to-transparent lg:block" />
          {experience.map((r, i) => {
            const on = i === idx;
            return (
              <button key={r.company} id={`tab-${i}`} role="tab" aria-selected={on} aria-controls="role-panel" tabIndex={on ? 0 : -1} onClick={() => setIdx(i)}
                className={`focus-ring group relative min-w-[15rem] shrink-0 rounded-2xl border p-4 text-left transition duration-300 lg:min-w-0 ${on ? "border-electric/40 bg-fg/[0.04]" : "hairline hover:translate-x-1 hover:border-electric/25 hover:bg-fg/[0.03]"}`}>
                <span aria-hidden className={`absolute -left-[26px] top-1/2 hidden h-3 w-3 -translate-y-1/2 rounded-full border-2 transition lg:block ${on ? "border-electric bg-electric shadow-[0_0_14px_rgb(var(--electric)/0.8)]" : "border-muted/50 bg-ink group-hover:border-electric"}`} />
                {on && <motion.span layoutId="exp-bar" className="absolute inset-y-3 left-0 w-0.5 rounded-full bg-gradient-to-b from-electric to-violet" />}
                <div className="flex items-center gap-3">
                  <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl font-display text-xs font-bold ${on ? "bg-gradient-to-br from-electric to-violet text-white" : "bg-fg/5 text-muted"}`}>{r.monogram}</span>
                  <div>
                    <p className="font-display text-sm font-semibold text-fg">{r.company}</p>
                    <p className="text-xs text-muted">{r.dates}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <div id="role-panel" role="tabpanel" aria-labelledby={`tab-${idx}`} className="glass relative min-h-[32rem] overflow-hidden rounded-3xl p-6 sm:p-10">
          <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-electric/10 blur-3xl" />
          <AnimatePresence mode="wait">
            <motion.div key={role.company} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.4 }}>
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h3 className="font-display text-2xl font-semibold text-fg sm:text-3xl">{role.title}</h3>
                  <p className="mt-1 text-lg text-accent">{role.company}</p>
                </div>
                <div className="flex flex-col items-start gap-1 text-sm text-muted sm:items-end">
                  <span className="inline-flex items-center gap-2"><Briefcase className="h-4 w-4" aria-hidden />{role.dates}</span>
                  {role.location && <span className="inline-flex items-center gap-2"><MapPin className="h-4 w-4" aria-hidden />{role.location}</span>}
                </div>
              </div>
              <p className="mt-5 max-w-3xl leading-relaxed text-muted">{role.summary}</p>

              {role.impact && (
                <div className="mt-8 flex flex-col gap-3 rounded-2xl border border-gold/30 bg-gradient-to-r from-gold/[0.10] via-electric/[0.05] to-transparent p-5 sm:flex-row sm:items-center sm:gap-6">
                  <div className="flex items-center gap-3 sm:min-w-[16rem]">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gold/20 text-gold"><TrendingUp className="h-5 w-5" aria-hidden /></span>
                    <div>
                      <p className="text-[0.65rem] uppercase tracking-[0.22em] text-gold">Business impact</p>
                      <p className="font-display text-lg font-semibold text-fg">{role.impact.headline}</p>
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed text-muted">{role.impact.detail}</p>
                </div>
              )}

              {role.metrics.length > 0 && (
                <dl className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
                  {role.metrics.map((m, k) => (
                    <motion.div key={m.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.06 * k + 0.1 }} className="rounded-2xl border hairline bg-fg/[0.02] p-4">
                      <dt className="sr-only">{m.label}</dt>
                      <dd className="font-display text-2xl font-semibold text-silver sm:text-3xl">{m.value}</dd>
                      <dd className="mt-1 text-xs uppercase tracking-wider text-muted">{m.label}</dd>
                    </motion.div>
                  ))}
                </dl>
              )}

              <ul className="mt-8 grid gap-4 md:grid-cols-2">
                {shown.map((h) => (
                  <motion.li key={h.label} layout initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl border hairline p-5 transition duration-300 hover:-translate-y-0.5 hover:border-electric/30 hover:bg-fg/[0.02]">
                    <p className="font-display text-sm font-semibold text-fg">{h.label}</p>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{h.text}</p>
                  </motion.li>
                ))}
              </ul>

              {role.highlights.length > 4 && (
                <button onClick={() => setExpanded((v) => !v)} aria-expanded={expanded} className="focus-ring mt-4 inline-flex items-center gap-1.5 rounded-full border hairline px-4 py-2 text-sm text-muted transition hover:border-electric/40 hover:text-fg">
                  {expanded ? "Show fewer" : `Show all ${role.highlights.length} contributions`}<ChevronDown className={`h-4 w-4 transition ${expanded ? "rotate-180" : ""}`} aria-hidden />
                </button>
              )}

              <div className="mt-8">
                <p className="text-xs uppercase tracking-[0.2em] text-muted">Technologies</p>
                <ul className="mt-3 flex flex-wrap gap-2">{role.stack.map((s) => <li key={s} className="chip">{s}</li>)}</ul>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </Reveal>
    </section>
  );
}
