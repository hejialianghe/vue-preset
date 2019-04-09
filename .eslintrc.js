module.exports = {
  globals: {
    WebViewJavascriptBridge: true,
    _czc: true
  },
  rules: {
    'generator-star-spacing': 'off',
    'no-mixed-spaces-and-tabs': 'off',
    'no-tabs': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  },
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  }
}
