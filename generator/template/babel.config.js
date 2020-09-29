
const plugins = []
<%_ if(options.application === 'mobile') { _%>
  plugins.push(    [
    'import',
    {
      'libraryName': 'vant',
      'libraryDirectory': 'es',
      'style': true
    }
  ])
  }
<%_ } _%>
module.exports = {
  presets: [
    ['@vue/cli-plugin-babel/preset', {
      useBuiltIns: 'usage'
    }]
  ],
  plugins: [
    'lodash',
    ['@babel/plugin-transform-runtime'],
    ...plugins
  ]
}
