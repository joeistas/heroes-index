<template>
  <v-container>
    <v-layout>
      <v-flex class="json-property-key">{{ propertyKey }}</v-flex>
      <v-flex class="json-property-value">{{ propertyValue }}</v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
  import Vue from 'vue'

  export default Vue.extend({
    name: "json-value",
    props: {
      propertyKey: String,
      propertyValue: [ String, Number ],
    },
  })
</script>
