import { getToken, setToken } from '@/utils/auth'

export default {
  namespaced: true,
  state: {
    token: getToken() || ''
  },
  mutations: {
    UpdataToken(state, token) {
      state.token = token

      // 存储到本地
      setToken(token)
    }
  },
  actions: {},
  getters: {}
}
