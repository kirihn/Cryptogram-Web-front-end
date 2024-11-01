const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: 'development',
    devServer: {
        static: './dist',
        open: true,
        hot: true,
        port: 3000,
        historyApiFallback: true,
        proxy: [
            {
                context: ['/api', '/videos', '/channels', '/users'],
                target: 'http://localhost:3000',
            },
        ],
    },
    devtool: 'inline-source-map',
});
