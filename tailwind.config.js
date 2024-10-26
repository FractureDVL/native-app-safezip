/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  theme: {
    borderRadius:{
      'none': '0',
      'sm': '0.125rem',
      'md': '0.375rem',
      'lg': '0.5rem',
      'xl': '1.2rem',
      'full': '9999px',
    },
    extend: {
      colors: {
        primary: '#433878',  // Dark Purple
        secondary: '#7E60BF', // Purple
        accent: '#BA9BFC',    // Light Purple
        background: '#DCCBFF', // Lighter Purple
        foreground: '#F3EAFF',  // Lightest Purple
    },
    },
  },
};