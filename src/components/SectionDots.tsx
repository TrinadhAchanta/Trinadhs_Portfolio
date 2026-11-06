"use client";
import { nav } from "@/content/site";
import { useActiveSection } from "./useActiveSection";
import { useRecruiter } from "./Providers";

const recruiterHidden = ["sports", "ai-lab"];

const ids = nav.map((n) => n.id);

export function SectionDots() {
  const active = useActiveSection(ids);
  const { recruiter } = useRecruiter();
  return (
    <nav aria-label="Section indicator" className="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 xl:block">
      <ul className="flex flex-col gap-3">
        {nav.filter((n) => !(recruiter && recruiterHidden.includes(n.id))).map((n) => {
          const on = active === n.id || (n.id === "sports" && active === "leadership") || (n.id === "achievements" && active === "gallery");
          return (
            <li key={n.id} className="group relative flex items-center justify-end">
              <span className="pointer-events-none absolute right-6 whitespace-nowrap rounded-full glass px-3 py-1 text-xs text-fg opacity-0 transition group-hover:opacity-100">{n.label}</span>
              <a href={`#${n.id}`} aria-label={n.label} aria-current={on ? "true" : undefined}
                className={`focus-ring block rounded-full transition-all duration-500 ${on ? "h-6 w-1.5 bg-gradient-to-b from-electric to-violet" : "h-1.5 w-1.5 bg-muted/50 hover:bg-fg"}`} />
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
