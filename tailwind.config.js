/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        // Ini akan menggantikan class font-sans bawaan Tailwind
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        // Ini akan menggantikan class font-serif bawaan Tailwind
        serif: ['"Playfair Display"', 'serif'],
      },
    },
  },
  plugins: [],
}