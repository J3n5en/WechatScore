var webpack = require('webpack');
module.exports = {
  entry: './src/main.js',
  output: {
    path: './dist',
    publicPath: 'dist/',
    filename: 'build.js'
  },
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.js$/,
        loader: 'babel!eslint',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: '[name].[ext]?[hash]'
        }
      },
      {
          test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
          loader: "url",
          query: {
            name: '[name].[ext]?[hash]&mimetype=application/font-woff'
          }
      },
      {
          test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
          loader: "url",
          query: {
            name: '[name].[ext]?[hash]&mimetype=application/font-woff2'
          }
      },
      {
          test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
          loader: "url",
          query: {
            name: '[name].[ext]?mimetype=application/font-woff2'
          }
      },
      {
          test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
          loader: "url",
          query: {
            name: '[name].[ext]?mimetype=application/font-woff2'
          }
      },
      {
          test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
          loader: "url",
          query: {
            name: '[name].[ext]?mimetype=image/svg+xml'
          }
      },
      {
          test: /\.json(\?v=\d+\.\d+\.\d+)?$/,
          loader: "url",
          query: {
            name: '[name].[ext]?mimetype=application/json'
          }
      }
    ]
  },
  vue: {
    autoprefixer: {
      browsers: ['> 1%','last 2 versions']
    }
  },
  plugins: [
      new webpack.BannerPlugin('This file is created by J3n5en \n email : admin@j3n5en.com \n updated_at : '+new Date())
  ],
  babel: {
    presets: ['es2015', 'stage-0'],
    plugins: ['transform-runtime']
  }
}
