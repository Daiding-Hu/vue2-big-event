const userModule = {
  namespaced: true,
  state() {
    return {
      token: ''
    }
  },
  mutations: {
    // 设置 token
    setToken(state, Str) {
      state.token = Str
    }
  }
}
export default userModule
