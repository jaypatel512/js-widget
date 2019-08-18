const path = require('path');
const webpack = require('webpack');
const bundleOutputDir = './dist';
var copyWebpackPlugin = require('copy-webpack-plugin');

module.exports = (env) => {
    const isDevBuild = !(env && env.prod);

    return [{
        entry: './src/main.js',
        output: {
            filename: 'blinkai.js',
            path: path.resolve(bundleOutputDir),
        },
        devServer: {
            contentBase: bundleOutputDir
        },
        plugins: isDevBuild
            ? [
                new webpack.SourceMapDevToolPlugin(),
                new copyWebpackPlugin([{ from: 'demo/' }]),
                new webpack.DefinePlugin({
                    SERVICE_URL: JSON.stringify("//localhost:8081"),
                    ENV: JSON.stringify("dev")
                })
            ] :
            [
                new webpack.optimize.UglifyJsPlugin(),
                new copyWebpackPlugin([{ from: 'demo/' }]),
                new webpack.DefinePlugin({
                    SERVICE_URL: JSON.stringify("https://ddm2s7p54russ.cloudfront.net"),
                    ENV: JSON.stringify("prod")
                })
            ],
        module: {
            rules: [
                { test: /\.html$/i, use: 'html-loader' },
                { test: /\.css$/i, use: ['style-loader', 'css-loader'] },
                {
                    test: /\.js$/i, exclude: /node_modules/, use: {
                        loader: 'babel-loader',
                        options: {
                            presets: [['@babel/env', {
                                'targets': {
                                    'browsers': ['ie 6', 'safari 7']
                                }
                            }]]
                        }
                    }
                }
            ]
        }
    }];
};

function extendObject(a, b) {
    for (var key in b)
        if (b.hasOwnProperty(key))
            a[key] = b[key];
    return a;
}