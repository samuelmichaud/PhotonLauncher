const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = [
    new ForkTsCheckerWebpackPlugin(),
    new CopyPlugin({
        patterns: [
            { from: path.resolve('./src', 'AppService', 'glc.exe'), to: path.resolve('./.webpack') },
            { from: path.resolve('./src', 'AppService', 'games-database.json'), to: path.resolve('./.webpack') },
            { from: path.resolve('./src', 'AppService', 'dev-library.json'), to: path.resolve(process.env.APPDATA, require("./package.json").productName) }
        ],
    }),

];
