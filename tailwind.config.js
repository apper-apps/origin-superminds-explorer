/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#7C3AED',
          50: '#F3F0FF',
          100: '#E9E2FF',
          500: '#7C3AED',
          600: '#6D28D9',
          700: '#5B21B6'
        },
        secondary: {
          DEFAULT: '#EC4899',
          50: '#FDF2F8',
          100: '#FCE7F3',
          500: '#EC4899',
          600: '#DB2777',
          700: '#BE185D'
        },
        accent: {
          DEFAULT: '#F59E0B',
          50: '#FFFBEB',
          100: '#FEF3C7',
          500: '#F59E0B',
          600: '#D97706',
          700: '#B45309'
        },
        surface: '#F3F4F6',
        background: '#FAFBFC'
      },
      fontFamily: {
        display: ['Fredoka One', 'cursive'],
        body: ['Plus Jakarta Sans', 'sans-serif']
      },
      borderRadius: {
        '2xl': '16px',
        '3xl': '24px'
      },
      boxShadow: {
        'soft': '0 4px 8px rgba(0, 0, 0, 0.1)',
        'medium': '0 8px 16px rgba(0, 0, 0, 0.12)',
        'strong': '0 12px 24px rgba(0, 0, 0, 0.15)'
      }
    },
  },
  plugins: [],
}