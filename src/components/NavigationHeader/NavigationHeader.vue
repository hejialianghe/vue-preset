<template>
  <div class="navigation-header-main">
    <div class="left-btn">
      <slot name="left">
        <span @click="routerBack">
          <i class="am-icon-fanhui"></i>返回
        </span>
      </slot>
    </div>
    <div class="title-text">{{newTitle}}</div>
    <div class="right-btn">
      <slot name="right" />
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      newTitle: this.title
    }
  },
  props: [
    'title'
  ],
  methods: {
    routerBack: function () {
      this.$router.back()
    },
    changeTitle: function (affairTitle) {
      this.newTitle = affairTitle
    }
  },
  created () {
    global.vbus.$on('affairTitle', (affairTitle) => {
      this.changeTitle(affairTitle)
      global.vbus.$off('affairTitle')
    })
  }
}

</script>
<style lang="scss" scoped>
  .navigation-header-main{
    height: 88px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    border-top: 1px solid #eff0f0;
    box-sizing: border-box;
    .left-btn{
      position: absolute;
      left: 20px;
      display: flex;
      align-items: center;
      span{
        font-size: 30px;
      }
      i{
        position: relative;
        top: -1px;
        margin-right: 11px;
        font-size: 26px;
      }
    }
    .title-text{
      font-size: 35px;
      color: #010101;
    }
    .right-btn{
      position: absolute;
      right: 0px;
    }
  }
</style>
