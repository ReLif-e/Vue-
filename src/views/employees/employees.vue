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
          <el-button v-allow="'export_Exlcel'" round size="small" type="primary" @click="$router.push('/employees/import')">导入Excel</el-button>
          <el-button v-allow="'Del_Exlcel'" round size="small" type="warning" @click="derive">导出Excel</el-button>
          <el-button v-allow="'export_add'" round size="small" type="success" @click="ShowDialog=true">新增员工</el-button>
        </template>
      </page-tool>
    </div>
    <el-card>
      <el-table :data="Employees">

        <el-table-column label="序号" type="index" />
        <el-table-column label="姓名" prop="username" />
        <el-table-column label="头像">
          <template v-slot="{row}">
            <!-- <img class="num" :src="row.staffPhoto" alt=""> -->
            <ImageHolder :src="row.staffPhoto" />
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
            <!-- 去掉？id=  的形式 -->
            <el-button type="text" @click="$router.push('./employees/detail/' + row.id)">查看</el-button>

            <!-- id？的方法传参 -->
            <!-- <el-button type="text" @click="$router.push('./employees/detail?id=' + row.id)">查看</el-button> -->
            <el-button type="text" @click="Assign(row.id)">分配角色</el-button>
            <el-button type="text" @click="hDel(row.id)">删除角色</el-button>
          </template>
        </el-table-column>

      </el-table>

      <!-- 分页的 -->
      <el-pagination
        :current-page.sync="q.page"
        :page-sizes="[5, 6, 7, 8]"
        layout="sizes, prev, pager, next"
        :page-size="q.size"
        :total="total"
        @size-change="handleasizeChange"
        @current-change="handlecurrentChange"
      />
    </el-card>

    <!-- 新增员工的 -->
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

    <!-- 分配角色 -->
    <el-dialog
      :total="total"
      :visible.sync="ShowDialogRole"
      title="分配角色"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      @closed="$refs.AtryIds.AssigIds()"
    >
      <AssigRole
        :id="tryId"
        ref="AtryIds"
        @closeRole="ShowDialogRole=false"
      />
    </el-dialog>
  </div>

</template>

<script>
// 按需导入接口
import { delEmployee, Getemploy } from '@/api/employees'

// 枚举数据
import employees from '@/constant/employees'

// 导入新增员工子组件弹框
import Empdialog from './empDialog.vue'

// 导入格式化的包
import dayjs from 'dayjs'

// 导入分配角色的子组件弹框
import AssigRole from './assigRose.vue'

const hireTypeMap = {}
// 可选作业: 把 forEach 变成 reduce
// 执行循环后达成目标: { 1: '正式', 2: '非正式' }
employees.hireType.forEach(item => {
  hireTypeMap[item.id] = item.value
})
export default {
  components: {
    Empdialog,
    AssigRole

  },
  data() {
    return {
      // 获取数据以后拿来储存数据后渲染的空数组
      Employees: [],

      // 数据的总条数
      total: 1,

      // 分页数据
      q: {
        page: 1,
        size: 5
      },

      // 弹框的显示与否
      ShowDialog: false, // 新增员工的弹框
      ShowDialogRole: false, // 分配角色的弹框

      // 传递到子组件的id
      tryId: ''
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

    // 调用constant/employees文件里面的hireType方法,同通过传递来的id去里面找对应的中文并渲染
    formEmployees(code) {
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

    // 格式化时间
    formData(time) {
      return dayjs(time).format('YYYY-MM-DD')
    },

    // 子组件触发的关闭事件
    hsuccess() {
      // 关闭dialog
      this.ShowDialog = false

      // 添加以后跳到最后一页
      this.total++
      this.q.page = Math.ceil(this.total / this.q.size)
      // 重新渲染
      this.employ()
    },

    // 子组件关闭时出发的清除表单验证
    hClose() {
      this.$refs.AddEmploy.resetForm()
    },

    // 导出
    async  derive() {
      // 表单头
      const mapInfo = {
        'id': '编号',
        'password': '密码',
        'mobile': '手机号',
        'username': '姓名',
        'timeOfEntry': '入职日期',
        'formOfEmployment': '聘用形式',
        'correctionTime': '转正日期',
        'workNumber': '工号',
        'departmentName': '部门',
        'staffPhoto': '头像地址'
      }

      // 发送请求获取数据
      const res = await Getemploy({ page: 1, size: this.total })
      console.log(res)

      // 把数据存入一个变量里面
      const list = res.data.rows
      console.log(list)

      // // 遍历数据把数据里每个数据转换尾中文
      // const zhList = list.map(enObj => {
      //   // 准备装数据的盒子
      //   const zhObj = {}

      //   // 把里面的值提取出来并赋值给另一个变量
      //   const enKeys = Object.keys(enObj)

      //   // 把被赋值的变量遍历一遍，并从对应的映射关系里面转换
      //   enKeys.forEach(enKey => {
      //   // 因为提取出来的是英文,映射关系是英文转中问的,可以对应上
      //     const zhKey = mapInfo(enKey)

      //     // 把数据里面的英文转换成映射里面的中文
      //     zhObj[zhKey] = enObj[enKey]
      //   })
      //   return zhObj
      // })
      // console.log(zhList)

      // 取出第一个数据
      // const first = zhList[0]
      const first = list[0]

      // 如果没有获取到数据就返回
      if (!first) return

      // 设置表单头
      const header = Object.keys(first).map(enKey => mapInfo[enKey])

      // 改变体内数据
      const data = list.map(item => {
        const code = item['formOfEmployment']

        item['formOfEmployment'] = hireTypeMap[code]

        return Object.values(item)
      })
      const excel = await import('@/vendor/Export2Excel')
      // excel表示导入的模块对象
      // console.log(excel)
      excel.export_json_to_excel({
        header, // 表头 必填
        data, // 具体数据 必填
        filename: '员工入职信息', // 文件名称
        autoWidth: true, // 宽度是否自适应
        bookType: 'xlsx' // 生成的文件类型

      })
    },

    // 分配角色按钮
    Assign(id) {
      // console.log(id)
      this.tryId = id

      // 打开弹框
      this.ShowDialogRole = true

      // 清除表单，调用子组件发送请求的函数请求
      this.$nextTick(() => {
        this.$refs.AtryIds.AssigRoles()
      })
    }
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
