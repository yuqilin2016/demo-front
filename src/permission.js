import router from './router'
import store from './store'
import axios from './utils/request'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'// progress bar style
import api from './api'

NProgress.configure({ showSpinner: false })// NProgress Configuration

const whiteList = ['/login', '/auth-redirect']// no redirect whitelist

router.beforeEach((to, from, next) => {
  NProgress.start() // start progress bar
  if (localStorage.token) { // determine if there has token
    /* has token*/
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
    } else {
      if (!store.state.user.user) { // 判断当前用户是否已拉取完user_info信息
        axios.post(api.source.GETUSERMESSAGE).then(res => { // 拉取user_info
          store.commit('SET_CURRENT_USER', res)
          store.dispatch('GenerateRoutes').then(() => { // 根据roles权限生成可访问的路由表
            router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
            next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
          })
        }).catch(() => {
          store.commit('SET_NONE_USER')
          next({ path: '/login' })
        })
      } else {
        next()
      }
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      next()
    } else {
      next('/login') // 否则全部重定向到登录页
      NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
    }
  }
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})
