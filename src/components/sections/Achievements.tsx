"use client";
import { motion } from "framer-motion";
import { Award, BookOpen, Cpu, Trophy } from "lucide-react";
import { useState } from "react";
import { achievements, type Achievement } from "@/content/site";
import { SectionHeading } from "../ui/SectionHeading";

const icon: Record<Achievement["category"], typeof Award> = { Academic: BookOpen, Engineering: Cpu, Sport: Trophy, Certification: Award };
const cats = ["All", "Sport", "Engineering", "Academic", "Certification"] as const;

export function Achievements() {
  const [cat, setCat] = useState<(typeof cats)[number]>("All");
  const [view, setView] = useState<"wall" | "timeline">("wall");
  const timeline = [...achievements].filter((a) => cat === "All" || a.category === cat).sort((a, b) => (a.when === "In progress" ? 1 : 0) - (b.when === "In progress" ? 1 : 0) || b.year - a.year);
  return (
    <section id="achievements" className="section">
      <SectionHeading eyebrow="09 · Achievements" title="Hall of Achievements" lead="Academic, engineering and sporting milestones, all drawn from my resume and my own record." />
      <div className="mt-10 flex flex-wrap items-center justify-between gap-3">
      <div role="group" aria-label="Filter achievements" className="flex flex-wrap gap-2">
        {cats.map((c) => (
          <button key={c} onClick={() => setCat(c)} aria-pressed={cat === c} className={`focus-ring rounded-full px-4 py-2 text-sm transition ${cat === c ? "bg-fg text-ink" : "glass text-muted hover:text-fg"}`}>{c}</button>
        ))}
      </div>
      <div role="group" aria-label="Achievement view" className="glass flex rounded-full p-1">
        {(["wall", "timeline"] as const).map((v) => (
          <button key={v} onClick={() => setView(v)} aria-pressed={view === v} className={`focus-ring rounded-full px-4 py-1.5 text-sm capitalize transition ${view === v ? "bg-gradient-to-r from-electric to-violet text-white" : "text-muted hover:text-fg"}`}>{v}</button>
        ))}
      </div>
      </div>
      {view === "timeline" ? (
        <ol className="relative mt-10 space-y-4 border-l hairline pl-8">
          {timeline.map((a, i) => {
            const Icon = icon[a.category];
            return (
              <motion.li key={a.title} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }} className="relative">
                <span aria-hidden className={`absolute -left-[41px] top-4 grid h-5 w-5 place-items-center rounded-full ${a.featured ? "bg-gold" : "bg-electric"}`}><span className="h-1.5 w-1.5 rounded-full bg-ink" /></span>
                <div className={`flex flex-col gap-3 rounded-2xl p-5 transition hover:translate-x-1 sm:flex-row sm:items-center sm:gap-6 ${a.featured ? "border border-gold/40 bg-gold/[0.08]" : "glass hover:border-electric/40"}`}>
                  <p className={`w-28 shrink-0 font-display text-sm font-semibold ${a.featured ? "text-gold" : "text-electric"}`}>{a.when}</p>
                  <div className="flex-1">
                    <p className="flex items-center gap-2 font-display font-semibold text-fg"><Icon className="h-4 w-4 text-muted" aria-hidden />{a.title}</p>
                    <p className="mt-1 text-sm text-muted">{a.detail}</p>
                  </div>
                  <span className="chip shrink-0">{a.category}</span>
                </div>
              </motion.li>
            );
          })}
        </ol>
      ) : (
      <ul className="mt-8 grid auto-rows-fr gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {achievements.map((a, i) => {
          const Icon = icon[a.category];
          const dim = cat !== "All" && a.category !== cat;
          return (
            <motion.li key={a.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: (i % 4) * 0.06, duration: 0.6 }}
              animate={{ opacity: dim ? 0.25 : 1, scale: dim ? 0.97 : 1 }}
              className={a.featured ? "sm:col-span-2 sm:row-span-2" : ""}>
              <div className={`group relative h-full overflow-hidden rounded-3xl p-6 transition ${a.featured ? "border border-gold/40 bg-gradient-to-br from-gold/15 via-violet/10 to-transparent sm:p-10" : "glass hover:-translate-y-1 hover:border-electric/40"}`}>
                {a.featured && <div aria-hidden className="absolute -right-10 -top-10 h-56 w-56 rounded-full bg-gold/20 blur-3xl transition group-hover:bg-gold/30" />}
                <span className={`relative grid place-items-center rounded-2xl ${a.featured ? "h-16 w-16 bg-gold/20 text-gold" : "h-11 w-11 bg-electric/10 text-electric"}`}><Icon className={a.featured ? "h-8 w-8" : "h-5 w-5"} aria-hidden /></span>
                <p className={`relative mt-5 text-[0.65rem] uppercase tracking-[0.25em] ${a.featured ? "text-gold" : "text-muted"}`}>{a.featured ? "Featured · " : ""}{a.category}</p>
                <h3 className={`relative mt-2 font-display font-semibold text-fg ${a.featured ? "text-3xl sm:text-4xl" : "text-lg"}`}>{a.title}</h3>
                <p className={`relative mt-2 leading-relaxed text-muted ${a.featured ? "text-lg" : "text-sm"}`}>{a.detail}</p>
              </div>
            </motion.li>
          );
        })}
      </ul>
      )}
    </section>
  );
}
