<template>
  <div>
    <!--  show-checkbox  出现单选框 -->
    <!--   default-expand-all  默认展开所有子节点 -->
    <!--   node-key="id"  唯一标识 -->
    <!-- check-strictly    父子级不会相互影响 -->
    <!-- :props="{label:'name'}"    自己数据我name，官方要的是lable，修改一下 -->

    <el-tree
      ref="tree"
      show-checkbox
      :data="AssignList"
      :props="{label:'name'}"
      default-expand-all
      node-key="id"
      check-strictly
    />

    <div class="next">
      <el-button type="error">取消</el-button>
      <el-button type="success" @click="hSubmit">确定</el-button>
    </div>
  </div>
</template>

<script>
import { getPermissionList } from '@/api/permisson'
import { tranListToTreeData } from '@/utils'
export default {
  data() {
    return {
      AssignList: []
    }
  },
  created() {
    this.GetAssign()
  },
  methods: {
    async GetAssign() {
      const res = await getPermissionList()
      // console.log(res)

      this.AssignList = tranListToTreeData(res.data)
    },

    // 获取权限的id
    hSubmit() {
      const res = this.$refs.tree.getCheckedKeys()
      console.log(res)
    }
  }
}
</script>

<style>
.next{
  display: flex;
  justify-content: end;
}
</style>
