import Vue from 'vue'
import VueRouter from 'vue-router'
import VueRx from 'vue-rx'
import Vuetify from 'vuetify'
import { of } from 'rxjs'
import "vuetify/dist/vuetify.min.css"

import { store } from './data/store'
import { router } from './routes'
import App from './components/App.vue'

Vue.use(VueRx)
Vue.use(VueRouter)
Vue.use(Vuetify)

new Vue({
  el: "#app",
  components: {
    app: App
  },
  render: h => h(App),
  router,
  subscriptions: store
})
