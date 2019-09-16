const path = require('path');
const merge = require('webpack-merge');

const common = require('./webpack.common');

module.exports = merge(common, {
    mode: 'production',
    output: {
        filename: 'app.[contentHash].js',
        path: path.resolve(__dirname, 'dist')
    }
});