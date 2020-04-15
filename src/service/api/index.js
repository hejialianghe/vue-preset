const API = {}
const regExp = new RegExp(/.\/(\w+).js$/g)

const requireApi = require.context('.', true, /[^index].js$/)
requireApi.keys().forEach(element => {
  const config = requireApi(element)
  if (regExp.test(element)) {
    API[RegExp.$1] = config.default
  }
})

export default API
