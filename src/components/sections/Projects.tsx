"use client";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ChevronRight, Lock } from "lucide-react";
import { useState } from "react";
import { projectCategories, projects, type Project, type ProjectCategory } from "@/content/site";
import { Modal } from "../ui/Modal";
import { SectionHeading } from "../ui/SectionHeading";
import { Tilt } from "../ui/Tilt";

type Filter = "All" | ProjectCategory;

export function Projects() {
  const [filter, setFilter] = useState<Filter>("All");
  const [active, setActive] = useState<Project | null>(null);
  const list = filter === "All" ? projects : projects.filter((p) => p.categories.includes(filter));

  return (
    <section id="projects" className="section">
      <SectionHeading eyebrow="06 · Projects" title="Engineering Achievements" lead="Selected systems from my work. Employer projects are described at a high level to protect proprietary information." />

      <div role="group" aria-label="Filter projects" className="mt-10 flex flex-wrap gap-2">
        {(["All", ...projectCategories] as Filter[]).map((f) => (
          <button key={f} onClick={() => setFilter(f)} aria-pressed={filter === f}
            className={`focus-ring relative rounded-full px-4 py-2 text-sm transition ${filter === f ? "text-white" : "glass text-muted hover:text-fg"}`}>
            {filter === f && <motion.span layoutId="proj-filter" className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-electric to-violet" />}
            {f}
          </button>
        ))}
      </div>

      <motion.ul layout className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {list.map((p, i) => (
            <motion.li key={p.id} layout initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }} transition={{ duration: 0.35 }}>
              <Tilt className="h-full rounded-3xl" max={5}>
                <button onClick={() => setActive(p)} className="focus-ring glass group flex h-full w-full flex-col rounded-3xl p-6 text-left transition hover:border-electric/40">
                  <div className="flex items-center justify-between text-xs text-muted">
                    <span className="font-display tracking-[0.2em]">{String(projects.indexOf(p) + 1).padStart(2, "0")}</span>
                    <span className="inline-flex items-center gap-1.5">{p.context.startsWith("Professional") && <Lock className="h-3 w-3" aria-hidden />}{p.context.split(" · ")[0]}</span>
                  </div>
                  <h3 className="mt-6 font-display text-xl font-semibold text-fg">{p.name}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{p.solution}</p>
                  <ul className="mt-5 space-y-1.5">
                    {p.impact.slice(0, 3).map((m) => <li key={m} className="flex items-center gap-2 text-sm text-fg/85"><span aria-hidden className="h-1 w-1 rounded-full bg-electric" />{m}</li>)}
                  </ul>
                  <div className="mt-auto flex items-center justify-between pt-6">
                    <ul className="flex flex-wrap gap-1.5">{p.categories.map((c) => <li key={c} className="chip !py-0.5 !text-[0.65rem]">{c}</li>)}</ul>
                    <span className="inline-flex shrink-0 items-center gap-1 text-sm text-electric">Details <ChevronRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden /></span>
                  </div>
                </button>
              </Tilt>
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>

      <Modal open={!!active} onClose={() => setActive(null)} label={active?.name ?? "Project"} wide>
        {active && <ProjectDetail p={active} />}
      </Modal>
    </section>
  );
}

function ProjectDetail({ p }: { p: Project }) {
  return (
    <div className="p-6 sm:p-10">
      <p className="eyebrow">{p.context}</p>
      <h3 className="mt-3 pr-10 font-display text-3xl font-semibold text-silver">{p.name}</h3>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {[["Problem", p.problem], ["Solution", p.solution], ["My contribution", p.contribution]].map(([k, v]) => (
          <div key={k} className="rounded-2xl border hairline p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-electric">{k}</p>
            <p className="mt-2 text-sm leading-relaxed text-fg/85">{v}</p>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <p className="text-xs uppercase tracking-[0.2em] text-muted">Architecture overview</p>
        <ol className="mt-4 flex flex-col gap-2 md:flex-row md:items-stretch">
          {p.architecture.map((step, i) => (
            <li key={step} className="flex flex-1 items-center gap-2 md:flex-col md:items-stretch">
              <div className="flex-1 rounded-2xl border border-electric/25 bg-gradient-to-br from-electric/10 to-violet/10 px-4 py-3 text-center text-sm text-fg">
                <span className="mr-2 font-display text-xs text-electric md:mb-1 md:mr-0 md:block">{i + 1}</span>{step}
              </div>
              {i < p.architecture.length - 1 && <span aria-hidden className="hidden text-center text-electric md:hidden">↓</span>}
            </li>
          ))}
        </ol>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-muted">Engineering challenge</p>
          <p className="mt-2 text-sm leading-relaxed text-fg/85">{p.challenges}</p>
          <p className="mt-6 text-xs uppercase tracking-[0.2em] text-muted">Technology</p>
          <ul className="mt-3 flex flex-wrap gap-2">{p.stack.map((s) => <li key={s} className="chip">{s}</li>)}</ul>
        </div>
        <div className="rounded-2xl border border-electric/25 p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-electric">Verified impact</p>
          <ul className="mt-3 space-y-2">{p.impact.map((m) => <li key={m} className="font-display text-lg text-fg">{m}</li>)}</ul>
        </div>
      </div>

      {p.links.length > 0 && (
        <div className="mt-8 flex flex-wrap gap-3">
          {p.links.map((l) => <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="btn-ghost">{l.label}<ArrowUpRight className="h-4 w-4" /></a>)}
        </div>
      )}
    </div>
  );
}
