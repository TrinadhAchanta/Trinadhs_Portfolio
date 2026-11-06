"use client";
import { AnimatePresence, motion } from "framer-motion";
import { Activity, FileSearch, FlaskConical, GitBranch, MessageSquareText, Play, ScrollText } from "lucide-react";
import { useMemo, useState } from "react";
import { answer, corpus, features, predict, search, summarize } from "../lab/engine";
import { SectionHeading } from "../ui/SectionHeading";

const tabs = [
  { id: "rag", label: "RAG Q&A", Icon: MessageSquareText },
  { id: "search", label: "Semantic search", Icon: FileSearch },
  { id: "sum", label: "Summarizer", Icon: ScrollText },
  { id: "ml", label: "ML prediction", Icon: Activity },
  { id: "flow", label: "AI workflow", Icon: GitBranch },
] as const;
type Tab = (typeof tabs)[number]["id"];

function Badge({ children }: { children: React.ReactNode }) {
  return <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-[0.7rem] font-medium text-gold"><FlaskConical className="h-3 w-3" aria-hidden />{children}</span>;
}

export function AiLab() {
  const [tab, setTab] = useState<Tab>("rag");
  return (
    <section id="ai-lab" className="section" data-recruiter="hide">
      <SectionHeading eyebrow="AI Lab" title="Live AI Playground" lead="Small working prototypes of the kinds of systems I build, running entirely in your browser on synthetic data. They're simplified on purpose: production versions use transformer embeddings, LLMs and cloud infrastructure." />
      <div className="mt-10 flex flex-wrap gap-2" role="tablist" aria-label="AI Lab demos">
        {tabs.map(({ id, label, Icon }) => (
          <button key={id} role="tab" aria-selected={tab === id} onClick={() => setTab(id)}
            className={`focus-ring relative inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm transition ${tab === id ? "text-white" : "glass text-muted hover:text-fg"}`}>
            {tab === id && <motion.span layoutId="lab-tab" className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-electric to-violet" />}
            <Icon className="h-4 w-4" aria-hidden />{label}
          </button>
        ))}
      </div>
      <div className="glass mt-6 rounded-3xl p-5 sm:p-8" role="tabpanel">
        <AnimatePresence mode="wait">
          <motion.div key={tab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }}>
            {tab === "rag" && <Rag />}
            {tab === "search" && <SemanticSearch />}
            {tab === "sum" && <Summarizer />}
            {tab === "ml" && <Prediction />}
            {tab === "flow" && <Workflow />}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

const field = "focus-ring w-full rounded-2xl border hairline bg-fg/[0.03] px-4 py-3 text-sm text-fg placeholder:text-muted/70";

function Rag() {
  const examples = ["How much notice do I need to cancel?", "When are invoices due?", "How fast must a data breach be reported?", "What uptime is guaranteed?"];
  const [q, setQ] = useState(examples[0]);
  const [res, setRes] = useState(() => answer(examples[0]));
  const run = (text: string) => { setQ(text); setRes(answer(text)); };
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="font-display text-xl font-semibold text-fg">Ask questions about a sample contract</h3>
        <Badge>Prototype · extractive answer, no LLM</Badge>
      </div>
      <p className="mt-2 text-sm text-muted">Retrieves the most relevant clauses from 10 synthetic contract clauses, then quotes the best-matching sentence with its source, the same retrieve-then-answer pattern as RAG.</p>
      <form onSubmit={(e) => { e.preventDefault(); run(q); }} className="mt-5 flex gap-2">
        <label className="sr-only" htmlFor="rag-q">Question</label>
        <input id="rag-q" value={q} onChange={(e) => setQ(e.target.value)} className={field} maxLength={200} />
        <button className="btn-primary shrink-0">Ask</button>
      </form>
      <div className="mt-3 flex flex-wrap gap-2">{examples.map((e) => <button key={e} onClick={() => run(e)} className="chip focus-ring hover:border-electric/40 hover:text-fg">{e}</button>)}</div>
      <div className="mt-6 grid gap-4 lg:grid-cols-[1.1fr_1fr]">
        <div className="rounded-2xl border border-electric/30 bg-electric/[0.05] p-5" aria-live="polite">
          <p className="text-xs uppercase tracking-[0.2em] text-electric">Answer</p>
          {res.answer ? (
            <p className="mt-2 leading-relaxed text-fg">&ldquo;{res.answer.text}&rdquo; <span className="ml-1 rounded bg-electric/15 px-1.5 py-0.5 font-mono text-xs text-electric">[{res.answer.source}]</span></p>
          ) : <p className="mt-2 text-muted">No clause in the sample contract covers that. Try one of the example questions.</p>}
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-muted">Retrieved context</p>
          <ul className="mt-2 space-y-2">
            {res.hits.map((h) => (
              <li key={h.doc.id} className="rounded-xl border hairline p-3 text-sm">
                <div className="flex items-center justify-between gap-2"><span className="font-medium text-fg">[{h.doc.id}] {h.doc.title}</span><span className="font-mono text-xs text-muted">{h.score.toFixed(2)}</span></div>
                <div className="mt-2 h-1 overflow-hidden rounded-full bg-fg/10"><div className="h-full bg-gradient-to-r from-electric to-violet" style={{ width: `${Math.min(100, h.score * 160)}%` }} /></div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function SemanticSearch() {
  const [q, setQ] = useState("ending the agreement early");
  const results = useMemo(() => search(q, 4), [q]);
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="font-display text-xl font-semibold text-fg">Search clauses by meaning</h3>
        <Badge>Prototype · TF-IDF + synonym map</Badge>
      </div>
      <p className="mt-2 text-sm text-muted">Type in plain language. Synonyms (cancel → termination, uptime → availability, bill → payment) let it find clauses that don't share your exact words. Production systems use FAISS with transformer embeddings for this.</p>
      <label className="sr-only" htmlFor="ss-q">Search query</label>
      <input id="ss-q" value={q} onChange={(e) => setQ(e.target.value)} className={`${field} mt-5`} placeholder="e.g. who owns the data, how do I get paid, lawsuit location" maxLength={200} />
      <ul className="mt-5 space-y-3" aria-live="polite">
        {results.map((r, i) => (
          <motion.li key={r.doc.id} layout initial={{ opacity: 0 }} animate={{ opacity: r.score > 0 ? 1 : 0.4 }} className="rounded-2xl border hairline p-4">
            <div className="flex items-center justify-between gap-3">
              <p className="font-medium text-fg"><span className="mr-2 font-mono text-xs text-muted">#{i + 1}</span>[{r.doc.id}] {r.doc.title}</p>
              <span className="font-mono text-xs text-electric">{(r.score * 100).toFixed(0)}% match</span>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-muted">{r.doc.text}</p>
            {r.matched.length > 0 && <p className="mt-2 text-xs text-muted">Matched concepts: {r.matched.map((m) => <span key={m} className="mr-1 rounded bg-electric/10 px-1.5 py-0.5 text-electric">{m}</span>)}</p>}
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

const sample = `Quarterly operations review. Contract processing volume rose sharply this quarter as three new business units moved onto the shared document platform. The extraction pipeline handled the extra load without missing its service levels. Average turnaround time for a contract review dropped from two days to under four hours after the automated clause extraction step went live. The team also added validation checks that flag low-confidence extractions for a human reviewer. Most flagged items were scanned documents with poor image quality. Next quarter the team plans to improve handling of scanned documents and expand coverage to procurement contracts. Budget remains on track, and no additional headcount is requested.`;

function Summarizer() {
  const [text, setText] = useState(sample);
  const [n, setN] = useState(3);
  const out = useMemo(() => summarize(text, n), [text, n]);
  const words = (s: string) => s.split(/\s+/).filter(Boolean).length;
  const inW = words(text), outW = words(out.summary.join(" "));
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="font-display text-xl font-semibold text-fg">Summarize a document</h3>
        <Badge>Prototype · extractive summary</Badge>
      </div>
      <p className="mt-2 text-sm text-muted">Scores each sentence by how central its terms are to the whole text and keeps the top ones in their original order. Paste your own text to try it. Nothing leaves your browser.</p>
      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        <div>
          <label htmlFor="sum-in" className="text-xs uppercase tracking-[0.2em] text-muted">Input ({inW} words)</label>
          <textarea id="sum-in" value={text} onChange={(e) => setText(e.target.value.slice(0, 5000))} rows={10} className={`${field} mt-2 resize-y`} />
        </div>
        <div>
          <div className="flex items-center justify-between">
            <p className="text-xs uppercase tracking-[0.2em] text-muted">Summary ({outW} words{inW ? `, ${Math.round((1 - outW / inW) * 100)}% shorter` : ""})</p>
            <label className="flex items-center gap-2 text-xs text-muted">Sentences
              <input type="range" min={1} max={Math.max(1, Math.min(6, out.total))} value={Math.min(n, out.total || 1)} onChange={(e) => setN(+e.target.value)} className="accent-[rgb(var(--electric))]" />
              <span className="w-3 text-fg">{Math.min(n, out.total || 1)}</span>
            </label>
          </div>
          <ul className="mt-2 space-y-2 rounded-2xl border border-electric/30 bg-electric/[0.05] p-4 text-sm leading-relaxed text-fg" aria-live="polite">
            {out.summary.length ? out.summary.map((s) => <li key={s} className="flex gap-2"><span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-electric" />{s}</li>) : <li className="text-muted">Add some text to summarize.</li>}
          </ul>
        </div>
      </div>
    </div>
  );
}

function Prediction() {
  const [vals, setVals] = useState<Record<string, number>>(() => Object.fromEntries(features.map((f) => [f.id, f.value])));
  const { p, contrib } = predict(vals);
  const max = Math.max(...contrib.map((c) => Math.abs(c.c)), 0.5);
  const level = p > 0.66 ? { t: "High risk", c: "text-red-400" } : p > 0.33 ? { t: "Moderate risk", c: "text-gold" } : { t: "Low risk", c: "text-emerald-400" };
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="font-display text-xl font-semibold text-fg">Predict component failure risk</h3>
        <Badge>Prototype · hand-set weights, synthetic features</Badge>
      </div>
      <p className="mt-2 text-sm text-muted">A logistic model in the spirit of predictive maintenance. Move the sliders to see the probability change and which features push it up or down. The weights are illustrative, not trained on real data.</p>
      <div className="mt-6 grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <div className="space-y-4">
          {features.map((f) => (
            <label key={f.id} className="block">
              <span className="flex justify-between text-sm"><span className="text-fg/85">{f.label}</span><span className="font-mono text-electric">{vals[f.id]}</span></span>
              <input type="range" min={f.min} max={f.max} step={f.step} value={vals[f.id]} onChange={(e) => setVals((v) => ({ ...v, [f.id]: +e.target.value }))} className="mt-2 w-full accent-[rgb(var(--electric))]" />
            </label>
          ))}
        </div>
        <div className="rounded-2xl border hairline p-5">
          <div className="flex items-center gap-5">
            <svg viewBox="0 0 120 120" className="h-28 w-28 shrink-0" role="img" aria-label={`Failure probability ${Math.round(p * 100)} percent`}>
              <circle cx="60" cy="60" r="50" fill="none" strokeWidth="10" className="stroke-fg/10" />
              <motion.circle cx="60" cy="60" r="50" fill="none" strokeWidth="10" strokeLinecap="round" stroke="url(#gauge)" transform="rotate(-90 60 60)" strokeDasharray={314} animate={{ strokeDashoffset: 314 * (1 - p) }} transition={{ duration: 0.4 }} />
              <defs><linearGradient id="gauge"><stop offset="0" stopColor="rgb(var(--electric))" /><stop offset="1" stopColor="rgb(var(--violet))" /></linearGradient></defs>
              <text x="60" y="66" textAnchor="middle" className="fill-fg font-display text-[22px] font-semibold">{Math.round(p * 100)}%</text>
            </svg>
            <div><p className="text-xs uppercase tracking-[0.2em] text-muted">Failure probability</p><p className={`mt-1 font-display text-xl font-semibold ${level.c}`}>{level.t}</p></div>
          </div>
          <p className="mt-5 text-xs uppercase tracking-[0.2em] text-muted">Feature contributions</p>
          <ul className="mt-2 space-y-2">
            {contrib.map((c) => (
              <li key={c.id} className="text-xs">
                <span className="text-muted">{c.label.split(" (")[0]}</span>
                <div className="relative mt-1 h-2 rounded-full bg-fg/5">
                  <span className="absolute left-1/2 top-0 h-full w-px bg-fg/30" />
                  <motion.span className={`absolute top-0 h-full rounded-full ${c.c >= 0 ? "bg-violet" : "bg-electric"}`} animate={{ left: c.c >= 0 ? "50%" : `${50 - (Math.abs(c.c) / max) * 50}%`, width: `${(Math.abs(c.c) / max) * 50}%` }} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

const steps = [
  { t: "Ingest", d: "Collect documents (PDFs, scans, emails) and normalize them to text, with OCR where needed." },
  { t: "Chunk", d: "Split documents into clause-sized passages so retrieval returns focused context." },
  { t: "Embed", d: "Convert each passage into a vector with a sentence-transformer model." },
  { t: "Index", d: "Store vectors in a FAISS index for fast nearest-neighbour search." },
  { t: "Retrieve", d: "Embed the user's question and fetch the most similar passages." },
  { t: "Generate", d: "Prompt an LLM with the question plus retrieved context to extract or answer." },
  { t: "Validate", d: "Check output structure and confidence; route low-confidence results to human review." },
  { t: "Monitor", d: "Track accuracy, latency and cost KPIs on dashboards; feed errors back into improvements." },
];

function Workflow() {
  const [active, setActive] = useState(0);
  const [running, setRunning] = useState(false);
  async function run() {
    if (running) return;
    setRunning(true);
    for (let i = 0; i < steps.length; i++) { setActive(i); await new Promise((r) => setTimeout(r, 650)); }
    setRunning(false);
  }
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="font-display text-xl font-semibold text-fg">How a production RAG pipeline flows</h3>
        <Badge>Visualization · generalized, no proprietary details</Badge>
      </div>
      <p className="mt-2 text-sm text-muted">The general architecture behind document intelligence systems like the ones on this site. Select a stage, or run the pipeline.</p>
      <ol className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-8">
        {steps.map((s, i) => (
          <li key={s.t} className="relative">
            <button onClick={() => setActive(i)} aria-pressed={active === i}
              className={`focus-ring w-full rounded-2xl border px-3 py-4 text-center text-sm transition ${active === i ? "border-electric bg-electric/15 text-fg shadow-[0_0_24px_rgb(var(--electric)/0.35)]" : i < active ? "border-electric/30 text-fg/80" : "hairline text-muted hover:text-fg"}`}>
              <span className="block font-mono text-[0.65rem] text-electric">{String(i + 1).padStart(2, "0")}</span>{s.t}
            </button>
          </li>
        ))}
      </ol>
      <div className="mt-2 h-1 overflow-hidden rounded-full bg-fg/10"><motion.div className="h-full bg-gradient-to-r from-electric to-violet" animate={{ width: `${((active + 1) / steps.length) * 100}%` }} /></div>
      <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <motion.p key={active} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm leading-relaxed text-fg" aria-live="polite"><span className="font-semibold text-electric">{steps[active].t}:</span> {steps[active].d}</motion.p>
        <button onClick={run} disabled={running} className="btn-primary shrink-0 disabled:opacity-60"><Play className="h-4 w-4" aria-hidden />{running ? "Running…" : "Run pipeline"}</button>
      </div>
      <p className="mt-6 text-xs text-muted">Sample corpus: {corpus.length} synthetic clauses written for this demo.</p>
    </div>
  );
}
