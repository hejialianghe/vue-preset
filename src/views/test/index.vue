<template>
  <div>
      <child>
      <!-- 作用域插槽，任何没有被包裹在带有 v-slot 的 <template> 中的内容都会被视为默认插槽的内容 -->
          <template>
              <div>内容1</div>
          </template>

        <!-- 具名插槽 -->
         <template v-slot:header>
              <div>头部2</div>
          </template>

        <!-- 拿到slot内部组件的内容在父作用域显示 -->
         <template #main="{user}">
             <!--  v-slot:main="{user}" 简写#main="{user}"-->
              <div>{{user.name}}</div>
          </template>

      </child>
  </div>
</template>

<script>
import child from './child'
export default {
  data () {
    return {
    }
  },
  components: {
    child
  }
}
</script>

<style>

</style>
