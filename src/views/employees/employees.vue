<template>
  <div class="department-container">
    <div class="app-container">
      <el-card>
        <!-- 具体页面结构 -->
        金剑
        <super :count.sync="num" />
      </el-card>
    </div>
  </div>
</template>
<script>
import Super from './Super.vue'
export default {
  components: {
    Super
  },
  data() {
    return {
      num: 1
    }
  }
}
</script>
