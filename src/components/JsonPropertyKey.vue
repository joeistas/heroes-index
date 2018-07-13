<template>
  <v-flex class="text-xs-left body-2" md3 sm6 xs12>
    <span>
      <slot></slot>
    </span>
  </v-flex>
</template>

<script lang="ts">
  import Vue from 'vue'

  export default Vue.extend({
    name: "json-property-key",
  })
</script>
