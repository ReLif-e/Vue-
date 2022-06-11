<template>
  <!-- 放置一个图标1 -->
  <div style="display:inline-block">
    <svg-icon icon-class="fullscreen" class="fullscreen" @click="toggles" />
  </div>
</template>

<script>
import screenfull from 'screenfull'
export default {
  name: 'ScreenFull',
  methods: {
    toggles() {
      screenfull.toggle()
    }
  }
}
</script>

<style lang="scss" scoped>
.fullscreen {
  margin-right: 10px;
  width: 20px;
  height: 20px;
  color: #fff;
  cursor: pointer;
}
</style>
