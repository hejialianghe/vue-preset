const API = {}
const regExp = new RegExp(/.\/(\w+).js$/i)
const requireApi = require.context('.', true, /.js$/)

requireApi.keys().forEach(element => {
  const config = requireApi(element)
  if (regExp.test(element)) {
    (RegExp.$1 !== 'index') && (API[RegExp.$1] = config.default)
  } else {
    console.error(`${element}'api文件名配置错误，只支持英文和数字`)
  }
})

export default API
