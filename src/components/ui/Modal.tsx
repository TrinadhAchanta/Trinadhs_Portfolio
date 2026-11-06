"use client";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useRef } from "react";

/** Accessible modal: Escape closes, focus moves in and is restored, background scroll locked. */
export function Modal({ open, onClose, label, children, wide = false }: { open: boolean; onClose: () => void; label: string; children: React.ReactNode; wide?: boolean }) {
  const panel = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const prev = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => panel.current?.querySelector<HTMLElement>("button,[href]")?.focus(), 50);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab" && panel.current) {
        const f = panel.current.querySelectorAll<HTMLElement>("button,[href],input,textarea,[tabindex]:not([tabindex='-1'])");
        if (!f.length) return;
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => { clearTimeout(t); document.body.style.overflow = ""; window.removeEventListener("keydown", onKey); prev?.focus(); };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-[80] flex items-end justify-center bg-black/70 p-0 backdrop-blur-md sm:items-center sm:p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
          <motion.div ref={panel} role="dialog" aria-modal="true" aria-label={label} onClick={(e) => e.stopPropagation()}
            className={`glass relative max-h-[92svh] w-full overflow-y-auto rounded-t-3xl !bg-surface/95 sm:rounded-3xl ${wide ? "max-w-5xl" : "max-w-3xl"}`}
            initial={{ y: 40, opacity: 0, scale: 0.98 }} animate={{ y: 0, opacity: 1, scale: 1 }} exit={{ y: 30, opacity: 0 }} transition={{ duration: 0.4 }}>
            <button onClick={onClose} aria-label="Close" className="focus-ring absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-fg/5 text-fg hover:bg-fg/10"><X className="h-5 w-5" /></button>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
