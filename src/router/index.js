import Vue from 'vue'
import Router from 'vue-router'
/* eslint-disable */
Vue.use(Router)
/* Layout */
import Layout from '../views/layout/Layout'

export const constantRouterMap = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('../views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('../views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('../views/login/authredirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('../views/errorPage/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('../views/errorPage/401'),
    hidden: true
  },
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    // name: 'Menu',
    meta: { title: 'menu', icon: 'dashboard', noCache: true },
    children: [
      {
        path: 'dashboard',
        component: () => import('../views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'dashboard', icon: 'home', noCache: true }
      },
      
    ]
  },
  {
    path: '/test',
    name: 'testProject',
    component: Layout,
    // component: () => import('../views/testProject/index'),
    meta: { title: '测试项目', icon: 'dashboard', noCache: true },
    children: [
      // {
      //   path: '',
      //   component: () => import('../views/testProject/index'),
      //   meta: { title: 'test-project', icon: 'dashboard', noCache: true },
      // },
      {
        path: 'goods-import',
        component: () => import('../views/testProject/goodsImport'),
        name: 'goodsImport',
        meta: { title: '商品导入', icon: 'upload', noCache: true },
      },
      {
        path: 'goods-list',
        component: () => import('../views/testProject/goodsList'),
        name: 'goodsList',
        meta: { title: '商品列表', icon: 'list', noCache: true },
      },
      {
        path: 'order-list',
        component: () => import('../views/testProject/goodsOrder'),
        name: 'goodsOrder',
        meta: { title: '查询订单', icon: 'search', noCache: true },
      },
      {
        path: 'new-order',
        component: () => import('../views/testProject/newOrder'),
        name: 'newOrder',
        meta: { title: '新建订单', icon: 'order', noCache: true },
      }
      
    ]
  }
]
export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  // 管理员模块
  {
    path: '/admin',
    component: Layout,
    redirect: '/admin/usermanagement',
    name: 'Admin',
    // authorize
    meta: { title: '管理员', icon: 'peoples', noCache: true },
    children: [
      {
        path: 'usermanagement',
        component: () => import('../views/admin/users/usermanagement'),
        name: 'UserManagement',
        meta: { title: '用户管理', icon: 'peoples', noCache: false, authorize: ['USER'] }
      }
    ]
  }
]
