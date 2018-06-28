<template>
  <v-container grid-list-md>
    <v-layout align-center>
      <json-property-key>{{ propertyKey }}</json-property-key>
      <json-property-value><img class="json-thumbnail" :src="imageSrc" /></json-property-value>
    </v-layout>
  </v-container>
</template>

<style scoped>
  .json-thumbnail {
    height: 50px;
  }
</style>

<script lang="ts">
  import Vue from 'vue'
  import { pluck } from 'rxjs/operators'

  import { buildAssetUrl } from '../data/base'
  import JsonPropertyKey from './JsonPropertyKey.vue'
  import JsonPropertyValue from './JsonPropertyValue.vue'

  export default Vue.extend({
    name: "json-image",
    components: {
      "json-property-key": JsonPropertyKey,
      "json-property-value": JsonPropertyValue,
    },
    props: {
      propertyKey: String,
      propertyValue: String,
    },
    computed: {
      imageSrc: function() {
        return buildAssetUrl(this.propertyValue, this.versionNumber$)
      }
    },
    subscriptions: function() {
      return {
        versionNumber$: this.$store.pipe(pluck('selectedVersion', 'buildNumber')),
      }
    }
  })
</script>
