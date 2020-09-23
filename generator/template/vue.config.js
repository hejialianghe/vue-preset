const env = process.env;
const isProd = process.env.NODE_ENV === 'production'
const deepConsole = process.env.VUE_APP_SERVEN === 'PROD'
const TerserPlugin = require('terser-webpack-plugin')
module.exports = {
  productionSourceMap: false,
  baseUrl: isProd ? `${env.WEBPACK_PATH}` : '/',
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
  css: {
    loaderOptions: {
      // 给 sass-loader 传递选项
      sass: {
        data: `@import "@/assets/scss/mixin.scss";`
      }
    }
  }
};
