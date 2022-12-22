const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");
const webpack = require('webpack');

module.exports = [
    new webpack.DefinePlugin({
        VERSION: JSON.stringify(process.env.npm_package_version),
        __BUILD_VERSION__: JSON.stringify(new Date().getFullYear() + '-' + (new Date().getMonth()+1) + '-' + (new Date().getDay()+1))
     }),
    new ForkTsCheckerWebpackPlugin(),
    new CopyPlugin({
        patterns: [
            { from: path.resolve('./src', 'AppService', 'glc.exe'), to: path.resolve('./.webpack') },
            { from: path.resolve('./src', 'AppService', 'dev-library.json'), to: path.resolve(process.env.APPDATA, require("./package.json").productName) }
        ],
    }),

];
