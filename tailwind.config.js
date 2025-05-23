/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,tsx}', './components/**/*.{js,ts,tsx}'],
  
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        "primaryColor": "#3461FD",
        "textColor": "#1573FE",
        "inputColor": "#F5F9FE",
        "placeholderColor": "#7C8BA0",
        "backgroundColor": "#F2F2F2",
        
      },

      fontFamily: {
        sans: ['System', 'sans-serif'],
        inter: ['Inter', 'Arial', 'sans-serif'],
      }

    },
  },
  plugins: [],
};
