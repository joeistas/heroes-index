<template>
  <v-container grid-list-md>
    <v-layout wrap>
      <json-property-key>{{ propertyKey }}</json-property-key>
      <json-property-value><span v-html="propertyValue" class="html-value"></span></json-property-value>
    </v-layout>
  </v-container>
</template>

<style scoped>
  .html-value >>> span {
    color: #F57C00;
  }
</style>
<script lang="ts">
  import Vue from 'vue'

  import JsonPropertyKey from './JsonPropertyKey.vue'
  import JsonPropertyValue from './JsonPropertyValue.vue'

  export default Vue.extend({
    name: "json-html",
    components: {
      "json-property-key": JsonPropertyKey,
      "json-property-value": JsonPropertyValue,
    },
    props: {
      propertyKey: String,
      propertyValue: String,
    },
  })
</script>
