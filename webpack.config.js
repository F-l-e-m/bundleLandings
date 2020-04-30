const webpack = require('webpack');
const path = require('path');
const assistant = require('./assistant')();
const argv = require('yargs').argv;
// const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWepbackPlugin = require('terser-webpack-plugin');

const currentLandingName = argv.landing;
const isDev = process.env.NODE_ENV === 'development';
const isProd = process.env.NODE_ENV === 'production';

const optimization = () => {
    const config = {
        splitChunks: {
            chunks: 'all'
        }
    };

    if(isProd) {
        config.minimizer = [
            new OptimizeCssAssetsWebpackPlugin(),
            new TerserWepbackPlugin()
        ]
    }

    return config;
};

const devServer = () => {
    const overlay = {};
    if(isDev) {
        overlay.warnings = true;
        overlay.errors = true;
    }
    return overlay;
};

const pluginBuild = () => {
    const plugins = [
        new HtmlWebpackPlugin({
            template: `index.html`,
            hash: isDev,
            minify: {
                collapseWhitespace: isProd
            }
        }),
        new MiniCssExtractPlugin({
            filename: `assets/styles/${filename('css')}`
        }),
        new CopyWebpackPlugin([
            {
                from: `assets/img`,
                to: `assets/img`
            }
        ])
    ];

    if(isDev) {
        plugins.push(new webpack.SourceMapDevToolPlugin({
            filename: '[file].map'
        }))
    }

    return plugins;
};

const filename = ext => isDev ? `[name].${ext}` : `[name].[hash].${ext}`;

module.exports = {
    context: path.resolve(__dirname, `./assets/${currentLandingName}`),
    entry: ['@babel/polyfill', './index.js'],
    output: {
        filename: `js/${filename('js')}`,
        path: path.resolve(__dirname, `web/landings/${currentLandingName}`)
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, 'assets')
        }
    },
    plugins: pluginBuild(),
    optimization: optimization(),
    devServer: {
        port: 8081,
        hot: isDev,
        overlay: devServer()
    },
    devtool: 'cheap-module-eval-source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: { sourceMap: isDev }
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: isDev,
                            ident: 'postcss',
                            plugins: [
                                require('autoprefixer')()
                            ]
                        }
                    },
                ]
            },
            {
                test: /\.sass|scss$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: isDev,
                            reloadAll: true,
                            sourceMap: isDev
                        }
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: isDev,
                            ident: 'postcss',
                            plugins: [
                                require('autoprefixer')()
                            ]
                        }
                    },
                    'sass-loader'
                ]
            },
            {
                test: /\.(png|jpg|svg|gif)$/,
                exclude: /node_modules/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    esModule: false,
                    context: 'assets',
                    outputPath: 'assets/img',
                    publicPath: '/assets/img/'
                }
            },
            {
                test: /\.(mp4|webm|mov)$/,
                exclude: /node_modules/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]'
                }
            },
            {
                test: /\.html$/,
                exclude: /node_modules/,
                loader: 'html-loader',
                options: {
                    interpolate: true
                }
            },
            {
                test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    esModule: false,
                    context: 'assets',
                    outputPath: 'assets/fonts',
                    publicPath: '/assets/fonts/'
                }
            }
        ]
    }
};
