import { Crown, MapPin, Shield } from "lucide-react";
import { gallery, sports, sportsMilestones } from "@/content/site";
import { PhotoSlot } from "../ui/PhotoSlot";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";
import { Tilt } from "../ui/Tilt";
import { Trophy } from "./Trophy";

function photo(caption: string) {
  return gallery.find((g) => g.caption === caption)?.src ?? null;
}

export function Sports() {
  const { basketball, cricket, championship: c } = sports;
  const bballPhoto = photo("University basketball team");
  const cricketPhoto = photo("2026 championship trophy");
  // Extra championship photos (the trophy photo already appears beside the cricket card)
  const champPhotos = gallery.filter((g) => g.category === "Hurricanes Championship" && g.src && g.src !== cricketPhoto);
  return (
    <section id="sports" className="relative overflow-hidden" data-recruiter="hide">
      <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgb(var(--violet)/0.12),transparent_60%)]" />
      <div className="section">
        <SectionHeading eyebrow="08 · Sports & Leadership" title={<>Beyond the Code<br /><span className="text-accent">My Sporting Journey</span></>} lead="Sport has shaped how I prepare, how I handle pressure and how I work with people. Two games, two chapters." />

        {/* Basketball */}
        <div className={`mt-16 grid items-stretch gap-6 ${bballPhoto ? "lg:grid-cols-2" : ""}`}>
          <Reveal>
            <Tilt className="h-full rounded-3xl" max={4}>
              <article className="glass relative h-full overflow-hidden rounded-3xl p-7 sm:p-9">
                <svg aria-hidden viewBox="0 0 200 200" className="absolute -right-16 -top-16 h-64 w-64 text-electric/15"><circle cx="100" cy="100" r="96" fill="none" stroke="currentColor" strokeWidth="4" /><path d="M4 100h192M100 4v192M30 30c40 40 40 100 0 140M170 30c-40 40-40 100 0 140" fill="none" stroke="currentColor" strokeWidth="4" /></svg>
                <p className="eyebrow">Basketball · Undergraduate years</p>
                <h3 className="relative mt-4 font-display text-2xl font-semibold text-fg sm:text-3xl">{basketball.headline}</h3>
                <p className="relative mt-4 leading-relaxed text-muted">{basketball.description}</p>
                <ul className="relative mt-6 grid gap-2 sm:grid-cols-2">
                  {basketball.points.map((pt) => <li key={pt} className="flex items-start gap-2 text-sm text-fg/85"><span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-electric" />{pt}</li>)}
                </ul>
                <p className="relative mt-6 inline-flex items-center gap-2 text-xs text-muted"><MapPin className="h-3.5 w-3.5" aria-hidden />Anna University · competitions across India</p>
              </article>
            </Tilt>
          </Reveal>
          {bballPhoto && <Reveal delay={0.1}>
            <div className="glass h-full min-h-[18rem] overflow-hidden rounded-3xl"><PhotoSlot label="University basketball team" src={bballPhoto} alt="Trinadha holding the ball with the university basketball team" className="object-[50%_45%]" /></div>
          </Reveal>}
        </div>

        {/* Cricket */}
        <div className={`mt-6 grid items-stretch gap-6 ${cricketPhoto ? "lg:grid-cols-[1fr_1.2fr]" : ""}`}>
          {cricketPhoto && <Reveal className="order-2 lg:order-1">
            <div className="glass h-full min-h-[18rem] overflow-hidden rounded-3xl"><PhotoSlot label="Hurricanes 2026 championship" src={cricketPhoto} alt="Trinadha holding the Hurricanes 2026 championship trophy" className="object-[50%_40%]" /></div>
          </Reveal>}
          <Reveal delay={0.1} className="order-1 lg:order-2">
            <article className="glass relative h-full overflow-hidden rounded-3xl p-7 sm:p-9">
              <p className="eyebrow">Cricket · Massachusetts, USA</p>
              <h3 className="mt-4 font-display text-2xl font-semibold text-fg sm:text-3xl">Passion, Competition &amp; Leadership</h3>
              <p className="mt-4 leading-relaxed text-muted">{cricket.description}</p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-electric to-violet px-4 py-2 text-sm font-medium text-white"><Crown className="h-4 w-4" aria-hidden />{cricket.role}</span>
                <span className="inline-flex items-center gap-2 rounded-full border hairline px-4 py-2 text-sm text-fg"><Shield className="h-4 w-4 text-electric" aria-hidden />{cricket.club}</span>
                <span className="inline-flex items-center gap-2 rounded-full border hairline px-4 py-2 text-sm text-fg">{cricket.bowling}</span>
              </div>
              <ul className="mt-6 grid grid-cols-2 gap-2">
                {cricket.responsibilities.map((r) => <li key={r} className="rounded-xl border hairline px-3 py-2 text-sm text-fg/85">{r}</li>)}
              </ul>
            </article>
          </Reveal>
        </div>

        {/* Milestones */}
        <Reveal className="mt-16">
          <p className="eyebrow">Sporting milestones</p>
          <ol className="relative mt-8 grid gap-6 md:grid-cols-4 md:gap-4">
            <span aria-hidden className="absolute left-[7px] top-2 h-[calc(100%-1rem)] w-px bg-gradient-to-b from-electric via-violet to-gold md:left-0 md:top-[7px] md:h-px md:w-full md:bg-gradient-to-r" />
            {sportsMilestones.map((m, i) => (
              <li key={m.title} className="relative pl-8 md:pl-0 md:pt-8">
                <span aria-hidden className={`absolute left-0 top-1 h-4 w-4 rounded-full border-2 md:top-0 ${m.gold ? "border-gold bg-gold shadow-[0_0_18px_rgb(var(--gold)/0.7)]" : "border-electric bg-ink"}`} />
                <div className={`rounded-2xl p-5 transition hover:-translate-y-1 ${m.gold ? "border border-gold/40 bg-gold/[0.08]" : "glass hover:border-electric/40"}`} style={{ transitionDelay: `${i * 40}ms` }}>
                  <p className={`text-[0.65rem] font-semibold uppercase tracking-[0.25em] ${m.gold ? "text-gold" : "text-electric"}`}>{m.when}</p>
                  <p className="mt-2 font-display text-lg font-semibold text-fg">{m.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{m.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>

        {/* Championship */}
        <Reveal className="mt-20">
          <article className="relative overflow-hidden rounded-[2rem] border border-gold/30 bg-gradient-to-br from-gold/[0.08] via-transparent to-violet/[0.08] p-7 sm:p-12">
            <div aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_75%_30%,rgb(var(--gold)/0.18),transparent_50%)]" />
            <div className="relative grid items-center gap-10 lg:grid-cols-[1.2fr_1fr]">
              <div>
                <p className="font-display text-xs font-semibold uppercase tracking-[0.32em] text-gold">Featured achievement</p>
                <h3 className="mt-4 font-display text-3xl font-semibold leading-tight text-silver sm:text-5xl">{c.headline}</h3>
                <dl className="mt-8 grid grid-cols-3 gap-3">
                  {[["Year", c.year], ["Team", c.team], ["Role", c.role]].map(([k, v]) => (
                    <div key={k} className="rounded-2xl border border-gold/20 bg-ink/30 p-4">
                      <dt className="text-[0.65rem] uppercase tracking-[0.2em] text-muted">{k}</dt>
                      <dd className="mt-1 font-display text-lg font-semibold text-fg sm:text-xl">{v}</dd>
                    </div>
                  ))}
                </dl>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-gold/20 bg-ink/30 p-4">
                    <p className="text-[0.65rem] uppercase tracking-[0.2em] text-muted">Bowling</p>
                    <p className="mt-1 font-display font-semibold text-fg">{cricket.bowling}</p>
                  </div>
                  <div className="rounded-2xl border border-gold/40 bg-gold/[0.10] p-4">
                    <p className="text-[0.65rem] uppercase tracking-[0.2em] text-gold">Wickets</p>
                    <p className="mt-1 font-display font-semibold text-fg">{cricket.wickets}</p>
                  </div>
                </div>
                <p className="mt-6 font-display text-lg text-fg">{c.achievement}</p>
                {c.competition && <p className="mt-1 text-sm text-gold">{c.competition}</p>}
                <blockquote className="mt-6 border-l-2 border-gold/50 pl-5 leading-relaxed text-muted">{c.story}</blockquote>
              </div>
              <Trophy />
            </div>
            {champPhotos.length > 0 && (
              <div className="relative mt-10 grid gap-3 sm:grid-cols-3">
                {champPhotos.map((g) => (
                  <div key={g.caption} className="aspect-[4/3] overflow-hidden rounded-2xl border border-gold/20 bg-ink/30"><PhotoSlot label={g.caption} src={g.src} className="object-[50%_35%]" /></div>
                ))}
              </div>
            )}
          </article>
        </Reveal>
      </div>
    </section>
  );
}
