/**
 * Tiny in-browser NLP engine for the AI Lab demos.
 * TF-IDF + a small synonym map stands in for transformer embeddings; answers are extractive (no LLM).
 */

export type Doc = { id: string; title: string; text: string };

/** Synthetic contract clauses written for this demo. Not real contracts. */
export const corpus: Doc[] = [
  { id: "C1", title: "Term & Renewal", text: "This Agreement starts on the Effective Date and continues for an initial term of 24 months. It renews automatically for successive 12-month periods unless either party gives written notice of non-renewal at least 60 days before the end of the current term." },
  { id: "C2", title: "Termination for Convenience", text: "Either party may terminate this Agreement for convenience with 90 days' written notice. Upon termination, the Customer shall pay all fees for services delivered up to the termination date." },
  { id: "C3", title: "Payment Terms", text: "The Supplier will invoice the Customer monthly in arrears. Invoices are due within 45 days of receipt. Late payments accrue interest at 1% per month on the outstanding balance." },
  { id: "C4", title: "Confidentiality", text: "Each party shall keep the other party's Confidential Information secret and use it only to perform this Agreement. These obligations survive for five years after the Agreement ends." },
  { id: "C5", title: "Limitation of Liability", text: "Neither party is liable for indirect or consequential damages. Each party's total liability under this Agreement is capped at the fees paid in the 12 months before the claim arose." },
  { id: "C6", title: "Data Protection", text: "The Supplier shall process personal data only on documented instructions from the Customer, apply appropriate security measures, and notify the Customer of any personal data breach within 72 hours." },
  { id: "C7", title: "Service Levels", text: "The Supplier guarantees 99.9% monthly availability. If availability falls below this level, the Customer receives a service credit of 5% of the monthly fee for each 0.1% shortfall, up to 25%." },
  { id: "C8", title: "Governing Law", text: "This Agreement is governed by the laws of the Commonwealth of Massachusetts. Disputes will be resolved by the state and federal courts located in Boston." },
  { id: "C9", title: "Assignment", text: "Neither party may assign this Agreement without the prior written consent of the other party, except to an affiliate or a successor in a merger or acquisition." },
  { id: "C10", title: "Force Majeure", text: "Neither party is responsible for delays caused by events beyond its reasonable control, such as natural disasters, war or widespread network outages, provided it notifies the other party promptly." },
];

const STOP = new Set("a an the and or of to in on for by with is are be this that it its at as from any all each either other shall will may can up than such only into within before after under per not no if do does what when how who which i me my you your their them there these those our we".split(" "));

const SYN: Record<string, string> = {
  cancel: "terminat", cancellation: "terminat", end: "terminat", exit: "terminat", quit: "terminat",
  pay: "payment", paid: "payment", invoice: "payment", invoices: "payment", bill: "payment", billing: "payment", fee: "payment", fees: "payment", money: "payment",
  secret: "confidential", nda: "confidential", private: "confidential",
  uptime: "availability", sla: "availability", downtime: "availability",
  breach: "breach", leak: "breach", privacy: "personal", gdpr: "personal",
  law: "governing", jurisdiction: "governing", court: "courts", lawsuit: "disputes",
  renew: "renew", renewal: "renew", extend: "renew", duration: "term", length: "term", long: "term",
  damages: "liability", liable: "liability", cap: "capped", sell: "assign", transfer: "assign", merger: "assign",
  disaster: "force", outage: "outages", late: "late", interest: "interest",
};

function stem(w: string) {
  if (SYN[w]) return SYN[w];
  const s = w.replace(/(ations?|ation|ing|ed|es|s)$/, "");
  if (s.startsWith("terminat")) return "terminat";
  if (s.startsWith("renew")) return "renew";
  if (s.startsWith("assign")) return "assign";
  if (s.startsWith("confiden")) return "confidential";
  if (s.startsWith("availab")) return "availability";
  if (s.startsWith("liab")) return "liability";
  return SYN[s] ?? s;
}

export function tokens(text: string) {
  return (text.toLowerCase().match(/[a-z0-9%.]+/g) ?? []).map((w) => w.replace(/\.$/, "")).filter((w) => w && !STOP.has(w)).map(stem);
}

