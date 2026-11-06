import { Providers } from "@/components/Providers";
import { Nav } from "@/components/Nav";
import { SectionDots } from "@/components/SectionDots";
import { Cursor } from "@/components/Cursor";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Journey } from "@/components/sections/Journey";
import { Experience } from "@/components/sections/Experience";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { AiLab } from "@/components/sections/AiLab";
import { Testimonials } from "@/components/sections/Testimonials";
import { Certifications } from "@/components/sections/Certifications";
import { Sports } from "@/components/sections/Sports";
import { Leadership } from "@/components/sections/Leadership";
import { Achievements } from "@/components/sections/Achievements";
import { Gallery } from "@/components/sections/Gallery";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/Footer";
import { ChatWidget } from "@/components/chat/ChatWidget";
import { CommandPalette } from "@/components/CommandPalette";
import { RecruiterBrief } from "@/components/sections/RecruiterBrief";

export default function Page() {
  return (
    <Providers>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-electric focus:px-4 focus:py-2 focus:text-white">
        Skip to content
      </a>
      <Cursor />
      <Nav />
      <SectionDots />
      <main id="main">
        <RecruiterBrief />
        <Hero />
        <About />
        <Journey />
        <Experience />
        <Skills />
        <Projects />
        <AiLab />
        <Certifications />
        <Sports />
        <Leadership />
        <Achievements />
        <Gallery />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <ChatWidget />
      <CommandPalette />
    </Providers>
  );
}
