<template>
  <div>
    <div>
      <page-tool>
        <!-- 左侧 -->
        <template #left>
          <i class="el-icon-info" />
          <span>总共{{ total }}条数据</span>
        </template>

        <!-- 右侧 -->
        <template #right>
          <el-button round size="small" type="primary" @click="$router.push('/employees/import')">导入Excel</el-button>
          <el-button round size="small" type="warning" @click="derive">导出Excel</el-button>
          <el-button round size="small" type="success" @click="ShowDialog=true">新增员工</el-button>
        </template>
      </page-tool>
    </div>
    <el-card>
      <el-table :data="Employees">

        <el-table-column label="序号" type="index" />
        <el-table-column label="姓名" prop="username" />
        <el-table-column label="头像">
          <template v-slot="{row}">
            <img class="num" :src="row.staffPhoto" alt="">
          </template>
        </el-table-column>
        <el-table-column label="工号" prop="workNumber" />
        <el-table-column label="聘用形式" prop="formOfEmployment">
          <template v-slot="{row}">
            {{ formEmployees(row.formOfEmployment) }}
          </template>
        </el-table-column>
        <el-table-column label="部门" prop="departmentName" />
        <el-table-column sortable label="入职时间" prop="timeOfEntry">
          <template v-slot="{row}">
            {{ formData(row.timeOfEntry) }}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template v-slot="{row}">
            <el-button type="text">查看</el-button>
            <el-button type="text">分配角色</el-button>
            <el-button type="text" @click="hDel(row.id)">删除角色</el-button>
          </template>
        </el-table-column>

      </el-table>
      <el-pagination
        :current-page.sync="q.page"
        :page-sizes="[2, 6, 7, 8]"
        layout="sizes, prev, pager, next"
        :page-size="q.size"
        :total="total"
        @size-change="handleasizeChange"
        @current-change="handlecurrentChange"
      />
    </el-card>
    <el-dialog
      :total="total"
      :visible.sync="ShowDialog"
      title="新增员工"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      @close="hClose"
    >
      <Empdialog
        ref="AddEmploy"
        @success="hsuccess"
        @close="ShowDialog = false"
      />
    </el-dialog>
  </div>

</template>

<script>
import { delEmployee, Getemploy } from '@/api/employees'
// 枚举数据
import employees from '@/constant/employees'

// 导入弹框
import Empdialog from './empDialog.vue'

import dayjs from 'dayjs'

const hireTypeMap = {}
// 可选作业: 把 forEach 变成 reduce
// 执行循环后达成目标: { 1: '正式', 2: '非正式' }
employees.hireType.forEach(item => {
  hireTypeMap[item.id] = item.value
})
export default {
  components: {
    Empdialog
  },
  data() {
    return {
      Employees: [],
      abc: [],
      total: 1,
      q: {
        page: 1,
        size: 2
      },
      ShowDialog: false // 弹框的显示与否
    }
  },
  created() {
    this.employ()
  },
  methods: {
    // 打开页面就获取数据
    async employ() {
      // 调用接口
      const res = await Getemploy(this.q)

      // 返回数据等于自定义的空壳
      this.Employees = res.data.rows
      // console.log(this.Employees)

      // 总条数
      this.total = res.data.total
    },
    formEmployees(code) { // 调用constant/employees文件里面的hireType方法,同通过传递来的id去里面找对应的中文并渲染
      // const res = employees.hireType.find(item => item.id === code).value
      // console.log(res)
      // if (res) {
      //   return res
      // } else {
      //   return '未知'
      // }
      return hireTypeMap[code]
    },

    // 分页事件，改变分页时每个页面渲染的数据
    handlecurrentChange(page) {
      this.q.page = page
      this.employ()
    },
    handleasizeChange(size) {
      this.q.size = size
      this.employ()
    },

    // 点击删除按钮
    async hDel(id) {
      try {
        await this.$confirm('确定删除？', '提示', { type: 'warning' })
        // console.log(id)

        // 调用接口把id传递过去
        const res = await delEmployee(id)
        console.log(res)

        // 根据结果提醒用户
        this.$message.success(res.message)

        // 如果渲染的数据为一条，且渲染的页面大于一那么在删除后往前一页渲染
        if (this.Employees.length === 1 && this.q.page > 1) {
          this.q.page--
        }

        // 重新渲染页面
        this.employ()
      } catch (e) {
        // 如果点击的是取消那么就返回，如果是错误就提示错误
        if (e === 'cancel') return
        // console.log(e)

        this.$message.error(e.message)
      }
    },
    formData(time) {
      return dayjs(time).format('YYYY-MM-DD')
    },
    hsuccess() {
      // 关闭dialog
      this.ShowDialog = false

      // 添加以后跳到最后一页
      this.total++
      this.q.page = Math.ceil(this.total / this.q.size)
      // 重新渲染
      this.employ()
    },
    hClose() {
      this.$refs.AddEmploy.resetForm()
    }
    // 导出
    // async  derive() {
    //   import('@/vendor/Export2Excel').then(excel => {
    //     // excel表示导入的模块对象
    //     // console.log(excel)
    //     excel.export_json_to_excel({
    //       header: this.Employees, // 表头 必填
    //       data: this.Employees, // 具体数据 必填
    //       filename: 'excel-list', // 文件名称
    //       autoWidth: true, // 宽度是否自适应
    //       bookType: 'xlsx' // 生成的文件类型

    //     })
    //   })
    //   const res = await Getemploy()
    //   console.log(res)
    // }

  }
}
</script>

<style>
.num {
  width: 50px;
  height: 50px;
  border-radius:50% ;
}
</style>
