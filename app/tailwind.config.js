/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      boxShadow: {
        custom: '0 0 4px 5px rgba(0, 0, 0, 0.25)',
        'custom-orange': '0 0 4px 5px rgba(255, 165, 0, .25)',
      },
      width: {
        10.5: '42px',
      },
      height: {
        10.5: '42px',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
};
