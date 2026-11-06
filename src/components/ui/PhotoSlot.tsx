import { Camera } from "lucide-react";

/** Elegant placeholder shown until a real photo is supplied. */
export function PhotoSlot({ label, className = "", src, alt, priority = false }: { label: string; className?: string; src?: string | null; alt?: string; priority?: boolean }) {
  if (src) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt ?? label} className={`h-full w-full object-cover ${className}`} loading={priority ? "eager" : "lazy"} fetchPriority={priority ? "high" : "auto"} decoding="async" />;
  }
  return (
    <div className={`relative flex h-full w-full flex-col items-center justify-center gap-3 overflow-hidden text-muted ${className}`}>
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgb(var(--electric)/0.18),transparent_55%),radial-gradient(circle_at_80%_90%,rgb(var(--violet)/0.18),transparent_55%)]" />
      <div aria-hidden className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgb(var(--line))_1px,transparent_1px),linear-gradient(90deg,rgb(var(--line))_1px,transparent_1px)] [background-size:28px_28px]" />
      <Camera className="relative h-6 w-6" aria-hidden />
      <span className="relative text-center text-xs uppercase tracking-[0.24em]">{label}</span>
      <span className="relative text-[0.65rem] opacity-70">Photo coming soon</span>
    </div>
  );
}
