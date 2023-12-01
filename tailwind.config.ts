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
      keyframes: {
        floatY: {
          "0%": {
            transform: "translateY(0)",
          },
          "50%": {
            transform: "translateY(20px)",
          },
          "100%": {
            transform: "translateY(0)",
          },
        },
        floatX: {
          "0%": {
            transform: "translateY(0)",
          },
          "50%": {
            transform: "translateX(40px)",
          },
          "100%": {
            transform: "translateY(0)",
          },
        },
        floatXR: {
          "0%": {
            transform: "translateY(0)",
          },
          "50%": {
            transform: "translateX(-40px)",
          },
          "100%": {
            transform: "translateY(0)",
          },
        },
      },
      animation: {
        floatY: "floatY 6s ease-in-out infinite",
        floatX: "floatX 8s ease-in-out infinite",
        floatXR: "floatXR 8s ease-in-out infinite",
      },
      boxShadow: {
        glow: `0 0 10px 2px #ffffff,  /* inner white */
        0 0 10px 6px #fef08a, /* middle magenta */
        0 0 20px 8px #0ff0ffE6`,
      },
    },
  },
  plugins: [],
};
export default config;
