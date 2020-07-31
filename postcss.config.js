module.exports = (ctx) => ({
    map: ctx.env === 'development' ? ctx.map : false,
    plugins: {
        'postcss-import': {},
        autoprefixer: {
            grid: true
        },
        cssnano: ctx.env === 'production' ? {} : false
    }
})
