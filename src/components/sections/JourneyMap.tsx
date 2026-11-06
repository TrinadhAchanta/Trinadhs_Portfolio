"use client";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { useState } from "react";
import { journeyStops } from "@/content/site";
import { Reveal } from "../ui/Reveal";

// Equirectangular projection over a cropped window (longitude -95..95, latitude 0..58).
const W = 1000, H = 420, L0 = -95, L1 = 95, T = 58, B = 0;
const px = (lon: number) => ((lon - L0) / (L1 - L0)) * W;
const py = (lat: number) => ((T - lat) / (T - B)) * H;

// Coarse dot-matrix land masks for the two regions (decorative, not cartographically exact).
const land: [number, number, number, number][] = [
  // [lonMin, lonMax, latMin, latMax] rough boxes forming North America east & India
  [-90, -66, 30, 48], [-84, -70, 25, 31], [-80, -60, 44, 52], [-95, -80, 48, 56],
  [68, 89, 8, 30], [73, 82, 20, 35], [88, 92, 20, 27], [70, 78, 28, 34],
];
function dots() {
  const out: { x: number; y: number }[] = [];
  for (let lon = L0; lon <= L1; lon += 1.6) for (let lat = B; lat <= T; lat += 1.6)
    if (land.some(([a, b, c, d]) => lon >= a && lon <= b && lat >= c && lat <= d)) out.push({ x: px(lon), y: py(lat) });
  return out;
}
const DOTS = dots();

export function JourneyMap() {
  const [active, setActive] = useState("india");
  const stop = journeyStops.find((s) => s.id === active)!;
  const chennai = journeyStops.find((s) => s.id === "chennai")!, ma = journeyStops.find((s) => s.id === "henniker")!;
  const a = { x: px(chennai.lon), y: py(chennai.lat) }, b = { x: px(ma.lon), y: py(ma.lat) };
  const arc = `M ${a.x} ${a.y} Q ${(a.x + b.x) / 2} ${-140} ${b.x} ${b.y}`;

  return (
    <div className="mt-20">
      <Reveal>
        <p className="eyebrow">Journey map</p>
        <h3 className="mt-3 font-display text-2xl font-semibold text-fg sm:text-3xl">From India to the United States</h3>
      </Reveal>
      <Reveal className="mt-8">
        <div className="glass overflow-hidden rounded-3xl">
          <svg viewBox={`0 -160 ${W} ${H + 170}`} className="h-auto w-full" role="img" aria-label="Map of Trinadha's journey from Andhra Pradesh, India to Massachusetts, USA">
            <defs>
              <linearGradient id="arc" x1="1" x2="0"><stop offset="0" stopColor="rgb(var(--electric))" /><stop offset="1" stopColor="rgb(var(--violet))" /></linearGradient>
            </defs>
            {DOTS.map((d, i) => <circle key={i} cx={d.x} cy={d.y} r={2.2} className="fill-fg/15" />)}
            <text x={px(78)} y={py(4)} textAnchor="middle" className="fill-muted text-[14px] uppercase tracking-[0.3em]">India</text>
            <text x={px(-78)} y={py(22)} textAnchor="middle" className="fill-muted text-[14px] uppercase tracking-[0.3em]">United States</text>
            <motion.path d={arc} fill="none" stroke="url(#arc)" strokeWidth={2} strokeDasharray="6 8" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 2.2, ease: "easeInOut" }} />
            {journeyStops.map((s) => {
              const on = s.id === active;
              return (
                <g key={s.id} transform={`translate(${px(s.lon)} ${py(s.lat)})`} className="cursor-pointer" onClick={() => setActive(s.id)}
                  role="button" tabIndex={0} aria-label={s.place} aria-pressed={on} onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setActive(s.id)}>
                  <circle r={on ? 16 : 11} className={on ? "fill-electric/25" : "fill-electric/10"} />
                  <circle r={on ? 6.5 : 5} className="fill-electric" />
                  {on && <motion.circle r={6} className="fill-none stroke-electric" strokeWidth={1.5} animate={{ r: [6, 22], opacity: [0.8, 0] }} transition={{ duration: 1.8, repeat: Infinity }} />}
                  {(on || s.id === "chennai" || s.id === "ma" || s.id === "india") && <text y={s.id === "chennai" ? 32 : -24} textAnchor="middle" className={`text-[15px] font-semibold ${on ? "fill-fg" : "fill-muted"}`}>{on ? s.place : s.id === "ma" ? "New England" : s.place}</text>}
                </g>
              );
            })}
          </svg>
          <div className="flex flex-wrap gap-2 border-t hairline p-4">
            {journeyStops.map((s) => (
              <button key={s.id} onClick={() => setActive(s.id)} aria-pressed={active === s.id} className={`focus-ring inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs transition ${active === s.id ? "bg-electric text-white" : "border hairline text-muted hover:text-fg"}`}>
                <MapPin className="h-3 w-3" aria-hidden />{s.place}
              </button>
            ))}
          </div>
          <motion.ul key={active} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="space-y-2 px-5 pb-6 text-sm text-fg/85" aria-live="polite">
            {stop.items.map((it) => <li key={it} className="flex gap-3"><span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-electric" />{it}</li>)}
          </motion.ul>
        </div>
      </Reveal>
    </div>
  );
}
