// 取小数点后几位
export const priceFilter = (price, digit = 2) => {
  let ret
  if (!price) {
    ret = 0
  } else {
    ret = price / 100
  }
  return ret.toFixed(digit)
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
// 取余数位
export const priceRemainder = (price, digit = 2) => {
  let ret
  if (!price) {
    ret = 0
  } else {
    ret = String((price / 100).toFixed(digit)).split('.')
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
// xx月xx日
export const turnData = time => {
  // 时间戳转换 月、日格式
  if (time === undefined) return ''
  let cDate = new Date(time)
  return cDate.getMonth() + 1 + '月' + cDate.getDate() + '日'
}
// yyyy-mm-dd-hh-mm-ss
export const timeFilter = times => {
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
