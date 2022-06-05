<template>
  <div style="margin-top: 70px">
    <upload-excel :on-success="handleSuccess" :before-upload="beforeUpload" />
  </div>
</template>

<script>
import { formatExcelDate } from '@/utils'
import { importEmployee } from '@/api/employees'
export default {
  name: 'Import',

  methods: {
    beforeUpload(file) {
      const isLt1M = file.size / 1024 / 1024 < 1

      if (isLt1M) {
        return true
      }

      this.$message({
        message: 'Please do not upload files larger than 1m in size.',
        type: 'warning'
      })
      return false
    },
    async handleSuccess({ results, header }) {
      // console.log('这是上传的结果:', results, header)
      // console.log('转换为英文:', this.transExcel(results))
      const data = this.transExcel(results)
      try {
        // 发送请求
        const res = await importEmployee(data)

        // 根据结果提醒用户
        this.$message.success(res.message)

        // 返回上一级
        this.$router.back()
      } catch (e) {
        this.$message.error(e.message)
      }
    },
    // 传入的是上面传入后的结果
    transExcel(results) {
      const mapInfo = {
        '入职日期': 'timeOfEntry',
        '手机号': 'mobile',
        '姓名': 'username',
        '转正日期': 'correctionTime',
        '工号': 'workNumber',
        '部门': 'departmentName',
        '聘用形式': 'formOfEmployment'
      }

      // 遍历中文的数据  results是一个装中文的对象,遍历他获取中文属性并转化为英文
      return results.map(zhObj => {
        // 创建一个装英文的对象
        const enObj = {}

        // 1.创建一个变量装中文的key
        const zhKeys = Object.keys(zhObj)

        // 2.遍历刚刚取出来的中文keys将其转换为英文
        zhKeys.forEach(zhKey => {
          // 通过映射关系通过中文找到对应的英文
          const enkey = mapInfo[zhKey]
          // 如果是入职时间或者是转正日期，那么就格式化一下
          if (enkey === 'timeOfEntry' || enkey === 'correctionTime') {
            // enObj[enkey] = formatExcelDate(zhObj[zhKey])
            enObj[enkey] = new Date(formatExcelDate(zhObj[zhKey]))
          } else {
            // 把找到的英文拼接到装英文对象里面,只是把前面的属性名转换成了英文，而不是值
            enObj[enkey] = zhObj[zhKey]
          }
        })
        // 返回一个装英文的对象
        return enObj
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
