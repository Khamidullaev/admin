const colors = require('tailwindcss/colors')

const config = {
  primary: {
    "100": "rgba(235, 247, 255, 1)",
    "600": "rgba(64, 148, 247, 1)",
  },
  background: "rgba(220, 233, 249, 1)",
  secondary: "rgba(110, 139, 183, 1)",
  background_2: "rgba(229, 233, 235, 1)",
  dark: "rgba(48, 57, 64, 1)",
  teal: {
    "100": "rgba(228, 252, 252, 1)",
    "600": "rgba(13, 150, 118, 1)",
  },
  grey: "rgba(132, 145, 154, 1)",
  white: "rgba(255, 255, 255, 1)",
  success: {
    "100": "#EBFFF1",
    "600": "#47D16C",
  },
  purple: {
    "100": "rgba(252, 240, 255, 1)",
    "600": "rgba(196, 121, 243, 1)",
  },
  warning: "rgba(248, 221, 78, 1)",
  error: {
    "100": "rgba(255, 239, 235, 1)",
    "600": "rgba(247, 102, 89, 1)",
  },
}

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    minWidth: {
      'sidebar': '288px'
    },
    minHeight: {
      '6': '1.5rem'
    },
    fontFamily: {
      'display': ['Inter', 'sans-serif'],
       'body': ['Inter', 'sans-serif'],
    },
    // custom-needed
    colors: {
      ...colors,
      ...config
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
