<template>
  <v-container>
    <v-layout>
      <v-flex class="json-property-key">{{ propertyKey }}</v-flex>
      <v-flex class="json-property-value"><img :src="imageSrc" /></v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { pluck } from 'rxjs/operators'

  import { buildAssetUrl } from '../data/base'

  export default Vue.extend({
    name: "json-image",
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
