import axios from 'axios'
import {
  requestSuccessFunc,
  requestFailFunc,
  responseSuccessFunc,
  responseFailFunc
} from './interceptors'

// axios 默认配置
export const AXIOS_DEFAULT_CONFIG = {
  timeout: 36000,
  baseURL: process.env.VUE_APP_API_BASEURL
}

let axiosInstance = {}

axiosInstance = axios.create(AXIOS_DEFAULT_CONFIG)

// 注入请求拦截
axiosInstance.interceptors.request.use(requestSuccessFunc, requestFailFunc)
// 注入响应拦截
axiosInstance.interceptors.response.use(responseSuccessFunc, responseFailFunc)

export default axiosInstance
