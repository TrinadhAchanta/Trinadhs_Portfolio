/**
 * Free, on-device assistant. Answers are built only from src/content/site.ts,
 * so it can never claim anything the site doesn't already say.
 */
import { certifications, education, experience, profile, projects, skills, sports } from "@/content/site";

export type Answer = { text: string; link?: { label: string; href: string } };

type Intent = { id: string; keywords: string[]; answer: () => Answer; weight?: number };

const current = experience[0];
const list = (xs: string[]) => (xs.length <= 1 ? xs.join("") : `${xs.slice(0, -1).join(", ")} and ${xs[xs.length - 1]}`);
const role = (company: string) => experience.find((r) => r.company.toLowerCase().includes(company));
const roleAnswer = (company: string): Answer => {
  const r = role(company)!;
  const pts = r.highlights.slice(0, 3).map((h) => `• ${h.text}`).join("\n");
  return { text: `${r.title} at ${r.company} (${r.dates}${r.location ? `, ${r.location}` : ""}).\n${r.summary}\n\n${pts}`, link: { label: "See full experience", href: "#experience" } };
};
const edu = (id: string) => education.find((e) => e.id === id)!;
const eduAnswer = (id: string): Answer => {
  const e = edu(id);
  return { text: `${e.level}${e.field ? ` in ${e.field}` : ""} at ${e.institution}${e.dates ? ` (${e.dates})` : ""}${e.location ? `, ${e.location}` : ""}.\n${e.details.join(" ")}`, link: { label: "Open the education timeline", href: "#journey" } };
};

