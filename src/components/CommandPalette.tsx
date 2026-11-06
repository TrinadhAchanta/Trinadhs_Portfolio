"use client";
import { AnimatePresence, motion } from "framer-motion";
import { Briefcase, CornerDownLeft, FolderKanban, GraduationCap, Hash, Search, Sparkles } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { education, experience, nav, projects, skills } from "@/content/site";

type Item = { id: string; label: string; hint: string; href: string; group: string; Icon: typeof Search; terms: string };

const items: Item[] = [
  ...nav.map((n) => ({ id: `s-${n.id}`, label: n.label, hint: "Section", href: `#${n.id}`, group: "Sections", Icon: Hash, terms: n.label })),
  ...experience.map((r) => ({ id: `e-${r.company}`, label: `${r.title} · ${r.company}`, hint: r.dates, href: "#experience", group: "Experience", Icon: Briefcase, terms: `${r.company} ${r.title} ${r.stack.join(" ")} ${r.highlights.map((h) => h.label).join(" ")}` })),
  ...projects.map((p) => ({ id: `p-${p.id}`, label: p.name, hint: p.categories.join(", "), href: "#projects", group: "Projects", Icon: FolderKanban, terms: `${p.name} ${p.stack.join(" ")} ${p.categories.join(" ")}` })),
  ...education.map((e) => ({ id: `ed-${e.id}`, label: `${e.institution}`, hint: `${e.level}${e.field ? `, ${e.field}` : ""}`, href: "#journey", group: "Education", Icon: GraduationCap, terms: `${e.institution} ${e.level} ${e.field ?? ""}` })),
  ...skills.flatMap((g) => g.items.map((s) => ({ id: `k-${g.id}-${s}`, label: s, hint: g.title, href: "#skills", group: "Skills", Icon: Sparkles, terms: `${s} ${g.title}` }))),
];

export const openPalette = () => window.dispatchEvent(new Event("open-palette"));

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [sel, setSel] = useState(0);
  const input = useRef<HTMLInputElement>(null);
  const list = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); setOpen((o) => !o); }
      if (e.key === "Escape") setOpen(false);
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-palette", onOpen);
    return () => { window.removeEventListener("keydown", onKey); window.removeEventListener("open-palette", onOpen); };
  }, []);
  useEffect(() => { if (open) { setQ(""); setSel(0); setTimeout(() => input.current?.focus(), 30); } }, [open]);

  const results = useMemo(() => {
    const n = q.trim().toLowerCase();
    if (!n) return items.filter((i) => i.group === "Sections");
    const words = n.split(/\s+/);
    return items.filter((i) => words.every((w) => `${i.label} ${i.hint} ${i.terms}`.toLowerCase().includes(w))).slice(0, 40);
  }, [q]);
  useEffect(() => setSel(0), [q]);
  useEffect(() => { list.current?.querySelector(`[data-idx="${sel}"]`)?.scrollIntoView({ block: "nearest" }); }, [sel]);

  function go(it?: Item) {
    if (!it) return;
    setOpen(false);
    if (document.documentElement.classList.contains("recruiter") && document.querySelector(`${it.href}[data-recruiter="hide"]`)) document.documentElement.classList.remove("recruiter");
    setTimeout(() => document.querySelector(it.href)?.scrollIntoView({ behavior: "smooth" }), 60);
  }

  let lastGroup = "";
  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-[90] flex items-start justify-center bg-black/60 px-3 pt-[12vh] backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)}>
          <motion.div role="dialog" aria-modal="true" aria-label="Search the portfolio" onClick={(e) => e.stopPropagation()} initial={{ y: -12, scale: 0.98 }} animate={{ y: 0, scale: 1 }} exit={{ y: -8, opacity: 0 }}
            className="glass w-full max-w-xl overflow-hidden rounded-3xl !bg-surface/95">
            <div className="flex items-center gap-3 border-b hairline px-5 py-4">
              <Search className="h-5 w-5 text-muted" aria-hidden />
              <input ref={input} value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search skills, projects, experience, education…" aria-label="Search" role="combobox" aria-expanded="true" aria-controls="palette-list" aria-activedescendant={results[sel] ? `pi-${sel}` : undefined}
                onKeyDown={(e) => {
                  if (e.key === "ArrowDown") { e.preventDefault(); setSel((s) => Math.min(s + 1, results.length - 1)); }
                  if (e.key === "ArrowUp") { e.preventDefault(); setSel((s) => Math.max(s - 1, 0)); }
                  if (e.key === "Enter") { e.preventDefault(); go(results[sel]); }
                }}
                className="w-full bg-transparent text-base text-fg outline-none placeholder:text-muted/70" />
              <kbd className="rounded-md border hairline px-1.5 py-0.5 text-[0.65rem] text-muted">ESC</kbd>
            </div>
            <ul ref={list} id="palette-list" role="listbox" className="max-h-[50vh] overflow-y-auto p-2">
              {results.length === 0 && <li className="px-4 py-6 text-center text-sm text-muted">No results for &ldquo;{q}&rdquo;</li>}
              {results.map((it, i) => {
                const header = it.group !== lastGroup ? (lastGroup = it.group) : null;
                return (
                  <li key={it.id} role="presentation">
                    {header && <p className="px-3 pb-1 pt-3 text-[0.65rem] uppercase tracking-[0.2em] text-muted">{header}</p>}
                    <button id={`pi-${i}`} data-idx={i} role="option" aria-selected={i === sel} onMouseEnter={() => setSel(i)} onClick={() => go(it)}
                      className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition ${i === sel ? "bg-electric/15 text-fg" : "text-fg/85"}`}>
                      <it.Icon className="h-4 w-4 shrink-0 text-electric" aria-hidden />
                      <span className="flex-1 truncate">{it.label}</span>
                      <span className="hidden truncate text-xs text-muted sm:block sm:max-w-[45%]">{it.hint}</span>
                      {i === sel && <CornerDownLeft className="h-3.5 w-3.5 text-muted" aria-hidden />}
                    </button>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
