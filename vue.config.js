const env = process.env
const isProd = process.env.NODE_ENV === 'production'
const deepConsole = process.env.VUE_APP_SERVEN === 'PROD'
const TerserPlugin = require('terser-webpack-plugin')
module.exports = {
  publicPath: isProd ? `${env.WEBPACK_PATH}` : '/',
  configureWebpack: {
    externals: isProd ? {
      'vue': 'Vue',
      'vue-router': 'VueRouter',
      'vuex': 'Vuex',
      'axios': 'axios'
    } : {},
    optimization: {
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            compress: {
              drop_console: deepConsole
            }
          }
        })
      ]
    }
  },
  devServer: {
  }
}
