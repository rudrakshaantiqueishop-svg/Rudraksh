import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        cream: "#FEF9F2",
        "cream-warm": "#FFF5E6",
        dark: "#0B0404",
        "gray-text": "#44403C",
        accent: "#BB5A28",
        brown: "#552912",
      },
      fontFamily: {
        lato: ["var(--lato)", "Arial", "sans-serif"],
        prata: ["var(--prata)", "Georgia", "serif"],
      },
    },
  },
  plugins: [],
};

export default config;
