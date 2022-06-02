<template>
  <el-form ref="deptForm" label-width="120px">
    <el-form-item label="部门名称">
      <el-input v-model="form.name" style="width:80%" placeholder="1-50个字符" />
    </el-form-item>
    <el-form-item label="部门编码">
      <el-input v-model="form.code" style="width:80%" placeholder="1-50个字符" />
    </el-form-item>
    <el-form-item label="部门负责人">
      <el-select v-model="form.manager" style="width:80%" placeholder="请选择">
        <el-option v-for="item in Employess" :key="item.id" :value="item.username" :label="item.username" />
      </el-select>
    </el-form-item>
    <el-form-item label="部门介绍">
      <el-input v-model="form.introduce" style="width:80%" placeholder="1-300个字符" type="textarea" :rows="3" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" size="small" @click="hSubmit">确定</el-button>
      <el-button size="small" @click="hCancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { GetEmployess } from '@/api/employees'
import { AddDepartment, getByid, putByid } from '@/api/departments'
export default {
  props: {
    id: { // 接受父组件传来的数据
      type: String,
      required: true
    },
    isEdit: { // 接受父组件传递来的状态
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      form: {
        name: '', // 部门名称
        code: '', // 部门编码
        manager: '', // 部门管理者
        introduce: '' // 部门介绍

      },
      Employess: [] // 发送请求的数据传入这个船舰的空数组，然后遍历获得下拉列表
    }
  },
  created() {
    this.loadEmployess()
    this.getid()
  },
  methods: {
    // 下拉
    async loadEmployess() {
      const res = await GetEmployess()
      this.Employess = res.data
      // console.log(this.Employess)
    },
    async getid() { // 通过状态判断，如果是不是编辑页面就不数据回填，是就数据回填
      if (!this.isEdit) return // 趁早返回
      const res = await getByid(this.id)
      this.form = res.data
    },
    // 1. 封装接口
    // 2. 在点击了确定时发送添加请求
    // 3. 得到数据后,根据数据提醒用户
    // 4. 父组件内传递所点部门的id过来，子组件内再把传递过来的id添加到data的form属性里面
    // 5. 再次发送添加请求，添加成功后，通过自定义方法让父组件关闭弹框和重新发送获取部门请求并渲染

    async hSubmit() { // 点击确定判断打开的是哪个页面并发送请求
      try {
        let res = ''
        if (this.isEdit) {
          res = await putByid(this.form)
        } else {
          this.form.pid = this.id
          // 因为后端要的数据有pid，这里添加一个并让值为传过来的值，并且把form的值通过请求传递过去，如果成功通知用户
          // 最后弹窗和更行数据再父组件内，通过自定义事件让父组件关闭弹窗和更新页面
          res = await AddDepartment(this.form)
        }
        // console.log(this.form)
        this.$emit('success')
        this.$message.success(res.message)
      } catch (e) {
        this.$message.error(e.message)
        // shiabi
      }
    }, // 封装成两个函数的
    // async addP() {
    //   try {
    //     this.form.pid = this.id
    //     const res = await AddDepartment(this.form)
    //     // console.log(this.form)
    //     this.$emit('success')
    //     this.$message.success(res.message)
    //   } catch (e) {
    //     this.$message.error(e.message)
    //     // shiabi
    //   }
    // },
    // async putP() {
    //   try {
    //     const res = await putByid(this.form)
    //     // console.log(this.form)
    //     this.$emit('success')
    //     this.$message.success(res.message)
    //   } catch (e) {
    //     this.$message.error(e.message)
    //     // shiabi
    //   }
    // },
    hCancel() {
      this.$emit('success') // 点击取消按钮关闭弹窗
    }

  }

}
</script>

<style>

</style>
