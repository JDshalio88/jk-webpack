
const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
    mode: 'development',
    entry: {
        index: './src/index.js',
        app: './src/app.js',
        vue: './src/vue.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
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
                test: /\.vue$/,
                use: 'vue-loader'
            },
            {
                test: /\.(png|git|svg|jpg)$/,
                use: 'file-loader'
            },{
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: 'file-loader'
            }
        ]
    },
    plugins:[
        new VueLoaderPlugin()
    ]
};