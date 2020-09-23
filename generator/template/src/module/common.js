/**
 * 对某个对象进行排序
 * @param {Object} object 基本对象
 *
 */
function sortObjectKey (object) {
  let sortkeys = Object.keys(object).sort()
  let retObj = {}
  sortkeys.forEach(item => {
    retObj[item] = object[item]
  })
  return retObj
}

/**
 * 求下一个月第一天
 * @param {Date|String} date 日期
 * @param {Date|String} date 日期
 */
function nextMonth (date) {
  let nowDate, next
  if (date instanceof Date) {
    nowDate = date
  } else {
    nowDate = new Date(date)
  }
  let nowYear = nowDate.getFullYear()
  let nowMonth = nowDate.getMonth()
  if (nowDate.getMonth === 11) {
    // 月底， 选择下明年
    next = new Date(nowYear + 1, 1, 1)
  } else {
    next = new Date(nowYear, nowMonth + 1, 1)
  }
  return next
}
/**
 * 让滚动条回滚到顶部
 */
export function scrollTop () {
  document.body.scrollTop = 0
}
/**
 * 将一个日期分解为年，月，日
 * @param {Date|String} date 日期
 *
 */
function resolveDate (date) {
  if (typeof date === 'string') date = parseInt(date)
  if (typeof date === 'number') date = new Date(date)
  if (date instanceof Date) {
    return {
      year: date.getFullYear(),
      month: date.getMonth(),
      date: date.getDate()
    }
  } else {
    return null
  }
}

/**
 * 返回 2017-08-18 的日期格式
 * @param {Object} dateObj  分解后的日期格式
 */
function dateFormatBar (dateObj) {
  dateObj = resolveDate(dateObj)
  // debugger
  let month = dateObj.month + 1
  let date = dateObj.date
  if (month < 10) month = '0' + month
  if (date < 10) date = '0' + date
  return dateObj.year + '-' + month + '-' + date
}

/**
 * 返回 20170818 的日期格式
 * @param {Object} dateObj  分解后的日期格式
 */
function dateFormatMMdd (dateObj) {
  dateObj = resolveDate(dateObj)
  // debugger
  let month = dateObj.month + 1
  let date = dateObj.date
  if (month < 10) month = '0' + month
  if (date < 10) date = '0' + date
  return dateObj.year + '' + month + '' + date
}
// App右上角图标2x,3x图判断
function checktellCancel (imgName) {
  // 获取适口大小
  let phoneviewport = window.devicePixelRatio

  let iconurl = {
    urlLowversion:
      'https://cdn.xiaoxiangyoupin.com/image/' + imgName + '@2x.png',
    url2x: 'https://cdn.xiaoxiangyoupin.com/image/' + imgName + '@2x.png',
    url3x: 'https://cdn.xiaoxiangyoupin.com/image/' + imgName + '@3x.png'
  }
  // 获取app版本号
  let ua = navigator.userAgent
  let reg = /instalment\/([\d]+)\.([\d]+)\.([\d]+)/
  let rets = ua.match(reg)
  if (!rets) {
    return iconurl.urlLowversion
  }
  let ret1 = Number(rets[1])
  let ret2 = Number(rets[2])
  let ret3 = Number(rets[3])
  if (
    ret1 < 3 ||
    (ret1 === 3 && ret2 < 5) ||
    (ret1 === 3 && ret2 === 5 && ret3 < 8)
  ) {
    return iconurl.urlLowversion
  } else {
    if (phoneviewport >= 3) {
      return iconurl.url3x
    } else if (phoneviewport >= 2) {
      return iconurl.url2x
    } else if (phoneviewport < 2) {
      return iconurl.urlLowversion
    }
  }
}
// 移动端滚动穿透问题解决方案
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
      // scrollTop lost after set position:fixed, restore it back.
      document.scrollingElement.scrollTop = scrollTop
    }
  }
})('modal-open')

function assert (condition, msg) {
  if (!condition) throw new Error(`[Apior] ${msg}`)
}

function forceJump () {
  location.replace(`https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx29770e85a4b89826&redirect_uri=${encodeURIComponent(location.href)}&response_type=code&scope=snsapi_base&state=share#wechat_redirect`)
}
function isIos () {
  return !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
}
function lazyLoadSrcMatch (url) {
  return url && url.match(/\/upload\/manager\/(\d+)x(\d+)_(\d+)/)
}
export {
  sortObjectKey,
  nextMonth,
  dateFormatBar,
  dateFormatMMdd,
  checktellCancel,
  ModalHelper,
  assert,
  forceJump,
  isIos,
  lazyLoadSrcMatch
}
