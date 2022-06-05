<template>
  <!-- 表单 -->
  <el-form ref="addForm" :model="formData" :rules="rules" label-width="120px">
    <el-form-item label="姓名" prop="username">
      <el-input v-model="formData.username" style="width:50%" placeholder="请输入姓名" />
    </el-form-item>
    <el-form-item label="手机" prop="mobile">
      <el-input v-model="formData.mobile" style="width:50%" placeholder="请输入手机号" />
    </el-form-item>
    <el-form-item label="入职时间" prop="timeOfEntry">
      <el-date-picker v-model="formData.timeOfEntry" style="width:50%" placeholder="请选择入职时间" />
    </el-form-item>
    <el-form-item label="聘用形式" prop="formOfEmployment">
      <el-select v-model="formData.formOfEmployment" style="width:50%" placeholder="请选择">
        <el-option v-for="item in hireType" :key="item.id" :label="item.value" :value="item.id" />
      </el-select>
    </el-form-item>
    <el-form-item label="工号" prop="workNumber">
      <el-input v-model="formData.workNumber" style="width:50%" placeholder="请输入工号" />
    </el-form-item>
    <el-form-item label="部门" prop="departmentName">
      <el-input v-model="formData.departmentName" style="width:50%" placeholder="请选择部门" @focus="loadDeparment()" />
      <el-tree v-if="treeData.length" default-expand-all :data="treeData" :props="{label:'name'}" @node-click="hNodeClick" />
    </el-form-item>
    <el-form-item label="转正时间" prop="correctionTime">
      <el-date-picker v-model="formData.correctionTime" style="width:50%" placeholder="请选择转正时间" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="hSubmit">确定</el-button>
      <el-button @click="$emit('close')">取消</el-button>
    </el-form-item>

  </el-form>
</template>

<script>
import Employees from '@/constant/employees' // 本地有正式和非正式的数组，调用过来直接使用
import { GetList } from '@/api/departments'
import { tranListToTreeData } from '@/utils'
import { addEmployee } from '@/api/employees'
export default {
  data() {
    return {
      formData: { // 定义的数据
        username: '', // 用户名
        mobile: '', // 手机号
        formOfEmployment: '', // 聘用形式
        workNumber: '', // 工号
        departmentName: '', // 部门
        timeOfEntry: '', // 入职时间
        correctionTime: '' // 转正时间
      },
      rules: { // 校验规则
        username: [
          { required: true, message: '用户姓名不能为空', trigger: 'blur' },
          { min: 1, max: 4, message: '用户姓名为1-4位', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '手机号不能为空', trigger: 'blur' },
          { pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确', trigger: 'blur' }
        ],
        formOfEmployment: [
          { required: true, message: '聘用形式不能为空', trigger: 'blur' }
        ],
        workNumber: [
          { required: true, message: '工号不能为空', trigger: 'blur' }
        ],
        departmentName: [
          { required: true, message: '部门不能为空', trigger: 'change' }
        ],
        timeOfEntry: [
          { required: true, message: '请选择入职时间', trigger: 'blur' }
        ]
      },
      hireType: Employees.hireType,
      treeData: []
    }
  },
  // created() {
  //   this.loadDeparment()
  // },
  methods: {
    async  hSubmit() {
      try {
        // 兜底校验
        const valid = await this.$refs.addForm.validate().catch(e => e)
        console.log(valid)
        if (!valid) return // 乘早返回
        // 发送请求
        const res = await addEmployee(this.formData)
        // 根据结果提醒用户
        this.$message.success(res.message)
        // 关闭dialog
        // 重新渲染
        this.$emit('success')
      } catch (e) {
        this.$message.error(e.message)
      }
    },
    async loadDeparment() {
      const res = await GetList()
      console.log(res)

      // 删除第一条数据
      res.data.depts.shift()

      // 把数据转为属树形数据
      this.treeData = tranListToTreeData(res.data.depts)
    },
    hNodeClick(data) {
      console.log(data)

      // 如果有子集部门就不能让这个父级添加进渲染列表
      if (data.children.length) return
      // 让表单里面的数据等于 tree里面渲染的数据
      this.formData.departmentName = data.name

      // 点击以后清空数据，让选择子部门列表消失
      this.treeData = []
    },
    resetForm() {
      this.formData = { // 定义的数据
        username: '', // 用户名
        mobile: '', // 手机号
        formOfEmployment: '', // 聘用形式
        workNumber: '', // 工号
        departmentName: '', // 部门
        timeOfEntry: '', // 入职时间
        correctionTime: '' // 转正时间
      }

      this.$refs.addForm.clearValidate()
    }
  }
}
</script>

<style scoped>
.el-tree{
  width: 340px;
  user-select: none;
}
</style>
