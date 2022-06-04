<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs>
          <!-- 放置页签 -->
          <el-tab-pane label="角色管理">
            <!-- 新增角色按钮 -->
            <el-row style="height:60px">
              <el-button
                icon="el-icon-plus"
                size="small"
                type="primary"
                @click="hAdd"
              >新增角色</el-button>
            </el-row>
            <!-- 表格 -->
            <el-table :data="roles">
              <el-table-column label="序号" width="120" type="index" />
              <el-table-column label="角色名称" width="240" prop="name" />
              <el-table-column label="描述" prop="description" />
              <el-table-column label="操作">
                <template v-slot="{row}">
                  <el-button size="small" type="success">分配权限</el-button>
                  <el-button size="small" type="primary" @click="hEidt(row)">编辑</el-button>
                  <el-button size="small" type="danger" @click="Delete(row.id)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-row type="flex" justify="center" align="middle" style="height: 60px">
              <!-- 分页组件 -->
              <el-pagination
                :current-page.sync="q.page"
                :page-sizes="[2, 3, 5, 10]"
                :page-size="q.pagesize"
                layout="sizes, prev, pager, next"
                :total="total"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
              />
            </el-row>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
    <!-- 新增弹框 -->
    <el-dialog
      :title="isEdit ? '添加':'编辑'"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :visible.sync="showDialog"
      @closed="Closed"
    >
      <el-form ref="roleForm" :model="roleForm" :rules="rules" label-width="100px">
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="roleForm.name" />
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="roleForm.description" />
        </el-form-item>
      </el-form>
      <!-- 底部 -->
      <el-row slot="footer" type="flex" justify="center">
        <el-col :span="6">

          <el-button size="small" @click="showDialog = false">取消</el-button>
          <el-button size="small" type="primary" @click="hSubmit">确定</el-button>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>
<script>
import { addRoles, getRoles, putRoles, subRoles } from '@/api/roles'
export default {
  data() {
    return {
      showDialog: false,
      roleForm: {
        name: '',
        description: ''
      },
      rules: {
        name: [{ required: true, message: '角色名称不能为空', trigger: 'blur' }]
      },
      q: { // 传递的数据
        page: 1,
        pagesize: 2
      },
      roles: [], // 获取渲染的数据
      total: 0,
      isEdit: false// 一共有多少数据
    }
  },

  created() {
    this.Setting()
  },
  methods: {
    async Setting() {
      try {
        const res = await getRoles(this.q)
        console.log(res)

        this.roles = res.data.rows
        this.total = res.data.total
      } catch (e) {
        console.log(e)
      }
    },
    handleSizeChange(pagesize) { // 点击切换时触发的事件，让当前也的页数该改成用户点击的，并重新调用请求
      this.q.pagesize = pagesize
      this.Setting()
    },
    handleCurrentChange(page) {
      this.q.page = page
      this.Setting()
    },

    // 删除角色按钮
    async Delete(id) {
      console.log(id)
      // 点击删除按钮调用删除的接口，根据状态提醒用户
      // this.$confirm('确定删除吗？', '提示', { type: 'warning' })
      //   .then(async() => {
      //     try {
      //       const res = await subRoles(id)
      //       console.log(res)
      //       this.$message.success(res.message)
      //       this.Setting()
      //     } catch (e) {
      //       this.$message.error(e.message)
      //       console.log(1)
      //     }
      //   })
      //   .catch(() => {})
      // 用户点击了删除按钮，提示用户
      const result = await this.$confirm('确定删除吗？', '提示', { type: 'warning' })
      console.log(result)

      // 如果删除后的页面数据只有一条，且页面的位置大于一，那么页面的页数减一
      if (this.roles.length === 1 && this.q.page > 1) {
        this.q.page--
      }

      // 如果点击的不是确定，乘早返回
      if (result !== 'confirm') return

      // 调用接口把id传递过去
      const res = await subRoles(id)

      // 根据结果提醒用用户
      this.$message.success(res.message)

      // 重新渲染页面
      this.Setting()
    },

    // 添加角色按钮
    async hSubmit() {
      // 兜底校验，点击确定后，检查表单的确认项  有没有  没填写 或 格式错误
      const valid = await this.$refs.roleForm.validate().catch(e => e)
      console.log(valid)
      if (!valid) return // 乘早返回

      // 如果isEdit是true说明点击了添加,这时候调用添加的函数,如果isEdit不是true那么点击的就是编辑,调用编辑的函数
      this.isEdit ? this.add() : this.sub()
    },

    // 添加的函数
    async add() {
      // 掉用添加的接口并把用户输入的值传递过去，如果错误就返回一个错误
      const res = await addRoles(this.roleForm).catch(e => e)
      console.log(res)

      // // 如果返回结果的code不是成功的code(10000) 那么提示用户错误的信息
      if (res.code !== 10000) return this.$message.error(res.message)

      // 返回结果code是10000，就提示用户正确的信息
      this.$message.success(res.message)

      // 关闭弹窗
      this.showDialog = false
      // 如果总条数能被当前页数量整除，让total + 1
      if (this.total % this.q.pagesize === 0) {
        this.total++
      }

      // 让显示的页面跳转到最后一页的页面上,celi是向上取整
      this.q.page = Math.ceil(this.total / this.q.pagesize)

      // 重新渲染页面
      this.Setting()
    },

    // 编辑的函数
    async sub() {
      // 掉用添加的接口并把用户输入的值传递过去，如果错误就返回一个错误
      const res = await putRoles(this.roleForm).catch(e => e)
      console.log(res)

      // // 如果返回结果的code不是成功的code(10000) 那么提示用户错误的信息
      if (res.code !== 10000) return this.$message.error(res.message)

      // 返回结果code是10000，就提示用户正确的信息
      this.$message.success(res.message)

      // 关闭弹窗
      this.showDialog = false

      // 重新渲染页面
      this.Setting()
    },
    hEidt(row) {
      // 打开弹框
      this.showDialog = true

      // 数据回填
      this.roleForm = { ...row }

      // 改变状态
      this.isEdit = false
    },

    // 点击新增
    hAdd() {
      this.showDialog = true

      this.isEdit = true
    },
    // 关闭弹框清空表单
    Closed() { // closed关闭事件，让表单为空，并移除校验结果
      this.roleForm = {
        name: '',
        description: ''
      }
      this.$refs.roleForm.resetFields()
    }

  }
}
</script>
