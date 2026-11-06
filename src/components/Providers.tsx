"use client";
import { MotionConfig } from "framer-motion";
import { createContext, useCallback, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light";
const ThemeCtx = createContext<{ theme: Theme; toggle: () => void }>({ theme: "dark", toggle: () => {} });
export const useTheme = () => useContext(ThemeCtx);
const RecruiterCtx = createContext<{ recruiter: boolean; setRecruiter: (v: boolean) => void }>({ recruiter: false, setRecruiter: () => {} });
export const useRecruiter = () => useContext(RecruiterCtx);

export function Providers({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");
  useEffect(() => {
    setTheme(document.documentElement.classList.contains("dark") ? "dark" : "light");
  }, []);
  const [recruiter, setRecruiterState] = useState(false);
  useEffect(() => {
    let on = false;
    try { on = new URLSearchParams(window.location.search).has("recruiter") || sessionStorage.getItem("recruiter") === "1"; } catch {}
    if (on) { setRecruiterState(true); document.documentElement.classList.add("recruiter"); }
  }, []);
  const setRecruiter = useCallback((v: boolean) => {
    setRecruiterState(v);
    document.documentElement.classList.toggle("recruiter", v);
    try { sessionStorage.setItem("recruiter", v ? "1" : "0"); } catch {}
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  const toggle = useCallback(() => {
    setTheme((t) => {
      const next: Theme = t === "dark" ? "light" : "dark";
      document.documentElement.classList.toggle("dark", next === "dark");
      try { localStorage.setItem("theme", next); } catch {}
      return next;
    });
  }, []);
  return (
    <ThemeCtx.Provider value={{ theme, toggle }}>
      <RecruiterCtx.Provider value={{ recruiter, setRecruiter }}>
        <MotionConfig reducedMotion="user" transition={{ ease: [0.22, 1, 0.36, 1] }}>{children}</MotionConfig>
      </RecruiterCtx.Provider>
    </ThemeCtx.Provider>
  );
}
