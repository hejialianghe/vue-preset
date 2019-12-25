function assert (condition, msg) {
  if (!condition) throw new Error(`[Apior] ${msg}`)
}
/**
 * 获取参数
 * @param name
 * @returns {null}
 */
function getQueryString (name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
  var r = window.location.search.substr(1).match(reg)
  if (r !== null) return unescape(r[2])
  return null
}
/** 移动端滚动穿透问题解决方案 */
const ModalHelper = (function (bodyCls) {
  var scrollTop
  return {
    afterOpen: function () {
      scrollTop = document.scrollingElement.scrollTop
      document.body.classList.add(bodyCls)
      document.body.style.top = -scrollTop + 'px'
    },
    beforeClose: function () {
      document.body.classList.remove(bodyCls)
      document.scrollingElement.scrollTop = scrollTop
    }
  }
})('modal-open')
/** 判断是否是ios */
function isIos () {
  return !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
}
/** 判断是否是安卓 */
function isAndroid () {
  /* istanbul ignore next */
  return /android/.test(navigator.userAgent.toLowerCase())
}
export {
  assert,
  getQueryString,
  ModalHelper,
  isIos,
  isAndroid
}
