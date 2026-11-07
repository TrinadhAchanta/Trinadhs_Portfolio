"use client";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowRight, FileDown, Mail, MapPin } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { profile } from "@/content/site";
import { NeuralField } from "../ui/NeuralField";
import { GitHubIcon, LinkedInIcon, MediumIcon } from "../ui/Brand";
import { Tilt } from "../ui/Tilt";
import { PhotoSlot } from "../ui/PhotoSlot";

export function Hero() {
  const [i, setI] = useState(0);
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yText = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % profile.rotating.length), 2800);
    return () => clearInterval(t);
  }, []);

  const resumeHref = profile.resumeUrl ?? `mailto:${profile.email}?subject=${encodeURIComponent("Resume request")}`;
  const letters = profile.displayName.split(" ");

  return (
    <section id="home" ref={ref} className="relative isolate flex min-h-[100svh] items-center overflow-hidden pt-28 pb-16" data-recruiter="hide">
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute -left-40 top-10 h-[38rem] w-[38rem] animate-drift rounded-full bg-electric/20 blur-[120px]" />
        <div className="absolute -right-40 bottom-0 h-[34rem] w-[34rem] animate-drift-slow rounded-full bg-violet/20 blur-[120px]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgb(var(--ink))_80%)]" />
        <NeuralField className="absolute inset-0" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-ink" />
      </div>

      <motion.div style={{ y: yText, opacity: fade }} className="mx-auto grid w-full max-w-content items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1.35fr_1fr]">
        <div>
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="eyebrow flex items-center gap-3">
            <span className="h-px w-10 bg-gradient-to-r from-electric to-violet" /> Portfolio
          </motion.p>

          <h1 className="mt-6 font-display text-[2.6rem] font-semibold leading-[0.95] tracking-tight sm:text-7xl lg:text-[5.4rem]">
            <span className="sr-only">{profile.name}</span>
            {letters.map((word, wi) => (
              <span key={wi} aria-hidden className="block overflow-hidden pb-1">
                <motion.span className="block text-silver" initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 1.1, delay: 0.15 + wi * 0.12, ease: [0.22, 1, 0.36, 1] }}>
                  {word}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.ul initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7, duration: 1 }} className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-muted sm:text-base" aria-label="Professional headline">
            {profile.headline.map((h, k) => (
              <li key={h} className="flex items-center gap-3">{k > 0 && <span aria-hidden className="h-1 w-1 rounded-full bg-electric" />}{h}</li>
            ))}
          </motion.ul>

          <div className="mt-6 flex min-h-[3.5rem] flex-col gap-1 font-display text-lg sm:min-h-[2.25rem] sm:flex-row sm:items-center sm:gap-3 sm:text-xl" aria-live="polite">
            <span className="text-muted">Focused on</span>
            <span className="relative inline-flex overflow-hidden whitespace-nowrap">
              <AnimatePresence mode="wait">
                <motion.span key={i} className="text-accent animate-sheen font-semibold" initial={{ y: "100%", opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: "-100%", opacity: 0 }} transition={{ duration: 0.5 }}>
                  {profile.rotating[i]}
                </motion.span>
              </AnimatePresence>
            </span>
          </div>

          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 1 }} className="mt-7 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            {profile.intro}
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.05, duration: 1 }} className="mt-9 flex flex-wrap gap-2.5 [&>a]:!px-4 sm:[&>a]:!px-5">
            <a href="#experience" className="btn-primary">View Experience <ArrowRight className="h-4 w-4" /></a>
            <a href="#journey" className="btn-ghost">Explore My Journey</a>
            <a href={resumeHref} {...(profile.resumeUrl ? { download: "Trinadha-Kumar-Achanta-Resume.pdf" } : {})} className="btn-ghost">
              <FileDown className="h-4 w-4" /> {profile.resumeUrl ? "Download Resume" : "Request Resume"}
            </a>
            <a href="#contact" className="btn-ghost"><Mail className="h-4 w-4" /> Contact Me</a>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} className="mt-8 flex items-center gap-4 text-sm text-muted">
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="focus-ring inline-flex items-center gap-2 rounded hover:text-fg"><LinkedInIcon /> LinkedIn</a>
            {profile.github && <a href={profile.github} target="_blank" rel="noopener noreferrer" className="focus-ring inline-flex items-center gap-2 rounded hover:text-fg"><GitHubIcon /> GitHub</a>}
            {profile.medium && <a href={profile.medium} target="_blank" rel="noopener noreferrer" className="focus-ring inline-flex items-center gap-2 rounded hover:text-fg"><MediumIcon /> Medium</a>}
            <span className="inline-flex items-center gap-2"><MapPin className="h-4 w-4" /> {profile.location}</span>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4, duration: 1.2 }} className="mx-auto w-full max-w-sm">
          <Tilt className="rounded-[2rem]">
            <div className="glass relative overflow-hidden rounded-[2rem] p-3">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem]">
                <PhotoSlot label="Professional portrait" src={profile.portrait} alt={`Portrait of ${profile.name}`} priority />
              </div>
              <div className="flex items-center justify-between px-3 pb-2 pt-4">
                <div>
                  <p className="font-display text-sm font-semibold text-fg">Data Scientist · CVS Caremark</p>
                  <p className="text-xs text-muted">Captain · Hurricanes Cricket Club</p>
                </div>
                <span className="relative flex h-2.5 w-2.5"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-electric/60" /><span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-electric" /></span>
              </div>
            </div>
          </Tilt>
        </motion.div>
      </motion.div>

      <a href="#about" aria-label="Scroll to About" className="focus-ring absolute bottom-6 left-1/2 hidden -translate-x-1/2 rounded-full p-2 text-muted hover:text-fg md:block">
        <motion.span className="block" animate={{ y: [0, 6, 0] }} transition={{ duration: 2, repeat: Infinity }}><ArrowDown className="h-5 w-5" /></motion.span>
      </a>
    </section>
  );
}
