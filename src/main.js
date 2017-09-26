import Vue from 'vue'
import App from './App'
import router from './router'
import axios from './http'
Vue.prototype.$http = axios
import globals from './config'
Vue.config.productionTip = false
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
Vue.directive('focus', {
  // 当绑定元素插入到 DOM 中。
  inserted (el, binding) {
    if (binding.value) {
      el.focus()
    } else {
      el.blur()
    }
  },
  componentUpdated (el, binding) {
    if (binding.value) {
      el.focus()
    } else {
      el.blur()
    }
  }
})

Vue.use(ElementUI)
globals.interface()
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  axios,
  render: h => h(App)
})
