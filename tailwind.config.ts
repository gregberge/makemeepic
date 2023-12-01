import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "hero-gradient": "linear-gradient(180deg, #F0FCFF 0%, #2488EF 100%)",
      },
      fontFamily: {
        im: ["var(--font-im)"],
      },
    },
  },
  plugins: [],
};
export default config;
