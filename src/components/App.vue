<template>
  <v-app>
    <toolbar></toolbar>
    <v-content>
      <v-container app>
        <router-view></router-view>
      </v-container>
    </v-content>
    <v-footer app></v-footer>
  </v-app>
</template>

<style scoped>
  a {
    color: white;
    text-decoration: none;
  }
</style>

<script lang="ts">
  import Vue from 'vue'

  import Toolbar from './Toolbar.vue'

  export default Vue.extend({
    components: {
      'toolbar': Toolbar,
    },
  })
</script>
