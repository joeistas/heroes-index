import VueRouter from 'vue-router'

import Content from './components/Content.vue'

export const router = new VueRouter({
  mode: 'history',
  routes: [
    { name: 'version', path: "/:realm?/:version?/:item?/:itemId?/:profile?", component: Content },
  ]
})
