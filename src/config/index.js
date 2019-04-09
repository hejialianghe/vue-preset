// 当前宿主平台 兼容多平台应该通过一些特定函数来取得
export const HOST_PLATFORM = 'WEB'

// 是否强制所有请求访问本地 MOCK
export const AJAX_LOCALLY_ENABLE = false
// 是否开启监控
export const MONITOR_ENABLE = true
// 路由默认配置，路由表并不从此注入
export const ROUTER_DEFAULT_CONFIG = {
  waitForData: true,
  transitionOnLoad: true
}
// axios 默认配置
export const AXIOS_DEFAULT_CONFIG = {
  timeout: 36000,
  baseURL: process.env.VUE_APP_API_BASEURL
}

// vuex 默认配置
export const VUEX_DEFAULT_CONFIG = {
  strict: process.env.NODE_ENV !== 'production'
}

// API 默认配置
export const API_DEFAULT_CONFIG = {
  mockBaseURL: '', // mock请求的BaseURL
  mock: false, // 开启所有api的mock模式
  debug: false, // 开启请求debug
  sep: '/' // 请求路径地址
}

// 还有一些方便开发的配置
export const CONSOLE_REQUEST_ENABLE = false // 开启请求参数打印
export const CONSOLE_RESPONSE_ENABLE = false // 开启响应参数打印
