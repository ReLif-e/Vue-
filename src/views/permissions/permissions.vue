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
              <el-button type="text">编辑</el-button>
              <el-button type="text">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>
    <el-dialog ref="FormDate" :visible.sync="showDialog" title="弹层标题" @close="hClose">
      <!-- 表单内容 -->
      <el-form label-width="100px">
        <el-form-item label="权限名称">
          <el-input v-model="formData.name" />
        </el-form-item>
        <el-form-item label="权限标识">
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
import { addPermission, getPermissionList } from '@/api/permisson' // api面按需导出，这里按需导入
import { tranListToTreeData } from '@/utils'
export default {
  data() {
    return {
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
      rules: [] // 校验规则
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
      // 把传递来的数据放入数组里面方便添加数据
      this.formData.type = type
      this.formData.pid = pid
      // console.log(type, pid)

      // 显示弹框
      this.showDialog = true
    },

    // 点击确定发送请求
    async hSubmit() {
      // 清空表单
      try {
        const res = await addPermission(this.formData)
        console.log(res)
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
      this.$refs.FormDate.clearValidate()
    }
  }
}
</script>
