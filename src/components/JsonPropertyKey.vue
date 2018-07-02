<template>
  <v-flex class="text-xs-left body-2 my-3 ml-3" md3>
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
