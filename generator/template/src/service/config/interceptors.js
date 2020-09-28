import qs from 'qs' // 开启响应参数打印
import axios from 'axios'
import router from '@/router'
import { OLD_REQUEST } from '@/module/config'

// 还有一些方便开发的配置
export const CONSOLE_REQUEST_ENABLE = false // 开启请求参数打印
export const CONSOLE_RESPONSE_ENABLE = false
export function requestSuccessFunc (config) {
  // 保存最近一次组件的请求的信息 401时重新发起
  OLD_REQUEST.push(
    {
      tmpUrl: config.url,
      tmpData: config.data,
      method: config.method
    }
  )
  !config.noShowLoading && global.vbus.$emit('loading_show', true)
  // 开启请求参数打印
  CONSOLE_REQUEST_ENABLE && console.info('请求参数打印:', `url: ${config.url}`, config)
  // 处理请求体携带参数格式
  if (
    config.method.toLocaleLowerCase() === 'post' ||
    config.method.toLocaleLowerCase() === 'put' ||
    config.method.toLocaleLowerCase() === 'delete'
  ) {
    if (!config.noStringify) {
      config.data = qs.stringify(config.data)
    }
  }
  // 请求头添加access_token
  try {
    let userIdentity = sessionStorage.getItem('userIdentity') || null
    userIdentity = JSON.parse(userIdentity)
    let type = Object.prototype.toString.call(userIdentity) === '[object Object]'
    if (type && userIdentity !== null) {
      config.headers.Authorization = userIdentity.access_token
    }
  } catch (err) {
    global.vbus.$emit('toast_show', String(err))
  }

  return config
}
export function requestFailFunc (error) {
  !error.noShowLoading && global.vbus.$emit('loading_show', false)
  !error.noShowDefaultError && global.vbus.$emit('toast_show', error.message)
  return Promise.reject(error) // 在调用的那边可以拿到(catch)你想返回的错误信息
}

export function responseSuccessFunc (res) {
  // 开启请求参数打印
  CONSOLE_RESPONSE_ENABLE && console.info('响应数据打印:', `url: ${res.config.url}`, res.data)
  let result = res.data
  // 开启响应数据打印
  !res.config.noShowLoading && global.vbus.$emit('loading_show', false)
  // 根据返回的code值来做不同的处理（和后端约定）
  switch (result.ok) {
    case true:
      return result || {}
    default:
      // 业务中还会有一些特殊 code 逻辑，我们可以在这里做统一处理，也可以下方它们到业务层
      let message = result.err.msg  || '服务器错误'
      if (!res.config.noShowDefaultError) {
        global.vbus.$emit('toast_show', message)
      }
      if (result.err && result.err.code === 401) {
        getAccessToken()
      }
      return Promise.reject(result.err || result)
  }
}

export function responseFailFunc (err) {
  if (err && err.response) {
    switch (err.response.status) {
      case 400:
        err.message = '请求错误'
        break

      case 401:
        err.message = '未授权，请登录'
        break

      case 403:
        err.message = '拒绝访问'
        break

      case 404:
        err.message = `请求地址出错: ${err.response.config.url}`
        break

      case 408:
        err.message = '请求超时'
        break

      case 500:
        err.message = '服务器内部错误'
        break

      case 501:
        err.message = '服务未实现'
        break

      case 502:
        err.message = '网关错误'
        break

      case 503:
        err.message = '服务不可用'
        break

      case 504:
        err.message = '网关超时'
        break

      case 505:
        err.message = 'HTTP版本不受支持'
        break

      default:
    }
  }
  !err.response.config.noShowDefaultError && global.vbus.$emit('toast_show', err.message)
  !err.response.config.noShowLoading && global.vbus.$emit('loading_show', false)
  return Promise.reject(err)
}

function getAccessToken () {
  let userIdentity = sessionStorage.getItem('userIdentity') || null
  userIdentity = JSON.parse(userIdentity)
  if (!userIdentity || !userIdentity.refresh_token) {
    global.vbus.$emit('toast_show', '身份信息过期，请重新登陆!')
    setTimeout(function () {
      router.push({ name: 'login' })
    }, 1000)
  }
  axios.post(`${process.env.VUE_APP_API_BASEURL}/api/user/create`, null, {
    headers: {
      Authorization: userIdentity.refresh_token
    }
  }).then(res => {
    userIdentity.access_token = res.data.data[0].access_token
    sessionStorage.setItem('userIdentity', JSON.stringify(userIdentity))
  }).catch(err => {
    global.vbus.$emit('toast_show', err.msg || '身份信息过期，请重新登陆!')
    setTimeout(function () {
      router.push({ name: 'login' })
    }, 1000)
  })
}
