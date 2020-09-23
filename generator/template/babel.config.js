module.exports = {
  presets: [
    ['@vue/app', {
      useBuiltIns: 'usage',
      'polyfills': [
        'es6.weak-set',
        'es6.map',
        'es6.set',
        'es6.weak-map',
        'es6.array.find',
        'es6.promise'
      ]
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
