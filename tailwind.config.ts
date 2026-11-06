import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "rgb(var(--ink) / <alpha-value>)",
        surface: "rgb(var(--surface) / <alpha-value>)",
        fg: "rgb(var(--fg) / <alpha-value>)",
        muted: "rgb(var(--muted) / <alpha-value>)",
        line: "rgb(var(--line) / <alpha-value>)",
        electric: "rgb(var(--electric) / <alpha-value>)",
        violet: "rgb(var(--violet) / <alpha-value>)",
        gold: "rgb(var(--gold) / <alpha-value>)",
      },
      fontFamily: {
        sans: ["'Inter Variable'", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["'Sora Variable'", "'Inter Variable'", "ui-sans-serif", "sans-serif"],
      },
      maxWidth: { content: "76rem" },
      keyframes: {
        drift: {
          "0%,100%": { transform: "translate3d(0,0,0) scale(1)" },
          "50%": { transform: "translate3d(4%,-6%,0) scale(1.08)" },
        },
        sheen: {
          "0%": { backgroundPosition: "200% center" },
          "100%": { backgroundPosition: "-200% center" },
        },
      },
      animation: {
        drift: "drift 18s ease-in-out infinite",
        "drift-slow": "drift 26s ease-in-out infinite reverse",
        sheen: "sheen 8s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
