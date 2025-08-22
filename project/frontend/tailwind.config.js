module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'noto-serif': ['Noto Serif SC', 'serif'],
      },
      colors: {
        'academic-blue': '#3b82f6',
      }
    },
  },
  plugins: [],
}