<template>
  <div class="department-container">
    <div class="app-container">
      <el-card>
        <!-- 具体页面结构 -->
        组织架构
        <!-- native给子组件的根标签添加事件 -->
        <niubi />
      </el-card>
    </div>
  </div>
</template>
<script>
import niubi from './niupiti.vue'
export default {
  components: {
    niubi
  }
}
</script>
