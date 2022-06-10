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
import { GetRoleDetail, PutRoleDetail } from '@/api/roles'
export default {
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      AssignList: []
    }
  },
  created() {
    this.GetAssign()
    this.GetRoleIds()
  },
  methods: {

    // 获取权限点
    async GetAssign() {
      try {
        const res = await getPermissionList()
        // console.log(res)

        this.AssignList = tranListToTreeData(res.data)
      } catch (e) {
        console.log(e.message)
      }
    },

    // 数据回填
    async GetRoleIds() {
      try {
        const res = await GetRoleDetail(this.id)
        console.log(res)
        this.$refs.tree.setCheckedKeys(res.data.permIds)
      // this.AssignList = tranListToTreeData(res.data)
      } catch (e) {
        // this.$message.error(e.message)
        console.log(e.message)
      }
    },
    // 获取权限的id
    async hSubmit() {
      try {
        const ids = this.$refs.tree.getCheckedKeys()
        console.log(ids)
        const res = await PutRoleDetail({ id: this.id, permIds: ids })

        // 关闭弹框
        this.$emit('close')
        this.$message.success(res.message)
      } catch (e) {
        this.$message.error(e.message)
      }
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
