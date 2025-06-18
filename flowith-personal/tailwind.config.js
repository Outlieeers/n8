/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // ou 'media' se preferir
  theme: {
    extend: {
      colors: {
        'primary-start': '#3B82F6', // Azul
        'primary-end': '#8B5CF6',   // Roxo
        'dark-gray': '#1F2937',
        'light-gray': '#F3F4F6', // Para o tema claro
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
