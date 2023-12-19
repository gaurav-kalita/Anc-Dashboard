/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ANC: {
          primary: '#050D1A',
          background: '#f0f0ef',
          default: '#050D1A',
          default_2: '#252834',
        },
      },
    },
  },
  plugins: [],
};
