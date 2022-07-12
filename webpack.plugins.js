const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = [
    new ForkTsCheckerWebpackPlugin(),
    new HtmlWebpackPlugin({
        filename: 'index.html',
        template: path.resolve('./src', 'index.html')
      })
];
