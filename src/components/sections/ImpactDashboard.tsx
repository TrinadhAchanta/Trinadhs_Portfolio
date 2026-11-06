import { Cloud } from "lucide-react";
import { cloudStack, impactStats } from "@/content/site";
import { CountUp } from "../ui/CountUp";
import { Reveal } from "../ui/Reveal";

/** Bento-style impact dashboard. Figures come only from the resume (see impactStats in site.ts). */
export function ImpactDashboard() {
  const [lead, ...rest] = impactStats;
  return (
    <div className="mt-20">
      <Reveal>
        <p className="eyebrow">Impact dashboard</p>
        <h3 className="mt-3 font-display text-2xl font-semibold text-fg sm:text-3xl">Verified results, at a glance</h3>
      </Reveal>
      <div className="mt-8 grid auto-rows-[minmax(8.5rem,auto)] grid-cols-2 gap-3 md:grid-cols-4">
        <Reveal className="col-span-2 row-span-2">
          <div className="glass relative flex h-full flex-col justify-between overflow-hidden rounded-3xl p-7">
            <div aria-hidden className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-electric/20 blur-3xl" />
            <p className="relative text-xs uppercase tracking-[0.22em] text-muted">{lead.source}</p>
            <div className="relative">
              <p className="font-display text-7xl font-semibold text-silver sm:text-8xl"><CountUp value={lead.value} prefix={lead.prefix} suffix={lead.suffix} /></p>
              <p className="mt-2 text-lg text-fg">{lead.label}</p>
              <p className="mt-1 text-sm text-muted">Verizon · Credit Karma · Ford · Anna University, now CVS Caremark</p>
            </div>
          </div>
        </Reveal>
        {rest.map((s, i) => (
          <Reveal key={s.label} delay={0.04 * i}>
            <div className="glass group h-full rounded-3xl p-5 transition hover:-translate-y-0.5 hover:border-electric/40">
              <p className="font-display text-3xl font-semibold text-fg sm:text-4xl"><span className="text-silver"><CountUp value={s.value} prefix={s.prefix} suffix={s.suffix} /></span></p>
              <p className="mt-2 text-sm leading-snug text-fg/85">{s.label}</p>
              <p className="mt-1 text-[0.65rem] uppercase tracking-[0.2em] text-muted">{s.source}</p>
            </div>
          </Reveal>
        ))}
        <Reveal className="col-span-2 md:col-span-4">
          <div className="glass flex flex-col gap-4 rounded-3xl p-5 sm:flex-row sm:items-center">
            <span className="inline-flex items-center gap-2 text-sm font-medium text-fg"><Cloud className="h-4 w-4 text-electric" aria-hidden />Cloud & MLOps</span>
            <ul className="flex flex-wrap gap-2">{cloudStack.map((c) => <li key={c} className="chip">{c}</li>)}</ul>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
