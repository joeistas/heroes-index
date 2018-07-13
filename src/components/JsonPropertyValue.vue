<template>
  <v-flex class="text-xs-left body-1" md8 sm6 xs10 offset-xs2 offset-sm0>
    <slot></slot>
  </v-flex>
</template>

<script lang="ts">
  import Vue from 'vue'

  export default Vue.extend({
    name: "json-property-value",
  })
</script>
