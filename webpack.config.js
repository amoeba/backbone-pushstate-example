const webpack = require("webpack");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

module.exports = {
  entry: ["./app/index.js"],
  devtool: "source-map",
  module: {
    loaders: [
      // {
      //   test: /\.js$/,
      //   include: __dirname + "/app",
      //   loader: "babel-loader?presets[]=es2015"
      // },

      {
        test: /\.html$/,
        loader: "underscore-template-loader"
      }
    ]
  },
  output: {
    filename: "bundle.js",
    path: __dirname + "/dist"
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      Backbone: "backbone",
      _: "lodash"
    }),
    new UglifyJsPlugin({
      sourceMap: true
    })
  ]
};
