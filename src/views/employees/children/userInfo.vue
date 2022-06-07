<template>
  <div class="user-info">
    <!-- 个人信息 -->
    <el-form ref="userForm" label-width="220px" :rules="rules" :model="userInfo">
      <!--手机 -->

      <el-form-item label="手机" prop="mobile">
        <el-input v-model="userInfo.mobile" style="width:220px" />
      </el-form-item>

      <!-- 工号 入职时间 -->

      <el-form-item label="入职时间" prop="timeOfEntry">
        <el-date-picker
          v-model="userInfo.timeOfEntry"
          type="date"
          class="inputW"
          value-format="yyyy-MM-dd"
        />
      </el-form-item>

      <!-- 员工照片 -->

      <el-form-item label="员工头像">
        <!-- 放置上传图片 -->
        <img>
      </el-form-item>

      <!-- 保存个人信息 -->
      <el-form-item>
        <el-button type="primary" @click="Update">保存更新</el-button>
        <el-button @click="$router.back()">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { getuserDetailById } from '@/api/user'
import { updateEmployees } from '@/api/employees'
export default {
  data() {
    return {
      userId: this.$route.query.id,
      userInfo: {
        mobile: '',
        timeOfEntry: ''
      },
      rules: {
        // mobile: [{ pattern: /^1[1-3]\d{9}$/, message: '手机号不能为空', triggler: 'blur' }]
        mobile: [{ pattern: /^1[3-9]\d{9}$/, required: true, message: '请输入正确手机号', trigger: 'blur' }],
        timeOfEntry: [{ required: true, message: '请选择入职日期', trigger: 'blur' }]
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
      console.log(2)

      // const valid =  this.$refs.userForm.validate().catch(e => e)
      const valid = this.$refs.userForm.validate().catch(e => e)
      // 乘早返回
      if (!valid) return
      console.log(1)

      try {
        const res = await updateEmployees(this.userInfo)
        this.$message.success(res.message)
      } catch (e) {
        this.$message.error(e.message)
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .user-info{
    padding-top:20px;
  }
</style>
