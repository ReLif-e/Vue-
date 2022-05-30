const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  // 定义了全局的属性.以后要使用姓名就调用"username"
  username: state => state.user.getUser.username,
  staffPhoto: state => state.user.getUser.staffPhoto,
  userid: state => state.user.getUser.userid
}
export default getters
