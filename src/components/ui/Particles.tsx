"use client";
import { useEffect, useRef } from "react";

/** Lightweight constellation canvas. Pauses off-screen, respects reduced motion, scales with DPR. */
export function Particles({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0, h = 0, raf = 0, running = true;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    type P = { x: number; y: number; vx: number; vy: number; r: number };
    let pts: P[] = [];
    const mouse = { x: -9999, y: -9999 };

    function resize() {
      const rect = canvas.getBoundingClientRect();
      w = rect.width; h = rect.height;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(90, Math.floor((w * h) / 16000));
      pts = Array.from({ length: count }, () => ({ x: Math.random() * w, y: Math.random() * h, vx: (Math.random() - 0.5) * 0.25, vy: (Math.random() - 0.5) * 0.25, r: Math.random() * 1.4 + 0.4 }));
    }
    function color(a: number) {
      const dark = document.documentElement.classList.contains("dark");
      return dark ? `rgba(150,190,255,${a})` : `rgba(37,70,160,${a})`;
    }
    function frame() {
      ctx.clearRect(0, 0, w, h);
      for (const p of pts) {
        if (!reduce) { p.x += p.vx; p.y += p.vy; }
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        const dx = p.x - mouse.x, dy = p.y - mouse.y, d = Math.hypot(dx, dy);
        if (d < 120 && !reduce) { p.x += dx / d * 0.6; p.y += dy / d * 0.6; }
      }
      for (let i = 0; i < pts.length; i++) {
        const a = pts[i];
        for (let j = i + 1; j < pts.length; j++) {
          const b = pts[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < 130) { ctx.strokeStyle = color(0.14 * (1 - d / 130)); ctx.lineWidth = 0.6; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke(); }
        }
        ctx.fillStyle = color(0.7); ctx.beginPath(); ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2); ctx.fill();
      }
      if (running && !reduce) raf = requestAnimationFrame(frame);
    }
    const onMove = (e: PointerEvent) => { const r = canvas.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; };
    const io = new IntersectionObserver(([e]) => { running = e.isIntersecting; cancelAnimationFrame(raf); if (running) frame(); });
    resize(); frame();
    io.observe(canvas);
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => { cancelAnimationFrame(raf); io.disconnect(); window.removeEventListener("resize", resize); window.removeEventListener("pointermove", onMove); };
  }, []);
  return <canvas ref={ref} aria-hidden className={`h-full w-full ${className}`} />;
}
