const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const glob = require('glob');

const getMpaSet = () => { 
    const entry = {};
    const htmlWebpackPlugins = [];

    const entryFiles = glob.sync(path.join(__dirname, './src/*/index.js'));
    /*
        [ 
            'D:/code/mycode/webpack/jk-webpack/src/index/index.js',
            'D:/code/mycode/webpack/jk-webpack/src/vue/index.js' 
        ]
    */

    Object.keys(entryFiles)
        .map((index) => {
            const entryFile = entryFiles[index];

            const match = entryFile.match(/src\/(.*)\/index.js/);
            const pagename = match && match[1];

            entry[pagename] = entryFile;
            htmlWebpackPlugins.push(
                new HtmlWebpackPlugin({
                    template: path.join(__dirname, `./src/${pagename}/index.html`),
                    filename: `${pagename}.html`,
                    chunks: ['commons', pagename],
                    inject: true,
                    minify: {
                        html5: true,
                        collapseWhitespace: true,
                        preserveLineBreaks: false,
                        minifyCSS: true,
                        minifyJS: true,
                        removeComments: true
                    }
            }))
        })

    console.log('entry files: ', entryFiles);
    return {
        entry,
        htmlWebpackPlugins
    }
}

const { entry, htmlWebpackPlugins } = getMpaSet();

module.exports = {
    entry: entry,
    module: {
        rules:[
            {
                test: /\.(js|vue)$/,
                enforce: 'pre',
                include: path.resolve(__dirname, 'src'),
                exclude: /node_modules/,
                use: [
                  {
                    loader: require.resolve('eslint-loader'),
                    options: {
                        formatter:require('eslint-friendly-formatter')
                    }
                  }
                ]
            },
            {
                test: /\.css$/,
                use:[
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: 'babel-loader'
            },
            {
                test: /\.less/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'less-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [
                                require('autoprefixer')({ overrideBrowserslist: ['iOS >= 7', 'Android >= 4.0'] })
                            ]
                        }
                    },
                    {
                        loader: 'px2rem-loader',
                        options: {
                            remUnit: 75,
                            remPrecision: 8
                        }
                    }
                ]
            },
            {
                test: /\.vue$/,
                use: 'vue-loader'
            },
            {
                test: /\.(png|git|svg|jpg)$/,
                use: 'file-loader'
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: 'file-loader'
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
        new CleanWebpackPlugin(),
        new FriendlyErrorsWebpackPlugin(),
        function() {
            this.hooks.done.tap('done', (stats) => {
                if (stats.compilation.errors && stats.compilation.errors.length && process.argv.indexOf('--watch') == -1)
                {
                    console.log('build error');
                    process.exit(1);
                }
            })
        }    
    ].concat(htmlWebpackPlugins),
}