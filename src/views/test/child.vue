<template>
  <div>
      我是子组件：{{msg}}
      <button @click="$emit('update:msg','我是改变值的')">点击</button>
  </div>
</template>

<script>
export default {
  props: ['msg']

}
</script>

<style>

</style>
