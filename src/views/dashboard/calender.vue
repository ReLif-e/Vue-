<template>
  <el-calendar v-model="curDate">
    <!-- <template
      slot="dateCell"
      slot-scope="{date, data}"
    > -->
    <template
      #dateCell="{ date }"
    >
      <!-- {{ date }} ------------- -->
      <!-- 数组方法的灵活运用: -->
      <!-- 先用 split() 按照分隔符切割成数组: ['2022', '06', '11'] -->
      <!-- 再取出最后一个元素, pop() 删除最后一个元素并返回 -->
      <!-- {{ data.day.split('-').pop() }} -->
      <!-- substr: 截取字符串, 传入索引 -->
      <!-- {{ data.day.substr(8) }} -->
      <!-- getDate() 获取当前的日 -->
      <!-- {{ date.getDate() }} <span class="rest">{{ isWeekend(date) ? '休' : '' }}</span> -->
      {{ date.getDate() }} <span class="rest">{{ isWeekend(date) ? '休' : '' }}</span>
    </template>
  </el-calendar>
</template>

<script>
export default {
  data() {
    return {
      curDate: new Date()
    }
  },
  methods: {
    isWeekend(date) {
      return date.getDay() === 0 || date.getDay() === 6
    }
  }
}
</script>

<style lang="scss" scoped>
.select-box {
  display: flex;
  justify-content: flex-end;
}

::v-deep .el-calendar-day {
  height:  auto;
 }
::v-deep .el-calendar-table__row td::v-deep .el-calendar-table tr td:first-child, ::v-deep .el-calendar-table__row td.prev{
  border:none;
 }
.date-content {
  height: 40px;
  text-align: center;
  line-height: 40px;
  font-size: 14px;
}
.date-content .rest {
  color: #fff;
  border-radius: 50%;
  background: rgb(250, 124, 77);
  width: 20px;
  height: 20px;
  line-height: 20px;
  display: inline-block;
  font-size: 12px;
  margin-left: 10px;
}
.date-content .text{
  width: 20px;
  height: 20px;
  line-height: 20px;
 display: inline-block;

}
::v-deep .el-calendar-table td.is-selected .text{
   background: #409eff;
   color: #fff;
   border-radius: 50%;
 }
::v-deep .el-calendar__header {
   display: none
 }
</style>
