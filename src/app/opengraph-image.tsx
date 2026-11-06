import { ImageResponse } from "next/og";
export const dynamic = "force-static";
export const alt = "Trinadha Kumar Achanta · Data Scientist (AI)";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OG() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: 80,
        background: "radial-gradient(circle at 85% 15%, rgba(169,178,172,0.55), transparent 50%), radial-gradient(circle at 10% 90%, rgba(154,107,63,0.18), transparent 45%)", backgroundColor: "#F4F3EF", color: "#1C1E1F" }}>
        <div style={{ fontSize: 22, letterSpacing: 8, color: "#2F4A3E" }}>PORTFOLIO</div>
        <div style={{ fontSize: 76, fontWeight: 700, marginTop: 24, letterSpacing: 2 }}>TRINADHA KUMAR ACHANTA</div>
        <div style={{ fontSize: 32, marginTop: 24, color: "#6B6F70" }}>Data Scientist (AI) · Generative AI & LLMs · Cricket Captain</div>
        <div style={{ display: "flex", marginTop: 48, height: 4, width: 220, background: "linear-gradient(90deg,#2F4A3E,#9A6B3F)" }} />
      </div>
    ),
    size,
  );
}
