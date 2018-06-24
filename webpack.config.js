var path = require('path');
var Html = require('html-webpack-plugin');
var MiniCSS = require("mini-css-extract-plugin");

module.exports = {
    entry: "./js/app.jsx",
    output: {
        filename: "./js/out.js",
        path: path.resolve(__dirname, "build"),
    },
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.(jsx|js)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            'es2015',
                            'stage-2',
                            'react'
                        ]
                    }
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.scss$/,
                use: [
                     MiniCSS.loader,
               //     'style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [
                                new require('autoprefixer')({
                                    browsers: [
                                        'ie 11'
                                    ]
                                })
                            ]
                        }
                    },
                    'sass-loader'
                ]
            },
            {
                test: /\.(jpg|jpeg|gif|png|csv)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        publicPath: 'images',
                        outputPath: 'images'
                    }
                }
            },
            {
                test: /\.(eot|ttf|woff|woff2)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        publicPath: 'fonts',
                        outputPath: 'fonts'
                    }
                }
            }
        ]
    },
    plugins: [
        new Html({
            filename: 'index.html',
            template: './index.html',
        }),
        new MiniCSS({
            filename: "app.css",
        })
    ]
}