type Vec = Map<string, number>;
const docTokens = corpus.map((d) => tokens(`${d.title} ${d.text}`));
const df = new Map<string, number>();
docTokens.forEach((ts) => new Set(ts).forEach((t) => df.set(t, (df.get(t) ?? 0) + 1)));
const idf = (t: string) => Math.log((corpus.length + 1) / ((df.get(t) ?? 0) + 1)) + 1;

function vec(ts: string[]): Vec {
  const v: Vec = new Map();
  ts.forEach((t) => v.set(t, (v.get(t) ?? 0) + 1));
  v.forEach((c, t) => v.set(t, (1 + Math.log(c)) * idf(t)));
  return v;
}
function cos(a: Vec, b: Vec) {
  let dot = 0, na = 0, nb = 0;
  a.forEach((x, t) => { na += x * x; const y = b.get(t); if (y) dot += x * y; });
  b.forEach((y) => (nb += y * y));
  return na && nb ? dot / Math.sqrt(na * nb) : 0;
}
const docVecs = docTokens.map(vec);

export function search(query: string, k = 5) {
  const qv = vec(tokens(query));
  const qset = new Set(qv.keys());
  return corpus
    .map((d, i) => ({ doc: d, score: cos(qv, docVecs[i]), matched: [...new Set(docTokens[i])].filter((t) => qset.has(t)) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, k);
}

export function sentences(text: string) {
  return text.replace(/\s+/g, " ").match(/[^.!?]+[.!?]+(\s|$)|[^.!?]+$/g)?.map((s) => s.trim()).filter(Boolean) ?? [];
}

/** Retrieve, then pick the sentence in the top passages that best matches the question. */
export function answer(question: string) {
  const hits = search(question, 3).filter((h) => h.score > 0.05);
  if (!hits.length) return { hits: [], answer: null as null | { text: string; source: string } };
  const qv = vec(tokens(question));
  let best = { text: "", source: "", score: -1 };
  hits.forEach((h, rank) => sentences(h.doc.text).forEach((s) => {
    const sc = cos(qv, vec(tokens(s))) * (1 - rank * 0.15);
    if (sc > best.score) best = { text: s, source: h.doc.id, score: sc };
  }));
  return { hits, answer: { text: best.text, source: best.source } };
}

/** Extractive summary: score sentences by average TF of their content words; keep original order. */
export function summarize(text: string, n: number) {
  const ss = sentences(text);
  const tf = new Map<string, number>();
  ss.forEach((s) => tokens(s).forEach((t) => tf.set(t, (tf.get(t) ?? 0) + 1)));
  const scored = ss.map((s, i) => {
    const ts = tokens(s);
    const score = ts.length ? ts.reduce((a, t) => a + (tf.get(t) ?? 0), 0) / Math.sqrt(ts.length) : 0;
    return { s, i, score: score + (i === 0 ? 0.5 : 0) };
  });
  const keep = new Set([...scored].sort((a, b) => b.score - a.score).slice(0, n).map((x) => x.i));
  return { summary: ss.filter((_, i) => keep.has(i)), total: ss.length };
}

/** Illustrative logistic model with hand-set weights over synthetic features. */
export const features = [
  { id: "mileage", label: "Mileage (thousand miles)", min: 0, max: 200, step: 5, value: 80, weight: 0.018, center: 80 },
  { id: "temp", label: "Engine temperature deviation (°C)", min: 0, max: 30, step: 1, value: 6, weight: 0.11, center: 6 },
  { id: "vibration", label: "Vibration index", min: 0, max: 10, step: 0.5, value: 3, weight: 0.35, center: 3 },
  { id: "service", label: "Days since last service", min: 0, max: 720, step: 15, value: 180, weight: 0.0035, center: 180 },
  { id: "codes", label: "Active fault codes", min: 0, max: 8, step: 1, value: 1, weight: 0.45, center: 1 },
] as const;
export const BIAS = -1.6;

export function predict(values: Record<string, number>) {
  const contrib = features.map((f) => ({ id: f.id, label: f.label, c: f.weight * (values[f.id] - f.center) }));
  const z = BIAS + contrib.reduce((a, b) => a + b.c, 0);
  return { p: 1 / (1 + Math.exp(-z)), contrib };
}
