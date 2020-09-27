import axios from 'axios'
import qs from 'qs'
const ajx = axios.create({
  baseURL: process.env.VUE_APP_API_BASEURL, // 设定请求环境(测试or生产)，由DefinePlugin 插件定义
  timeout: 36000
})
const get = ajx.get
const post = ajx.post
const api = {
}
ajx.interceptors.request.use(function (config) {
  return config
})

ajx.interceptors.response.use(function (res) {
  let heads = res.data.heads
  // let reqUrl = res.config.url
  if (heads.code !== 200) {
    return Promise.reject(heads.message || heads.errorMsg || `业务错误:${heads.code}`)
  }
  return res.data.body
}, function (error) {
  // 这里 不reject 导致 promise变成 resolve 状态
  if (error) {
    return Promise.reject(String(error))
  }
})

/**
 * 将对象转,方便 x-www-from-urlencoded格式数据传输
 */
export function fromUrlcode (body) {
  return qs.stringify(body)
}

export {
  ajx,
  get,
  post,
  api
}
