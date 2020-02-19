const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); //Copies html files into output folder and inserts JS files
const {CleanWebpackPlugin} = require('clean-webpack-plugin'); //Cleans files from previous build
const CopyWebpackPlugin = require('copy-webpack-plugin'); //Copies specified files into output dir
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); //Extracts CSS into separate files. It creates a CSS file per JS file which contains CSS.
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin'); //To minify CSS in 'prod file'
const TerserPlugin = require('terser-webpack-plugin'); //To minify JS in 'prod file'

const env = process.env.NODE_ENV;
const isDev = () => env === 'dev';
const isProd = () => env === 'prod';

const outputFolder = 'dist';

const optimization = () => {
    const config = {
        splitChunks: { // Having more then 1 entry point and all/some using the same library, it make sense to extract this shared library
            chunks: 'all'
        }
    };

    if (isProd()) {
        config.minimizer = [
            new OptimizeCssAssetsWebpackPlugin(),
            new TerserPlugin()
        ]
    }
    return config;
};

module.exports = {
    entry: './js/index.js',
    context: path.resolve(__dirname, "src"),
    output: {
        path: path.resolve(__dirname, outputFolder),
        filename: "js/[name].[hash].bundle.js",
        publicPath: '/'
    },
    optimization: optimization(),
    resolve: {
        extensions: ['.js', '.json', '.css'],
        alias: {
            '@styles': path.resolve(__dirname, 'src/styles'),
            '@': path.resolve(__dirname, 'src'),
        }
    },
    devtool: isDev() ? 'source-map' : '',
    devServer: {
        historyApiFallback: true
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                        plugins: ['@babel/plugin-proposal-class-properties']
                    }
                }
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: isDev(), //Hot Module Replacements
                            reloadAll: true
                        }
                    },
                    'css-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
            minify: {
                collapseWhitespace: isProd()
            }
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, 'src/img/favicon.ico'),
                to: path.resolve(__dirname, outputFolder + '/img')
            }
        ]),
        new MiniCssExtractPlugin({
            filename: 'styles/[name].[hash].css'
        })
    ]
};