/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        gray:{
          200: "#f9fbfc", //All notes Background
          100: "#ffffff", //Second brain background and card also
          300: "#8c8c94", //Links text 
        },
        purple: {
          200: "#e0e7ff", // Secondary Button Background
          400: "#9291d7", // Secondary Button Text
          600: "#5046e4", //Primary Button Background
          800: "#8883df" //Primary Button Text
        }
      }
    },
  },
  plugins: [],
}

