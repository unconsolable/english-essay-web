// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from '@/router'
import store from '@/store'

var axios = require('axios')
// need to be change
axios.defaults.baseURL = 'http://localhost:3000/'
axios.defaults.timeout = 3000
Vue.prototype.$axios = axios

Vue.use(ElementUI)
Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    if (store.state.token !== '') {
      next()
    } else {
      next({path: '/login'})
    }
  } else {
    next()
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
