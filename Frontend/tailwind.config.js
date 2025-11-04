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
          50: "#fafafa",   // Lightest background
          100: "#f5f5f5",  // Card backgrounds
          200: "#e5e5e5",  // Hover states
          300: "#d4d4d4",  // Borders
          400: "#a3a3a3",  // Muted text
          500: "#737373",  // Secondary text
          600: "#525252",  // Primary text
          700: "#404040",  // Dark text
          800: "#262626",  // Darker elements
          900: "#171717",  // Darkest elements
        },
        accent: {
          100: "#f0f0f0",  // Subtle accent background
          200: "#e8e8e8",  // Secondary accent
          300: "#404040",  // Primary accent (dark gray)
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'elegant': '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px 0 rgba(0, 0, 0, 0.03)',
        'elegant-lg': '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
      }
    },
  },
  plugins: [],
}

