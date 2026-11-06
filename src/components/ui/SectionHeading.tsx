import { Reveal } from "./Reveal";

export function SectionHeading({ eyebrow, title, lead, align = "left" }: { eyebrow: string; title: React.ReactNode; lead?: string; align?: "left" | "center" }) {
  return (
    <Reveal className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-4 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-silver sm:text-5xl md:text-6xl">{title}</h2>
      {lead && <p className="mt-6 text-lg leading-relaxed text-muted">{lead}</p>}
    </Reveal>
  );
}
