const StyleLintPlugin = require('stylelint-webpack-plugin')
module.exports = {
    configureWebpack: {
        plugins: [new StyleLintPlugin({
            files: ['**/*.{vue,htm,html,css,sss,less,scss,sass}'],
            fix: false, // 是否自动修复
            cache: false, // 是否缓存
            emitErrors: true, // 在控制台显示报错信息
            failOnError: true, // true 不通过会 报错; false 只是提示不会报错
        })],
    },
}
