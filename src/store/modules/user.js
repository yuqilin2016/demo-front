const user = {
  state: {
    user: null,
    token: '',
    setting: {
      articlePlatform: []
    }
  },

  mutations: {
    SET_CURRENT_USER: (state, user) => {
      user.permissions = Array.isArray(user.resourceBeans) ? user.resourceBeans.map(i => i.code) : []
      // user.permissions = user.dataPrivilegeMap ? Object.keys(user.dataPrivilegeMap) : []
      user.avatar = 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif'
      user.introduction = '(无）'
      localStorage.user = JSON.stringify(user)
      state.user = user
    },
    SET_TOKEN: (state, token) => {
      localStorage.token = token
      state.token = token
    },
    SET_SETTING: (state, setting) => {
      state.setting = setting
    },
    SET_NONE_USER: (state) => {
      if (localStorage.token) {
        localStorage.removeItem('user')
        localStorage.removeItem('token')
      }
      state.user = null
      state.roles = []
      state.token = ''
    }
  },

  actions: {}
}

export default user
