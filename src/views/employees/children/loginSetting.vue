<template>
  <el-form
    ref="userForm"
    :model="userInfo"
    label-width="120px"
    style="margin-left: 120px; margin-top: 30px"
    :rules="rules"
  >
    <el-form-item label="姓名:" prop="username">
      <el-input v-model="userInfo.username" style="width:300px" />
    </el-form-item>
    <el-form-item label="密码:" prop="password">
      <el-input v-model="userInfo.password" type="password" style="width:300px" />
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="Update">更新</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import { getuserDetailById } from '@/api/user'
import { updateEmployees } from '@/api/employees'
export default {
  data() {
    return {
      userInfo: {
        username: '',
        password: ''
      },
      rules: {
        username: [{ required: true, message: '用户名不能为空', triggler: 'blur' }],
        password: [{ required: true, message: '密码不能为空', triggler: 'blur' }]
      }
    }
  },
  created() {
    this.loginDetail()
  },
  methods: {
    // 查看按钮的登入设置
    async loginDetail() {
      // 发送请求获取数据
      const res = await getuserDetailById(this.$route.params.id)
      // console.log(res)

      // 数据回填
      this.userInfo = res.data
    },
    async Update() {
      const valid = this.$refs.userForm.validate().catch(e => e)
      // 乘早返回
      if (!valid) return

      // 发送请求
      try {
        const res = await updateEmployees(this.userInfo)

        // 根据结果提醒用户
        this.$message.success(res.message)
      } catch (e) {
        this.$message.error(e.message)
      }
      // this.$router.back()  返回上一级
    }
  }
}
</script>

