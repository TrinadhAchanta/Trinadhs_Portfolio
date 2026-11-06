import type { Metadata, Viewport } from "next";
import "./globals.css";
import { profile } from "@/content/site";

const title = `${profile.name} · Data Scientist (AI)`;
const description =
  "Portfolio of Trinadha Kumar Achanta: production NLP, LLM, RAG and semantic-search systems, an education journey from India to the United States, university basketball, and captaincy of the Hurricanes cricket club.";

export const metadata: Metadata = {
  metadataBase: new URL(profile.siteUrl),
  title: { default: title, template: `%s · ${profile.name}` },
  description,
  keywords: ["Trinadha Kumar Achanta", "Data Scientist AI", "Generative AI", "LLM", "RAG", "NLP", "Data Scientist", "Massachusetts", "Hurricanes cricket"],
  authors: [{ name: profile.name }],
  alternates: { canonical: "/" },
  openGraph: { type: "profile", url: "/", title, description, siteName: profile.name, locale: "en_US" },
  twitter: { card: "summary_large_image", title, description },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#161817" },
    { media: "(prefers-color-scheme: light)", color: "#F4F3EF" },
  ],
  width: "device-width",
  initialScale: 1,
};

const themeScript = `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'){document.documentElement.classList.add('dark')}else{document.documentElement.classList.remove('dark')}}catch(e){}})();`;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: "Data Scientist (AI)",
  url: profile.siteUrl,
  image: `${profile.siteUrl}${profile.portrait ?? ""}`,
  email: `mailto:${profile.email}`,
  sameAs: [profile.linkedin, profile.github].filter(Boolean),
  worksFor: { "@type": "Organization", name: "CVS Caremark" },
  alumniOf: [
    { "@type": "CollegeOrUniversity", name: "New England College" },
    { "@type": "CollegeOrUniversity", name: "Anna University" },
  ],
  knowsAbout: ["Machine Learning", "Natural Language Processing", "Large Language Models", "Retrieval-Augmented Generation", "Semantic Search", "Python", "SQL", "AWS", "Statistics", "Cricket"],
  address: { "@type": "PostalAddress", addressRegion: "MA", addressCountry: "US" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className="grain font-sans">{children}</body>
    </html>
  );
}
