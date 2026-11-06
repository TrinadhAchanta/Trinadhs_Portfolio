"use client";
import { Briefcase, FileDown, GraduationCap, Mail, Trophy, X } from "lucide-react";
import { certifications, education, experience, profile, skills } from "@/content/site";
import { useRecruiter } from "../Providers";
import { LinkedInIcon } from "../ui/Brand";

/** One-screen summary shown only in Recruiter Mode. Reads the same data as the full site. */
export function RecruiterBrief() {
  const { setRecruiter } = useRecruiter();
  const now = experience[0];
  const resumeHref = profile.resumeUrl ?? `mailto:${profile.email}?subject=${encodeURIComponent("Resume request")}`;
  const top = ["genai", "nlp", "ml", "lang", "cloud", "data"].map((id) => skills.find((s) => s.id === id)!).filter(Boolean);
  return (
    <section id="recruiter" data-recruiter="only" aria-label="Recruiter summary" className="mx-auto w-full max-w-content px-4 pt-24 sm:px-6">
      <div className="glass relative overflow-hidden rounded-3xl border-electric/30 p-6 sm:p-8">
        <div aria-hidden className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-electric/15 blur-3xl" />
        <div className="relative flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="eyebrow">Recruiter Mode · quick summary</p>
            <h2 className="mt-2 font-display text-2xl font-semibold text-fg sm:text-3xl">{profile.name}</h2>
            <p className="mt-1 text-muted">{now.title} at {now.company} · {profile.location}</p>
          </div>
          <button onClick={() => setRecruiter(false)} className="btn-ghost !py-2"><X className="h-4 w-4" aria-hidden />Back to full site</button>
        </div>
        <div className="relative mt-6 grid gap-6 lg:grid-cols-3">
          <div>
            <p className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-electric"><Briefcase className="h-3.5 w-3.5" aria-hidden />Experience</p>
            <ul className="mt-3 space-y-2 text-sm">
              {experience.map((r) => <li key={r.company}><span className="text-fg">{r.title}</span><span className="text-muted">, {r.company}</span><br /><span className="text-xs text-muted">{r.dates}{r.impact ? ` · ${r.impact.headline}` : ""}</span></li>)}
            </ul>
          </div>
          <div>
            <p className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-electric"><GraduationCap className="h-3.5 w-3.5" aria-hidden />Education & credentials</p>
            <ul className="mt-3 space-y-2 text-sm">
              {[...education].reverse().filter((e) => e.dates).map((e) => <li key={e.id}><span className="text-fg">{e.level}{e.field ? `, ${e.field}` : ""}</span><br /><span className="text-xs text-muted">{e.institution} · {e.dates}</span></li>)}
              {certifications.filter((c) => c.status === "earned").map((c) => <li key={c.title}><span className="text-fg">{c.title}</span><br /><span className="text-xs text-muted">{c.issuer} · completed</span></li>)}
              <li className="text-xs text-muted">In progress: {certifications.filter((c) => c.status !== "earned").map((c) => c.title.replace(" Certificate", "")).join(", ")}</li>
            </ul>
            <p className="mt-4 flex items-center gap-2 text-xs text-muted"><Trophy className="h-3.5 w-3.5 text-gold" aria-hidden />Captain, Hurricanes Cricket Club · 2026 champions</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-electric">Core skills</p>
            <ul className="mt-3 space-y-2 text-sm">
              {top.map((g) => <li key={g.id}><span className="text-fg">{g.title}:</span> <span className="text-muted">{g.items.slice(0, 4).join(", ")}</span></li>)}
            </ul>
          </div>
        </div>
        <div className="relative mt-6 flex flex-wrap gap-2 border-t hairline pt-5">
          <a href={resumeHref} className="btn-primary !py-2"><FileDown className="h-4 w-4" aria-hidden />{profile.resumeUrl ? "Download resume" : "Request resume"}</a>
          <a href={`mailto:${profile.email}`} className="btn-ghost !py-2"><Mail className="h-4 w-4" aria-hidden />{profile.email}</a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="btn-ghost !py-2"><LinkedInIcon />LinkedIn</a>
          <a href="#experience" className="btn-ghost !py-2">Full experience</a>
          <a href="#projects" className="btn-ghost !py-2">Projects</a>
        </div>
      </div>
    </section>
  );
}
