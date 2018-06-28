<template>
  <v-flex class="text-xs-left body-1 my-3" md8>
    <slot></slot>
  </v-flex>
</template>

<script lang="ts">
  import Vue from 'vue'

  export default Vue.extend({
    name: "json-property-value",
  })
</script>
