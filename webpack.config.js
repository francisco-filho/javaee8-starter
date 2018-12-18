const path = require('path')
const webpack  = require('webpack')

const webpackConfig = {
  entry: {
    app: ['@babel/polyfill', 'react-hot-loader/patch', path.join(__dirname, '/src/js/main.js') ]
  },
   output: {
    path: path.join(__dirname, 'public'),
    filename: '[name].js',
    publicPath: '/'
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
        use: ['style-loader','css-loader', 'sass-loader']
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
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
    contentBase: path.join(__dirname, '/public')
  }
}

module.exports = webpackConfig