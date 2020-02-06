const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    entry: './app/js/app.js',
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
                        presets: [[
                            "@babel/preset-env", {
                                "useBuiltIns": "entry"
                            }],
                            "@babel/preset-react"],
                        plugins: [
                            "@babel/plugin-proposal-class-properties",
                            "@babel/plugin-proposal-export-default-from"
                        ]
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
            {from: './app/css', to: 'css'}
        ]),
        new webpack.ProvidePlugin({
            TextDecoder: ['text-encoding', 'TextDecoder']
        })
    ]
};