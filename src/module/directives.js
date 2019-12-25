/**
 * 这里的指令是用于自动扩展显示区域高度
 */
const extendHeight = {
  inserted: (el) => {
    let height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
    let disTopY = el.getBoundingClientRect().top
    el.style.minHeight = `${height - disTopY}px`
  }
}

export default {
  extendHeight
}
