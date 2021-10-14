module.exports = {
    defaultSeverity: 'error',
    extends: ['stylelint-config-standard', 'stylelint-config-rational-order'],
    plugins: ['stylelint-less'],
    rules: {
        // 禁止低优先级的选择器出现在高优先级的选择器之后
        'no-descending-specificity': null,
        'font-family-no-missing-generic-family-keyword': null,
        'selector-list-comma-newline-after': null,
        indentation: 4, // 缩进
    },
}
