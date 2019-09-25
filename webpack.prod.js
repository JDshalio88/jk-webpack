
const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: {
        index: './src/index.js',
        app: './src/app.js',
        vue: './src/vue.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name]_[chunkhash:8].js'
    },
    module: {
        rules:[
            {
                test: /\.js$/,
                enforce: 'pre',
                include: path.resolve(__dirname, 'src'),
                exclude: /node_modules/,
                use: [
                  {
                    loader: require.resolve('eslint-loader')
                  }
                ]
            },
            {
                test: /\.css$/,
                use:[
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: 'babel-loader'
            },
            {
                test: /\.vue$/,
                use: 'vue-loader'
            },
            {
                test: /\.(png|git|svg|jpg)$/, //同图片
                use:[
                    {
                        loader: 'file-loader',
                        options:{
                            name: '[name]_[hash:8].[ext]'
                        }
                    }
                ]

            },{
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use:[
                    {
                        loader: 'file-loader',
                        options:{
                            name: '[name]_[hash:8].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    plugins:[
        new MiniCssExtractPlugin({
            filename: '[name]_[contentHash:8].css'
        }),
        new OptimizeCssAssetsPlugin({
            assetNmaeRegExp: /\.css$/g,
            cssProcessor: require('cssnano')
        }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'src/index.html'),
            filename:'index.html',
            chunks: ['index'],
            inject: true,
            minify: {
                html5: true,
                collapseWhitespace: true,
                preserveLineBreaks: false,
                minifyCSS: true,
                minifyJS: true,
                removeComments: true
            }
        }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'src/vue.html'),
            filename:'vue.html',
            chunks: ['vue'],
            inject: true,
            minify: {
                html5: true,
                collapseWhitespace: true,
                preserveLineBreaks: false,
                minifyCSS: true,
                minifyJS: true,
                removeComments: true
            }
        }),
        new CleanWebpackPlugin(),
        new VueLoaderPlugin(),
        //new webpack.HotModuleReplacementPlugin()
    ],
    // devServer: {
    //     contentBase: './dist',
    //     hot: true
    // }
};