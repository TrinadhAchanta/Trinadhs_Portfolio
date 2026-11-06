"use client";
import { ArrowUpRight, CheckCircle2, FileDown, Loader2, Mail, Send } from "lucide-react";
import { useState } from "react";
import { profile } from "@/content/site";
import { GitHubIcon, LinkedInIcon } from "../ui/Brand";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";

/**
 * Contact form. If NEXT_PUBLIC_FORMSPREE_ID is set (free at formspree.io), messages are delivered
 * to your inbox without leaving the page. Otherwise it opens the visitor's email app pre-filled.
 */
const FORMSPREE = process.env.NEXT_PUBLIC_FORMSPREE_ID;

export function Contact() {
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate(data: FormData) {
    const e: Record<string, string> = {};
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    if (name.length < 2) e.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) e.email = "Please enter a valid email address.";
    if (message.length < 20) e.message = `Please write a little more (${Math.max(0, 20 - message.length)} more characters).`;
    return e;
  }

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    if (data.get("_gotcha")) return;
    const errs = validate(data);
    setErrors(errs);
    if (Object.keys(errs).length) {
      (form.querySelector(`[name="${Object.keys(errs)[0]}"]`) as HTMLElement | null)?.focus();
      return;
    }
    if (!FORMSPREE) {
      const subject = `Portfolio enquiry from ${data.get("name")}`;
      const body = `${data.get("message")}\n\n${data.get("name")}\n${data.get("email")}${data.get("company") ? `\n${data.get("company")}` : ""}`;
      window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      setState("sent");
      return;
    }
    setState("sending");
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE}`, { method: "POST", body: data, headers: { Accept: "application/json" } });
      if (!res.ok) throw new Error();
      form.reset();
      setState("sent");
    } catch {
      setState("error");
    }
  }

  const links = [
    { label: "Email", value: profile.email, href: `mailto:${profile.email}`, Icon: Mail },
    { label: "LinkedIn", value: "trinadha-kumar-achanta", href: profile.linkedin, Icon: LinkedInIcon },
    ...(profile.github ? [{ label: "GitHub", value: profile.github.replace("https://github.com/", "@"), href: profile.github, Icon: GitHubIcon }] : []),
    profile.resumeUrl
      ? { label: "Resume", value: "Download PDF", href: profile.resumeUrl, Icon: FileDown }
      : { label: "Resume", value: "Request by email", href: `mailto:${profile.email}?subject=${encodeURIComponent("Resume request")}`, Icon: FileDown },
  ];
  const field = "focus-ring w-full rounded-2xl border hairline bg-fg/[0.03] px-4 py-3.5 text-fg placeholder:text-muted/70 transition focus:border-electric/50";

  return (
    <section id="contact" className="section">
      <div aria-hidden className="absolute inset-x-0 top-1/3 -z-10 mx-auto h-96 max-w-3xl rounded-full bg-electric/10 blur-[120px]" />
      <SectionHeading eyebrow="10 · Contact" title={<>Let&apos;s build something<br /><span className="text-accent">worth measuring.</span></>} lead="Open to conversations about AI/ML, generative AI and data science roles, collaborations, and cricket." />
      {profile.introVideo && (
        <Reveal className="mt-14">
          <div className="glass overflow-hidden rounded-3xl">
            <div className="relative aspect-video">
              {/\.(mp4|webm)$/i.test(profile.introVideo)
                ? <video src={profile.introVideo} controls preload="metadata" className="h-full w-full object-cover" />
                : <iframe src={profile.introVideo} title={`Video introduction from ${profile.name}`} loading="lazy" allow="accelerometer; encrypted-media; picture-in-picture" allowFullScreen className="absolute inset-0 h-full w-full" />}
            </div>
            <p className="px-5 py-3 text-sm text-muted">A short introduction from me.</p>
          </div>
        </Reveal>
      )}
      <div className="mt-14 grid gap-6 lg:grid-cols-[1fr_1.3fr]">
        <Reveal>
          <ul className="space-y-3">
            {links.map(({ label, value, href, Icon }) => (
              <li key={label}>
                <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
                  className="focus-ring glass group flex items-center gap-4 rounded-2xl p-5 transition hover:border-electric/40">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-electric/10 text-electric"><Icon className="h-5 w-5" /></span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-xs uppercase tracking-[0.2em] text-muted">{label}</span>
                    <span className="block truncate text-fg">{value}</span>
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-muted transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-fg" aria-hidden />
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-muted">Based in {profile.location}.</p>
        </Reveal>
        <Reveal delay={0.1}>
          <form onSubmit={submit} noValidate className="glass space-y-4 rounded-3xl p-6 sm:p-8" aria-describedby="form-status">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block"><span className="mb-2 block text-sm text-muted">Name</span><input name="name" required autoComplete="name" aria-invalid={!!errors.name} aria-describedby={errors.name ? "err-name" : undefined} onInput={() => errors.name && setErrors((e) => ({ ...e, name: "" }))} className={`${field} ${errors.name ? "!border-red-400/70" : ""}`} placeholder="Your name" />{errors.name && <span id="err-name" className="mt-1.5 block text-xs text-red-400">{errors.name}</span>}</label>
              <label className="block"><span className="mb-2 block text-sm text-muted">Email</span><input name="email" type="email" required autoComplete="email" aria-invalid={!!errors.email} aria-describedby={errors.email ? "err-email" : undefined} onInput={() => errors.email && setErrors((e) => ({ ...e, email: "" }))} className={`${field} ${errors.email ? "!border-red-400/70" : ""}`} placeholder="you@company.com" />{errors.email && <span id="err-email" className="mt-1.5 block text-xs text-red-400">{errors.email}</span>}</label>
            </div>
            <label className="block"><span className="mb-2 block text-sm text-muted">Company <span className="opacity-60">(optional)</span></span><input name="company" autoComplete="organization" className={field} placeholder="Company or team" /></label>
            <label className="block"><span className="mb-2 block text-sm text-muted">Message</span><textarea name="message" required rows={5} maxLength={4000} aria-invalid={!!errors.message} aria-describedby={errors.message ? "err-message" : undefined} onInput={() => errors.message && setErrors((e) => ({ ...e, message: "" }))} className={`${field} resize-y ${errors.message ? "!border-red-400/70" : ""}`} placeholder="Tell me about the role or project" />{errors.message && <span id="err-message" className="mt-1.5 block text-xs text-red-400">{errors.message}</span>}</label>
            <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
            <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
              <p id="form-status" role="status" className="text-sm text-muted">
                {state === "sent" && <span className="inline-flex items-center gap-2 text-electric"><CheckCircle2 className="h-4 w-4" />{FORMSPREE ? "Thanks, your message was sent." : "Your email app should open with the message."}</span>}
                {state === "error" && <span className="text-red-400">Something went wrong. Please email me directly.</span>}
              </p>
              <button type="submit" disabled={state === "sending"} className="btn-primary disabled:opacity-60">
                {state === "sending" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />} Send message
              </button>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
