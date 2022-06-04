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
          <el-button round size="small" type="primary">导入Excel</el-button>
          <el-button round size="small" type="warning">导出Excel</el-button>
          <el-button round size="small" type="success">新增员工</el-button>
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
        <el-table-column sortable label="入职时间" prop="timeOfEntry" />
        <el-table-column label="操作">
          <el-button type="text">查看</el-button>
          <el-button type="text">分配角色</el-button>
        </el-table-column>

      </el-table>
    </el-card>
  </div>

</template>

<script>
import { Getemploy } from '@/api/employees'
// 枚举数据
import employees from '@/constant/employees'

export default {
  data() {
    return {
      Employees: [],
      total: 1,
      q: {
        page: 1,
        size: 10
      }
    }
  },
  created() {
    this.employ()
  },
  methods: { // 打开页面就获取数据
    async employ() {
      // 调用接口
      const res = await Getemploy(this.q)

      // 返回数据等于自定义的空壳
      this.Employees = res.data.rows
      console.log(this.Employees)

      // 总条数
      this.total = res.data.total
    },
    formEmployees(code) { // 调用constant/employees文件里面的hireType方法,同通过传递来的id去里面找对应的中文并渲染
      const res = employees.hireType.find(item => item.id === code).value
      console.log(res)
      if (res) {
        return res
      } else {
        return '未知'
      }
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
