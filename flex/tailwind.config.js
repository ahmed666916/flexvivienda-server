/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",               // Vite
    "./public/index.html",        // CRA (keep if you have)
    "./src/**/*.{js,jsx,ts,tsx}", // include all React files
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
