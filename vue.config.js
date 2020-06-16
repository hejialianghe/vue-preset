const env = process.env
const isProd = env.VUE_APP_NODE_ENV === 'production'
const path = require('path')
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')
const webpack = require('webpack')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
module.exports = {
  publicPath: isProd ? `${env.WEBPACK_PATH}` : '/',
  configureWebpack: config => {
    if (isProd) {
      // lodash实现按需打包
      config.plugins.push(new LodashModuleReplacementPlugin())
      config.plugins.push(
        new webpack.DllReferencePlugin({
          context: __dirname, // 与DllPlugin中的那个context保持一致
          manifest: require('./dll/vendor.manifest.json')
        })
      )
      config.plugins.push(
        new AddAssetHtmlPlugin({
        // dll文件位置
          filepath: path.resolve(__dirname, './dll/*.js'),
          // dll 引用路径
          publicPath: './vendor',
          // dll最终输出的目录
          outputPath: './vendor',
          includeSourcemap: false
        })
      )
      // 混淆
      config.plugins.push(
        new UglifyJsPlugin({
          uglifyOptions: {
            compress: {
              drop_debugger: true,
              drop_console: true // 生产环境自动删除console
            },
            warnings: false
          },
          sourceMap: true,
          parallel: true, // 使用多进程并行运行来提高构建速度。默认并发运行数：os.cpus().length - 1。
          // 允许过滤哪些块应该被uglified（默认情况下，所有块都是uglified）。
          // 返回true以uglify块，否则返回false。
          chunkFilter: (chunk) => {
            // `vendor` 模块不压缩
            if (chunk.name === 'vendor') {
              return false
            }
            return true
          }
        })
      )
      // gzip压缩
      config.plugins.push(new CompressionWebpackPlugin({
        filename: '[path].gz[query]',
        algorithm: 'gzip',
        test: /\.js$/, // 匹配文件名
        threshold: 10240, // 对超过10k的数据进行压缩
        minRatio: 0.8
      })
      )
    }
  },
  devServer: {
  },
  chainWebpack: config => {
    // 分割代码
    config.optimization.splitChunks({
      chunks: 'all'
    })
    if (process.env.npm_config_report) {
      config
        .plugin('webpack-bundle-analyzer')
        .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
    }
  }
}
