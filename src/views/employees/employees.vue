<template>
  <div>
    <page-tool>
      <!-- 左侧 -->
      <template #left>
        <i class="el-icon-info" />
        <span>总共10条数据</span>
      </template>

      <!-- 右侧 -->
      <template #right>
        <el-button round size="small" type="primary">导入Excel</el-button>
        <el-button round size="small" type="warning">导出Excel</el-button>
        <el-button round size="small" type="success">新增员工</el-button>
      </template>
    </page-tool>
  </div>
</template>

<script>
export default {
}
</script>

<style>

</style>
