module.exports = {
  presets: [
    ['@vue/app', {
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
