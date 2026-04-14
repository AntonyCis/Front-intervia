/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "tertiary-fixed-dim": "#38debb",
        "surface-dim": "#d7dadf",
        "surface-tint": "#515f78",
        "on-primary-fixed-variant": "#39475f",
        "surface-container-low": "#f1f4f9",
        "primary-fixed-dim": "#b9c7e4",
        "error-container": "#ffdad6",
        "tertiary": "#000000",
        "tertiary-container": "#002019",
        "on-tertiary-fixed": "#002019",
        "on-background": "#181c20",
        "background": "#f7f9fe",
        "primary-container": "#0d1c32",
        "surface-container-highest": "#dfe3e8",
        "surface-bright": "#f7f9fe",
        "on-surface-variant": "#44474d",
        "tertiary-fixed": "#5ffbd6",
        "surface-container-high": "#e5e8ed",
        "secondary-fixed": "#68fadd",
        "primary": "#000000",
        "surface": "#f7f9fe",
        "inverse-primary": "#b9c7e4",
        "secondary-fixed-dim": "#44ddc1",
        "on-secondary-container": "#007261",
        "outline-variant": "#c5c6cd",
        "on-tertiary-container": "#00957b",
        "on-secondary-fixed-variant": "#005145",
        "on-primary": "#ffffff",
        "on-tertiary": "#ffffff",
        "on-secondary": "#ffffff",
        "surface-container": "#ebeef3",
        "on-surface": "#181c20",
        "inverse-surface": "#2d3135",
        "on-secondary-fixed": "#00201a",
        "on-primary-container": "#76849f",
        "on-error": "#ffffff",
        "outline": "#75777e",
        "inverse-on-surface": "#eef1f6",
        "surface-variant": "#dfe3e8",
        "on-tertiary-fixed-variant": "#005142",
        "surface-container-lowest": "#ffffff",
        "secondary-container": "#68fadd",
        "secondary": "#006b5c",
        "on-primary-fixed": "#0d1c32",
        "primary-fixed": "#d6e3ff",
        "on-error-container": "#93000a",
        "error": "#ba1a1a"
      },
      borderRadius: {
        DEFAULT: "0.125rem",
        lg: "0.25rem",
        xl: "0.5rem",
        full: "0.75rem"
      },
      fontFamily: {
        headline: ["Space Grotesk", "sans-serif"],
        body: ["Inter", "sans-serif"],
        label: ["Inter", "sans-serif"]
      }
    }
  },
  plugins: [],
};