const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const devMode = process.env.NODE_ENV !== "production";

const webpackConfig = {
  entry: {
    app: [
      "@babel/polyfill",
      "react-hot-loader/patch",
      path.join(__dirname, "/src/js/main.js")
    ]
  },
  output: {
    path: path.join(__dirname, "build/"),
    filename: "[name].js",
    publicPath: "/javaee8"
  },
  module: {
    rules: [
      {
        loader: ["babel-loader"],
        test: /\.js?$/,
        include: [path.join(__dirname, "src", "js")]
      },
      {
        test: /\.s?css$/,
        include: [path.join(__dirname, "src", "js")],
        use: [
          {
            loader: devMode ? "style-loader" : MiniCssExtractPlugin.loader
          },
          "css-loader",
          "sass-loader"
        ]
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: devMode ? "fonts/" : "/fonts/"
            }
          }
        ]
      },
      {
        test: /\.(gif|jpg|jpeg|png)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "fonts/"
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      title: "javaee8",
      template: path.join(__dirname, "src", "js", "index.template.html")
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css"
    }),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": devMode
        ? JSON.stringify("development")
        : JSON.stringify("production")
    })
  ],
  resolve: {
    modules: ["node_modules"],
    extensions: [".js"]
  },
  devServer: {
    port: 3000,
    hot: true,
    inline: true,
    historyApiFallback: true,
    contentBase: path.join(__dirname, "build/"),
    proxy: {
      "/javaee8/api/*": "http://localhost:8080/",
      "/javaee8/images/*": "http://localhost:8080/"
    }
  }
};

module.exports = webpackConfig;
