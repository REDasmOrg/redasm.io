const webpack = require("webpack");
const path = require("path");

const BUNDLE_MODE = "development";
//const BUNDLE_MODE = "production";

module.exports = {
  entry: path.resolve(__dirname, "./static/bundle.js"),
  mode: BUNDLE_MODE,

  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: { presets: ["@babel/preset-env"] }
        }
      },
      { test: /\.(woff|woff2|ttf|eot|svg)$/,
        use: {
          loader: "file-loader",
          options: { publicPath: "/dist" }
        }
      },
      {
        test: /\.s[ac]ss$/i,
        use: [ "style-loader", "css-loader", "sass-loader" ],
      },
      {
        test: /\.css$/,
        use: [ "style-loader", "css-loader" ]
      },
    ]
  },

  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "static/dist")
  },
}