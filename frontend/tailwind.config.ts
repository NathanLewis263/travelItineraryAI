import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        midnight: {
          900: "#0f172a", // Slate 900
          800: "#1e293b", // Slate 800
          700: "#334155", // Slate 700
          600: "#475569", // Slate 600
        },
        neon: {
          cyan: "#06b6d4", // Cyan 500
          purple: "#8b5cf6", // Violet 500
          pink: "#ec4899", // Pink 500
        },
      },
      fontFamily: {
        sans: ["var(--font-outfit)"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};
export default config;
