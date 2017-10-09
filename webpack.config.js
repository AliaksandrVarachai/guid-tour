const webpack = require('webpack');
const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');


const isProduction = process.env.NODE_ENV === 'production';
const src = path.resolve(__dirname, 'src');
const dist = path.resolve(__dirname, 'dist');  // TODO: add automatic clear plugin before build


module.exports = {
  entry: {
    'app': './src/scripts/',
  },
  output: {
    filename: 'bundle.js',
    path: dist,
    publicPath: '/'
  },
  devtool: isProduction ? false : 'eval-source-map', //'eval' does not work
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        isProduction
      }
    }),
    new UglifyJSPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        include: src,
        use: [
          {
            loader: 'style-loader',

          }, {
            loader: 'css-loader',
            options: {
              modules: true,
              sourceMap: !isProduction,
              localIdentName: '[name]__[local]' //must be the same as for react-css-modules
            }
          }
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        include: src,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'images/'
            }
          }
        ]
      },
      {
        // TODO: combine file-loader into one
        test: /\.html$/,
        include: path.resolve(__dirname, 'src'),
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.js$/,
        include: src,
        use: 'babel-loader' //presets are in .babelrc
      }
    ]
  },

  devServer: {
    contentBase: path.resolve(__dirname, 'dist'), //path to static src, i.e. index.html
    port: 8080
  }
};
