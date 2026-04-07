import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "tertiary-fixed-dim": "#4edea3",
        "on-secondary-container": "#fffbff",
        "on-primary": "#ffffff",
        "primary": "#00685f",
        "inverse-primary": "#6bd8cb",
        "on-tertiary-fixed": "#002113",
        "on-tertiary": "#ffffff",
        "on-primary-fixed": "#00201d",
        "surface-dim": "#d2d9f4",
        "surface-container-highest": "#dae2fd",
        "secondary-fixed": "#e1e0ff",
        "secondary": "#4648d4",
        "on-secondary-fixed-variant": "#2f2ebe",
        "surface-bright": "#faf8ff",
        "primary-fixed": "#89f5e7",
        "error": "#ba1a1a",
        "tertiary-fixed": "#6ffbbe",
        "inverse-on-surface": "#eef0ff",
        "primary-fixed-dim": "#6bd8cb",
        "on-primary-fixed-variant": "#005049",
        "on-secondary-fixed": "#07006c",
        "surface-container-high": "#e2e7ff",
        "on-primary-container": "#f4fffc",
        "outline-variant": "#bcc9c6",
        "surface-variant": "#dae2fd",
        "tertiary-container": "#00855b",
        "on-error-container": "#93000a",
        "on-surface-variant": "#3d4947",
        "on-error": "#ffffff",
        "on-tertiary-fixed-variant": "#005236",
        "surface": "#faf8ff",
        "on-secondary": "#ffffff",
        "error-container": "#ffdad6",
        "surface-tint": "#006a61",
        "inverse-surface": "#283044",
        "primary-container": "#008378",
        "background": "#faf8ff",
        "tertiary": "#006947",
        "secondary-fixed-dim": "#c0c1ff",
        "surface-container": "#eaedff",
        "outline": "#6d7a77",
        "secondary-container": "#6063ee",
        "on-surface": "#131b2e",
        "surface-container-low": "#f2f3ff",
        "on-background": "#131b2e",
        "surface-container-lowest": "#ffffff",
        "on-tertiary-container": "#f5fff6"
      },
      fontFamily: {
        headline: ["Inter", "sans-serif"],
        body: ["Inter", "sans-serif"],
        label: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"]
      }
    },
  },
  plugins: [],
};

export default config;
