"use client";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

/** Soft glowing cursor follower on fine-pointer desktops. The native cursor stays visible for accessibility. */
export function Cursor() {
  const reduce = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [hover, setHover] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40 });
  const sy = useSpring(y, { stiffness: 500, damping: 40 });

  useEffect(() => {
    if (reduce || !window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);
    const move = (e: PointerEvent) => {
      x.set(e.clientX); y.set(e.clientY);
      const t = e.target as HTMLElement | null;
      setHover(!!t?.closest("a,button,[role=button],input,textarea,select"));
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [reduce, x, y]);

  if (!enabled) return null;
  return (
    <>
      <motion.div aria-hidden className="pointer-events-none fixed left-0 top-0 z-[70] rounded-full border border-electric/60"
        style={{ x: sx, y: sy, translateX: "-50%", translateY: "-50%" }}
        animate={{ width: hover ? 44 : 26, height: hover ? 44 : 26, opacity: 1, backgroundColor: hover ? "rgba(47,74,62,0.10)" : "rgba(47,74,62,0)" }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }} />
      <motion.div aria-hidden className="pointer-events-none fixed left-0 top-0 z-[1] h-[420px] w-[420px] rounded-full opacity-60"
        style={{ x: sx, y: sy, translateX: "-50%", translateY: "-50%", background: "radial-gradient(circle, rgb(var(--electric) / 0.07), transparent 60%)" }} />
    </>
  );
}
