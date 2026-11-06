"use client";
import { useEffect, useRef } from "react";

/**
 * 3D neural-network field: nodes in a rotating volume, perspective-projected,
 * with depth-shaded synapses and signal pulses travelling along them.
 * Mouse tilts the network. Pauses off-screen; static frame under reduced motion.
 */
export function NeuralField({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0, h = 0, raf = 0, running = true, t = 0;
    type N = { x: number; y: number; z: number };
    type E = { a: number; b: number };
    type Pulse = { e: number; p: number; speed: number };
    let nodes: N[] = [];
    let edges: E[] = [];
    let pulses: Pulse[] = [];
    const tilt = { x: 0, y: 0, tx: 0, ty: 0 };

    function build() {
      const rect = canvas.getBoundingClientRect();
      w = rect.width; h = rect.height;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = w < 640 ? 55 : 110;
      nodes = Array.from({ length: count }, () => {
        // points in a flattened ellipsoid, denser toward the centre
        const u = Math.random() * Math.PI * 2, v = Math.acos(2 * Math.random() - 1), r = Math.cbrt(Math.random());
        return { x: r * Math.sin(v) * Math.cos(u) * 1.6, y: r * Math.sin(v) * Math.sin(u) * 0.9, z: r * Math.cos(v) };
      });
      edges = [];
      for (let i = 0; i < nodes.length; i++) {
        const d = nodes.map((n, j) => ({ j, d: Math.hypot(n.x - nodes[i].x, n.y - nodes[i].y, n.z - nodes[i].z) })).filter((o) => o.j !== i).sort((a, b) => a.d - b.d);
        for (const o of d.slice(0, 3)) if (o.d < 0.55 && !edges.some((e) => (e.a === o.j && e.b === i))) edges.push({ a: i, b: o.j });
      }
      pulses = Array.from({ length: Math.min(18, edges.length) }, () => ({ e: Math.floor(Math.random() * edges.length), p: Math.random(), speed: 0.004 + Math.random() * 0.008 }));
    }

    function palette() {
      const cs = getComputedStyle(document.documentElement);
      const rgb = (v: string) => cs.getPropertyValue(v).trim().split(/\s+/).map(Number);
      return { node: rgb("--electric"), line: rgb("--electric"), pulse: rgb("--violet") };
    }

    function frame() {
      const pal = palette();
      tilt.x += (tilt.tx - tilt.x) * 0.04; tilt.y += (tilt.ty - tilt.y) * 0.04;
      const ay = t * 0.0009 + tilt.x * 0.6, ax = 0.35 + tilt.y * 0.4;
      const cy = Math.cos(ay), sy = Math.sin(ay), cx = Math.cos(ax), sx = Math.sin(ax);
      const scale = Math.min(w, h * 1.6) * 0.42, fov = 3.2;
      const cxp = w * (w > 1024 ? 0.62 : 0.5), cyp = h * 0.48;
      const proj = nodes.map((n) => {
        const x1 = n.x * cy - n.z * sy, z1 = n.x * sy + n.z * cy;
        const y2 = n.y * cx - z1 * sx, z2 = n.y * sx + z1 * cx;
        const k = fov / (fov + z2);
        return { X: cxp + x1 * scale * k, Y: cyp + y2 * scale * k, z: z2, k };
      });
      ctx.clearRect(0, 0, w, h);
      for (const e of edges) {
        const a = proj[e.a], b = proj[e.b];
        const depth = 1 - ((a.z + b.z) / 2 + 1) / 2; // 0 far .. 1 near
        ctx.strokeStyle = `rgba(${pal.line.join(",")},${0.05 + depth * 0.22})`;
        ctx.lineWidth = 0.5 + depth * 0.7;
        ctx.beginPath(); ctx.moveTo(a.X, a.Y); ctx.lineTo(b.X, b.Y); ctx.stroke();
      }
      for (const p of pulses) {
        const e = edges[p.e]; if (!e) continue;
        const a = proj[e.a], b = proj[e.b];
        const x = a.X + (b.X - a.X) * p.p, y = a.Y + (b.Y - a.Y) * p.p;
        const g = ctx.createRadialGradient(x, y, 0, x, y, 6);
        g.addColorStop(0, `rgba(${pal.pulse.join(",")},0.9)`); g.addColorStop(1, `rgba(${pal.pulse.join(",")},0)`);
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, 6, 0, Math.PI * 2); ctx.fill();
        if (!reduce) { p.p += p.speed; if (p.p > 1) { p.p = 0; p.e = Math.floor(Math.random() * edges.length); } }
      }
      proj.map((p, i) => ({ p, i })).sort((a, b) => b.p.z - a.p.z).forEach(({ p }) => {
        const depth = 1 - (p.z + 1) / 2;
        ctx.fillStyle = `rgba(${pal.node.join(",")},${0.25 + depth * 0.7})`;
        ctx.beginPath(); ctx.arc(p.X, p.Y, 0.8 + depth * 2.2 * p.k, 0, Math.PI * 2); ctx.fill();
      });
      if (!reduce) t += 16;
      if (running && !reduce) raf = requestAnimationFrame(frame);
    }

    const onMove = (e: PointerEvent) => { tilt.tx = (e.clientX / window.innerWidth - 0.5) * 2; tilt.ty = (e.clientY / window.innerHeight - 0.5) * 2; };
    const io = new IntersectionObserver(([en]) => { running = en.isIntersecting; cancelAnimationFrame(raf); if (running) frame(); });
    const onResize = () => { build(); frame(); };
    build(); frame();
    io.observe(canvas);
    window.addEventListener("resize", onResize);
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => { cancelAnimationFrame(raf); io.disconnect(); window.removeEventListener("resize", onResize); window.removeEventListener("pointermove", onMove); };
  }, []);

  return <canvas ref={ref} aria-hidden className={`h-full w-full ${className}`} />;
}
