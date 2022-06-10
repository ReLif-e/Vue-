<template>
  <div>
    <!-- // 分配角色 -->
    <!-- 这个module是复选框被点击了以后加入里面的数组，也是要增加角色的数据 -->
    <el-checkbox-group v-model="roleIds">
      <!-- 因为给员工添加角色要传递的时id渲染的是名称，所有lable这里是id，name通过插值表达式来渲染 -->
      <el-checkbox v-for="item in checkList" :key="item.id" :label="item.id">{{ item.name }}</el-checkbox>
    </el-checkbox-group>
    <!-- 分配角色的弹框👆 -->

    <div style="margin-top: 20px; text-align: right">
      <el-button type="primary" @click="hSubmit">确定</el-button>
      <el-button @click="closeDialog">取消</el-button>
    </div>
  </div>
</template>
<script>
import { getRoles } from '@/api/roles'
import { getuserDetailById } from '@/api/user'
import { updateRoles } from '@/api/employees'
export default {
  props: {
    // 接受父组件传来的id
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      roleIds: [],
      checkList: []
    }
  },
  created() {
    // 打开页面获取所有角色信息
    this.loadRoles()
    // 打开页面获取父组件,点击列id,再通过id来获取roleIds的数据,渲染员工所拥有的角色
    this.AssigRoles()
  },
  methods: {
    async loadRoles() {
      const res = await getRoles()
      // console.log(res)
      this.checkList = res.data.rows
    },

    // 自定义事件关闭弹框
    closeDialog() {
      this.$emit('closeRole')
    },

    // 通过父组件传来的id获取ids数据方便渲染
    async  AssigRoles() {
      try {
        const res = await getuserDetailById(this.id)
        console.log(res.data.roleIds)

        this.roleIds = res.data.roleIds
      } catch (e) {
        console.log(e)
      }
    },

    // 创建一个重置数据的函数让父组件调用1
    // 清空上一次获取的roleIds数据,以防再次点击后先从上一次的数据闪回新获取的数据
    AssigIds() {
      this.roleIds = []
      console.log('芜湖')
    },

    async  hSubmit() {
      try {
        // 发送请求
        const res = await updateRoles({
          id: this.id,
          roleIds: this.roleIds
        })

        // 关闭弹窗
        this.$emit('closeRole')
        // 提醒用户
        this.$message.success(res.message)
      } catch (e) {
        this.$message.error(e.message)
      }
    }
  }
}
</script>
