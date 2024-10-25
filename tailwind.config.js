/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  theme: {
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