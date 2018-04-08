import Vue from 'vue'
import App from './App.vue'

import router from './router'
import store from './store'

import VueSweetalert2 from 'vue-sweetalert2';

Vue.config.productionTip = true

Vue.use(VueSweetalert2);

router.beforeEach((to, from, next) => {
  if (store.state.user === null) {
    if (to.matched.some(record => record.meta.requireAuth)) {
      store.dispatch('checkToken').then(() => {
        next()
      }).catch(() => {
        next('/auth')
      })
    } else if (to.matched.some(record => record.meta.requireLogged)){
      store.dispatch('checkToken').then(() => {
        next('/')
      }).catch(() => {
        next()
      })
    } else {
      next()
    }
  } else {
    next()
  }
})


new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
