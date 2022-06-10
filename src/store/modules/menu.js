import { constantRoutes } from '@/router'

export default {
  namespaced: true,
  state: {
    menuList: constantRoutes
  },
  mutations: {
    SetMenuList(state, arr) { // 把这两个数组的内容放在一起
      state.menuList = [...constantRoutes, ...arr]
    }
  },
  actions: {}
}
