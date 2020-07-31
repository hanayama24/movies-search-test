module.exports = {
    loader: 'postcss-loader',
    options: {
        ident: 'postcss',
        config: {
            path: __dirname + '../../postcss.config.js'
        },
        sourceMap: true,
    }
};
