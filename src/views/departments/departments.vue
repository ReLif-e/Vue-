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
                    <el-dropdown-item>添加子部门</el-dropdown-item>
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
                        <el-dropdown-item>添加子部门</el-dropdown-item>
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 依赖一份树形数据
      list: [{
        name: '财务部',
        manager: '刘备',
        children: [
          {
            name: '财务核算部',
            manager: '张飞'
          },
          {
            name: '税务核算部',
            manager: '关羽'
          }
        ]
      }]
    }
  },
  methods: {
    text(a) {
      console.log(a)
    }
  }
}
</script>
