<template>
  <v-footer app color="deep-purple lighten-1" class="py-1">
    <v-layout row justify-end>
      <v-btn href="https://github.com/joeistas/heroes-parser" flat icon dark>
        <v-icon>mdi-github-circle</v-icon>
      </v-btn>
      <v-btn href="/api" flat dark>Api</v-btn>
    </v-layout>
  </v-footer>
</template>

<style scoped>
  footer {
    z-index: 100;
  }
</style>

<script lang="ts">
  import Vue from 'vue'

  export default Vue.extend({})
</script>
