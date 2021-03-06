import { getInfo, getuserDetailById } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'

export default {
  namespaced: true,
  state: {
    token: getToken() || '',
    getUser: {}
  },

  mutations: {
    UpdataToken(state, token) {
      state.token = token

      // 存储到本地
      setToken(token)
    },
    getUserInfo(state, getUser) { // 获取用户信息
      state.getUser = getUser
    },
    removeToken(state) {
      removeToken() // 清除本地Token
      state.token = ''
    },
    removeUserInfo(state) {
      state.getUser = {}
    }
  },

  actions: {
    async  GetUserInfo(context) {
      const res = await getInfo() // user里面的方法
      // console.log(res)  //第一次获取用户信息
      const res1 = await getuserDetailById(res.data.userId) // 把第一次获取的id,传递进第二次要id的请求里面获取头像
      // console.log(res1) //第二次获取用户信息
      context.commit('getUserInfo', { ...res.data, ...res1.data })
      return { ...res.data, ...res1.data }
    },
    /**
     * 清空用户信息--清除Token(退出按钮)
     */
    quit(context) {
      context.commit('removeToken')
      context.commit('removeUserInfo')
    }
  },
  getters: {}
}
