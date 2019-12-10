const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    entry: './app/js/main.js',
    output: {
        path: path.resolve(__dirname, "/"),
        filename: "js/[name].js",
        publicPath: "/"
    },
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env', "stage-0", "react", 'es2015']
                    }
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|woff|woff2|eot|ttf|svg)$/,
                loader: 'url-loader?limit=100000'
            }
        ]
    },
    devServer: {
        historyApiFallback: true,
        contentBase: path.join(__dirname, "app"),
        port: 9096,
        host: '0.0.0.0',
        proxy: {
            "/notes": {
                target: "http://localhost:8080"
            }
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './app/index.html',
            path: path.join(__dirname, "app/js/dist"),
            filename: 'index.html'
        }),
        new CopyWebpackPlugin([
            { from: './app/css', to: 'css' }
        ]),
        new webpack.ProvidePlugin({
            TextDecoder: ['text-encoding', 'TextDecoder'],
            TextEncoder: ['text-encoding', 'TextEncoder']
        })
    ]
};