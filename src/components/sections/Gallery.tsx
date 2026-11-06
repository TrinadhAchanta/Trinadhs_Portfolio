"use client";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Expand } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { gallery, galleryCategories, type GalleryCategory } from "@/content/site";
import { Modal } from "../ui/Modal";
import { PhotoSlot } from "../ui/PhotoSlot";
import { SectionHeading } from "../ui/SectionHeading";

export function Gallery() {
  const [cat, setCat] = useState<"All" | GalleryCategory>("All");
  const photos = gallery.filter((g) => g.src);
  const cats = galleryCategories.filter((c) => photos.some((g) => g.category === c));
  const items = cat === "All" ? photos : photos.filter((g) => g.category === cat);
  const real = items;
  const [idx, setIdx] = useState<number | null>(null);
  const close = useCallback(() => setIdx(null), []);
  const step = useCallback((d: number) => setIdx((i) => (i === null ? i : (i + d + real.length) % real.length)), [real.length]);

  useEffect(() => {
    if (idx === null) return;
    const k = (e: KeyboardEvent) => { if (e.key === "ArrowRight") step(1); if (e.key === "ArrowLeft") step(-1); };
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [idx, step]);

  return (
    <section id="gallery" className="section" data-recruiter="hide">
      <SectionHeading eyebrow="Gallery" title="Moments" lead="Moments from the classroom, the court and the cricket field." />
      <div role="group" aria-label="Filter gallery" className="mt-10 flex flex-wrap gap-2">
        {(["All", ...cats] as const).map((c) => (
          <button key={c} onClick={() => setCat(c)} aria-pressed={cat === c} className={`focus-ring rounded-full px-4 py-2 text-sm transition ${cat === c ? "bg-fg text-ink" : "glass text-muted hover:text-fg"}`}>{c}</button>
        ))}
      </div>
      <motion.ul layout className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {items.map((g, i) => (
            <motion.li layout key={g.caption + i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className={`overflow-hidden rounded-2xl border hairline`}>
              {g.src ? (
                <button onClick={() => setIdx(real.indexOf(g))} className="focus-ring group relative block aspect-square h-full w-full" aria-label={`Open photo: ${g.caption}`}>
                  <PhotoSlot label={g.caption} src={g.src} className="transition duration-700 group-hover:scale-105" />
                  <span className="absolute inset-0 flex items-end justify-between bg-gradient-to-t from-black/70 via-transparent p-4 text-left text-sm text-white opacity-0 transition group-hover:opacity-100 group-focus-visible:opacity-100">
                    <span>{g.caption}<span className="block text-xs text-white/70">{g.category}</span></span><Expand className="h-4 w-4" aria-hidden />
                  </span>
                </button>
              ) : (
                <div className="glass aspect-square h-full w-full"><PhotoSlot label={g.caption} /></div>
              )}
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>

      <Modal open={idx !== null} onClose={close} label="Photo viewer" wide>
        {idx !== null && real[idx] && (
          <figure className="p-4 sm:p-6">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={real[idx].src!} alt={real[idx].caption} className="mx-auto max-h-[70svh] w-auto rounded-2xl object-contain" />
            <figcaption className="mt-4 flex items-center justify-between gap-4 text-sm text-muted">
              <span><span className="text-fg">{real[idx].caption}</span> · {real[idx].category}</span>
              {real.length > 1 && (
                <span className="flex gap-2">
                  <button onClick={() => step(-1)} aria-label="Previous photo" className="focus-ring grid h-10 w-10 place-items-center rounded-full bg-fg/5 hover:bg-fg/10"><ChevronLeft className="h-5 w-5" /></button>
                  <button onClick={() => step(1)} aria-label="Next photo" className="focus-ring grid h-10 w-10 place-items-center rounded-full bg-fg/5 hover:bg-fg/10"><ChevronRight className="h-5 w-5" /></button>
                </span>
              )}
            </figcaption>
          </figure>
        )}
      </Modal>
    </section>
  );
}
