
const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const webpack = require('webpack')

module.exports = {
  entry: {
    vendor: ['vue', 'vuex', 'vue-router', 'vuex-persistedstate', 'axios'],
    util: ['lodash']
  },
  output: {
    path: path.resolve(__dirname, 'dll'), // 生成的文件存放路径
    filename: '[name].dll.js', // 生成的文件名（默认为verdor.dll.js）
    library: 'dll_[name]'// 生成文件的映射关系，与下面的DllPlugin对象
  },
  plugins: [
    new CleanWebpackPlugin(), // clean-wepback-plugin目前已经更新到2.0.0，不需要传参数path
    // manifest.json 描述动态链接库包含了哪些内容
    new webpack.DllPlugin({
      name: 'dll_[name]',
      path: path.join(__dirname, 'dll', '[name].manifest.json'),
      context: __dirname
    })
  ]
}
