import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import axios from 'axios'
import VCharts from 'v-charts'
import 'element-ui/lib/theme-chalk/index.css'
import ElementUI from 'element-ui'
import VueLazyload from 'vue-lazyload'

Vue.use(ElementUI)
Vue.use(VCharts)
Vue.use(VueLazyload)

Vue.config.productionTip = false

// http response 拦截器
axios.interceptors.response.use(
    response => {
      return response;
    },
    error => {
      if (error.response) {
        if (error.response.status == 401) {
          store.commit('Guarantee/init')
          store.commit('InvestmentRecords/init')
          store.commit('Letters/init')
          store.commit('LoanRecords/init')
          store.commit('User/init')
          store.commit('Credit/init')
          store.commit('Guarantor/init')
          store.commit('Overdue/init')
          store.commit('InvestmentList/init')
          router.replace({
            path: 'index',
            query: {redirect: router.currentRoute.fullPath}
          })
        }
      }
      return Promise.reject(error.response.data)  // 返回接口返回的错误信息
    }
);
Vue.prototype.axios = axios
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
