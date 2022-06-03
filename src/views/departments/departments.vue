<template>
  <div class="department-container">
    <div class="app-container">
      <el-card>
        <!-- 用一个行列布局 -->
        <el-row type="flex" justify="space-between" align="middle" style="height: 40px">
          <el-col :span="20">
            <svg-icon icon-class="w3c" /><span>万维网中国分部</span>
          </el-col>
          <el-col :span="4">
            <el-row type="flex" justify="end">
              <!-- 两个内容 -->
              <el-col>负责人</el-col>
              <!-- 下拉菜单 element -->
              <el-col>
                <el-dropdown>
                  <span>
                    操作<i class="el-icon-arrow-down" />
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item @click.native="hShow">添加子部门</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-tree :data="list" default-expand-all>
          <template v-slot="scope">
            <el-row type="flex" justify="space-between" align="middle" style="height: 40px;  width: 100%">
              <el-col :span="20">
                <span>{{ scope.data.name }}</span>
              </el-col>
              <el-col :span="4">
                <el-row type="flex" justify="end">
                  <!-- 两个内容 -->
                  <el-col>{{ scope.data.manager }}</el-col>
                  <!-- 下拉菜单 element -->
                  <el-col>
                    <el-dropdown>
                      <span>
                        操作<i class="el-icon-arrow-down" />
                      </span>
                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item @click.native="hShow(scope.data.id)">添加子部门</el-dropdown-item>
                        <el-dropdown-item @click.native="hByid(scope.data.id)">编辑</el-dropdown-item>
                        <el-dropdown-item v-if="scope.data.children.length === 0" @click.native="hDel(scope.data.id)">删除</el-dropdown-item>
                        <!-- 判断，如果有子部门就不显示删除按钮 -->
                      </el-dropdown-menu>
                    </el-dropdown>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-tree>
      </el-card>
    </div>

    <!-- 添加 -->
    <el-dialog
      :title="isEdit? '编辑' : '添加'"
      :visible.sync="dialogVisible"
      width="80%"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <addEnd v-if="dialogVisible" :id="cruyId" :origin-list="originList" :is-edit="isEdit" @success="hsuccess" />
    </el-dialog>

    <!-- 编辑 -->
    <el-dialog
      :title="isEdit? '编辑' : '添加'"
      :visible.sync="dialogVisibleEdit"
      width="80%"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <addEnd v-if="dialogVisibleEdit" :id="cruyId" :origin-list="originList" :is-edit="isEdit" @success="hsuccess" />
    </el-dialog>
  </div>
</template>

<script>
import { DelId, GetList } from '@/api/departments'
import { tranListToTreeData } from '@/utils'
import addEnd from './addEnd.vue' // 在同级下创建一个封装dialog里面内容的组件再导入，形成复用
export default {
  components: {
    addEnd
  },
  data() {
    return {
      // 依赖一份树形数据
      list: [],
      dialogVisible: false,
      dialogVisibleEdit: false,
      cruyId: '',
      isEdit: false,
      originList: []
    }
  },
  created() {
    this.GetPeople()
  },
  methods: {
    async GetPeople() {
      try {
        const res = await GetList()
        res.data.depts.shift()
        this.originList = res.data.depts.map(({ id, pid, code, name }) => ({ id, name, code, pid }))
        console.log(this.originList)
        this.list = tranListToTreeData(res.data.depts)
      } catch {
        1
      }
    }, // 添加
    hShow(id) {
      // 把id传入并赋值给cruyId再传进子组件
      this.dialogVisible = true
      this.cruyId = id
      this.isEdit = false
    },
    // 编辑,创建一个状态，把状态传入子组件，判断打开的是编辑页面还是添加页面
    hByid(id) {
      this.dialogVisibleEdit = true
      this.cruyId = id
      this.isEdit = true
    },
    hsuccess() {
      this.dialogVisibleEdit = false
      this.dialogVisible = false
      this.GetPeople()
    },
    hDel(id) {
      this.$confirm('确定删除吗？', '提示', { type: 'warning' })
        .then(async() => {
          try {
            const res = await DelId(id)
            this.GetPeople()
            this.$message.success(res.message)
          } catch (e) {
            this.$message.error(e.message)
          }
        })
        .catch(() => {

        })
    }
  }
}
</script>
