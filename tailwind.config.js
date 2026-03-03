/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        glass: "0 18px 46px rgba(8, 18, 22, 0.12)"
      },
      letterSpacing: {
        brutal: "0.12em"
      }
    }
  },
  plugins: []
};
