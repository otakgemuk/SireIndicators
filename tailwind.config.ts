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
          cream: '#F5EDD8',
          red: '#C04030',
          green: '#3A7A50',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        body: ['var(--font-body)', 'Georgia', 'serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
    },
  },
  darkMode: 'class',
};

export default config;
