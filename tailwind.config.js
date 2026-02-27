/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ivory: '#FDF8F3',
        charcoal: '#4A4340',
        forest: '#7BAF95',
        terra: '#C4A882',
        walnut: '#A09590',
        sand: '#F0E6D9',
        ocean: '#9DC4D4',
        deep: '#3A4F5C',
        sage: '#7BAF95',
        earthBrown: '#C4A882',
        mutedBrown: '#A09590',
        beige: '#F0E6D9',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'serif'],
        body: ['Outfit', 'sans-serif'],
        sans: ['Outfit', 'sans-serif'],
      },
      spacing: {
        '120': '30rem',
        '160': '40rem',
      },
    },
  },
  plugins: [],
};
