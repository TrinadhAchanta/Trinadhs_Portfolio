"use client";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { BriefcaseBusiness, Menu, Moon, Search, Sun, X } from "lucide-react";
import { openPalette } from "./CommandPalette";
import { useEffect, useState } from "react";
import { nav } from "@/content/site";
import { useRecruiter, useTheme } from "./Providers";
import { useActiveSection } from "./useActiveSection";

const ids = nav.map((n) => n.id);
const primary = ["about", "journey", "experience", "skills", "projects", "sports", "contact"];

export function Nav() {
  const active = useActiveSection(ids);
  const { theme, toggle } = useTheme();
  const { recruiter, setRecruiter } = useRecruiter();
  const [mac, setMac] = useState(true);
  useEffect(() => setMac(/Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent)), []);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <motion.div aria-hidden className="absolute inset-x-0 top-0 h-px origin-left bg-gradient-to-r from-electric to-violet" style={{ scaleX: progress }} />
      <div className={`mx-auto mt-3 flex max-w-content items-center justify-between rounded-full px-4 py-2.5 transition-all duration-500 sm:mx-4 lg:mx-auto ${scrolled ? "glass mx-3" : "mx-1 border border-transparent"}`}>
        <a href="#home" className="focus-ring flex items-center gap-2 rounded-full font-display text-sm font-semibold tracking-[0.2em] text-fg">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-electric to-violet text-[0.7rem] text-white">TK</span>
          <span className="hidden sm:inline">ACHANTA</span>
        </a>
        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {nav.filter((n) => primary.includes(n.id)).map((n) => {
              const isActive = active === n.id || (n.id === "sports" && ["sports", "leadership"].includes(active));
              return (
                <li key={n.id}>
                  <a href={`#${n.id}`} aria-current={isActive ? "true" : undefined}
                    className={`focus-ring relative rounded-full px-3.5 py-2 text-sm transition-colors ${isActive ? "text-fg" : "text-muted hover:text-fg"}`}>
                    {isActive && <motion.span layoutId="nav-pill" className="absolute inset-0 -z-10 rounded-full bg-fg/[0.07]" transition={{ type: "spring", stiffness: 380, damping: 32 }} />}
                    {n.id === "sports" ? "Sports" : n.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="flex items-center gap-1">
          <button onClick={openPalette} className="focus-ring hidden h-10 items-center gap-2 rounded-full px-3 text-sm text-muted transition hover:bg-fg/5 hover:text-fg md:inline-flex" aria-label="Search the portfolio" aria-keyshortcuts="Control+K Meta+K">
            <Search className="h-4 w-4" /><kbd className="rounded border hairline px-1.5 text-[0.65rem]">{mac ? "⌘" : "Ctrl"} K</kbd>
          </button>
          <button onClick={openPalette} className="focus-ring grid h-10 w-10 place-items-center rounded-full text-muted hover:text-fg md:hidden" aria-label="Search the portfolio"><Search className="h-4 w-4" /></button>
          <button onClick={() => setRecruiter(!recruiter)} aria-pressed={recruiter} title="Recruiter Mode: a streamlined professional view"
            className={`focus-ring hidden h-10 items-center gap-2 rounded-full px-3 text-sm transition sm:inline-flex ${recruiter ? "bg-electric/15 text-electric ring-1 ring-electric/50" : "text-muted hover:bg-fg/5 hover:text-fg"}`}>
            <BriefcaseBusiness className="h-4 w-4" aria-hidden /><span className="hidden xl:inline">Recruiter</span><span className="sr-only xl:hidden">Recruiter Mode</span>
            <span aria-hidden className={`relative h-4 w-7 rounded-full transition ${recruiter ? "bg-electric" : "bg-fg/15"}`}><span className={`absolute top-0.5 h-3 w-3 rounded-full bg-white transition-all ${recruiter ? "left-3.5" : "left-0.5"}`} /></span>
          </button>
          <button onClick={toggle} className="focus-ring grid h-10 w-10 place-items-center rounded-full text-muted transition hover:bg-fg/5 hover:text-fg" aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}>
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <a href="#contact" className="btn-primary hidden !py-2 sm:inline-flex">Let&apos;s talk</a>
          <button onClick={() => setOpen(true)} className="focus-ring grid h-10 w-10 place-items-center rounded-full text-fg lg:hidden" aria-label="Open menu" aria-expanded={open}>
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div className="fixed inset-0 z-50 bg-ink/95 backdrop-blur-xl lg:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} role="dialog" aria-modal="true" aria-label="Site menu">
            <div className="flex justify-end p-4">
              <button onClick={() => setOpen(false)} className="focus-ring grid h-11 w-11 place-items-center rounded-full glass" aria-label="Close menu"><X className="h-5 w-5" /></button>
            </div>
            <div className="mb-4 flex gap-2 px-8">
              <button onClick={() => { setOpen(false); setRecruiter(!recruiter); }} aria-pressed={recruiter} className={`btn !py-2 ${recruiter ? "bg-electric text-white" : "glass text-fg"}`}><BriefcaseBusiness className="h-4 w-4" />Recruiter Mode {recruiter ? "on" : "off"}</button>
              <button onClick={() => { setOpen(false); openPalette(); }} className="btn-ghost !py-2"><Search className="h-4 w-4" />Search</button>
            </div>
            <ul className="px-8">
              {nav.map((n, i) => (
                <motion.li key={n.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.03 * i }}>
                  <a href={`#${n.id}`} onClick={() => setOpen(false)} className={`focus-ring flex items-baseline gap-4 py-2.5 font-display text-2xl ${active === n.id ? "text-fg" : "text-muted"}`}>
                    <span className="text-xs text-electric">{String(i + 1).padStart(2, "0")}</span>{n.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
