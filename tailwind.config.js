module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      colors:{
        'background' : '#E5E5E5',
        'table' : '#707683',
        'btn-add' : '#109CF1',
        'btn-edit' : '#FFB946',
        'btn-delete' : '#F7685B',
        'dk-background' : '#334D6E',
        'dk-nav' : '#90A0B7',
        'dk-table' : '#C2CFE0',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
