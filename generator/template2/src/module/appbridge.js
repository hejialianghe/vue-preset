/**
 * @param {Function} callback 回调函数
 *
 */
function setupWebViewJavascriptBridge (callback) {
  if (window.WebViewJavascriptBridge) { return callback(WebViewJavascriptBridge) }
  if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback) }
  window.WVJBCallbacks = [callback]
  var WVJBIframe = document.createElement('iframe')
  WVJBIframe.style.display = 'none'
  WVJBIframe.src = 'xxyp://__bridge_loaded__'
  document.documentElement.appendChild(WVJBIframe)
  setTimeout(function () { document.documentElement.removeChild(WVJBIframe) }, 0)
}

/**
 * 启用webview动桥接设置
 * @param {String} cbName 注册的函数名
 * @param {Function} fn 回调函数
 */
function wbBridgeSetup (cbName, fn) {
  setupWebViewJavascriptBridge(function (bridge) {
    // console.log('设置成功')
    if (cbName && fn) {
      // console.log('注册函数', cbName, fn)
      bridge.registerHandler(cbName, fn)
    }
  })
}

/**
 * APP功能暴露接口
 * @param {String} type 调用那个功能 setTitle | getCity | toast | enableRefresh | showProgress
 * | getUserInfo | tel | contacts | share | isLogin | wxpay | alipay
 * @param params 各个功能需要的参数
 * @param {*} cfn 设置成功后的回调函数
 *
 */
function apwbBridge (type, params, cfn = function () {}) {
  // console.log('调用类型: ', type, params, cfn)
  let wbB = window.WebViewJavascriptBridge
  if (!wbB) {
    setTimeout(() => {
      wbB = window.WebViewJavascriptBridge
      // alert(wbB)
      // if (!wbB) console.error('任然无法使用window.WebViewJavascriptBridge对象')
      wbB && wbB.callHandler(type, params, cfn)
    }, 0)
  } else {
    wbB.callHandler(type, params, cfn)
  }
}

/**
 * 设置webview的标题
 * @param {String} content  标题名
 * @param {*} cnf 回调函数
 *
 */
function apSetTitle (content) {
  apwbBridge('setTitle', { title: content })
}

/**
 * 设置是否允许页面刷新
 * @param {Int} bol 是否云讯页面刷新 1 刷新 0 不刷新
 *
 */
function apEnableRefresh (bol) {
  apwbBridge('enableRefresh', { 'enableRefresh': bol })
}

/**
 * 定位城市
 * @param {*Function} cfn
 */
function apGetCity (cfn) {
  apwbBridge('getCity', undefined, cfn)
}

/**
 * toash
 * @param {*String} content 文本
 */
function apToast (content) {
  apwbBridge('toast', { content })
}
// 设置分享按钮
function apSetRightTitle (params) {
  apwbBridge('setRightTitle', params)
}

export {
  wbBridgeSetup,
  apwbBridge,
  apSetTitle,
  apEnableRefresh,
  apToast,
  apGetCity,
  apSetRightTitle
}
