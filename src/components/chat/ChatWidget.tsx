"use client";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp, MessageCircle, Sparkles, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { profile } from "@/content/site";
import { ask, suggestions, type Answer } from "./knowledge";

type Msg = { from: "bot" | "user"; text: string; link?: Answer["link"] };

const first = profile.name.split(" ")[0];
const greeting: Msg = { from: "bot", text: `Hi! I'm ${first}'s FAQ assistant. Ask about experience, education, skills, projects, certifications, leadership or cricket. I answer instantly from this portfolio's content only, and I'm not a live AI model.` };

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([greeting]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const log = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { log.current?.scrollTo({ top: log.current.scrollHeight, behavior: "smooth" }); }, [msgs, typing]);
  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => inputRef.current?.focus(), 200);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => { clearTimeout(t); window.removeEventListener("keydown", onKey); };
  }, [open]);

  function send(text: string) {
    const q = text.trim();
    if (!q || typing) return;
    setMsgs((m) => [...m, { from: "user", text: q }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      const a = ask(q);
      setMsgs((m) => [...m, { from: "bot", text: a.text, link: a.link }]);
      setTyping(false);
    }, 450 + Math.random() * 350);
  }

  const asked = new Set(msgs.filter((m) => m.from === "user").map((m) => m.text));
  const chips = suggestions.filter((s) => !asked.has(s)).slice(0, 3);

  return (
    <>
      <AnimatePresence>
        {!open && (
          <motion.button key="fab" onClick={() => setOpen(true)} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}
            className="focus-ring fixed bottom-5 right-5 z-[75] flex items-center gap-2 rounded-full bg-gradient-to-br from-electric to-violet px-4 py-3 text-sm font-medium text-white shadow-[0_10px_40px_-8px_rgb(var(--electric)/0.8)] sm:bottom-6 sm:right-6"
            aria-label={`Open chat: ask about ${first}`}>
            <MessageCircle className="h-5 w-5" aria-hidden /> <span className="hidden sm:inline">Ask about {first}</span>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div key="panel" role="dialog" aria-label={`Chat about ${first}`} initial={{ opacity: 0, y: 24, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 24, scale: 0.98 }} transition={{ duration: 0.3 }}
            className="glass fixed inset-x-3 bottom-3 z-[75] flex max-h-[80svh] flex-col overflow-hidden rounded-3xl !bg-surface/95 sm:inset-x-auto sm:bottom-6 sm:right-6 sm:h-[34rem] sm:w-[24rem]">
            <header className="flex items-center gap-3 border-b hairline px-4 py-3">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-electric to-violet text-white"><Sparkles className="h-4 w-4" aria-hidden /></span>
              <div className="flex-1">
                <p className="font-display text-sm font-semibold text-fg">Ask {first} <span className="ml-1 rounded-full border border-gold/40 px-1.5 py-0.5 align-middle text-[0.6rem] font-medium uppercase tracking-wider text-gold">FAQ</span></p>
                <p className="text-xs text-muted">Answers from this portfolio · not a live AI</p>
              </div>
              <button onClick={() => setOpen(false)} aria-label="Close chat" className="focus-ring grid h-9 w-9 place-items-center rounded-full text-muted hover:bg-fg/5 hover:text-fg"><X className="h-4 w-4" /></button>
            </header>

            <div ref={log} role="log" aria-live="polite" className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
              {msgs.map((m, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[85%] whitespace-pre-line rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${m.from === "user" ? "rounded-br-md bg-gradient-to-br from-electric to-violet text-white" : "rounded-bl-md border hairline bg-fg/[0.03] text-fg/90"}`}>
                    {m.text}
                    {m.link && (
                      <a href={m.link.href} onClick={() => window.innerWidth < 640 && setOpen(false)} className="focus-ring mt-2 block w-fit rounded text-xs font-medium text-electric underline-offset-4 hover:underline">{m.link.label} →</a>
                    )}
                  </div>
                </motion.div>
              ))}
              {typing && (
                <div className="flex gap-1 px-2 py-2" aria-label="Assistant is typing">
                  {[0, 1, 2].map((d) => <motion.span key={d} className="h-1.5 w-1.5 rounded-full bg-muted" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity, delay: d * 0.15 }} />)}
                </div>
              )}
            </div>

            {chips.length > 0 && (
              <div className="flex flex-wrap gap-1.5 px-4 pb-2">
                {chips.map((s) => <button key={s} onClick={() => send(s)} className="focus-ring rounded-full border hairline px-3 py-1.5 text-xs text-muted transition hover:border-electric/40 hover:text-fg">{s}</button>)}
              </div>
            )}

            <form onSubmit={(e) => { e.preventDefault(); send(input); }} className="flex items-center gap-2 border-t hairline p-3">
              <label htmlFor="chat-input" className="sr-only">Your question</label>
              <input id="chat-input" ref={inputRef} value={input} onChange={(e) => setInput(e.target.value)} maxLength={300} autoComplete="off" placeholder="Ask a question…"
                className="focus-ring flex-1 rounded-full border hairline bg-fg/[0.03] px-4 py-2.5 text-sm text-fg placeholder:text-muted/70" />
              <button type="submit" disabled={!input.trim() || typing} aria-label="Send" className="focus-ring grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-electric to-violet text-white disabled:opacity-40"><ArrowUp className="h-4 w-4" /></button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
