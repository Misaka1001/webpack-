var path = require('path');
let webpack = require('webpack');
var HTMLWepackPlugn  = require('html-webpack-plugin');
var uglify = require('uglifyjs-webpack-plugin');
// 单独打包css文件插件
// var MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
    entry: {
        main: './src/main.js',
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
    },
    mode: 'development',
    devServer: {
        contentBase: 'dist',
        port: 3000, 
        compress: true,
        hot: true
        
    },
    module: {
        rules: [{
            test: /\.css$/,
            use:['style-loader', 'css-loader']
            // use: [MiniCssExtractPlugin.loader, 'css-loader']
        }, 
        {
            // test: /\.html$/,
            // use: [{
            //     // 单独抽离html文件  进行配置
            //     loader: 'file-loader',
            //     options: {
            //         name: 'index.html'
            //     }
            // }, 
            // {
            //     // 将html抽离
            //     loader: 'extract-loader',

            // }, {
            //     // 解析html文件  找到html
            //     loader: 'html-loader',
            // }]
        }, {
            // test: /\.js$/,
            // use: ['babel-loader']
        }, {
            test: /\.(jpg|png)$/, 
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 8129,
                    name: '[name].[ext]'
                }
            }]
        }]
    },
    plugins: [
        // html文件单独引入
        new HTMLWepackPlugn({
            title: 'webpack Title',
            template: './src/index.html',
        }),
        // 
        new uglify(),
        // 单独打包css插件
        // new MiniCssExtractPlugin({
        //     // 抽离出来后文件名称
        //     filename: '[name].css'
        // }),
        new webpack.HotModuleReplacementPlugin(),
    ]
}