module.exports = {
    presets: ['@babel/preset-env', '@babel/preset-flow'],
    plugins: [
        'lodash',
        [
            '@babel/plugin-transform-runtime',
            {
                regenerator: true,
            },
        ],
        [
            'module-resolver',
            {
                alias: {
                    api: './',
                },
            },
        ],
    ],
    ignore: ['node_modules'],
}
