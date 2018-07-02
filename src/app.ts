import Vue from 'vue'
import VueRouter from 'vue-router'
import VueRx from 'vue-rx'
import Vuetify from 'vuetify'
import Transitions from 'vue2-transitions'
import { filter, map } from 'rxjs/operators'

import "vuetify/dist/vuetify.min.css"

import { createStore } from './store'
import * as ObservableStore from './observable-store'
import { router } from './routes'
import App from './components/App.vue'
import NotFoundError from './models/NotFoundError'

Vue.use(Transitions)
Vue.use(VueRx)
Vue.use(VueRouter)
Vue.use(Vuetify)
Vue.use(ObservableStore, createStore(router))

new Vue({
  el: "#app",
  components: {
    app: App
  },
  render: h => h(App),
  router,
  subscriptions: function() {
    return {
      notFound$: this.$storeErrors.pipe(
        filter(error => !!(error as NotFoundError).objectNotFound ),
        map((error: NotFoundError) => {
          const params = this.$route.params
          let redirectParams = {}
          switch(error.objectNotFound) {
            case 'version':
              redirectParams = {
                realm: params.realm,
              }
              break

            case 'item':
              redirectParams = {
                realm: params.realm,
                version: params.version + '',
              }
              break

            case 'itemId':
              redirectParams = {
                realm: params.realm,
                version: params.version + '',
                item: params.item,
              }
              break

            case 'profile':
              redirectParams = {
                realm: params.realm,
                version: params.version + '',
                item: params.item,
                itemId: params.itemId,
              }
              break
          }

          this.$router.push({ name: 'version', params: redirectParams })
        })
      )
    }
  },
})
