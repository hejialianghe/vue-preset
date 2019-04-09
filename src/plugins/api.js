import axios from './axios'
import _pick from 'lodash/pick'
import _assign from 'lodash/assign'
import _isEmpty from 'lodash/isEmpty'

import { assert } from '@/module/common'
import { API_DEFAULT_CONFIG } from '@/config'
import API_CONFIG from '@/service/api'

class MakeApi {
  constructor (options) {
    this.api = {}
    this.apiBuilder(options)
  }

  apiBuilder ({
    sep = '|',
    config = {},
    mock = false,
    debug = false,
    mockBaseURL = ''
  }) {
    Object.keys(config).map(namespace => {
      this._apiSingleBuilder({
        namespace,
        mock,
        mockBaseURL,
        sep,
        debug,
        config: config[namespace]
      })
    })
  }
  _apiSingleBuilder ({
    namespace,
    sep = '|',
    config = {},
    mock = false,
    debug = false,
    mockBaseURL = ''
  }) {
    config.forEach(api => {
      const { name, desc, params, method, path, mockPath, needMock, responseType } = api
      let apiname = `${namespace}${sep}${name}` // 命名空间
      let url = mock ? mockPath : (needMock ? mockPath : path) // 控制走 mock 还是线上
      let baseURL = mock && mockBaseURL
      let assignData = responseType ? { responseType } : {}
      if (baseURL) {
        assignData = {
          url,
          desc,
          baseURL,
          method
        }
      } else {
        assignData = {
          url,
          desc,
          method
        }
      }
      // 通过全局配置开启调试模式。
      debug && console.info(`调用服务层接口${apiname}，接口描述为${desc}`)
      debug && assert(name, `${path} :接口name属性不能为空`)
      debug &&
        assert(path.indexOf('/') === 0, `${path} :接口路径path，首字符应为/`)

      Object.defineProperty(this.api, `${namespace}${sep}${name}`, {
        value (outerParams, outerOptions) {
          // 请求参数自动截取。
          // 请求参数不穿则发送默认配置参数。
          let _data
          if (outerOptions && outerOptions.headers && /multipart\/form-data/i.test(outerOptions.headers['Content-Type'])) {
            _data = outerParams
          } else {
            _data = _isEmpty(outerParams)
              ? params
              : _pick(_assign({}, params, outerParams), Object.keys(params))
          }
          return axios(
            _normoalize(
              _assign(
                assignData,
                outerOptions
              ),
              _data
            )
          )
        }
      })
    })
  }
}

function _normoalize (orginOptions, data) {
  let options = JSON.parse(JSON.stringify(orginOptions))
  let url = options.url
  // 动态路由
  // 1.查看路径中是否存有:
  if (url.match(/:([^.]*)/)) {
    // 2.将冒号后的参数取出并在传递的参数中得到结果并将其替换
    let param = url.match(/:([^.]*)/)[1]
    let p = data[param]
    url = url.replace(/:([^.]*)/, p)
    delete data[param]
    options.url = url
  }
  // 这里可以做大小写转换，也可以做其他类型 RESTFUl 的兼容
  if (options.method === 'POST') {
    options.data = data
  } else if (options.method === 'GET') {
    options.params = data
  }
  return options
}
// 注入模型和全局配置，并暴露出去
export default new MakeApi({
  config: API_CONFIG,
  ...API_DEFAULT_CONFIG
})['api']
