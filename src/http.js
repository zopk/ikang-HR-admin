/**
 * Created by qiangxl on 2017/5/23.
 */
import axios from 'axios'
import globals from './config'
import { Loading, Message } from 'element-ui'
// import qs from 'qs'

// axios 配置
// axios.defaults.timeout = 5000
axios.defaults.withCredentials = true
let loading
// http request 拦截器
axios.interceptors.request.use(
  config => {
    if (config.url.indexOf('user/adminLogin') === -1 && config.url.indexOf('user/getImgCode') === -1) {
      loading = Loading.service({fullscreen: true, text: '加载中·····'})
    }
    if (config.data) {
      // config.headers['Authorization'] = globals.authorization
      // config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      // // config.headers['Content-Type'] = 'application/json;charset=UTF-8'
      // // config.headers['Accept'] = '/'
      // config.withCredentials = false
      // config.data = qs.stringify(config.data)
    }
    return config
  },
  err => {
    loading.close()
    Message.error({
      message: '加载超时·····'
    })
    return Promise.reject(err)
  })

// http response 拦截器
axios.interceptors.response.use(
  response => {
    if (loading) {
      setTimeout(() => {
        loading.close()
      }, 300)
    }
    if (response.data) {
      if (parseInt(response.data.code) === 4) {
        globals.loginCall('/')
      } else if (parseInt(response.data.code) === 2 && response.config.url.indexOf('/user/adminLogin') === -1) {
        Message.error(response.data.message)
      }
    } else {
    }
    return response
  },
  error => {
    setTimeout(() => {
      loading.close()
    }, 300)
    console.log('error', error)
    Message.error({
      message: '加载失败·····'
    })
    return Promise.reject(error)
  })
export default axios
