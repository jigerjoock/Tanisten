import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        base: {
          900: "#08111F",
          800: "#0B1220",
          700: "#111827",
          600: "#1E293B"
        },
        accent: {
          500: "#00A99D",
          400: "#2DD4BF",
          300: "#99F6E4"
        },
        engineering: {
          500: "#4DA3FF",
          400: "#7BBEFF",
          300: "#B7DCFF"
        }
      },
      boxShadow: {
        panel: "0 18px 60px rgba(2, 8, 23, 0.38)"
      },
      fontFamily: {
        sans: ["Manrope", "Segoe UI", "sans-serif"],
        display: ["Space Grotesk", "Manrope", "sans-serif"],
        brand: ["Siemens Sans", "SiemensSans", "Space Grotesk", "Manrope", "sans-serif"]
      }
    }
  },
  plugins: []
};

export default config;
