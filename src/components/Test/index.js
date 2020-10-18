import Vue from 'vue'

const Test = Vue.extend({
  render (createElement) {
    return createElement('div', {
      attars: {
        class: 'test'
      },
      domProps: {

      }
    }, this.name)
  },
  data () {
    return {
      name: 'test',
      flag: true
    }
  },
  methods: {
    show (flag) {
      this.flag = true
    }
  }
})
const _Test = new Test()
const EleTost = document.createElement('div')
EleTost.className = 'test-toast'
const body = document.querySelector('body')
body.appendChild(EleTost)
_Test.$mount('.test-toast')
