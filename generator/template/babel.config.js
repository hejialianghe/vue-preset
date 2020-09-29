module.exports = {
  presets: [
    ['@vue/cli-plugin-babel/preset', {
      useBuiltIns: 'usage'
    }]
  ],
  plugins: [
    'lodash',
    ['@babel/plugin-transform-runtime'],
    [
      'import',
      {
        'libraryName': 'vant',
        'libraryDirectory': 'es',
        'style': true
      }
    ]
  ]
}
