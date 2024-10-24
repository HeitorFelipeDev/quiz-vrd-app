import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        vrd_verde: "#00583F",
        vrd_amarelo: "#FAC922",
        vrd_branco: "#F2F2F2",
      },
    },
  },
  plugins: [],
};
export default config;
