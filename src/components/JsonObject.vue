<template>
  <v-expansion-panel>
    <v-expansion-panel-content>
      <div slot="header">{{ propertyKey }}</div>
      <v-container>
        <v-layout column>
          <v-flex v-for="(value, key) in propertyValue" xs12>
            <json-property :propertyKey="key" :propertyValue="value"></json-property>
          </v-flex>
        </v-layout>
      </v-container>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script lang="ts">
  import Vue from 'vue'

  export default Vue.extend({
    name: "json-object",
    components: {
      "json-property": () => import("./JsonProperty.vue")
    },
    props: {
      propertyKey: String,
      propertyValue: Object,
    },
  })
</script>
