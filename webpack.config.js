const webpack = require("webpack");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

module.exports = {
  entry: ["./app/index.js"],
  module: {
    loaders: [
      // {
      //   test: /\.js$/,
      //   include: __dirname + "/app",
      //   loader: "babel-loader?presets[]=es2015"
      // }
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
      _: "underscore"
    }),
    new UglifyJsPlugin({
      sourceMap: true
    })
  ]
};
