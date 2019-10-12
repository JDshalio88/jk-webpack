const WebpackMerge = require('webpack-merge');
const BaseConfig = require('./webpack.base');
const cssnano = require('cssnano');
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = WebpackMerge(BaseConfig, {
    mode: 'production',
    plugins: [
        new OptimizeCSSAssetsPlugin({ //压缩css
            assetNameRegExp: /\.css$/g,
            cssProcessor: cssnano
        }),
        new HtmlWebpackExternalsPlugin({//提取基础库
            externals: [
                {
                    module: 'vue',
                    entry: 'https://cdn.jsdelivr.net/npm/vue/dist/vue.js',
                    global: 'Vue'
                }
            ]
        })
    ],
    optimization: {//提取公共文件
        splitChunks: {
            minSize: 0,
            cacheGroups: {
                commons: {
                    name: 'commonsfun',
                    chunks: 'all',
                    minChunks: 2
                }
            }
        }
    }
});