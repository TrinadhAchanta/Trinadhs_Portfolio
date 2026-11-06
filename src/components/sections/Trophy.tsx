"use client";
import { motion } from "framer-motion";

export function Trophy() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[18rem]">
      <div aria-hidden className="absolute inset-[15%] rounded-full bg-gold/30 blur-3xl" />
      <motion.div aria-hidden className="absolute inset-0 rounded-full border border-gold/20" animate={{ rotate: 360 }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }}>
        <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold" />
      </motion.div>
      <motion.div aria-hidden className="absolute inset-[8%] rounded-full border border-dashed border-gold/15" animate={{ rotate: -360 }} transition={{ duration: 60, repeat: Infinity, ease: "linear" }} />
      <motion.svg viewBox="0 0 200 200" className="relative h-full w-full drop-shadow-[0_10px_40px_rgba(232,190,92,0.35)]" role="img" aria-label="Championship trophy illustration"
        initial={{ y: 10 }} animate={{ y: [0, -6, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}>
        <defs>
          <linearGradient id="gold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#fff2c4" /><stop offset="0.35" stopColor="#e8be5c" /><stop offset="0.7" stopColor="#a8761c" /><stop offset="1" stopColor="#f3d68a" />
          </linearGradient>
          <linearGradient id="shine" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#fff" stopOpacity="0" /><stop offset="0.5" stopColor="#fff" stopOpacity="0.55" /><stop offset="1" stopColor="#fff" stopOpacity="0" /></linearGradient>
        </defs>
        <path d="M62 46h76v22c0 26-17 46-38 46S62 94 62 68V46Z" fill="url(#gold)" />
        <path d="M62 54H44c0 22 10 34 24 36M138 54h18c0 22-10 34-24 36" fill="none" stroke="url(#gold)" strokeWidth="7" strokeLinecap="round" />
        <rect x="92" y="112" width="16" height="22" fill="url(#gold)" />
        <path d="M76 134h48l6 16H70l6-16Z" fill="url(#gold)" />
        <rect x="64" y="150" width="72" height="14" rx="3" fill="url(#gold)" />
        <path d="M100 62l4.2 8.6 9.5 1.4-6.9 6.7 1.6 9.4-8.4-4.4-8.4 4.4 1.6-9.4-6.9-6.7 9.5-1.4L100 62Z" fill="#fff8e1" opacity="0.9" />
        <rect x="70" y="48" width="10" height="56" rx="5" fill="url(#shine)" opacity="0.6" />
        <text x="100" y="160" textAnchor="middle" fontSize="9" fontWeight="700" fill="#4a3208" letterSpacing="2">2026</text>
      </motion.svg>
    </div>
  );
}
