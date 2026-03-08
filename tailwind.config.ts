import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        maroon: '#4A1118',
        cream: '#F8F1E8',
        beige: '#EEDFCB',
        gold: '#C89B3C',
        rose: '#8A2C3B'
      },
      fontFamily: {
        display: ['var(--font-cormorant)'],
        body: ['var(--font-manrope)']
      },
      boxShadow: {
        luxe: '0 18px 60px rgba(74,17,24,0.14)',
        glow: '0 0 0 1px rgba(200,155,60,0.3), 0 8px 22px rgba(200,155,60,0.2)'
      },
      backgroundImage: {
        silk: 'radial-gradient(circle at 20% 20%, rgba(200,155,60,0.16), transparent 40%), radial-gradient(circle at 80% 0%, rgba(138,44,59,0.18), transparent 35%)'
      }
    }
  },
  plugins: []
};

export default config;
