import animate from "tailwindcss-animate";
export default {
  content: ["./index.html","./src/**/*.{js,jsx,ts,tsx}"],
  theme: { extend: { borderRadius: { '2xl': '1rem' } } },
  plugins: [animate],
};
