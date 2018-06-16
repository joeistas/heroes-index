import Vue from 'vue'
import VueRouter from 'vue-router'
import { Subject } from 'rxjs'

import Content from './components/Content.vue'

export const router = new VueRouter({
  mode: 'history',
  routes: [
    { name: 'version', path: "/:realm?/:version?/:item?/:itemId?", component: Content },
  ]
})
