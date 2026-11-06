"use client";
import { motion } from "framer-motion";
import { BarChart3, Brain, Cloud, Code2, Database, FlaskConical, MessagesSquare, Search, Sparkles, Wrench, X } from "lucide-react";
import { useState } from "react";
import { featuredTech, skills } from "@/content/site";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";
import { TechIcon } from "../ui/TechIcon";
import { Tilt } from "../ui/Tilt";

const icons: Record<string, typeof Brain> = { genai: Sparkles, nlp: MessagesSquare, ml: Brain, lang: Code2, cloud: Cloud, data: Database, viz: BarChart3, stats: FlaskConical, tools: Wrench };

export function Skills() {
  const loop = [...featuredTech, ...featuredTech];
  const [q, setQ] = useState("");
  const [area, setArea] = useState("all");
  const needle = q.trim().toLowerCase();
  const groups = skills
    .filter((g) => area === "all" || g.id === area)
    .map((g) => ({ ...g, hits: needle ? g.items.filter((i) => i.toLowerCase().includes(needle)) : g.items, titleHit: needle && g.title.toLowerCase().includes(needle) }))
    .filter((g) => !needle || g.hits.length > 0 || g.titleHit);
  const total = groups.reduce((n, g) => n + (g.titleHit ? g.items.length : g.hits.length), 0);
  return (
    <section id="skills" className="section">
      <SectionHeading eyebrow="05 · Skills" title="Technical Toolkit" lead="Every skill below comes straight from my resume. No self-rated percentages, just the tools I use to ship." />

      <Reveal className="relative mt-12 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
        <motion.ul className="flex w-max gap-3" animate={{ x: ["0%", "-50%"] }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }} aria-label="Featured technologies">
          {loop.map((t, i) => (
            <li key={i} aria-hidden={i >= featuredTech.length} className="glass flex items-center gap-2.5 rounded-full px-4 py-2.5 text-sm text-muted">
              <TechIcon name={t} className="h-4 w-4 text-fg" /> {t}
            </li>
          ))}
        </motion.ul>
      </Reveal>

      <div className="mt-10 flex flex-col gap-3 md:flex-row md:items-center">
        <label className="glass flex flex-1 items-center gap-3 rounded-full px-4 py-2.5 focus-within:border-electric/50">
          <Search className="h-4 w-4 text-muted" aria-hidden />
          <span className="sr-only">Search skills</span>
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search skills, e.g. RAG, Python, AWS" className="w-full bg-transparent text-sm text-fg outline-none placeholder:text-muted/70" />
          {q && <button onClick={() => setQ("")} aria-label="Clear search" className="text-muted hover:text-fg"><X className="h-4 w-4" /></button>}
        </label>
        <select value={area} onChange={(e) => setArea(e.target.value)} aria-label="Filter by area" className="focus-ring glass rounded-full px-4 py-2.5 text-sm text-fg">
          <option value="all">All areas</option>
          {skills.map((g) => <option key={g.id} value={g.id}>{g.title}</option>)}
        </select>
      </div>
      <p className="mt-3 text-xs text-muted" aria-live="polite">{needle || area !== "all" ? `${total} matching skill${total === 1 ? "" : "s"}` : `${skills.reduce((n, g) => n + g.items.length, 0)} skills across ${skills.length} areas`}</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {groups.length === 0 && <p className="text-sm text-muted">No skills match &ldquo;{q}&rdquo;.</p>}
        {groups.map((g, i) => {
          const Icon = icons[g.id] ?? Brain;
          return (
            <Reveal key={g.id} delay={(i % 3) * 0.08}>
              <Tilt className="h-full rounded-3xl">
                <div className="glass group h-full rounded-3xl p-6 transition hover:border-electric/40">
                  <div className="flex items-center gap-3">
                    <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-electric/25 to-violet/25 text-electric transition group-hover:scale-110"><Icon className="h-5 w-5" aria-hidden /></span>
                    <h3 className="font-display text-lg font-semibold text-fg">{g.title}</h3>
                  </div>
                  <p className="mt-3 text-sm text-muted">{g.blurb}</p>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {g.items.map((s) => {
                      const hit = needle && s.toLowerCase().includes(needle);
                      if (needle && !hit && !g.titleHit) return null;
                      return <li key={s} className={`chip transition group-hover:border-electric/25 group-hover:text-fg/90 ${hit ? "!border-electric/60 !text-fg bg-electric/10" : ""}`}>{s}</li>;
                    })}
                  </ul>
                </div>
              </Tilt>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
