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
        background: "var(--background)",
        foreground: "var(--foreground)",
        "trust-navy": "#1E3A8A", // Primary: Trust Navy
        "success-green": "#10B981", // Secondary: Success Green
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Switch to standard Inter
      },
    },
  },
  plugins: [],
};
export default config;
