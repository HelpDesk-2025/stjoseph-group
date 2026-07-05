const path = require("path");
const abs = (p) => path.join(__dirname, p).replace(/\\/g, "/");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    abs("app/**/*.{js,ts,jsx,tsx,mdx}"),
    abs("components/**/*.{js,ts,jsx,tsx,mdx}"),
    abs("lib/**/*.{js,ts,jsx,tsx,mdx}"),
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#040410",
          950: "#040410",
          900: "#0a0a1f",
          800: "#12122b",
          700: "#1E1E33",
          600: "#2a2a45",
        },
        amber: {
          DEFAULT: "#CC7B1D",
          light: "#E89F00",
          dark: "#B86E1A",
          deep: "#A35F17",
        },
        cyan: {
          DEFAULT: "#229BF1",
          light: "#93D4FF",
        },
        ink: {
          50: "#F6F6F6",
          100: "#DDDDDD",
          200: "#BABABA",
          300: "#989898",
          400: "#636363",
          500: "#4F515F",
        },
      },
      fontFamily: {
        sans: ["var(--font-poppins)", "Segoe UI", "sans-serif"],
        mono: ["var(--font-roboto-mono)", "Courier New", "monospace"],
      },
      borderRadius: {
        card: "9.072px",
      },
      boxShadow: {
        card: "0px 8px 24px rgba(0, 0, 0, 0.3)",
        soft: "0px 4px 16px rgba(0, 0, 0, 0.2)",
        float: "0px 12px 32px rgba(0, 0, 0, 0.4)",
        glow: "0 0 40px rgba(204, 123, 29, 0.25)",
      },
      maxWidth: {
        container: "1440px",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "pulse-slow": {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out both",
        marquee: "marquee 30s linear infinite",
        "pulse-slow": "pulse-slow 4s ease-in-out infinite",
        shimmer: "shimmer 6s linear infinite",
      },
    },
  },
  plugins: [],
};
