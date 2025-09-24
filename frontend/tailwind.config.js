/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        // You can extend or customize colors here if needed
      },
    },
  },
  darkMode: "class",  // Enables class-based dark mode (e.g. add "dark" class on <html> or root div)
  plugins: [],
}

