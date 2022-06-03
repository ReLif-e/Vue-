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
                  <el-button size="small" type="primary">编辑</el-button>
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
  </div>
</template>
<script>
import { getRoles, subRoles } from '@/api/roles'
export default {
  data() {
    return {
      q: { // 传递的数据
        page: 1,
        pagesize: 2
      },
      roles: [], // 获取渲染的数据
      total: 0 // 一共有多少数据
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
    Delete(id) {
      console.log(id)
      // 点击删除按钮调用删除的接口，根据状态提醒用户
      this.$confirm('确定删除吗？', '提示', { type: 'warning' })
        .then(async() => {
          try {
            const res = await subRoles(id)
            console.log(res)
            this.$message.success(res.message)
            this.Setting()
          } catch (e) {
            this.$message.error(e.message)
            console.log(1)
          }
        })
        .catch(() => {})
    }
  }
}
</script>
