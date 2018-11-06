import auth from '../../utils/authorize'

const authTest = (el, binding, vnode) => {
  const { value } = binding

  if (vnode.context.$route.meta.ignorePermission) {
    return
  }
  if (!auth.hasPermission(value)) {
    el.parentNode && el.parentNode.removeChild(el)
  }
}

const roleTest = (el, binding, vnode) => {
  const { value } = binding

  if (vnode.context.$route.meta.ignorePermission) {
    return
  }
  if (!auth.isRole(value)) {
    el.parentNode && el.parentNode.removeChild(el)
  }
}

export default {
  install(Vue) {
    Vue.prototype.$authorize = auth.hasPermission
    Vue.directive('authorize', authTest)
    Vue.directive('role', roleTest)
  }
}
