import store from '../store'

export default {
  hasPermission(value) {
    if (!value) {
      return true
    }
    let permissions
    if (typeof value === 'string') {
      permissions = value.split(',')
    } else if (Array.isArray(value)) {
      permissions = value
    } else {
      throw new Error('指定的权限必须是一个数组或者以英文逗号分隔的字符串')
    }

    const permis = store.getters.permissions

    return Array.isArray(permis) && permis.length && permis.some(i => permissions.includes(i))
  },
  isRole(value) {
    const roles = store.getters.roles
    return !value || (Array.isArray(roles) && roles.includes(value))
  }
}
