module.exports = {
  globals: {
  },
  rules: {
    'generator-star-spacing': 'off',
    'no-mixed-spaces-and-tabs': 'off',
    'no-tabs': 'off',
    'no-console': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-underscore-dangle': ["off", "always"]
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
