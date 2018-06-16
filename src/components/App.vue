<template>
  <v-app>
    <v-toolbar class="red">
      <v-toolbar-title><router-link to="/">HeroesIndex</router-link></v-toolbar-title>
    </v-toolbar>
    <v-content>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-content>
    <v-footer></v-footer>
  </v-app>
</template>

<script lang="ts">
  import Vue from 'vue'

  export default Vue.extend()
</script>
