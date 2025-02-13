const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: 'development',
    devServer: {
        static: './dist',
        open: true,
        hot: true,
        port: 4200,
        historyApiFallback: true,
        proxy: [
            {
                context: ['/api', '/static', '/defaults', '/userUploads'],
                target: 'http://localhost:10000',
            },
        ],
    },
    devtool: 'inline-source-map',
});
