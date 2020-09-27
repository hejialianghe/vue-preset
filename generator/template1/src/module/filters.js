// 保留2位小数
export const priceFilter = price => {
  let ret
  if (!price) {
    ret = 0
  } else {
    ret = price / 100
  }
  return ret.toFixed(2)
}
// 保留1位小数
export const priceFilter1 = price => {
  let ret
  if (!price) {
    ret = 0
  } else {
    ret = price / 100
  }
  return ret.toFixed(1)
}
// 向上取整
export const priceCeil = price => {
  let ret
  if (!price) {
    ret = 0
  } else {
    ret = price / 100
  }
  return Math.ceil(ret)
}
// 截取2位余数
export const priceRemainder = price => {
  let ret
  if (!price) {
    ret = 0
  } else {
    ret = String((price / 100).toFixed(2)).split('.')
  }
  return ret[1]
}
// 取整数位
export const priceFront = price => {
  let ret
  if (price) {
    ret = String((price / 100).toFixed(2)).split('.')
    if (Number(ret[0]) === 0) {
      return `0.${ret[1]}`
    } else {
      return ret[0]
    }
  } else {
    return 0
  }
}
// 时间戳转换 月、日格式
export const turnData = time => {
  if (time === undefined) return ''
  let cDate = new Date(time)
  return cDate.getMonth() + 1 + '月' + cDate.getDate() + '日'
}
// 时间戳转换2018-09-11 02:30的格式
export const timeFilter = times => {
  if (times === undefined) return ''
  let time = new Date(times)
  let year = time.getFullYear()
  let month = time.getMonth() + 1
  let date = time.getDate()
  let hour = time.getHours()
  let minute = time.getMinutes()
  let second = time.getSeconds() // 秒 根据具体情况调用
  month = month < 10 ? '0' + month : month
  date = date < 10 ? '0' + date : date
  hour = hour < 10 ? '0' + hour : hour
  minute = minute < 10 ? '0' + minute : minute
  second = second < 10 ? '0' + second : second // 秒 根据具体情况调用
  return year + '-' + month + '-' + date + ' ' + hour + ':' + minute + ':' + second
}
// 时间戳转换 月、日格式
export const timeFilter2 = times => {
  let time = new Date(times)
  let year = time.getFullYear()
  let month = time.getMonth() + 1
  let date = time.getDate()
  month = month < 10 ? '0' + month : month
  date = date < 10 ? '0' + date : date
  return year + '年' + month + '月' + date + '日'
}
