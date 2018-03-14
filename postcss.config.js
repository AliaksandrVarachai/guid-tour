module.exports = {
  plugins: [
    // require('postcss-css-variables'), // TODO: handle with local css variables
    require('postcss-calc'),
    require('postcss-import'),
    require('postcss-global-import'),
    require('postcss-extend'),
    require('postcss-mixins'),
    require('postcss-nested')
   // require('cssnano')
  ]
};
