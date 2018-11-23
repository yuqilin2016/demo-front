import Axios from 'axios'
import qs from 'qs'
import { Message } from 'element-ui'
// import { Loading } from 'element-ui'

const axios = Axios.create({
  baseURL: process.env.BASE_API, // api 的 base_url
  // baseURL: '192.168.1.55:9999/',
  timeout: 15000,
  transformRequest: [
    data => {
      return data
    }],
  transformResponse: [
    data => {
      return JSON.parse(data)
    }]
})

// request interceptor
axios.interceptors.request.use(config => {
  // Loading.service({
  //   text: '拼命加载中...',
  //   spinner: 'el-icon-loading',
  //   background: 'rgba(0, 0, 0, 0.7)'
  // })
  //   Vue.nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
  //   loadingInstance.close();
  // });
  const token = localStorage.token
  if (token) {
    config.headers['X-Session-Token'] = token
  }
  // 判断请求方式
  if (config.useForm) {
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    if (typeof config.data === 'object') {
      config.data = qs.stringify(config.data)
    }
  } else if (config.useMultipart) {
    config.headers['Content-Type'] = 'multipart/form-data'
  } else {
    config.headers['Content-Type'] = 'application/json'
    config.data = JSON.stringify(config.data)
  }
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  return Promise.reject(error)
})

// response interceptor
axios.interceptors.response.use(res => {
  //   Vue.nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
  //   loadingInstance.close();
  // });
  // const loadingInstance = Loading.service({})
  // loadingInstance.close()

  const data = res.data
  if (!data.errorCode) {
    return res.data.content
  } else {
    Message.error(`代码：${data.errorCode}, 信息：${data.errorMsg || '(无信息)'}`)
    return Promise.reject(res.data)
  }
}, error => {
  console.log('请求错误', error) // for debug
  const response = error.response
  if (!response) {
    Message.error('网络连接错误')
  } else if (response.data.error) {
    Message.error(`状态：${response.data.status}, 错误：${response.data.error}, 信息：${response.data.message || '(无信息)'}`)
  }
  return Promise.reject(error)
})

export default axios
