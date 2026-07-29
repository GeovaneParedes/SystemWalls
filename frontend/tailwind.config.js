/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#090d16',
          card: '#0f172a',
          accent: '#06b6d4',
          glow: '#0284c7',
        }
      }
    },
  },
  plugins: [],
}
