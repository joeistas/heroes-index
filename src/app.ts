import Vue from 'vue'
import VueRouter from 'vue-router'
import VueRx from 'vue-rx'
import Vuetify from 'vuetify'
import { Subject, Observable } from 'rxjs'
import { pluck, shareReplay, share, tap } from 'rxjs/operators'

import "vuetify/dist/vuetify.min.css"

import { createStore } from './store'
import * as ObservableStore from './observable-store'
import { router } from './routes'
import App from './components/App.vue'

Vue.use(VueRx)
Vue.use(VueRouter)
Vue.use(Vuetify)
Vue.use(ObservableStore, { store: createStore(router) })

new Vue({
  el: "#app",
  components: {
    app: App
  },
  render: h => h(App),
  router,
})