const intents: Intent[] = [
  { id: "current", keywords: ["current", "now", "currently", "today", "present", "job", "work", "working", "employer", "position", "role"], answer: () => roleAnswer(current.company.toLowerCase().split(" ")[0]) },
  { id: "cvs", keywords: ["cvs", "caremark", "underwriting", "root cause", "forecast"], answer: () => roleAnswer("cvs"), weight: 2 },
  { id: "verizon", keywords: ["verizon", "contract", "legal"], answer: () => roleAnswer("verizon"), weight: 2 },
  { id: "creditkarma", keywords: ["credit karma", "karma", "intern", "internship", "fintech"], answer: () => roleAnswer("credit karma"), weight: 2 },
  { id: "ford", keywords: ["ford", "vehicle", "automotive", "telemetry", "predictive maintenance"], answer: () => roleAnswer("ford"), weight: 2 },
  { id: "experience", keywords: ["experience", "career", "history", "companies", "worked", "years", "resume", "cv", "background"], answer: () => ({ text: `Career so far:\n${experience.map((r) => `• ${r.title}, ${r.company} (${r.dates})`).join("\n")}`, link: { label: "See experience", href: "#experience" } }) },
  { id: "phd", keywords: ["phd", "doctorate", "doctoral", "belhaven"], answer: () => eduAnswer("phd"), weight: 2 },
  { id: "masters", keywords: ["master", "masters", "ms ", "new england", "graduate", "gpa"], answer: () => eduAnswer("ms"), weight: 2 },
  { id: "bachelors", keywords: ["bachelor", "btech", "b.tech", "undergrad", "anna university", "capstone"], answer: () => eduAnswer("btech"), weight: 2 },
  { id: "school", keywords: ["school", "10th", "intermediate", "bhashyam", "mpc", "sri talent", "childhood", "12th"], answer: () => ({ text: `${edu("school").institution}: ${edu("school").level}. Then ${edu("intermediate").institution}: ${edu("intermediate").level}, ${edu("intermediate").field}.`, link: { label: "Open the education timeline", href: "#journey" } }), weight: 2 },
  { id: "education", keywords: ["education", "study", "studied", "degree", "university", "college", "qualification"], answer: () => ({ text: `Education journey:\n${[...education].reverse().map((e) => `• ${e.level}${e.field ? `, ${e.field}` : ""}: ${e.institution}${e.dates ? ` (${e.dates})` : ""}`).join("\n")}`, link: { label: "From the Classroom to the Cloud", href: "#journey" } }) },
  { id: "genai", keywords: ["llm", "genai", "generative", "gpt", "rag", "retrieval", "prompt", "langchain", "embedding", "semantic search", "vector", "faiss", "ai"], answer: () => ({ text: `Generative AI work includes a production LLM pipeline (GPT-4 and Claude) for clause identification and summarization, RAG-based contract extraction at 92% accuracy, and FAISS semantic search over 500K+ documents. Skills: ${list(skills.find((s) => s.id === "genai")!.items)}.`, link: { label: "See projects", href: "#projects" } }) },
  { id: "skills", keywords: ["skill", "skills", "tech", "stack", "tools", "python", "sql", "language", "aws", "cloud", "pytorch", "tensorflow", "know"], answer: () => ({ text: `Skills listed on the resume, by area:\n${skills.slice(0, 6).map((g) => `• ${g.title}: ${g.items.slice(0, 5).join(", ")}`).join("\n")}`, link: { label: "See all skills", href: "#skills" } }) },
  { id: "projects", keywords: ["project", "projects", "built", "build", "portfolio", "achievement", "impact"], answer: () => ({ text: `Selected projects:\n${projects.map((p) => `• ${p.name}: ${p.impact[0]}`).join("\n")}`, link: { label: "Explore projects", href: "#projects" } }) },
  { id: "certs", keywords: ["certification", "certifications", "certificate", "certified", "credential"], answer: () => ({ text: `${certifications.some((c) => c.status === "earned") ? "Certifications:" : "Certifications in progress:"}\n${certifications.map((c) => `• ${c.title} (${c.issuer})${c.status === "earned" ? "" : " · in progress"}`).join("\n")}`, link: { label: "See credentials", href: "#certifications" } }), weight: 2 },
  { id: "championship", keywords: ["championship", "trophy", "won", "win", "title", "2026", "champion"], answer: () => ({ text: `${sports.championship.headline}. ${sports.championship.achievement}\n\nIn Trinadha's words: "${sports.championship.story}"`, link: { label: "See the championship", href: "#sports" } }), weight: 2 },
  { id: "cricket", keywords: ["cricket", "hurricanes", "captain", "club", "batting", "bowling", "spin", "spinner", "wicket", "wickets", "bowler"], answer: () => ({ text: `In Trinadha's words: "${sports.cricket.description}"\n\nTrinadha bowls ${sports.cricket.bowling.toLowerCase()} and is the Hurricanes' leading wicket-taker. As ${sports.cricket.role.toLowerCase()} of the ${sports.cricket.club}, responsibilities include ${list(sports.cricket.responsibilities.slice(3).map((s) => s.toLowerCase()))}.`, link: { label: "Sports & leadership", href: "#sports" } }), weight: 2 },
  { id: "basketball", keywords: ["basketball", "court"], answer: () => ({ text: `In Trinadha's words: "${sports.basketball.description}"`, link: { label: "Sports & leadership", href: "#sports" } }), weight: 2 },
  { id: "sports", keywords: ["sport", "sports", "hobby", "hobbies", "outside work", "free time", "play"], answer: () => ({ text: `Two sports have shaped Trinadha: university basketball in India and club cricket in Massachusetts, where Trinadha captains the Hurricanes and won the 2026 championship.`, link: { label: "Beyond the Code", href: "#sports" } }) },
  { id: "leadership", keywords: ["leadership", "lead", "leader", "team", "teamwork", "manage"], answer: () => ({ text: "Leadership shows up on and off the field: captaining the Hurricanes (match strategy, player coordination, decisions under pressure) and, at work, owning accuracy and data quality while explaining results to executives, engineers and analysts.", link: { label: "Leadership philosophy", href: "#leadership" } }) },
  { id: "contact", keywords: ["contact", "email", "reach", "hire", "hiring", "connect", "linkedin", "github", "code", "repo", "message", "touch", "get in touch", "available", "opportunity", "recruit"], answer: () => ({ text: `The best way to reach Trinadha is email at ${profile.email} or LinkedIn. Code is on GitHub: ${profile.github ?? ""}. You can also use the contact form on this page.`, link: { label: "Go to contact", href: "#contact" } }) },
  { id: "location", keywords: ["where", "location", "live", "based", "city", "relocate"], answer: () => ({ text: `Trinadha is based in ${profile.location}.`, link: { label: "Contact", href: "#contact" } }) },
  { id: "greet", keywords: ["hi", "hello", "hey", "who are you", "who is", "about him", "about trinadha", "introduce", "tell me about"], answer: () => ({ text: `${profile.name} is a ${current.title} at ${current.company}, based in ${profile.location}. ${profile.intro.split(". ").slice(0, 2).join(". ")}.`, link: { label: "Read the full story", href: "#about" } }) },
];

export const suggestions = ["What is Trinadha doing now?", "Generative AI experience?", "Education journey", "Tell me about the 2026 championship", "How can I get in touch?"];

function norm(s: string) {
  return ` ${s.toLowerCase().replace(/[^a-z0-9.+# ]/g, " ").replace(/\s+/g, " ")} `;
}

export function ask(question: string): Answer {
  const q = norm(question);
  let best: { score: number; intent?: Intent } = { score: 0 };
  intents.forEach((it) => {
    let score = 0;
    for (const k of it.keywords) {
      const key = ` ${k.trim()} `;
      if (q.includes(key)) score += k.length > 4 ? 3 : 2;
      else if (k.length > 4 && q.includes(k.trim())) score += 1;
    }
    score *= it.weight ?? 1;
    if (score > best.score) best = { score, intent: it };
  });
  if (!best.intent) {
    return { text: `I can only answer from what's on this site, and I don't have that. You could ask about experience, education, skills, projects, cricket or basketball, or email Trinadha directly at ${profile.email}.`, link: { label: "Contact", href: "#contact" } };
  }
  return best.intent.answer();
}
