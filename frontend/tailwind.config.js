// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // 🎨 Paleta acessível (alto contraste)
        primary: {
          DEFAULT: "#4C1D95", // purple-950 (forte contraste sobre branco)
          light: "#6D28D9",   // purple-700 (para destaques)
          dark: "#3B0764",    // ainda mais escuro, sobre tons claros
        },
        accent: {
          DEFAULT: "#7C3AED", // roxo vívido
          contrast: "#FACC15", // amarelo contrastante no dark mode
        },
        neutral: {
          light: "#FFFFFF",
          DEFAULT: "#F3F4F6",
          dark: "#111827",
        },
      },
    },
  },
  plugins: [
    require("tailwindcss-accessibility"),
  ],
};
