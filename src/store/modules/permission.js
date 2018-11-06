import { asyncRouterMap, constantRouterMap } from '../../router'
import auth from '../../utils/authorize'

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param route
 */
function hasPermission(route) {
  return !route.meta || !route.meta.authorize || auth.hasPermission(route.meta.authorize)
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap
 */
function filterAsyncRouter(asyncRouterMap) {
  return asyncRouterMap.filter(route => {
    if (hasPermission(route)) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children)
      }
      return true
    }
    return false
  })
}

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    GenerateRoutes({ commit }) {
      return new Promise(resolve => {
        const accessedRouters = filterAsyncRouter(asyncRouterMap)
        commit('SET_ROUTERS', accessedRouters)
        resolve()
      })
    }
  }
}

export default permission
