/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'user-bg': '#B0D6F566',
        'user-border': '#0487E2',
        'ai-bg': '#0463CA',
      },
      animation: {
        'move-right': '5s linear',
      },
      keyframes: {
        'move-right': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
    },
  },
  plugins: [],
};
