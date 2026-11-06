import { Quote } from "lucide-react";
import { testimonials } from "@/content/site";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";

/** Renders nothing until genuine recommendations are added to `testimonials` in site.ts. */
export function Testimonials() {
  if (testimonials.length === 0) return null;
  return (
    <section id="testimonials" className="section">
      <SectionHeading eyebrow="Recommendations" title="What colleagues say" />
      <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((t, i) => (
          <Reveal key={t.name} delay={i * 0.08}>
            <figure className="glass flex h-full flex-col rounded-3xl p-7 transition hover:-translate-y-1 hover:border-electric/40">
              <Quote className="h-6 w-6 text-violet" aria-hidden />
              <blockquote className="mt-4 flex-1 leading-relaxed text-fg/90">&ldquo;{t.quote}&rdquo;</blockquote>
              <figcaption className="mt-6 border-t hairline pt-4">
                <p className="font-display font-semibold text-fg">{t.name}</p>
                <p className="text-sm text-muted">{t.role}, {t.org}</p>
                {t.relation && <p className="mt-1 text-xs text-muted/80">{t.relation}</p>}
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
