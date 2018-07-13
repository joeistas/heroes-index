<template>
  <v-footer app color="purple darken-3" class="py-1">
    <v-layout row justify-start wrap>
      <v-btn href="https://api.heroesindex.com" flat dark>Api</v-btn>
      <v-btn href="https://github.com/joeistas/heroes-parser" flat dark icon>
        <v-icon>mdi-github-circle</v-icon>
      </v-btn>
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
