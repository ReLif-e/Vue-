export default {
  namespaced: true,
  state: {
    token: ''
  },
  mutations: {
    UpdataToken(state, token) {
      state.token = token
    }
  },
  actions: {},
  getters: {}
}
