<template>
  <v-container>
    <v-layout>
      <v-flex class="json-property-key">{{ propertyKey }}</v-flex>
      <v-flex class="json-property-value">{{ propertyValue ? 'true' : 'false' }}</v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
  import Vue from 'vue'

  export default Vue.extend({
    name: "json-boolean",
    props: {
      propertyKey: String,
      propertyValue: [ Boolean ],
    },
  })
</script>
