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
        'custom-yellow':'#FED700',
        'primary-color':'#051937',
        'secondary-color': '#A8EB12',
        'pcb-blue': '#9cc0d0',
        'pcb-blue-dark': '#8bb2c4',
        'pcb-blue-light': '#a5c9d6',
        'pcb-trace': '#7ba8bb',
      }
    },
  },  
  plugins: [require("@tailwindcss/typography"), require("@tailwindcss/forms"), require("daisyui")],
};
export default config;
