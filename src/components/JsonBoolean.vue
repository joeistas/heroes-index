<template>
  <v-container grid-list-md>
    <v-layout wrap class="ml-3">
      <json-property-key>{{ propertyKey }}</json-property-key>
      <json-property-value :class="valueClasses()">{{ propertyValue ? 'true' : 'false' }}</json-property-value>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
  import Vue from 'vue'

  import JsonPropertyKey from './JsonPropertyKey.vue'
  import JsonPropertyValue from './JsonPropertyValue.vue'

  export default Vue.extend({
    name: "json-boolean",
    components: {
      "json-property-key": JsonPropertyKey,
      "json-property-value": JsonPropertyValue,
    },
    props: {
      propertyKey: String,
      propertyValue: [ Boolean ],
    },
    methods: {
      valueClasses: function() {
        const value = this.propertyValue
        return {
          'green--text': value,
          'red--text': !value,
          'text--darken-3': true,
        }
      },
    },
  })
</script>
