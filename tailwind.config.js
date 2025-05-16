/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1A73E8',
        primaryLight: '#E6F1FE',
        blue: {
          0: '#FFFFFF',
          5: '#006FF2',
          10: '#000000',
          '0.5': '#E6F1FE',
          '1': '#CCE2FC',
          '1.5': '#B3D4FB',
          '2': '#99C5FA',
          '3': '#66A9F7',
          '4': '#338CF5',
          '6': '#0059C2',
          '7': '#004391',
          '8': '#002C61',
          '8.5': '#002149',
          '9': '#001630',
          '9.5': '#000B18',
        }
      },
      keyframes: {
        wave: {
          '0%': { transform: 'scale(1)', opacity: '0.7', backgroundColor: '#1A73E8' },
          '70%': { transform: 'scale(2.2)', opacity: '0', backgroundColor: '#1A73E8' },
          '100%': { transform: 'scale(2.2)', opacity: '0', backgroundColor: '#1A73E8' },
        },
      },
      animation: {
        wave: 'wave 1.6s cubic-bezier(0.4,0,0.2,1) infinite',
      },
    },
  },
  plugins: [],
} 