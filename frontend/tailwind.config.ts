import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#0E0A04',
          gold: '#B87333',
          'gold-lt': '#E8C46A',
        },
        bullish: '#15803D',
        bearish: '#CC2936',
      },
    },
  },
  darkMode: 'class',
};

export default config;
