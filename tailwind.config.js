module.exports = {
  purge: [ './src/**/*.{js,jsx,ts,tsx}', './public/index.html' ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    minHeight: {
      'min-h-1/3': '40vh'
    },
    bg: {
      'bg-eggshell': '#DCCFD6'
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
