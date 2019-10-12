const WebpackMerge = require('webpack-merge');
const baseConfig = require('./webpack.base');
const webpack = require('webpack');

module.exports = WebpackMerge(baseConfig, {
    mode: 'development',
    plugins: [
        new webpack.HotModuleReplacementPlugin()//热更新
    ],
    devServer: {
        contentBase: './dist',
        hot: true,
        stats: 'errors-only'
    },
    devtool: 'eval'
});
