import { BadgeCheck, ExternalLink, Hourglass } from "lucide-react";
import { certifications } from "@/content/site";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";
import { Tilt } from "../ui/Tilt";

export function Certifications() {
  const earned = certifications.filter((c) => c.status === "earned");
  return (
    <section id="certifications" className="section">
      <SectionHeading eyebrow="07 · Certifications" title="Credentials" lead={earned.length ? "Earned credentials and completed training, plus the certifications I am working toward. Verification links appear as credentials are issued." : "Certifications I am currently working toward. Credentials and verification links appear here once issued."} />
      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {certifications.map((c, i) => (
          <Reveal key={c.title} delay={i * 0.08}>
            <Tilt className="h-full rounded-3xl">
              <article className="glass relative h-full overflow-hidden rounded-3xl p-6">
                <div aria-hidden className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-to-br from-electric/20 to-violet/20 blur-2xl" />
                <div className="relative flex items-start justify-between">
                  <div className="grid h-16 w-16 place-items-center rounded-full border-2 border-dashed border-electric/40 font-display text-sm font-bold text-electric">{c.mark}</div>
                  {c.status === "earned"
                    ? <span className="inline-flex items-center gap-1.5 rounded-full bg-electric/15 px-3 py-1 text-xs text-electric"><BadgeCheck className="h-3.5 w-3.5" aria-hidden />Earned</span>
                    : <span className="inline-flex items-center gap-1.5 rounded-full bg-fg/5 px-3 py-1 text-xs text-muted"><Hourglass className="h-3.5 w-3.5" aria-hidden />In progress</span>}
                </div>
                <h3 className="relative mt-6 font-display text-lg font-semibold text-fg">{c.title}</h3>
                <p className="relative mt-1 text-sm text-muted">{c.issuer}</p>
                {c.date && <p className="relative mt-3 text-xs text-muted">Issued {c.date}</p>}
                {c.verifyUrl && <a href={c.verifyUrl} target="_blank" rel="noopener noreferrer" className="focus-ring relative mt-4 inline-flex items-center gap-1.5 rounded text-sm text-electric">Verify credential <ExternalLink className="h-3.5 w-3.5" aria-hidden /></a>}
              </article>
            </Tilt>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
