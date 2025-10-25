const path = require("path");
const webpack = require("webpack");

module.exports = (paths) => ({
  entry: './src/ts/index.ts',
  output: {
    path: path.resolve(__dirname, paths.dest),
    filename: "bundle.js",
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-typescript",
            ]
          }
        }
      },
      {
        test: /\.html$/,
        use: 'raw-loader', // or 'html-loader' for more processing options
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  plugins: [],
});
