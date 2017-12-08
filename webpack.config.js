const webpack = require('webpack');
const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';
const resources = path.resolve(__dirname, 'resources');
const src = path.resolve(__dirname, 'src');
const images = path.resolve(src, 'images');
const dist = path.resolve(__dirname, 'dist');


module.exports = {
  entry: isProduction
    ? {
      'guided-tour': './src/scripts/index'
    }
    : {
      'local-test-preparation': './resources/webpack/dev-server-local-test-tools/copy-html',
      'guided-tour': './src/scripts/index',
      'local-test-redux-store': './resources/webpack/dev-server-local-test-tools/react-redux/copy-html',
    },
  output: {
    filename: '[name].js',
    path: dist,
    publicPath: '/'
  },
  devtool: isProduction ? false : 'eval-source-map', //'eval' does not work
  plugins: [
    new CleanWebpackPlugin([dist]),
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
        test: /\.css$|\.scss$/,
        include: [src, 'webpack/dev-server-local-test-tools'],
        use: [
          {
            loader: 'style-loader',

          }, {
            loader: 'css-loader',
            options: {
              modules: true,
              sourceMap: !isProduction,
              localIdentName: '[name]__[local]__[hash:base64:5]' //must be the same as for react-css-modules
            }
          }
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        include: images,
        use: [
          {
            loader: 'file-loader',
            options: {
              name (file) {
                return path.relative(images, file);
              },
              outputPath: 'outer-src/images/'
            }
          }
        ]
      },
      {
        test: /\.html$/,
        include: path.resolve(resources, 'webpack/dev-server-local-test-tools'),
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
        include: [resources, src],
        use: 'babel-loader'
      }
    ]
  },

  devServer: {
    contentBase: dist,
    port: 9090
  }
};
