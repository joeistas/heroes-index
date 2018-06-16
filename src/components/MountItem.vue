<template>
  <v-card>
    <span>{{ mount.name }}</span>
  </v-card>
</template>

<script lang="ts">
  import Vue from 'vue'

  export default Vue.extend({
    props: [ 'mount', 'versionNumber', 'realm', 'selected' ],
  })
</script>
