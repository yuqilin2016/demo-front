const getters = {
  sidebar: state => state.app.sidebar,
  language: state => state.app.language,
  size: state => state.app.size,
  device: state => state.app.device,
  visitedViews: state => state.app.visitedViews,
  cachedViews: state => state.app.cachedViews,
  token: state => state.user.token,
  avatar: state => state.user.user && state.user.user.avatar,
  name: state => state.user.user && state.user.user.userName,
  introduction: state => state.user.user && state.user.user.introduction,
  permissions: state => state.user.user && state.user.user.permissions,
  roles: state => state.user.user && state.user.user.roleCodes,
  setting: state => state.user.setting,
  permission_routers: state => state.permission.routers,
  addRouters: state => state.permission.addRouters
}
export default getters
