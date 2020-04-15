<template>
  <div>
      我是父组件：{{msg}}
      <!-- <child @update:msg="msg=$event" :msg="msg"></child> -->
      <child :msg.sync="msg"></child>
  </div>
</template>

<script>
import child from './child'
export default {
  data () {
    return {
      msg: ''
    }
  },
  components: {
    child
  }
}
</script>

<style>

</style>
