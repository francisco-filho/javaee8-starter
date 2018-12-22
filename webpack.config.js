const path = require('path')
const webpack  = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const devMode = process.env.NODE_ENV !== 'production'

const webpackConfig = {
  entry: {
    app: ['@babel/polyfill', 'react-hot-loader/patch', path.join(__dirname, '/src/js/main.js') ]
  },
   output: {
    path: path.join(__dirname, 'src/main/webapp/public'),
    filename: '[name].js',
    publicPath: '/javaee8'
  },
  module: {
    rules:[
      {
        loader: ['babel-loader'],
        test: /\.js?$/,
        include: [path.join(__dirname, 'src','js')]
      },
      {
        test: /\.scss$/,
        include: [path.join(__dirname, 'src', 'js')],
        use: [{
          loader: devMode ? 'style-loader' : MiniCssExtractPlugin.loader
        },
        'css-loader', 'sass-loader'
        ]
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      title: 'javaee8',
      template: path.join(__dirname, 'src', 'js', 'index.template.html')
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css"
    })
  ],
  resolve: {
    modules: ['node_modules'],
    extensions: [ '.js']
  },
  devServer: {
    port: 3000,
    hot: true,
    inline: true,
    historyApiFallback: true,
    contentBase: path.join(__dirname, 'src/main/webapp/public'),
    proxy: {
      '/javaee8/api/*': 'http://localhost:8080/'
    }
  }
}

module.exports = webpackConfig