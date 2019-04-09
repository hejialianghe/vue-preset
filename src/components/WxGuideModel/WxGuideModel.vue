<template>
  <div class="shareGuideMask" @click.self="changeShareModelShow">
    <div class="shareGuideMask__img">
      <img src="" alt="">
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "shareGuideMask",
  methods: {
    changeShareModelShow() {
      global.vbus.$emit("wxGuideModel_show", false);
    }
  }
};
</script>

<style scoped lang="scss">
.shareGuideMask {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
  &__img {
    position: absolute;
    right: 0;
    top: 0;
    width: 328px;
    height: 180px;
    z-index: 1000;
  }
}
</style>
