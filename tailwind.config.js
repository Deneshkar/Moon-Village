/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: '#f59e0b', light: '#fbbf24', dark: '#d97706' },
        dark: { DEFAULT: '#0f172a', card: '#1e293b', hover: '#273549', border: '#334155' },
      },
      fontFamily: { poppins: ['Poppins', 'sans-serif'] },
    },
  },
  plugins: [],
}