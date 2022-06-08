<template>
  <div class="permission-container">
    <div class="app-container">
      <!-- 表格 -->
      <el-card>
        <div style="text-align: right; margin-bottom: 20px">
          <!-- 页面级别的权限按钮 -->
          <el-button type="primary" size="small" @click="hAdd(1,'0')">添加权限</el-button>
        </div>

        <!-- 渲染的数据 -->
        <el-table row-key="id" border :data="permission" default-expand-all>
          <el-table-column label="名称" prop="name" />
          <el-table-column label="标识" prop="code" />
          <el-table-column label="描述" prop="description" />
          <el-table-column label="操作">
            <template v-slot="{row}">
              <!-- 如果是按钮权限就不能再添加 -->  <!-- 页面级别的权限按钮 -->
              <el-button v-if="row.type === 1" type="text" @click="hAdd(2,row.id)">添加</el-button>
              <el-button type="text" @click="hisEdit(row.id)">编辑</el-button>
              <el-button type="text" @click="hdel(row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>
    <el-dialog
      :visible.sync="showDialog"
      :title="isEdit ? '编辑' : '添加' "
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      @close="hClose"
    >
      <!-- 表单内容
      -->
      <el-form ref="FormDate" label-width="100px" :rules="rules" :model="formData">
        <el-form-item label="权限名称" prop="name">
          <el-input v-model="formData.name" />
        </el-form-item>
        <el-form-item label="权限标识" prop="code">
          <el-input v-model="formData.code" />
        </el-form-item>
        <el-form-item label="权限描述">
          <el-input v-model="formData.description" />
        </el-form-item>
        <el-form-item label="权限启用">
          <el-switch
            v-model="formData.enVisible"
            active-text="启用"
            active-value="1"
            inactive-text="不启用"
            inactive-value="0"
          />
        </el-form-item>
      </el-form>

      <template #footer>
        <div style="text-align: right;">
          <el-button @click="showDialog = false">取消</el-button>
          <el-button type="primary" @click="hSubmit">确定</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { addPermission, delPermission, getPermissionDetail, getPermissionList, updatePermission } from '@/api/permisson' // api面按需导出，这里按需导入
import { tranListToTreeData } from '@/utils'
export default {
  data() {
    const validateName = (rule, value, callback) => {
      console.log(value)
      // 如果输入的值和数据里面的值一样就不允许添加
    }
    return {
      isEdit: false,
      permission: [],
      showDialog: false, // 是否显示弹层
      formData: { // 添加传递的数据
        name: '', // 名称
        code: '', // 权限标识
        description: '', // 描述
        enVisible: '0', // 开启
        pid: '', // 添加到哪个节点下
        type: '' // 类型
      },
      rules: {
        name: [
          { required: true, message: '请写入权限名称' },
          { validator: validateName, trigger: 'blur' }

        ],
        code: [
          { required: true, message: '请写入权限标识' }
        ]

      } // 校验规则
    }
  },
  created() {
    this.loadpermission()
  },
  methods: {
    // 获取权限列表
    async loadpermission() {
      // 发送请求
      const res = await getPermissionList()
      // console.log(res)  //获取权限列标是否成功

      // 返回的数据给要渲染页面的数据
      // 转换成树形结构，因为渲染的时候有些子组件 row-key  支持树形数据，所有转换成树形数据
      this.permission = tranListToTreeData(res.data)
    },

    // 点击权限按钮显示的弹框
    hAdd(type, pid) {
      // 改变状态
      this.isEdit = false
      // 把传递来的数据放入数组里面方便添加数据
      this.formData.type = type
      this.formData.pid = pid
      // console.log(type, pid)

      // 显示弹框
      this.showDialog = true
    },

    // 点击确定发送请求
    async hSubmit() {
      let res = null
      if (this.isEdit) {
        res = await updatePermission(this.formData)
        console.log(res)
      } else {
        res = await addPermission(this.formData)
        console.log(res)
      }
      try {
        const valid = await this.$refs.FormDate.validate().catch(e => e)
        if (!valid) return
        // 关闭弹框
        this.showDialog = false

        // 重新渲染
        this.loadpermission()

        // 根据结果提醒用户
        this.$message.success(res.message)
      } catch (e) {
        this.$message.error(e.message)
      }
    },

    // 关闭时清空表单
    hClose() {
      this.formData = {
        name: '', // 名称
        code: '', // 权限标识
        description: '', // 描述
        enVisible: '0', // 开启
        pid: '', // 添加到哪个节点下
        type: '' // 类型
      }
      // 清空表单校验
      this.$refs.FormDate.resetFields()
    },
    // 删除按钮
    async hdel(id) {
      const result = this.$confirm('确定删除吗?', '提示', { type: 'warning' }).catch(e => e)
      if (result !== 'confing') return // 乘早返回

      try {
        const res = await delPermission(id)
        // 提醒用户
        this.$message.success(res.message)

        // 重新渲染
        this.loadpermission()
      } catch (e) {
        this.$message.error(e.message)
      }
    },

    // 编辑按钮
    async hisEdit(id) {
      // 改变状态
      this.isEdit = true

      // 发送请求
      const res = await getPermissionDetail(id)
      // console.log(res)

      // 显示弹框
      this.showDialog = true

      // 数据回填
      this.formData = res.data
    }
  }
}
</script>
