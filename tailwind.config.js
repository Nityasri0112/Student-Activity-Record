module.exports = {
  darkMode: 'class',
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: "var(--brand-color, #5b45ff)"
      }
    }
  },
  plugins: []
}
