/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0F0F0F',
          light: '#1B1B1B',
        },
        secondary: {
          DEFAULT: '#1B1B1B',
        },
        accent: {
          DEFAULT: '#C8A96B',
          light: '#D3BA82',
        },
        gold: {
          DEFAULT: '#C8A96B',
          light: '#D3BA82',
        },
        brandBg: {
          DEFAULT: '#FAFAFA',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
    },
  },
  plugins: [],
}