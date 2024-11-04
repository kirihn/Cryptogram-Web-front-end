const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin').TsconfigPathsPlugin;

module.exports = {
    entry: './src/index.tsx',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, '../dist'),
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.scss', '.jpg', '.png'],
        plugins: [
            new TsconfigPathsPlugin({
                configFile: path.resolve(__dirname, '../tsconfig.json'),
            }),
        ],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                ],
                exclude: /node_modules/,
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './public/index.html',
        }),
    ],
};
