const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./client/src/index.js",
  output: {
    path: "/",
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        use: "babel-loader",
        test: /\.js$/,
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  stats: {
    children: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "client/public/index.html",
    }),
  ],
};
