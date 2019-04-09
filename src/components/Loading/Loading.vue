<template>
  <div class="loading">
    <div class="loading__container">
      <van-loading color="black" />
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'loading'
}
</script>

<style scoped lang="css">
.loading {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  z-index: 10000;
}
.loading__container {
  position: absolute;
  left: 0;
  right: 0;
  margin: 0 auto;
  top: 600px;
  width: 60px;
  height: 60px;
  padding: 30px;
  border-radius: 0.066667rem;
  color: white;
  text-align: center;
  background: rgba(0, 0, 0, 0.5);
}
</style>
