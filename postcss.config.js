module.exports = {
  plugins: [
    require('postcss-import'),
    require('postcss-global-import'),
    require('postcss-mixins'),
    require('postcss-nested'),
    require('cssnano')
  ]
};
