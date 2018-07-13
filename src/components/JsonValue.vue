<template>
  <v-container grid-list-md>
    <v-layout wrap>
      <json-property-key>{{ propertyKey }}</json-property-key>
      <json-property-value :class="valueClasses()">{{ propertyValue }}</json-property-value>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
  import Vue from 'vue'

  import JsonPropertyKey from './JsonPropertyKey.vue'
  import JsonPropertyValue from './JsonPropertyValue.vue'

  export default Vue.extend({
    name: "json-value",
    components: {
      "json-property-key": JsonPropertyKey,
      "json-property-value": JsonPropertyValue,
    },
    props: {
      propertyKey: String,
      propertyValue: [ String, Number ],
    },
    methods: {
      valueClasses: function() {
        const isNumber = typeof this.propertyValue === 'number'
        return {
          "teal--text": isNumber,
        }
      },
    },
  })
</script>
