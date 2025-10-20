/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ivory: '#F9F6F2',
        charcoal: '#1F1D1A',
        sage: '#A8B89C',
        earthBrown: '#7B5E57',
        mutedBrown: '#8B7265',
        beige: '#E8E1D9',
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'serif'],
        body: ['Inter', 'sans-serif'],
      },
      spacing: {
        '120': '30rem',
        '160': '40rem',
      },
    },
  },
  plugins: [],
};
