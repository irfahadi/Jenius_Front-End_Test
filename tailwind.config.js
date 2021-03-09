module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors:{
        'background' : '#E5E5E5',
        'table' : '#707683',
        'btn-add' : '#109CF1',
        'btn-edit' : '#FFB946',
        'btn-delete' : '#F7685B',
        'item' : '#334D6E'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
